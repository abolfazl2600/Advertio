package com.advertio.nativebridge;

import android.net.Uri;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import com.getcapacitor.BridgeWebViewClient;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "AdvertioNavigationPolicy")
public class NavigationPolicyPlugin extends Plugin {
    @PluginMethod public void activate(PluginCall call) {
        getActivity().runOnUiThread(() -> {
            String currentUrl=getBridge().getWebView().getUrl();
            Uri current=Uri.parse(currentUrl==null ? "" : currentUrl);
            if (!local(current)) {call.reject("NAVIGATION_ORIGIN_REJECTED");return;}
            getBridge().setWebViewClient(new BridgeWebViewClient(getBridge()) {
                @Override public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                    // Remote links must use the explicit, one-shot native bot-auth handoff.
                    // Never delegate a remote URL to launchIntent (which could open Checkout).
                    if (!local(request.getUrl())) {
                        view.evaluateJavascript("window.dispatchEvent(new Event('advertio:payment-blocked'))", null);
                        return true;
                    }
                    return super.shouldOverrideUrlLoading(view, request);
                }
                @Override public boolean shouldOverrideUrlLoading(WebView view, String url) {
                    return !local(Uri.parse(url));
                }
            });
            call.resolve();
        });
    }
    private boolean local(Uri url) {
        return "https".equals(url.getScheme()) && "localhost".equals(url.getHost()) && url.getUserInfo()==null && url.getPort()==-1;
    }
}
