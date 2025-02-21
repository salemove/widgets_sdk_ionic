package com.glia.widgets.ionic;

import static androidx.fragment.app.FragmentManager.TAG;

import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Parcelable;
import android.util.Log;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.glia.androidsdk.Engagement;
import com.glia.androidsdk.Glia;
import com.glia.androidsdk.SiteApiKey;
import com.glia.androidsdk.visitor.Authentication;
import com.glia.widgets.GliaWidgets;
import com.glia.widgets.GliaWidgetsConfig;
import com.glia.widgets.entrywidget.EntryWidget;
import com.glia.widgets.launcher.EngagementLauncher;

import org.json.JSONException;
import org.json.JSONObject;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

public class GliaSdk {

    public String echo(String value) {
        Log.i("Echo", value);
        return value;
    }

    public void configure(PluginCall call, Activity activity) {

        JSObject apiKey = call.getObject("apiKey");
        String siteApiKeyId = apiKey.getString("id");
        String siteApiKeySecret = apiKey.getString("secret");
        String siteId = call.getString("siteId");
        String region = call.getString("region");
        String companyName = call.getString("companyName");
        JSArray queueIds = call.getArray("queueIds", new JSArray());

        if (siteApiKeyId == null) {
            call.reject("'siteApiKeyId' is missing.");
            return;
        }

        if (siteApiKeySecret == null) {
            call.reject("'siteApiKeySecret' is missing.");
            return;
        }

        if (siteId == null) {
            call.reject("'siteId' is missing.");
            return;
        }

        if (region == null) {
            call.reject("'region' is missing.");
            return;
        }

        GliaWidgetsConfig.Builder gliaConfigBuilder = new GliaWidgetsConfig.Builder()
                .setSiteApiKey(new SiteApiKey(siteApiKeyId, siteApiKeySecret))
                .setSiteId(siteId)
                .setRegion(region)
                .setCompanyName(companyName == null ? "" : companyName)
                .setContext(activity.getApplicationContext());

        GliaWidgets.init(gliaConfigBuilder.build());

        engagementLauncher = GliaWidgets.getEngagementLauncher(jsArrayToArrayList(queueIds));
        entryWidget = GliaWidgets.getEntryWidget(jsArrayToArrayList(queueIds));

        call.resolve();
    }

    public void presentEntryWidget(PluginCall call, Activity activity) {
        if (entryWidget == null) {
            call.reject("SDK is not configured.");
            return;
        }
        entryWidget.show(activity);
    }

    private SharedPreferences sharedPreferences;
    private EngagementLauncher engagementLauncher;
    private EntryWidget entryWidget;

    public void startChat(PluginCall call, Activity activity) {
        if (engagementLauncher == null) {
            call.reject("SDK is not configured.");
            return;
        }
        engagementLauncher.startChat(activity);
        call.resolve();
    }
    public void startAudio(PluginCall call, Activity activity) {
        if (engagementLauncher == null) {
            call.reject("SDK is not configured.");
            return;
        }
        engagementLauncher.startAudioCall(activity);
        call.resolve();
    }
    public void startVideo(PluginCall call, Activity activity) {
        if (engagementLauncher == null) {
            call.reject("SDK is not configured.");
            return;
        }
        engagementLauncher.startVideoCall(activity);
        call.resolve();
    }
    public void startSecureConversation(PluginCall call, Activity activity) {
        if (engagementLauncher == null) {
            call.reject("SDK is not configured.");
            return;
        }
        engagementLauncher.startSecureMessaging(activity);
        call.resolve();
    }
    public void clearVisitorSession(PluginCall call) {
        GliaWidgets.clearVisitorSession();
        call.resolve();
    }
    public void listQueues(PluginCall call) {
        Glia.getQueues((response, exception) -> {
            if (exception != null) {
                String message = exception != null ? exception.getMessage() : "listQueues failed";
                call.reject(message);
                return;
            } else {
                if (response == null) {
                    call.resolve();
                } else {
                    JSObject jsObject = new JSObject();
                    for (int i = 0; i < response.length; i++) {
                        JSObject child = new JSObject();
                        child.put("name", response[i].getName());
                        child.put("is_default", response[i].isDefault());
                        child.put("status", response[i].getState().getStatus());
                        child.put("media", response[i].getState().getMedias());

                        jsObject.put(response[i].getId(), child);
                    }

                    call.resolve(jsObject);
                }
            }
        });
    }
    public void showVisitorCodeViewController(PluginCall call, Activity activity) {
        GliaWidgets.getCallVisualizer().showVisitorCodeDialog();
        call.resolve();
    }

    Authentication authentication;
    public void authenticate(PluginCall call) {
        String authRawBehaviorValue = call.getString("behavior");
        String jwtToken = call.getString("idToken");

        if (jwtToken == null) {
            call.reject("'idToken' is missing");
            return;
        }
        if (authRawBehaviorValue == null) {
            call.reject("Authentication behavior is missing.");
            return;
        }

        String accessToken = call.getString("accessToken", null);
        if (accessToken != null && accessToken.isEmpty()) {
            accessToken = null;
        }
        AuthenticationBehavior authBehavior = AuthenticationBehavior.valueOf(authRawBehaviorValue);

        authentication = GliaWidgets.getAuthentication(authBehavior.toSdkNativeType());
        authentication.authenticate(jwtToken, accessToken, (response, exception) -> {
            if (exception == null && authentication.isAuthenticated()) {
                call.resolve();
            } else {
                String message = exception != null ? exception.getMessage() : "authentication failed";
                call.reject(message);
            }
        });
    }
    public void deauthenticate(PluginCall call) {
        if (authentication == null) {
            call.resolve();
            return;
        }
        authentication.deauthenticate((response, exception) -> {
            if (exception != null) {
                String message = exception != null ? exception.getMessage() : "unauthentication failed";
                call.reject(message);
            } else {
                call.resolve();
            }
        });
    }
    public void isAuthenticated(PluginCall call) {
        if (authentication != null && authentication.isAuthenticated()) {
            call.resolve();
        } else {
            call.reject("not authenticated.");
        }
    }
    public void refreshAuthentication(PluginCall call) {
        String jwtToken = call.getString("idToken");
        String accessToken = call.getString("accessToken");
        if (jwtToken == null) {
            call.reject("'idToken' is missing");
            return;
        }
        if (accessToken != null && accessToken.isEmpty()) {
            accessToken = null;
        }
        authentication.refresh(jwtToken, accessToken, (response, exception) -> {
            if (exception != null) {
                String message = exception.getMessage();
                call.reject(message);
            } else {
                call.resolve();
            }
        });
    }

    public void pauseLiveObservation(PluginCall call) {
        Glia.getLiveObservation().pause();
        call.resolve();
    }
    public void resumeLiveObservation(PluginCall call) {
        Glia.getLiveObservation().resume();
        call.resolve();
    }

    public ArrayList<String> jsArrayToArrayList(JSArray jsArray) {
        if (jsArray == null) {
            return new ArrayList<>();
        }
        ArrayList<String> arrayList = new ArrayList<>();

        try {
            for (int i = 0; i < jsArray.length(); i++) {
                arrayList.add(jsArray.getString(i));  // Assumes each element is a String
            }
        } catch (JSONException e) {
            e.printStackTrace();
            // Handle the exception based on your needs, e.g., log the error or notify the user
        }

        return arrayList;
    }
}