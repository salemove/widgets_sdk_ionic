import Capacitor
import Foundation
import GliaWidgets

@objc public class GliaSdk: NSObject {

    private var entryWidget: EntryWidget?
    private var authentication: Glia.Authentication?
    private var configureQueueIds: [String]?

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
        configureQueueIds = queueIds

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
            !enableBubbleInsideApp
        {
            features.remove(.bubbleView)
        }

        let isWhiteLabelApp = call.getBool("isWhiteLabelApp") ?? false

        var pushNotifications: Configuration.PushNotifications?
        if let pushNotificationsRaw = config["pushNotifications"] as? String {
            pushNotifications = Configuration.PushNotifications(rawValue: pushNotificationsRaw)
        }

        let suppressPushNotificationsPermissionRequestDuringAuthentication =
            call.getBool("suppressPushNotificationsPermissionRequestDuringAuthentication") ?? false

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
                        suppressPushNotificationsPermissionRequestDuringAuthentication:
                            suppressPushNotificationsPermissionRequestDuringAuthentication
                    ),
                    uiConfig: uiConfig,
                    features: features
                ) { [weak self] (result: Result<Void, Error>) in
                    switch result {
                    case .success:
                        do {
                            self?.entryWidget = try Glia.sharedInstance.getEntryWidget(
                                queueIds: queueIds ?? [])
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
        var queueIds = configureQueueIds
        let useOptions = call.getBool("useOptions", false)
        if useOptions {
            queueIds = call.getArray("queueIds", []) as? [String]
        }

        DispatchQueue.main.async { [weak self] in
            do {
                self?.entryWidget = try Glia.sharedInstance.getEntryWidget(queueIds: queueIds ?? [])
                guard let topViewController = UIApplication.topViewController() else {
                    call.reject("Could not find view controller for presentatio.")
                    return
                }
                self?.entryWidget?.show(in: topViewController)
                call.resolve()
            } catch {
                call.reject(
                    "Could not show entry widget. Error='\(error.localizedDescription)'.")
            }
        }
    }

    @objc public func startChat(_ call: CAPPluginCall) {
        var queueIds = configureQueueIds
        let useOptions = call.getBool("useOptions", false)
        if useOptions {
            queueIds = call.getArray("queueIds", []) as? [String]
        }

        DispatchQueue.main.async {
            do {
                let launcher = try Glia.sharedInstance.getEngagementLauncher(
                    queueIds: queueIds ?? [])
                try launcher.startChat()
                call.resolve()
            } catch {
                call.reject("Could not start chat engagement. Error='\(error)'.")
            }
        }
    }

    @objc public func startAudio(_ call: CAPPluginCall) {
        var queueIds = configureQueueIds
        let useOptions = call.getBool("useOptions", false)
        if useOptions {
            queueIds = call.getArray("queueIds", []) as? [String]
        }

        DispatchQueue.main.async {
            do {
                let launcher = try Glia.sharedInstance.getEngagementLauncher(
                    queueIds: queueIds ?? [])
                try launcher.startAudioCall()
                call.resolve()
            } catch {
                call.reject("Could not start audio engagement. Error='\(error)'.")
            }
        }
    }

    @objc public func startVideo(_ call: CAPPluginCall) {
        var queueIds = configureQueueIds
        let useOptions = call.getBool("useOptions", false)
        if useOptions {
            queueIds = call.getArray("queueIds", []) as? [String]
        }

        DispatchQueue.main.async {
            do {
                let launcher = try Glia.sharedInstance.getEngagementLauncher(
                    queueIds: queueIds ?? [])
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

        let accessToken = call.getString("accessToken")?.trimmingCharacters(
            in: .whitespacesAndNewlines)

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
            authentication.deauthenticate(shouldStopPushNotifications: stopPushNotifications) {
                result in
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
        var queueIds = configureQueueIds
        let useOptions = call.getBool("useOptions", false)
        if useOptions {
            queueIds = call.getArray("queueIds", []) as? [String]
        }

        DispatchQueue.main.async {
            do {
                let launcher = try Glia.sharedInstance.getEngagementLauncher(
                    queueIds: queueIds ?? [])
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

    func hideEntryWidget(_ call: CAPPluginCall) {
        guard let entryWidget else {
            call.reject("Entry Widget is not shown.")
            return
        }

        DispatchQueue.main.async { [weak entryWidget] in
            entryWidget?.hide()
            call.resolve()
        }
    }

    func subscribeToPushNotificationTypes(_ call: CAPPluginCall) {
        var pushNotificationsTypes = [PushNotificationsType]()
        if let pushNotificationTypes = call.getArray("types", []) as? [String] {
            pushNotificationTypes.forEach {
                if let type = PushNotificationsType(stringValue: $0) {
                    pushNotificationsTypes.append(type)
                }
            }
        }
        DispatchQueue.main.async {
            Glia.sharedInstance.pushNotifications.subscribeTo(pushNotificationsTypes)
            call.resolve()
        }
    }

    func getVisitorInfo(_ call: CAPPluginCall) {
        Glia.sharedInstance.getVisitorInfo { result in
            switch result {
            case .success(let visitorInfo):
                var visitorInfoDict: [String: Any?] = [
                    "name": visitorInfo.name,
                    "email": visitorInfo.email,
                    "phone": visitorInfo.phone,
                    "note": visitorInfo.note,
                    "banned": visitorInfo.banned,
                ]

                let customAttributes = visitorInfo.customAttributes?.reduce(
                    into: [String: String]()
                ) { result, entry in
                    if entry.key == "external_id" {
                        visitorInfoDict["externalId"] = entry.value
                    }
                    result[entry.key] = entry.value
                }
                visitorInfoDict["customAttributes"] = customAttributes

                call.resolve(visitorInfoDict as PluginCallResultData)
            case .failure(let error):
                call.reject("Could not fetch visitor info. Error='\(error.localizedDescription)'.")
            }
        }
    }

    func updateVisitorInfo(_ call: CAPPluginCall) {
        var visitorInfoUpdate = VisitorInfoUpdate()

        if let name = call.getString("name") {
            visitorInfoUpdate.name = name
        }

        if let email = call.getString("email") {
            visitorInfoUpdate.email = email
        }

        if let phone = call.getString("phone") {
            visitorInfoUpdate.phone = phone
        }

        if let note = call.getString("note") {
            visitorInfoUpdate.note = note
        }

        if let noteUpdateMethodString = call.getString("noteUpdateMethod"),
            let noteUpdateMethod = VisitorInfoUpdate.NoteUpdateMethod(
                rawValue: noteUpdateMethodString.lowercased())
        {
            visitorInfoUpdate.noteUpdateMethod = noteUpdateMethod
        }

        if let customAttributes = call.getObject("customAttributes") as? [String: String] {
            visitorInfoUpdate.customAttributes = customAttributes
        }

        if let customAttributesUpdateMethodString = call.getString("customAttributesUpdateMethod"),
            let customAttributesUpdateMethod = VisitorInfoUpdate.CustomAttributesUpdateMethod(
                rawValue: customAttributesUpdateMethodString.lowercased())
        {
            visitorInfoUpdate.customAttributesUpdateMethod = customAttributesUpdateMethod
        }

        if let externalID = call.getString("externalId") {
            visitorInfoUpdate.externalID = externalID
        }

        Glia.sharedInstance.updateVisitorInfo(visitorInfoUpdate) { result in
            switch result {
            case .success:
                call.resolve()
            case .failure(let error):
                call.reject("Could not update visitor info. Error='\(error.localizedDescription)'.")
            }
        }
    }

}
