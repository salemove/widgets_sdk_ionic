package com.example.plugin;

import androidx.annotation.NonNull;

import com.capacitorjs.plugins.pushnotifications.PushNotificationsPlugin;
import com.glia.widgets.GliaWidgets;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

public class IonicFcmService extends FirebaseMessagingService {

    @Override
    public void onNewToken(@NonNull String token) {
        GliaWidgets.getPushNotifications().updateFcmToken(token);
        PushNotificationsPlugin.onNewToken(token);
    }

    @Override
    public void onMessageReceived(@NonNull RemoteMessage message) {
        GliaWidgets.getPushNotifications().onNewMessage(this, message);
        PushNotificationsPlugin.sendRemoteMessage(message);
    }
}
