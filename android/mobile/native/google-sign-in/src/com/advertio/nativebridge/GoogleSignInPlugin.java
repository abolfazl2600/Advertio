package com.advertio.nativebridge;

import android.content.MutableContextWrapper;
import android.net.Uri;
import android.os.CancellationSignal;
import androidx.core.content.ContextCompat;
import androidx.credentials.ClearCredentialStateRequest;
import androidx.credentials.Credential;
import androidx.credentials.CredentialManager;
import androidx.credentials.CredentialManagerCallback;
import androidx.credentials.CustomCredential;
import androidx.credentials.GetCredentialRequest;
import androidx.credentials.GetCredentialResponse;
import androidx.credentials.exceptions.ClearCredentialException;
import androidx.credentials.exceptions.GetCredentialCancellationException;
import androidx.credentials.exceptions.GetCredentialException;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.android.libraries.identity.googleid.GetSignInWithGoogleOption;
import com.google.android.libraries.identity.googleid.GoogleIdTokenCredential;
import java.util.concurrent.atomic.AtomicInteger;

@CapacitorPlugin(name = "AdvertioGoogleSignIn")
public class GoogleSignInPlugin extends Plugin {
    private final AtomicInteger epoch = new AtomicInteger();
    private CancellationSignal pending;
    private PluginCall pendingCall;
    private CredentialManager manager() { return CredentialManager.create(getContext()); }
    private String clientId() {
        int id = getContext().getResources().getIdentifier("advertio_google_web_client_id", "string", getContext().getPackageName());
        return id == 0 ? "" : getContext().getString(id);
    }
    private boolean trusted(PluginCall call) {
        String value = getBridge().getWebView().getUrl();
        Uri uri = Uri.parse(value == null ? "" : value);
        if (!"https".equals(uri.getScheme()) || !"localhost".equals(uri.getHost()) || uri.getPort() != -1 || uri.getUserInfo() != null) {
            call.reject("GOOGLE_ORIGIN_REJECTED"); return false;
        }
        return true;
    }
    @PluginMethod public void configuration(PluginCall call) {
        getActivity().runOnUiThread(() -> { if (trusted(call)) call.resolve(new JSObject().put("available", !clientId().isEmpty())); });
    }
    @PluginMethod public void signIn(PluginCall call) {
        getActivity().runOnUiThread(() -> {
            if (!trusted(call)) return;
            String client = clientId();
            if (client.isEmpty()) { call.reject("GOOGLE_CONFIGURATION_MISSING"); return; }
            if (pendingCall != null) { call.reject("GOOGLE_REQUEST_IN_PROGRESS"); return; }
            final int requestEpoch = epoch.incrementAndGet();
            pending = new CancellationSignal(); pendingCall = call;
            try {
                GetSignInWithGoogleOption option = new GetSignInWithGoogleOption.Builder(client).build();
                GetCredentialRequest request = new GetCredentialRequest.Builder().addCredentialOption(option).build();
                manager().getCredentialAsync(new MutableContextWrapper(getActivity()), request, pending,
                    ContextCompat.getMainExecutor(getContext()), new CredentialManagerCallback<GetCredentialResponse, GetCredentialException>() {
                        @Override public void onResult(GetCredentialResponse response) {
                            if (requestEpoch != epoch.get()) return;
                            pendingCall = null; pending = null;
                            try {
                                Credential credential = response.getCredential();
                                if (!(credential instanceof CustomCredential) || !GoogleIdTokenCredential.TYPE_GOOGLE_ID_TOKEN_CREDENTIAL.equals(credential.getType())) {
                                    call.reject("GOOGLE_CREDENTIAL_TYPE_REJECTED"); return;
                                }
                                String token = GoogleIdTokenCredential.createFrom(((CustomCredential) credential).getData()).getIdToken();
                                if (token.isEmpty() || token.length() > 65536) { call.reject("GOOGLE_CREDENTIAL_REJECTED"); return; }
                                // The relying-party API must verify signature, issuer, audience and expiry.
                                call.resolve(new JSObject().put("idToken", token));
                            } catch (Exception ignored) { call.reject("GOOGLE_CREDENTIAL_REJECTED"); }
                        }
                        @Override public void onError(GetCredentialException error) {
                            if (requestEpoch != epoch.get()) return;
                            pendingCall = null; pending = null;
                            call.reject(error instanceof GetCredentialCancellationException ? "GOOGLE_CANCELLED" : "GOOGLE_UNAVAILABLE");
                        }
                    });
            } catch (Exception ignored) { pendingCall = null; pending = null; call.reject("GOOGLE_UNAVAILABLE"); }
        });
    }
    private void cancel() {
        epoch.incrementAndGet();
        if (pending != null) pending.cancel();
        if (pendingCall != null) pendingCall.reject("GOOGLE_CANCELLED");
        pending = null; pendingCall = null;
    }
    @PluginMethod public void clear(PluginCall call) {
        getActivity().runOnUiThread(() -> {
            if (!trusted(call)) return;
            cancel();
            try {
                manager().clearCredentialStateAsync(new ClearCredentialStateRequest(), null,
                    ContextCompat.getMainExecutor(getContext()), new CredentialManagerCallback<Void, ClearCredentialException>() {
                        @Override public void onResult(Void ignored) { call.resolve(); }
                        @Override public void onError(ClearCredentialException ignored) { call.reject("GOOGLE_CLEAR_FAILED"); }
                    });
            } catch (Exception ignored) { call.reject("GOOGLE_CLEAR_FAILED"); }
        });
    }
    @Override protected void handleOnDestroy() { cancel(); super.handleOnDestroy(); }
}
