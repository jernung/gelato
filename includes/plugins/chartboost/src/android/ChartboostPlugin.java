package com.jernung.gelato.plugin.chartboost;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;

import com.chartboost.sdk.Chartboost;

public class ChartboostPlugin extends CordovaPlugin {

	public void initialize(CordovaInterface cordova, CordovaWebView webView) {
		super.initialize(cordova, webView);
	}

	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
		if (action.equals("cacheInterstitial")) {
			final String location = args.getString(0);
			cordova.getActivity().runOnUiThread(new Runnable() {
				@Override
				public void run() {
					Chartboost.cacheInterstitial(location);
				}
			});
			return true;
		}
		if (action.equals("cacheRewardedVideo")) {
			final String location = args.getString(0);
			cordova.getActivity().runOnUiThread(new Runnable() {
				@Override
				public void run() {
					Chartboost.cacheRewardedVideo(location);
				}
			});
			return true;
		}
		if (action.equals("initialize")) {
			final String appId = args.getString(0);
			final String appSignature = args.getString(1);
			cordova.getActivity().runOnUiThread(new Runnable() {
				@Override
				public void run() {
					Chartboost.startWithAppId(cordova.getActivity(), appId, appSignature);
					Chartboost.onCreate(cordova.getActivity());
					Chartboost.onStart(cordova.getActivity());
				}
			});
			return true;
		}
		if (action.equals("showInterstitial")) {
			final String location = args.getString(0);
			cordova.getActivity().runOnUiThread(new Runnable() {
				@Override
				public void run() {
					Chartboost.showInterstitial(location);
				}
			});
			return true;
		}
		if (action.equals("showRewardedVideo")) {
			final String location = args.getString(0);
			cordova.getActivity().runOnUiThread(new Runnable() {
				@Override
				public void run() {
					Chartboost.showRewardedVideo(location);
				}
			});
			return true;
		}
		return false;
	}
	
	@Override
	public void onDestroy() {
		Chartboost.onDestroy(cordova.getActivity());
		super.onDestroy();
	}
	
	@Override
	public void onResume(boolean multitasking) {
		Chartboost.onResume(cordova.getActivity());
		super.onResume(multitasking);
	}
	
	@Override
	public void onPause(boolean multitasking) {
		Chartboost.onPause(cordova.getActivity());
		super.onPause(multitasking);
	}

}