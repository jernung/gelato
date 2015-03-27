package com.jernung.gelato.plugin.core;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;

import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.PackageManager.NameNotFoundException;
import android.net.Uri;

public class GelatoPluginCore extends CordovaPlugin {

	public void initialize(CordovaInterface cordova, CordovaWebView webView) {
		super.initialize(cordova, webView);
	}

	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
		Context context = cordova.getActivity().getApplicationContext();
		if (action.equals("openGooglePlay")) {
			String packageName = args.getString(0);
			if (isPackageInstalled("com.android.vending", context)) {
				loadGooglePlay(packageName);
			}
			return true;
		}
		return false;
	}

	private boolean isPackageInstalled(String packagename, Context context) {
		PackageManager manager = context.getPackageManager();
		try {
			manager.getPackageInfo(packagename, PackageManager.GET_ACTIVITIES);
			return true;
		} catch (NameNotFoundException e) {
			return false;
		}
	}
	
	private void loadGooglePlay(String packageName) {
		Intent intent = new Intent(Intent.ACTION_VIEW);
		intent.setData(Uri.parse("market://details?id=" + packageName));
		cordova.getActivity().startActivity(intent);
	}

}