"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppEventType = void 0;
var AppEventType;
(function (AppEventType) {
    AppEventType["Init"] = "init_client";
    AppEventType["Sync"] = "global_state_sync";
    AppEventType["LiveData"] = "live_data";
    AppEventType["Notification"] = "notification";
    // output events
    AppEventType["LightChange"] = "light_change";
    AppEventType["VentChange"] = "vent_change";
})(AppEventType || (exports.AppEventType = AppEventType = {}));
