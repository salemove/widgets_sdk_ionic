package com.glia.widgets.ionic;

import com.glia.widgets.authentication.Authentication;

public enum AuthenticationBehavior {

    allowedDuringEngagement,
    forbiddenDuringEngagement;

    public Authentication.Behavior toSdkNativeType() {
        return switch (this) {
            case allowedDuringEngagement -> Authentication.Behavior.ALLOWED_DURING_ENGAGEMENT;
            case forbiddenDuringEngagement -> Authentication.Behavior.FORBIDDEN_DURING_ENGAGEMENT;
        };
    }

}
