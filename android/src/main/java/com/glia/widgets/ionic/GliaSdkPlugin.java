package com.glia.widgets.ionic;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "GliaSdk")
public class GliaSdkPlugin extends Plugin {

    private final GliaSdk implementation = new GliaSdk(this::notifyListeners);

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

    @Deprecated
    @PluginMethod
    public void presentEntryWidget(PluginCall call) {
        implementation.presentEntryWidget(call, getActivity());
    }

    @PluginMethod
    public void showEntryWidget(PluginCall call) {
        implementation.showEntryWidget(call, getActivity());
    }

    @PluginMethod
    public void hideEntryWidget(PluginCall call) {
        implementation.hideEntryWidget(call);
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

    @Deprecated
    @PluginMethod
    public void startSecureConversation(PluginCall call) {
        implementation.startSecureConversation(call, getActivity());
    }

    @PluginMethod
    public void startSecureMessaging(PluginCall call) {
        implementation.startSecureMessaging(call, getActivity());
    }

    @PluginMethod
    public void clearVisitorSession(PluginCall call) {
        implementation.clearVisitorSession(call);
    }

    @Deprecated
    @PluginMethod
    public void listQueues(PluginCall call) {
        implementation.listQueues(call);
    }

    @PluginMethod
    public void getQueues(PluginCall call) {
        implementation.getQueues(call);
    }

    @Deprecated
    @PluginMethod
    public void showVisitorCodeViewController(PluginCall call) {
        implementation.showVisitorCode(call);
    }

    @PluginMethod
    public void showVisitorCode(PluginCall call) {
        implementation.showVisitorCode(call);
    }

    @PluginMethod
    public void hideVisitorCode(PluginCall call) {
        implementation.hideVisitorCode(call);
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
    public void isAuthenticatedInternal(PluginCall call) {
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

    @PluginMethod
    public void getVisitorInfo(PluginCall call) {
        implementation.getVisitorInfo(call);
    }

    @PluginMethod
    public void updateVisitorInfo(PluginCall call) {
        implementation.updateVisitorInfo(call);
    }

    @PluginMethod
    public void endEngagement(PluginCall call) {
        implementation.endEngagement(call);
    }

    @PluginMethod
    public void subscribeToPushNotificationTypes(PluginCall call) {
        implementation.subscribeToPushNotificationTypes(call, getActivity());
    }
}
