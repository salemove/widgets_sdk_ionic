package com.glia.widgets.ionic;
import com.glia.androidsdk.Engagement;

public enum EngagementKind {
    CHAT, AUDIO, VIDEO;

    public Engagement.MediaType toAndroidSdkMediaType() {
        switch (this) {
            case CHAT:
                return Engagement.MediaType.TEXT;
            case AUDIO:
                return Engagement.MediaType.AUDIO;
            case VIDEO:
                return Engagement.MediaType.VIDEO;
        }
        return Engagement.MediaType.TEXT;
    }
}
