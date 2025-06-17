import { GliaSdk, PushNotificationsIOS, PushNotificationType } from 'glia-widgets-ionic';
import { environment } from '../environments/environment.ts'
import uiThemeConfig from '../config/unified_config.json';

window.configure = (suppressPushNotificationsPermissionRequest) => {
    const queueIdInputValue = document.getElementById("queueIdInput").value;
    GliaSdk.configure({
        siteId: environment.IONIC_SITE_ID,
        apiKey: { id: environment.IONIC_API_KEY, secret: environment.IONIC_API_SECRET },
        region: environment.IONIC_REGION,
        queueIds: [queueIdInputValue],
        pushNotifications: PushNotificationsIOS.SANDBOX,
        companyName: environment.IONIC_COMPANY_NAME,
        overrideLocale: environment.IONIC_LOCALE,
        uiUnifiedConfig: uiThemeConfig,
        suppressPushNotificationsPermissionRequestDuringAuthentication: suppressPushNotificationsPermissionRequest,
    })
        .then(() => {
            console.log('Did configure GliaSDK!');
            alert('Did configure GliaSDK!');
        })
        .catch((error) => {
            console.log('Configuration error:' + error);
            alert('Configuration error:' + error);
        });
}

window.subscribeToPushNotificationTypes = () => {
    GliaSdk.subscribeToPushNotificationTypes({
        types: [
            PushNotificationType.START,
            PushNotificationType.END,
        ],
    })
        .then(() => {
            console.log('Did subscribe to Push Notification types!');
            alert('Did subscribe to Push Notification types!');
        })
        .catch((error) => {
            console.log('subscribeToPushNotificationTypes error:' + error);
            alert('subscribeToPushNotificationTypes error:' + error);
        });
}

window.unsubscribeFromPushNotifications = () => {
    GliaSdk.subscribeToPushNotificationTypes({
        types: [],
    })
        .then(() => {
            console.log('Did unsubscribe to Push Notification types!');
            alert('Did unsubscribe to Push Notification types!');
        })
        .catch((error) => {
            console.log('unsubscribeFromPushNotifications error:' + error);
            alert('unsubscribeFromPushNotifications error:' + error);
        });
}

window.presentEntryWidget = () => {
    GliaSdk.presentEntryWidget();
}

window.showEntryWidget = () => {
    const queueIdInputValue = document.getElementById("queueIdInput").value;
    GliaSdk.showEntryWidget({
        queueIds: [queueIdInputValue],
    });
}

window.hideEntryWidget = () => {
    GliaSdk.hideEntryWidget();
}

window.startChat = () => {
    GliaSdk.startChat();
}

window.startChatWithIds = () => {
    const queueIdInputValue = document.getElementById("queueIdInput").value;
    GliaSdk.startChat({
        queueIds: [queueIdInputValue],
    });
}

window.startAudio = () => {
    GliaSdk.startAudio();
}

window.startAudioWithIds = () => {
    const queueIdInputValue = document.getElementById("queueIdInput").value;
    GliaSdk.startAudio({
        queueIds: [queueIdInputValue],
    });
}

window.startVideo = () => {
    GliaSdk.startVideo();
}

window.startVideoWithIds = () => {
    const queueIdInputValue = document.getElementById("queueIdInput").value;
    GliaSdk.startVideo({
        queueIds: [queueIdInputValue],
    });
}

window.startSecureMessaging = () => {
    const queueIdInputValue = document.getElementById("queueIdInput").value;
    GliaSdk.startSecureMessaging({
        queueIds: [queueIdInputValue],
    })
}

window.endEngagement = () => {
    GliaSdk.endEngagement();
}

window.clearVisitorSession = () => {
    GliaSdk.clearVisitorSession();
}

window.listQueues = () => {
    GliaSdk.listQueues()
        .then((queues) => {
            const formattedResposne = 'List queues:' + JSON.stringify(queues, null, 2); 
            console.log(formattedResposne);
            alert(formattedResposne);
        })
        .catch((error) => {
            console.error('Error list queues: ' + error);
            alert('Error list queues: ' + error);
        });
}

window.getQueues = () => {
    GliaSdk.getQueues()
        .then((queues) => {
            const formattedResponse = 'List queues:' + JSON.stringify(queues, null, 2); 
            console.log(formattedResponse);
            alert(formattedResponse);
        })
        .catch((error) => {
            console.error('Error list queues: ' + error);
            alert('Error list queues: ' + error);
        });
}

window.getVisitorInfo = () => {
    GliaSdk.getVisitorInfo()
        .then((visitorInfo) => {
            const formattedResponse = 'Visitor info:' + JSON.stringify(visitorInfo, null, 2);
            console.log(formattedResponse);
            alert(formattedResponse);
        })
        .catch((error) => {
            console.error('Error get visitor info: ' + error);
            alert('Error get visitor info: ' + error)
        });
}

window.updateVisitorInfo = () => {
    GliaSdk.updateVisitorInfo({
        name: 'John Doe',
        email: 'johnd@mail.com',
        phone: '+1234567890',
        note: 'This is a note',
        noteUpdateMethod: 'append',
        externalId: 'externalIonicId',
        customAttributes: {
            customKey: 'customValue',
        },
        customAttributesUpdateMethod: 'merge',
    })
        .then(() => {
            console.log('Visitor info updated');
            alert('Visitor info updated');
        })
        .catch((error) => {
            console.error('Error updating visitor info: ' + error);
            alert('Error updating visitor info: ' + error);
        });
}

window.authenticate = () => {
    const idTokenInputValue = document.getElementById("idTokenInput").value;
    const accessTokenInpuValue = document.getElementById("accessTokenInput").value;
    GliaSdk.authenticate({ 
        behavior: 'forbiddenDuringEngagement', 
        idToken: idTokenInputValue, 
        accessToken: accessTokenInpuValue 
    })
        .then(() => {
            console.log('Did authenticate!');
            alert('Did authenticate!');
        })
        .catch((error) => {
            console.error('Error while authenticate call ' + error);
            alert('Error while authenticate call' + error);
        });
}

window.deauthenticate = (stopPushNotifications) => {
    GliaSdk.deauthenticate({
        stopPushNotifications: stopPushNotifications
    })
        .then(() => {
            console.log('Did deauthenticate!');
            alert('Did deauthenticate!');
        })
        .catch((error) => {
            console.error('Error while deauthenticate' + error);
            alert('Error while deauthenticate' + error);
        });
}

window.isAuthenticated = () => {
    GliaSdk.isAuthenticated()
        .then((result) => {
            const formattedResponse = 'Is authenticated:' + JSON.stringify(result, null, 2);
            console.log(formattedResponse);
            alert(formattedResponse);
        })
        .catch((error) => {
            console.error('Error checking authentication status: ' + error);
            alert('Error checking authentication status: ' + error);
        });
}

window.refreshAuthentication = () => {
    const idTokenInputValue = document.getElementById("idTokenInput").value;
    const accessTokenInpuValue = document.getElementById("accessTokenInput").value;
    GliaSdk.refreshAuthentication({ idToken: idTokenInputValue, accessToken: accessTokenInpuValue })
        .then(() => {
            console.log('Did refreshAuthentication!');
            alert('Did refreshAuthentication!');
        })
        .catch((error) => {
            console.error('Error while refreshAuthentication call' + error);
            alert('Error while refreshAuthentication call' + error);
        });
}

window.showVisitorCodeViewController = () => {
    GliaSdk.showVisitorCodeViewController()
}

window.startSecureConversation = () => {
    GliaSdk.startSecureConversation()
}

window.resumeLiveObservation = () => {
    GliaSdk.resumeLiveObservation();
}

window.pauseLiveObservation = () => {
    GliaSdk.pauseLiveObservation();
}




