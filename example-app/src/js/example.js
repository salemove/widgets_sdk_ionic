import { GliaSdk } from 'glia-widgets-ionic';
import { environment } from '../environments/environment';

window.configure = () => {
    GliaSdk.configure({ siteId: environment.IONIC_SITE_ID, apiKey: { id: environment.IONIC_API_KEY, secret: environment.IONIC_API_SECRET }, region: environment.IONIC_REGION, queueIds: [environment.IONIC_QUEUE_ID], companyName: environment.IONIC_COMPANY_NAME });
}

window.presentEntryWidget = () => {
    GliaSdk.presentEntryWidget();
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
    GliaSdk.startSecureConversation()
}