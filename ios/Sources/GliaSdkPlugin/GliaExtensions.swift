import GliaWidgets
import UIKit

extension Glia {
  public static func initialize() {
    _ = Glia.sharedInstance
  }
}

extension QueueStatus {
    var stringValue: String {
        switch self {
        case .open: return "open"
        case .closed: return "closed"
        case .full: return "full"
        case .unstaffed: return "unstaffed"
        case .unknown(let rawValue): return "unknown(\(rawValue))"
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

extension PushNotificationsType {
    public init?(stringValue: String) {
        switch stringValue.lowercased() {
        case "start":
            self = .start
        case "end":
            self = .end
        case "failed":
            self = .failed
        case "message":
            self = .message
        case "transfer":
            self = .transfer
        default:
            // The input string does not match any known case
            return nil
        }
    }
}

extension Configuration.PushNotifications {
    init?(rawValue: String) {
        switch rawValue.lowercased() {
        case "disabled":
            self = .disabled
        case "sandbox":
            self = .sandbox
        case "production":
            self = .production
        default:
            return nil
        }
    }
}

extension UIApplication {

    func keyWindow() -> UIWindow? {
        self.connectedScenes
            .filter { $0.activationState == .foregroundActive }
            .compactMap { $0 as? UIWindowScene }
            .first?.windows
            .first(where: \.isKeyWindow)
    }

    class func topViewController(
        _ viewController: UIViewController? = UIApplication.shared.keyWindow()?.rootViewController
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
