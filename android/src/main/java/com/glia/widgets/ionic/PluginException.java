package com.glia.widgets.ionic;

final class PluginException extends RuntimeException {
    public final String code = "com.glia/widgets-error";

    public PluginException(String message) {
        super(message);
    }
}
