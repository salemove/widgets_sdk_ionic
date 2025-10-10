// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "GliaWidgetsIonic",
    platforms: [.iOS(.v14)],
    products: [
        .library(
            name: "GliaWidgetsIonic",
            targets: ["GliaSdkPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", branch: "main"),
        .package(url: "https://github.com/salemove/ios-sdk-widgets", exact: "3.3.0")
    ],
    targets: [
        .target(
            name: "GliaSdkPlugin",
            dependencies: [
                .product(name: "GliaWidgets", package: "ios-sdk-widgets"),
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm")
            ],
            path: "ios/Sources/GliaSdkPlugin"),
        .testTarget(
            name: "GliaSdkPluginTests",
            dependencies: ["GliaSdkPlugin"],
            path: "ios/Tests/GliaSdkPluginTests")
    ]
)
