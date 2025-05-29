import { GliaSdk } from 'glia-widgets-ionic';
import { environment } from '../environments/environment';
import uiThemeConfig from '../config/unified_config.json';

window.configure = () => {
    GliaSdk.configure({ 
        siteId: environment.IONIC_SITE_ID, 
        apiKey: { id: environment.IONIC_API_KEY, secret: environment.IONIC_API_SECRET }, 
        region: environment.IONIC_REGION,
        queueIds: [environment.IONIC_QUEUE_ID], 
        companyName: environment.IONIC_COMPANY_NAME,
        uiUnifiedConfig: uiThemeConfig,
    });
}

window.presentEntryWidget = () => {
    GliaSdk.presentEntryWidget();
}

window.showEntryWidget = () => {
    GliaSdk.showEntryWidget({
      queueIds: [environment.IONIC_QUEUE_ID],
    });
}

window.hideEntryWidget = () => {
    GliaSdk.hideEntryWidget();
}

window.startChat = () => {
    GliaSdk.startChat();
}

window.startChatWithIds = () => {
    GliaSdk.startChat({
      queueIds: [environment.IONIC_QUEUE_ID],
    });
}

window.startAudio = () => {
    GliaSdk.startAudio();
}

window.startAudioWithIds = () => {
    GliaSdk.startAudio({
      queueIds: [environment.IONIC_QUEUE_ID],
    });
}

window.startVideo = () => {
    GliaSdk.startVideo();
}

window.startVideoWithIds = () => {
    GliaSdk.startVideo({
      queueIds: [environment.IONIC_QUEUE_ID],
    });
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
        console.log('List queues:', JSON.stringify(queues, null, 2));
    })
    .catch((error) => {
        console.error('Error list queues: ' + error);
    });
}

window.getQueues = () => {
    GliaSdk.getQueues()
    .then((queues) => {
        console.log('Get queues:', JSON.stringify(queues, null, 2));
    })
    .catch((error) => {
        console.error('Error get queues: ' + error);
    });
}

window.getVisitorInfo = () => {
    GliaSdk.getVisitorInfo()
    .then((visitorInfo) => {
        console.log('Visitor info:', JSON.stringify(visitorInfo, null, 2));
    })
    .catch((error) => {
        console.error('Error get visitor info: ' + error);
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
    })
    .catch((error) => {
        console.error('Error updating visitor info: ' + error);
    });
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
    .then((result) => {
        console.log('Is authenticated:', JSON.stringify(result, null, 2));
    })
    .catch((error) => {
        console.error('Error checking authentication status: ' + error);
    });
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

window.startSecureMessaging = () => {
    GliaSdk.startSecureMessaging({
      queueIds: [environment.IONIC_QUEUE_ID],
    })
}
