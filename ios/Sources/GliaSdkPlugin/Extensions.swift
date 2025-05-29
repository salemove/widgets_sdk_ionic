import GliaWidgets
import UIKit

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