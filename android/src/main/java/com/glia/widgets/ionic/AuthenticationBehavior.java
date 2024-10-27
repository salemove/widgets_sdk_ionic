package com.glia.widgets.ionic;


import com.glia.androidsdk.visitor.Authentication;
public enum AuthenticationBehavior {

    allowedDuringEngagement,
    forbiddenDuringEngagement;

    public Authentication.Behavior toSdkNativeType() {
        switch (this) {
            case allowedDuringEngagement:
                return Authentication.Behavior.ALLOWED_DURING_ENGAGEMENT;
            case forbiddenDuringEngagement:
                return Authentication.Behavior.FORBIDDEN_DURING_ENGAGEMENT;
        }
        return Authentication.Behavior.FORBIDDEN_DURING_ENGAGEMENT;
    }

}
