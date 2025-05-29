import Capacitor
import Foundation
import GliaWidgets

@objc public class GliaSdk: NSObject {
    
    private var entryWidget: EntryWidget?
    private var authentication: Glia.Authentication?
    
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
        
        let queueIds = call.getArray("queueIds", []) as? [String]
        
        let companyName = call.getString("companyName") ?? ""
        
        let overrideLocale = call.getString("overrideLocale")
        
        let rawUiConfig = call.getString("uiUnifiedConfig")
        
        var uiConfig: RemoteConfiguration?
        if let jsonData = rawUiConfig?.data(using: .utf8) {
            do {
                uiConfig = try JSONDecoder().decode(RemoteConfiguration.self, from: jsonData)
            } catch {
                debugPrint("Serialization failed with error='\(error)'.")
            }
        }
        
        var visitorContext: Configuration.VisitorContext?
        if let visitorContextAssetId = call.getString("visitorContextAssetId") {
            if let assetId = UUID(uuidString: visitorContextAssetId) {
                visitorContext = .init(assetId: assetId)
            } else {
                call.reject("'visitorContextAssetId' is invalid.")
            }
        }
        
        var features: Features = .all
        if let enableBubbleInsideApp = call.getBool("enableBubbleInsideApp"),
           !enableBubbleInsideApp {
            features.remove(.bubbleView)
        }
        
        let isWhiteLabelApp = call.getBool("isWhiteLabelApp") ?? false
        
        let suppressPushNotificationsPermissionRequestDuringAuthentication = call.getBool("suppressPushNotificationsPermissionRequestDuringAuthentication") ?? false
        
        DispatchQueue.main.async {
            do {
                try Glia.sharedInstance.configure(
                    with: Configuration(
                        authorizationMethod: .siteApiKey(
                            id: siteApiKeyId, secret: siteApiKeySecret),
                        environment: region,
                        site: siteId,
                        visitorContext: visitorContext,
                        isWhiteLabelApp: isWhiteLabelApp,
                        companyName: companyName,
                        manualLocaleOverride: overrideLocale,
                        suppressPushNotificationsPermissionRequestDuringAuthentication: suppressPushNotificationsPermissionRequestDuringAuthentication
                    ),
                    uiConfig: uiConfig,
                    features: features
                ) {  [weak self] (result: Result<Void, Error>) in
                    switch result {
                    case .success:
                        do {
                            self?.entryWidget = try Glia.sharedInstance.getEntryWidget(queueIds: queueIds ?? [])
                            call.resolve()
                        } catch {
                            call.reject("Error occured='\(error)'.")
                        }
                        
                    case .failure(let error):
                        call.reject("Error occured='\(error)'.")
                    }
                }
            } catch {
                call.reject("Error occured='\(error)'.")
            }
        }
    }
    
    @objc public func showEntryWidget(_ call: CAPPluginCall) {
        let queueIds = call.getArray("queueIds") as? [String]
        entryWidget = try Glia.sharedInstance.getEntryWidget(queueIds: queueIds ?? [])
        
        DispatchQueue.main.async { [weak entryWidget] in
            guard let topViewController = UIApplication.topViewController() else {
                call.reject("Could not find view controller for presentatio.")
                return
            }
            
            entryWidget?.show(in: topViewController)
            call.resolve()
        }
    }
    
    @objc public func startChat(_ call: CAPPluginCall) {
        let queueIds = call.getArray("queueIds") as? [String]
        DispatchQueue.main.async {
            do {
                let launcher = try Glia.sharedInstance.getEngagementLauncher(queueIds: queueIds ?? [])
                try launcher.startChat()
                call.resolve()
            } catch {
                call.reject("Could not start chat engagement. Error='\(error)'.")
            }
        }
    }
    
    @objc public func startAudio(_ call: CAPPluginCall) {
        let queueIds = call.getArray("queueIds") as? [String]
        
        DispatchQueue.main.async {
            do {
                let launcher = try Glia.sharedInstance.getEngagementLauncher(queueIds: queueIds ?? [])
                try launcher.startAudioCall()
                call.resolve()
            } catch {
                call.reject("Could not start audio engagement. Error='\(error)'.")
            }
        }
    }
    
    @objc public func startVideo(_ call: CAPPluginCall) {
        let queueIds = call.getArray("queueIds") as? [String]
        DispatchQueue.main.async {
            do {
                let launcher = try Glia.sharedInstance.getEngagementLauncher(queueIds: queueIds ?? [])
                try launcher.startVideoCall()
                call.resolve()
            } catch {
                call.reject("Could not start video engagement. Error'\(error)'.")
            }
        }
    }
    
    @objc public func clearVisitorSession(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            Glia.sharedInstance.clearVisitorSession({ [call] (result: Result<Void, Error>) in
                switch result {
                case .success:
                    call.resolve()
                case .failure(let error):
                    call.reject("Could not clear visitor session. Error='\(error)'.")
                }
            })
        }
    }
    
    @objc public func getQueues(_ call: CAPPluginCall) {
        Glia.sharedInstance.getQueues { [call] (result: Result<[Queue], Error>) in
            switch result {
            case .success(let queues):
                call.resolve(
                    queues.reduce(into: [String: Any]()) { _result, queue in
                        _result[queue.id] = [
                            "name": queue.name,
                            "is_default": queue.isDefault,
                            "status": queue.status.stringValue,
                            "media": queue.media.map { $0.rawValue },
                        ]
                    }
                )
                
            case .failure(let error):
                call.reject("Could not get queues. Error='\(error)'.")
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
        
        let accessToken = call.getString("accessToken")?.trimmingCharacters(in: .whitespacesAndNewlines)
        
        DispatchQueue.main.async {
            do {
                self.authentication = try Glia.sharedInstance.authentication(
                    with: Glia.Authentication.Behavior(rawValue: behavior)
                )
                self.authentication?.authenticate(
                    with: Glia.Authentication.IdToken(idToken),
                    accessToken: accessToken?.isEmpty == true ? nil : accessToken
                ) { result in
                    switch result {
                    case .success:
                        call.resolve()
                    case .failure(let error):
                        call.reject("Could not authenticate. Error='\(error)'.")
                    }
                }
            } catch {
                call.reject("Could not authenticate. Error='\(error)'.")
            }
        }
    }
    
    @objc public func isAuthenticated(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            call.resolve(["isAuthenticated": self.authentication?.isAuthenticated ?? false])
        }
    }
    
    @objc public func deauthenticate(_ call: CAPPluginCall) {
        let stopPushNotifications = call.getBool("stopPushNotifications") ?? false
        
        guard let authentication else {
            call.resolve()
            return
        }
        
        DispatchQueue.main.async {
            authentication.deauthenticate(shouldStopPushNotifications: stopPushNotifications) { result in
                switch result {
                case .success:
                    call.resolve()
                case .failure(let error):
                    call.reject("Could not deauthenticate. Error='\(error)'.")
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
                    call.reject("Could not refresh authentication. Error='\(error)'.")
                }
            }
        }
    }
    
    @objc public func showVisitorCode(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            guard let viewController = UIApplication.topViewController() else {
                call.reject("Could not find view controller for presentation.")
                return
            }
            Glia.sharedInstance.callVisualizer.showVisitorCodeViewController(from: viewController)
            call.resolve()
        }
    }
    
    @objc public func startSecureMessaging(_ call: CAPPluginCall) {
        let queueIds = call.getArray("queueIds") as? [String]
        DispatchQueue.main.async {
            do {
                let launcher = try Glia.sharedInstance.getEngagementLauncher(queueIds: queueIds ?? [])
                try launcher.startSecureMessaging()
                call.resolve()
            } catch {
                call.reject("Could not start a Secure Messaging flow. Error='\(error)'.")
            }
        }
    }
    
    @objc public func pauseLiveObservation(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            Glia.sharedInstance.liveObservation.pause()
            call.resolve()
        }
    }
    
    @objc public func resumeLiveObservation(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            Glia.sharedInstance.liveObservation.resume()
            call.resolve()
        }
    }
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
