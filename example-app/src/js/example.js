import { GliaSdk } from 'glia-widgets-ionic';

window.configure = () => {
    GliaSdk.configure({ siteId: "", apiKey: { id: "", secret: "" }, region: "", companyName: "" });
}

window.startChat = () => {
    GliaSdk.startChat({queueIds: ["queueId"]});
}

window.startAudio = () => {
    GliaSdk.startAudio({queueIds: ["queueId"]});
}

window.startVideo = () => {
    GliaSdk.startVideo({queueIds: ["queueId"]});
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
    GliaSdk.startSecureConversation({startScreen: 'welcome', queueIds: ["queueId"]})
}