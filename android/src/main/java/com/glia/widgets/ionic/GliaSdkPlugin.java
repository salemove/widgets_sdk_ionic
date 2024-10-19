package com.glia.widgets.ionic;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "GliaSdk")
public class GliaSdkPlugin extends Plugin {

    private GliaSdk implementation = new GliaSdk();

    @PluginMethod
    public void echo(PluginCall call) {
        String value = call.getString("value");

        JSObject ret = new JSObject();
        ret.put("value", implementation.echo(value));
        call.resolve(ret);
    }

    @PluginMethod
    public void configure(PluginCall call) {
        implementation.configure(call, getActivity());
    }
    @PluginMethod
    public void startChat(PluginCall call) {
        implementation.startChat(call, getActivity());
    }
    @PluginMethod
    public void startAudio(PluginCall call) {
        implementation.startAudio(call, getActivity());
    }
    @PluginMethod
    public void startVideo(PluginCall call) {
        implementation.startVideo(call, getActivity());
    }
    @PluginMethod
    public void startSecureConversation(PluginCall call) {
        implementation.startSecureConversation(call, getActivity());
    }
    @PluginMethod
    public void clearVisitorSession(PluginCall call) {
        implementation.clearVisitorSession(call);
    }
    @PluginMethod
    public void listQueues(PluginCall call) {
        implementation.listQueues(call);
    }
    @PluginMethod
    public void showVisitorCodeViewController(PluginCall call) {
        implementation.showVisitorCodeViewController(call, getActivity());
    }
    @PluginMethod
    public void authenticate(PluginCall call) {
        implementation.authenticate(call);
    }
    @PluginMethod
    public void deauthenticate(PluginCall call) {
        implementation.deauthenticate(call);
    }
    @PluginMethod
    public void isAuthenticated(PluginCall call) {
        implementation.isAuthenticated(call);
    }
    @PluginMethod
    public void refreshAuthentication(PluginCall call) {
        implementation.refreshAuthentication(call);
    }

    @PluginMethod
    public void pauseLiveObservation(PluginCall call) {
        implementation.pauseLiveObservation(call);
    }

    @PluginMethod
    public void resumeLiveObservation(PluginCall call) {
        implementation.resumeLiveObservation(call);
    }
}
