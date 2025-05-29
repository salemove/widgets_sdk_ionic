import Capacitor
import Foundation

/// Please read the Capacitor iOS Plugin Development Guide
/// here: https://capacitorjs.com/docs/plugins/ios
@objc(GliaSdkPlugin)
public class GliaSdkPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "GliaSdkPlugin"
    public let jsName = "GliaSdk"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "configure", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "presentEntryWidget", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "showEntryWidget", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "hideEntryWidget", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "startChat", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "startAudio", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "startVideo", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "clearVisitorSession", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "listQueues", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getQueues", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "authenticate", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "deauthenticate", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "isAuthenticated", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "refreshAuthentication", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "showVisitorCodeViewController", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "showVisitorCode", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "startSecureConversation", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "startSecureMessaging", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "pauseLiveObservation", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "resumeLiveObservation", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(
            name: "subscribeToPushNotificationTypes",
            returnType: CAPPluginReturnPromise
        ),
        CAPPluginMethod(name: "getVisitorInfo", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "updateVisitorInfo", returnType: CAPPluginReturnPromise)
    ]
    private let implementation = GliaSdk()

    @objc func configure(_ call: CAPPluginCall) {
        implementation.configure(call)
    }

    @objc func presentEntryWidget(_ call: CAPPluginCall) {
        implementation.showEntryWidget(call)
    }

    @objc func showEntryWidget(_ call: CAPPluginCall) {
        implementation.showEntryWidget(call)
    }

    @objc func hideEntryWidget(_ call: CAPPluginCall) {
        implementation.hideEntryWidget(call)
    }

    @objc func startChat(_ call: CAPPluginCall) {
        implementation.startChat(call)
    }

    @objc func startAudio(_ call: CAPPluginCall) {
        implementation.startAudio(call)
    }

    @objc func startVideo(_ call: CAPPluginCall) {
        implementation.startVideo(call)
    }

    @objc func clearVisitorSession(_ call: CAPPluginCall) {
        implementation.clearVisitorSession(call)
    }

    @objc func listQueues(_ call: CAPPluginCall) {
        implementation.getQueues(call)
    }

    @objc func getQueues(_ call: CAPPluginCall) {
        implementation.getQueues(call)
    }

    @objc func authenticate(_ call: CAPPluginCall) {
        implementation.authenticate(call)
    }

    @objc func deauthenticate(_ call: CAPPluginCall) {
        implementation.deauthenticate(call)
    }

    @objc func isAuthenticated(_ call: CAPPluginCall) {
        implementation.isAuthenticated(call)
    }

    @objc func refreshAuthentication(_ call: CAPPluginCall) {
        implementation.refreshAuthentication(call)
    }

    @objc func showVisitorCodeViewController(_ call: CAPPluginCall) {
        implementation.showVisitorCode(call)
    }

    @objc func showVisitorCode(_ call: CAPPluginCall) {
        implementation.showVisitorCode(call)
    }

    @objc func startSecureConversation(_ call: CAPPluginCall) {
        implementation.startSecureMessaging(call)
    }

    @objc func startSecureMessaging(_ call: CAPPluginCall) {
        implementation.startSecureMessaging(call)
    }

    @objc func pauseLiveObservation(_ call: CAPPluginCall) {
        implementation.pauseLiveObservation(call)
    }

    @objc func resumeLiveObservation(_ call: CAPPluginCall) {
        implementation.resumeLiveObservation(call)
    }

    @objc func subscribeToPushNotificationTypes(_ call: CAPPluginCall) {
        implementation.subscribeToPushNotificationTypes(call)
    }

    @objc func getVisitorInfo(_ call: CAPPluginCall) {
        implementation.getVisitorInfo(call)
    }

    @objc func updateVisitorInfo(_ call: CAPPluginCall) {
        implementation.updateVisitorInfo(call)
    }
}
