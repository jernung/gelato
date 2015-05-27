package com.jernung.gelato.plugin.google.analytics;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;

import com.google.android.gms.analytics.GoogleAnalytics;
import com.google.android.gms.analytics.HitBuilders;
import com.google.android.gms.analytics.Tracker;

public class GoogleAnalyticsPlugin extends CordovaPlugin {

	private String trackerId;
	private Tracker tracker;

	public void initialize(CordovaInterface cordova, CordovaWebView webView) {
		super.initialize(cordova, webView);
	}

	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
		if (action.equals("setTrackerId")) {
			String trackerId = args.getString(0);
			if (trackerId != null) {
				if (this.trackerId != trackerId) {
					this.trackerId = trackerId;
					tracker = getTracker(trackerId);
					callbackContext.success();
				} else {
					callbackContext.error("Tracker has already been started.");
				}
			} else {
				callbackContext.error("No tracker id specified.");
			}
			return true;
		}
		if (action.equals("trackView")) {
			String name = args.getString(0);
			if (tracker != null) {
				if (name != null) {
					trackView(name);
					callbackContext.success();
				} else {
					callbackContext.error("No view name specified.");
				}
			} else {
				callbackContext.error("No tracker currently active.");
			}
			return true;
		}
		return false;
	}

	private synchronized Tracker getTracker(String trackerId) {
		GoogleAnalytics analytics = GoogleAnalytics.getInstance(cordova.getActivity());
		Tracker tracker = analytics.newTracker(trackerId);
		return tracker;
	}

	private void trackView(String name) {
		tracker.setScreenName(name);
		tracker.send(new HitBuilders.ScreenViewBuilder().build());
	}

}