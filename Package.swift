// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "GliaWidgetsIonic",
    platforms: [.iOS(.v13)],
    products: [
        .library(
            name: "GliaWidgetsIonic",
            targets: ["GliaSdkPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", branch: "main")
    ],
    targets: [
        .target(
            name: "GliaSdkPlugin",
            dependencies: [
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