import { GliaSdk } from 'glia-widgets-ionic';

window.configure = () => {
    GliaSdk.configure({ siteId: "", siteApiKey: { id: "", secret: "" }, region: "", companyName: "" });
}

window.startChat = () => {
    GliaSdk.startChat();
}

window.startAudio = () => {
    GliaSdk.startAudio();
}

window.startVideo = () => {
    GliaSdk.startVideo();
}

window.clearVisitorSession = () => {
    GliaSdk.clearVisitorSession();
}

window.listQueues = () => {
    GliaSdk.listQueues();
}

window.authenticate = () => {
    const idTokenInputValue = document.getElementById("idTokenInput").value;
    const accessTokenInpuValue = document.getElementById("accessTokenInput").value;
    GliaSdk.authenticate({behavior: 'forbiddenDuringEngagement', idToken: idTokenInputValue, accessToken: accessTokenInpuValue});
}

window.deauthenticate = () => {
    GliaSdk.deauthenticate()
}

window.isAuthenticated = () => {
    GliaSdk.isAuthenticated()
}
window.refreshAuthentication = () => {
    const idTokenInputValue = document.getElementById("idTokenInput").value;
    const accessTokenInpuValue = document.getElementById("accessTokenInput").value;
    GliaSdk.refreshAuthentication({idToken: idTokenInputValue, accessToken: accessTokenInpuValue})
}

window.showVisitorCodeViewController = () => {
    GliaSdk.showVisitorCodeViewController()
}

window.startSecureConversation = () => {
    GliaSdk.startSecureConversation({startScreen: SecureConversationStartScreen.welcome})
}