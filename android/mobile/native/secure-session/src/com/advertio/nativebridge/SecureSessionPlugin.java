package com.advertio.nativebridge;

import android.net.Uri;
import android.security.keystore.KeyGenParameterSpec;
import android.security.keystore.KeyProperties;
import android.util.AtomicFile;
import android.util.Base64;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.io.File;
import java.io.FileOutputStream;
import java.nio.charset.StandardCharsets;
import java.security.KeyStore;
import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;
import org.json.JSONObject;

@CapacitorPlugin(name = "SecureSession")
public class SecureSessionPlugin extends Plugin {
    private final Object lock = new Object();
    private String alias() { return getContext().getPackageName() + ".session.v1"; }
    private AtomicFile file() { return new AtomicFile(new File(getContext().getNoBackupFilesDir(), "session-v1.enc")); }
    private boolean trusted(PluginCall call) {
        Uri uri = Uri.parse(getBridge().getWebView().getUrl() == null ? "" : getBridge().getWebView().getUrl());
        if (!"https".equals(uri.getScheme()) || !"localhost".equals(uri.getHost()) || uri.getPort() != -1 || uri.getUserInfo() != null) {
            call.reject("SESSION_ORIGIN_REJECTED"); return false;
        }
        return true;
    }
    private SecretKey key() throws Exception {
        KeyStore store = KeyStore.getInstance("AndroidKeyStore"); store.load(null);
        if (!store.containsAlias(alias())) {
            KeyGenerator generator = KeyGenerator.getInstance(KeyProperties.KEY_ALGORITHM_AES, "AndroidKeyStore");
            generator.init(new KeyGenParameterSpec.Builder(alias(), KeyProperties.PURPOSE_ENCRYPT | KeyProperties.PURPOSE_DECRYPT)
                .setBlockModes(KeyProperties.BLOCK_MODE_GCM).setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE)
                .setKeySize(256).setRandomizedEncryptionRequired(true).build());
            generator.generateKey();
        }
        return (SecretKey) store.getKey(alias(), null);
    }
    private byte[] aad() { return alias().getBytes(StandardCharsets.UTF_8); }
    @PluginMethod public void read(PluginCall call) {
        getActivity().runOnUiThread(() -> {
        if (!trusted(call)) return;
        synchronized (lock) {
            try {
                if (!file().getBaseFile().exists()) { call.resolve(new JSObject().put("token", JSONObject.NULL)); return; }
                if (file().getBaseFile().length() > 131072) throw new IllegalStateException();
                JSONObject record = new JSONObject(new String(file().readFully(), StandardCharsets.UTF_8));
                Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
                byte[] iv = Base64.decode(record.getString("iv"), Base64.NO_WRAP);
                if (iv.length != 12) throw new IllegalStateException();
                cipher.init(Cipher.DECRYPT_MODE, key(), new GCMParameterSpec(128, iv)); cipher.updateAAD(aad());
                String token = new String(cipher.doFinal(Base64.decode(record.getString("data"), Base64.NO_WRAP)), StandardCharsets.UTF_8);
                call.resolve(new JSObject().put("token", token));
            } catch (Exception ignored) { file().delete(); call.reject("SESSION_READ_FAILED"); }
        }
        });
    }
    @PluginMethod public void write(PluginCall call) {
        getActivity().runOnUiThread(() -> {
        if (!trusted(call)) return;
        String token = call.getString("token");
        if (token == null || token.isEmpty() || token.length() > 65536) { call.reject("SESSION_TOKEN_REJECTED"); return; }
        synchronized (lock) {
            FileOutputStream stream = null;
            try {
                Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding"); cipher.init(Cipher.ENCRYPT_MODE, key()); cipher.updateAAD(aad());
                JSONObject record = new JSONObject().put("iv", Base64.encodeToString(cipher.getIV(), Base64.NO_WRAP))
                    .put("data", Base64.encodeToString(cipher.doFinal(token.getBytes(StandardCharsets.UTF_8)), Base64.NO_WRAP));
                stream = file().startWrite(); stream.write(record.toString().getBytes(StandardCharsets.UTF_8)); file().finishWrite(stream);
                call.resolve();
            } catch (Exception ignored) { if (stream != null) file().failWrite(stream); call.reject("SESSION_WRITE_FAILED"); }
        }
        });
    }
    @PluginMethod public void clear(PluginCall call) {
        getActivity().runOnUiThread(() -> {
        if (!trusted(call)) return;
        synchronized (lock) {
            try {
                file().delete();
                KeyStore store = KeyStore.getInstance("AndroidKeyStore"); store.load(null); store.deleteEntry(alias());
                call.resolve();
            } catch (Exception ignored) { call.reject("SESSION_CLEAR_FAILED"); }
        }
        });
    }
}
