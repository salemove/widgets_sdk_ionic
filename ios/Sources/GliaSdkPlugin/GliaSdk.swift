import Foundation

@objc public class GliaSdk: NSObject {
    @objc public func echo(_ value: String) -> String {
        print(value)
        return value
    }
}
