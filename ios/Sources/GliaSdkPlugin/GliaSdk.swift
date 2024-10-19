import Capacitor
import Foundation
import GliaCoreSDK
import GliaWidgets

@objc public class GliaSdk: NSObject {

    @objc public func configure(_ call: CAPPluginCall) {

        guard
            let siteId = call.getString("siteId"),
            siteId.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty == false
        else {
            call.reject("'siteId' is missed or invalid.")
            return
        }

        guard
            let apiKey = call.getObject("apiKey"),
            let siteApiKeyId = apiKey["id"] as? String,
            let siteApiKeySecret = apiKey["secret"] as? String
        else {
            call.reject("'apiKey' is missed or invalid.")
            return
        }

        guard
            let rawValue = call.getString("region"),
            let region = Environment(rawValue: rawValue)
        else {
            call.reject("'region' is missed or invalid.")
            return
        }

        DispatchQueue.main.async {
            do {
                try Glia.sharedInstance.configure(
                    with: Configuration(
                        authorizationMethod: .siteApiKey(
                            id: siteApiKeyId, secret: siteApiKeySecret),
                        environment: region,
                        site: siteId
                    ),
                    theme: Theme()
                ) { result in

                    switch result {
                    case .success:
                        call.resolve()
                    case .failure(let error):
                        call.reject("Error occured='\(error)'.")
                    }
                }
            } catch {
                call.reject("Error occured='\(error)'.")
            }
        }
    }

    @objc public func startChat(_ call: CAPPluginCall) {

        DispatchQueue.main.async {
            do {
                let queueIds = call.getArray("queueIds") as? [String]
                try Glia.sharedInstance.startEngagement(of: .chat, in: queueIds ?? [])
                call.resolve()
            } catch {
                call.reject("Engagement has not been started. Error='\(error)'.")
            }
        }
    }

    @objc public func startAudio(_ call: CAPPluginCall) {

        DispatchQueue.main.async {
            do {
                let queueIds = call.getArray("queueIds") as? [String]
                try Glia.sharedInstance.startEngagement(of: .audioCall, in: queueIds ?? [])
                call.resolve()
            } catch {
                call.reject("Engagement has not been started. Error='\(error)'.")
            }
        }
    }

    @objc public func startVideo(_ call: CAPPluginCall) {

        DispatchQueue.main.async {
            do {
                let queueIds = call.getArray("queueIds") as? [String]
                try Glia.sharedInstance.startEngagement(of: .videoCall, in: queueIds ?? [])
                call.resolve()
            } catch {
                call.reject("Engagement has not been started. Error='\(error)'.")
            }
        }
    }

    @objc public func clearVisitorSession(_ call: CAPPluginCall) {

        DispatchQueue.main.async {
            do {
                try Glia.sharedInstance.clearVisitorSession { result in
                    switch result {
                    case .success:
                        call.resolve()
                    case .failure(let error):
                        call.reject("Clear visitor session failed. Error='\(error)'.")
                    }
                }
            } catch {
                call.reject("Clear visitor session failed. Error='\(error)'.")
            }
        }
    }

    @objc public func listQueues(_ call: CAPPluginCall) {

        DispatchQueue.main.async {
            Glia.sharedInstance.listQueues { result in
                switch result {
                case .success(let queues):
                    call.resolve(
                        queues.reduce(into: [String: Any]()) { _result, queue in
                            _result[queue.id] = [
                                "name": queue.name,
                                "is_default": queue.isDefault,
                                "status": queue.state.status.rawValue,
                                "media": queue.state.media.map { $0.rawValue },
                            ]
                        }
                    )

                case .failure(let error):
                    call.reject("List queue failed. Error='\(error)'.")
                }
            }
        }
    }

    @objc public func authenticate(_ call: CAPPluginCall) {

        guard let behavior = call.getString("behavior") else {
            call.reject("'behavior' is missed or invalid.")
            return
        }

        guard let idToken = call.getString("idToken") else {
            call.reject("'idToken' is missed or invalid.")
            return
        }

        DispatchQueue.main.async {
            do {
                self.authentication = try Glia.sharedInstance.authentication(
                    with: Glia.Authentication.Behavior(rawValue: behavior)
                )
                self.authentication?.authenticate(
                    with: Glia.Authentication.IdToken(idToken),
                    accessToken: call.getString("accessToken")
                ) { result in
                    switch result {
                    case .success:
                        call.resolve()
                    case .failure(let error):
                        call.reject("Error='\(error)'.")
                    }
                }
            } catch {
                call.reject("Error='\(error)'.")
            }
        }
    }

    @objc public func isAuthenticated(_ call: CAPPluginCall) {

        DispatchQueue.main.async {
            call.resolve(["isAuthenticated": self.authentication?.isAuthenticated ?? false])
        }
    }

    @objc public func deauthenticate(_ call: CAPPluginCall) {

        guard let authentication else {
            call.resolve()
            return
        }

        DispatchQueue.main.async {
            authentication.deauthenticate { result in
                switch result {
                case .success:
                    call.resolve()
                case .failure(let error):
                    call.reject("Error='\(error)'.")
                }
            }
        }
    }

    @objc public func refreshAuthentication(_ call: CAPPluginCall) {
        guard let idToken = call.getString("idToken") else {
            call.reject("'idToken' is missed or invalid.")
            return
        }

        DispatchQueue.main.async {
            self.authentication?.refresh(
                with: Glia.Authentication.IdToken(idToken),
                accessToken: call.getString("accessToken")
            ) { result in
                switch result {
                case .success:
                    call.resolve()
                case .failure(let error):
                    call.reject("Error='\(error)'.")
                }
            }
        }
    }

    @objc public func showVisitorCodeViewController(_ call: CAPPluginCall) {

        DispatchQueue.main.async {
            guard let viewController = UIApplication.topViewController() else {
                call.reject("Can't present visitor Code.")
                return
            }
            Glia.sharedInstance.callVisualizer.showVisitorCodeViewController(from: viewController)
            call.resolve()
        }
    }

    @objc public func startSecureConversation(_ call: CAPPluginCall) {

        guard let startScreenRawValue = call.getString("startScreen") else {
            call.reject("'startScreen' not defined or invalid.")
            return
        }

        let startScreen =
            startScreenRawValue == "chatTranscript"
            ? SecureConversations.InitialScreen.chatTranscript : .welcome
        DispatchQueue.main.async {

            do {
                try Glia.sharedInstance.startEngagement(of: .messaging(startScreen))
                call.resolve()
            } catch {
                call.reject("Can't start Secure Conversation flow. Error='\(error)'.")
            }
        }
    }
    
    @objc public func pauseLiveObservation(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            GliaCore.sharedInstance.liveObservation.pause()
            call.resolve()
        }
    }
    
    @objc public func resumeLiveObservation(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            GliaCore.sharedInstance.liveObservation.resume()
            call.resolve()
        }
    }

    private var authentication: Glia.Authentication?
}

extension Environment {

    init?(rawValue: String) {

        switch rawValue.lowercased() {
        case "eu":
            self = .europe
        case "us":
            self = .usa
        case "beta":
            self = .beta
        default:
            return nil
        }
    }
}

extension Glia.Authentication.Behavior {
    init(rawValue: String) {
        switch rawValue.lowercased() {
        case "allowedDuringEngagement":
            self = .allowedDuringEngagement
        default:
            self = .forbiddenDuringEngagement
        }
    }
}

extension UIApplication {
    class func topViewController(
        _ viewController: UIViewController? = UIApplication.shared.keyWindow?.rootViewController
    ) -> UIViewController? {
        if let nav = viewController as? UINavigationController {
            return topViewController(nav.visibleViewController)
        }
        if let tab = viewController as? UITabBarController {
            if let selected = tab.selectedViewController {
                return topViewController(selected)
            }
        }
        if let presented = viewController?.presentedViewController {
            return topViewController(presented)
        }
        return viewController
    }
}
