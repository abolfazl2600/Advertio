package com.advertio.nativebridge;

import android.app.AlertDialog;
import android.net.Uri;
import android.os.Build;
import android.view.Window;
import android.view.WindowManager;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "AdvertioNativeUx")
public class NativeUxPlugin extends Plugin {
    private AlertDialog exitDialog;
    private PluginCall exitCall;
    private boolean trusted(PluginCall call) {
        String value=getBridge().getWebView().getUrl();Uri uri=Uri.parse(value==null?"":value);
        if(!"https".equals(uri.getScheme()) || !"localhost".equals(uri.getHost()) || uri.getPort()!=-1 || uri.getUserInfo()!=null){call.reject("UX_ORIGIN_REJECTED");return false;}
        return true;
    }
    private void theme(boolean dark) {
        Window window=getActivity().getWindow();
        WindowInsetsControllerCompat controller=WindowCompat.getInsetsController(window,window.getDecorView());
        controller.setAppearanceLightStatusBars(!dark);controller.setAppearanceLightNavigationBars(!dark);
        if(Build.VERSION.SDK_INT>=29)window.setNavigationBarContrastEnforced(false);
    }
    @PluginMethod public void activate(PluginCall call) {
        getActivity().runOnUiThread(()->{
            if(!trusted(call))return;
            Window window=getActivity().getWindow();
            WindowCompat.setDecorFitsSystemWindows(window,false);
            window.setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE);
            theme(Boolean.TRUE.equals(call.getBoolean("dark",false)));
            ViewCompat.setOnApplyWindowInsetsListener(getBridge().getWebView(),(view,insets)->{
                Insets bars=insets.getInsets(WindowInsetsCompat.Type.systemBars()|WindowInsetsCompat.Type.displayCutout());
                Insets ime=insets.getInsets(WindowInsetsCompat.Type.ime());
                float density=getContext().getResources().getDisplayMetrics().density;
                JSObject event=new JSObject().put("top",bars.top/density).put("bottom",bars.bottom/density)
                    .put("left",bars.left/density).put("right",bars.right/density)
                    .put("keyboardHeight",insets.isVisible(WindowInsetsCompat.Type.ime())?ime.bottom/density:0);
                notifyListeners("insetsChanged",event,true);
                return insets;
            });
            ViewCompat.requestApplyInsets(getBridge().getWebView());call.resolve();
        });
    }
    @PluginMethod public void setTheme(PluginCall call) {
        getActivity().runOnUiThread(()->{if(trusted(call)){theme(Boolean.TRUE.equals(call.getBoolean("dark",false)));call.resolve();}});
    }
    private void finishExit(boolean confirmed) {
        PluginCall call=exitCall;exitCall=null;exitDialog=null;
        if(call!=null)call.resolve(new JSObject().put("confirmed",confirmed));
    }
    @PluginMethod public void confirmExit(PluginCall call) {
        getActivity().runOnUiThread(()->{
            if(!trusted(call))return;
            if(exitCall!=null){call.resolve(new JSObject().put("confirmed",false));return;}
            exitCall=call;
            boolean fa=getContext().getResources().getConfiguration().getLocales().get(0).getLanguage().equals("fa");
            exitDialog=new AlertDialog.Builder(getActivity()).setTitle(fa?"خروج از برنامه؟":"Leave Advertio?")
                .setMessage(fa?"می‌توانید بعداً به همین صفحه برگردید.":"You can return to this page later.")
                .setPositiveButton(fa?"خروج":"Leave",(dialog,which)->finishExit(true))
                .setNegativeButton(fa?"ادامه":"Stay",(dialog,which)->finishExit(false))
                .setOnCancelListener(dialog->finishExit(false)).create();exitDialog.show();
        });
    }
    @Override protected void handleOnDestroy() {
        if(exitDialog!=null)exitDialog.dismiss();finishExit(false);
        ViewCompat.setOnApplyWindowInsetsListener(getBridge().getWebView(),null);
        super.handleOnDestroy();
    }
}
