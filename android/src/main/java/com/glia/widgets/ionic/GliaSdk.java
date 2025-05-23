package com.glia.widgets.ionic;

import android.app.Activity;
import android.util.Log;
import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.PluginCall;
import com.glia.androidsdk.Glia;
import com.glia.widgets.GliaWidgets;
import com.glia.widgets.GliaWidgetsConfig;
import com.glia.widgets.SiteApiKey;
import com.glia.widgets.authentication.Authentication;
import com.glia.widgets.engagement.MediaType;
import com.glia.widgets.entrywidget.EntryWidget;
import com.glia.widgets.launcher.EngagementLauncher;
import com.glia.widgets.queue.Queue;
import com.glia.widgets.visitor.VisitorInfoUpdateRequest;

import org.json.JSONArray;
import org.json.JSONException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class GliaSdk {
    private List<String> configureQueueIds;

    private EntryWidget entryWidget;

    private Authentication authentication;

    private String visitorContextAssetId;

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
        String uiUnifiedConfig = call.getString("uiUnifiedConfig");
        String overrideLocale = call.getString("overrideLocale");
        visitorContextAssetId = call.getString("visitorContextAssetId");
        Boolean enableBubbleOutsideApp = call.getBoolean("enableBubbleOutsideApp", true);
        Boolean enableBubbleInsideApp = call.getBoolean("enableBubbleInsideApp", true);

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
                .setUiJsonRemoteConfig(uiUnifiedConfig)
                .setManualLocaleOverride(overrideLocale)
                .enableBubbleOutsideApp(enableBubbleOutsideApp)
                .enableBubbleInsideApp(enableBubbleInsideApp)
                .setContext(activity.getApplicationContext());

        GliaWidgets.init(
                gliaConfigBuilder.build(),
                () -> {
                    configureQueueIds = jsArrayToArrayList(queueIds);

                    call.resolve();
                },
                exception -> {
                    call.reject(exception.getMessage());
                }
        );
    }

    @Deprecated
    public void presentEntryWidget(PluginCall call, Activity activity) {
        if (configureQueueIds == null) {
            call.reject("SDK is not configured.");
            return;
        }
        entryWidget = GliaWidgets.getEntryWidget(configureQueueIds);
        entryWidget.show(activity);
        call.resolve();
    }

    public void showEntryWidget(PluginCall call, Activity activity) {
        JSArray queueIds = call.getArray("queueIds", new JSArray());
        entryWidget = GliaWidgets.getEntryWidget(jsArrayToArrayList(queueIds));
        entryWidget.show(activity);
        call.resolve();
    }

    public void hideEntryWidget(PluginCall call) {
        entryWidget.hide();
        call.resolve();
    }

    public void startChat(PluginCall call, Activity activity) {
        List<String> queueIds = this.configureQueueIds;
        boolean useOptions = call.getBoolean("useOptions", false);
        if (useOptions) {
            queueIds = jsArrayToArrayList(call.getArray("queueIds", new JSArray()));
        }
        try {
            EngagementLauncher engagementLauncher = GliaWidgets.getEngagementLauncher(queueIds);
            String visitorContextAssetId = this.visitorContextAssetId;
            if (visitorContextAssetId != null && !visitorContextAssetId.isEmpty()) {
                engagementLauncher.startChat(activity, visitorContextAssetId);
            } else {
                engagementLauncher.startChat(activity);
            }
            call.resolve();
        } catch (Exception e) {
            call.reject("Could not start chat engagement. Error='" + e.getMessage() + "'");
        }
    }

    public void startAudio(PluginCall call, Activity activity) {
        List<String> queueIds = this.configureQueueIds;
        boolean useOptions = call.getBoolean("useOptions", false);
        if (useOptions) {
            queueIds = jsArrayToArrayList(call.getArray("queueIds", new JSArray()));
        }
        try {
            EngagementLauncher engagementLauncher = GliaWidgets.getEngagementLauncher(queueIds);
            String visitorContextAssetId = this.visitorContextAssetId;
            if (visitorContextAssetId != null && !visitorContextAssetId.isEmpty()) {
                engagementLauncher.startAudioCall(activity, visitorContextAssetId);
            } else {
                engagementLauncher.startAudioCall(activity);
            }
            call.resolve();
        } catch (Exception e) {
            call.reject("Could not start audio engagement. Error='" + e.getMessage() + "'");
        }
    }

    public void startVideo(PluginCall call, Activity activity) {
        List<String> queueIds = this.configureQueueIds;
        boolean useOptions = call.getBoolean("useOptions", false);
        if (useOptions) {
            queueIds = jsArrayToArrayList(call.getArray("queueIds", new JSArray()));
        }
        try {
            EngagementLauncher engagementLauncher = GliaWidgets.getEngagementLauncher(queueIds);
            String visitorContextAssetId = this.visitorContextAssetId;
            if (visitorContextAssetId != null && !visitorContextAssetId.isEmpty()) {
                engagementLauncher.startVideoCall(activity, visitorContextAssetId);
            } else {
                engagementLauncher.startVideoCall(activity);
            }
            call.resolve();
        } catch (Exception e) {
            call.reject("Could not start video engagement. Error='" + e.getMessage() + "'");
        }
    }

    public void startSecureConversation(PluginCall call, Activity activity) {
        List<String> queueIds = this.configureQueueIds;
        try {
            EngagementLauncher engagementLauncher = GliaWidgets.getEngagementLauncher(queueIds);
            String visitorContextAssetId = this.visitorContextAssetId;
            if (visitorContextAssetId != null && !visitorContextAssetId.isEmpty()) {
                engagementLauncher.startSecureMessaging(activity, visitorContextAssetId);
            } else {
                engagementLauncher.startSecureMessaging(activity);
            }
            call.resolve();
        } catch (Exception e) {
            call.reject("Could not start secure conversation. Error='" + e.getMessage() + "'");
        }
    }

    public void startSecureMessaging(PluginCall call, Activity activity) {
        try {
            List<String> queueIds = jsArrayToArrayList(call.getArray("queueIds", new JSArray()));
            EngagementLauncher engagementLauncher = GliaWidgets.getEngagementLauncher(queueIds);
            String visitorContextAssetId = this.visitorContextAssetId;
            if (visitorContextAssetId != null && !visitorContextAssetId.isEmpty()) {
                engagementLauncher.startSecureMessaging(activity, visitorContextAssetId);
            } else {
                engagementLauncher.startSecureMessaging(activity);
            }
            call.resolve();
        } catch (Exception e) {
            call.reject("Could not start secure messaging. Error='" + e.getMessage() + "'");
        }
    }

    public void clearVisitorSession(PluginCall call) {
        GliaWidgets.clearVisitorSession();
        call.resolve();
    }

    @Deprecated
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

    public void getQueues(PluginCall call) {
        GliaWidgets.getQueues( response -> {
            if (response == null) {
                call.resolve();
            } else {
                JSObject jsObject = new JSObject();
                for (Queue queue : response) {
                    JSObject child = new JSObject();
                    child.put("name", queue.getName());
                    child.put("is_default", queue.isDefault());
                    child.put("status", serializedName(queue.getStatus()));

                    JSONArray mediaTypes = new JSONArray();
                    for (MediaType mediaType : queue.getMedia()) {
                        mediaTypes.put(serializedName(mediaType));
                    }
                    child.put("media", mediaTypes);

                    jsObject.put(queue.getId(), child);
                }

                call.resolve(jsObject);
            }
        }, exception -> {
            call.reject(exception.getMessage());
        });
    }

    public void showVisitorCode(PluginCall call) {
        GliaWidgets.getCallVisualizer().showVisitorCodeDialog();
        call.resolve();
    }

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
        authentication.authenticate(
                jwtToken,
                accessToken,
                call::resolve,
                exception -> call.reject(exception.getMessage())
        );
    }

    public void deauthenticate(PluginCall call) {
        if (authentication == null) {
            call.resolve();
            return;
        }
        authentication.deauthenticate(
                call::resolve,
                exception -> call.reject(exception.getMessage())
        );
    }

    public void isAuthenticated(PluginCall call) {
        call.resolve(new JSObject().put("isAuthenticated", authentication != null && authentication.isAuthenticated()));
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
        authentication.refresh(
                jwtToken,
                accessToken,
                call::resolve,
                exception -> call.reject(exception.getMessage())
        );
    }

    public void pauseLiveObservation(PluginCall call) {
        GliaWidgets.getLiveObservation().pause();
        call.resolve();
    }

    public void resumeLiveObservation(PluginCall call) {
        GliaWidgets.getLiveObservation().resume();
        call.resolve();
    }

    public void getVisitorInfo(PluginCall call) {
        try {
            GliaWidgets.getVisitorInfo(visitorInfo -> {
                JSObject result = new JSObject();
                result.put("name", visitorInfo.getName());
                result.put("email", visitorInfo.getEmail());
                result.put("phone", visitorInfo.getPhone());
                result.put("note", visitorInfo.getNote());
                result.put("externalId", visitorInfo.getExternalId());

                JSObject customAttributes = new JSObject();
                if (visitorInfo.getCustomAttributes() != null) {
                    for (String key : visitorInfo.getCustomAttributes().keySet()) {
                        customAttributes.put(key, visitorInfo.getCustomAttributes().get(key));
                    }
                }
                result.put("customAttributes", customAttributes);
                result.put("banned", visitorInfo.getBanned());

                call.resolve(result);
            }, exception -> {
                String message = exception.getMessage() != null ? exception.getMessage() : "Could not fetch visitor info.";
                call.reject(message);
            });
        } catch (Exception exception) {
            String message = exception.getMessage() != null ? exception.getMessage() : "Could not fetch visitor info.";
            call.reject(message);
        }
    }

    public void updateVisitorInfo(PluginCall call) {
        try {
            String name = call.getString("name");
            String email = call.getString("email");
            String phone = call.getString("phone");
            String note = call.getString("note");
            String noteUpdateMethod = call.getString("noteUpdateMethod");
            String externalId = call.getString("externalId");
            String customAttrsUpdateMethod = call.getString("customAttributesUpdateMethod");

            JSObject customAttributesObj = call.getObject("customAttributes");
            java.util.Map<String, String> customAttributes = new java.util.HashMap<>();
            if (customAttributesObj != null) {
                Iterator<String> keys = customAttributesObj.keys();
                while (keys.hasNext()) {
                    String key = keys.next();
                    Object value = customAttributesObj.get(key);
                    if (value instanceof String) {
                        customAttributes.put(key, (String) value);
                    }
                }
            }

            VisitorInfoUpdateRequest updateRequest = new VisitorInfoUpdateRequest();
            updateRequest.setName(name);
            updateRequest.setEmail(email);
            updateRequest.setPhone(phone);
            updateRequest.setNote(note);
            if (noteUpdateMethod != null) {
                updateRequest.setNoteUpdateMethod(toNoteUpdateMethod(noteUpdateMethod));
            }
            updateRequest.setExternalId(externalId);
            updateRequest.setCustomAttributes(customAttributes);
            if (customAttrsUpdateMethod != null) {
                updateRequest.setCustomAttrsUpdateMethod(toCustomAttributesUpdateMethod(customAttrsUpdateMethod));
            }

            GliaWidgets.updateVisitorInfo(
                    updateRequest,
                    call::resolve,
                    exception -> {
                        call.reject(exception.getMessage());
                    }
            );
        } catch (Exception exception) {
            call.reject("Could not update visitor info. Error='" + exception.getMessage() + "'");
        }
    }

    public void endEngagement(PluginCall call) {
        GliaWidgets.endEngagement();
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

    private String serializedName(Queue.Status status) {
        return switch (status) {
            case OPEN -> "opened";
            case CLOSED -> "closed";
            case FULL -> "full";
            case UNSTAFFED -> "unstaffed";
            default -> "unknown";
        };
    }

    private String serializedName(MediaType mediaType) {
        return switch (mediaType) {
            case TEXT -> "text";
            case AUDIO -> "audio";
            case VIDEO -> "video";
            case PHONE -> "phone";
            case MESSAGING -> "messaging";
            default -> "unknown";
        };
    }

    private VisitorInfoUpdateRequest.NoteUpdateMethod toNoteUpdateMethod(String value) {
        return switch (value.toLowerCase()) {
            case "replace" -> VisitorInfoUpdateRequest.NoteUpdateMethod.REPLACE;
            default -> VisitorInfoUpdateRequest.NoteUpdateMethod.APPEND;
        };
    }

    private VisitorInfoUpdateRequest.CustomAttributesUpdateMethod toCustomAttributesUpdateMethod(String value) {
        return switch (value.toLowerCase()) {
            case "replace" -> VisitorInfoUpdateRequest.CustomAttributesUpdateMethod.REPLACE;
            default -> VisitorInfoUpdateRequest.CustomAttributesUpdateMethod.MERGE;
        };
    }
}