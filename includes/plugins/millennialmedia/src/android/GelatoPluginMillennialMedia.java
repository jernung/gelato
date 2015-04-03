package com.jernung.gelato.plugin.millennialmedia;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;

import com.millennialmedia.android.MMSDK;

import android.content.Context;
import android.util.DisplayMetrics;
import android.util.TypedValue;

public class GelatoPluginMillennialMedia extends CordovaPlugin {
	
	private Context context;
    private int placementHeight;
    private int placementWidth;
    
    private boolean isIntalized;
    
    private static final int IAB_LEADERBOARD_WIDTH = 728;
    private static final int IAB_LEADERBOARD_HEIGHT = 90;
    private static final int MED_BANNER_WIDTH = 480;
    private static final int MED_BANNER_HEIGHT = 60;
    private static final int BANNER_AD_WIDTH = 320;
    private static final int BANNER_AD_HEIGHT = 50;
    
	public void initialize(CordovaInterface cordova, CordovaWebView webView) {
		super.initialize(cordova, webView);
	}
	
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
		this.context = cordova.getActivity().getApplicationContext();
		if (!this.isIntalized == false) {
			this.initalizeSDK();
		}
		if (action.equals("showBanner")) {
			//String apid = args.getString(0);
			this.calculateBannerSize();
			return true;
		}
		return false;
	}
	
	/**
	 * @method calculateBannerSize
	 */
	private void calculateBannerSize() {
		DisplayMetrics metrics = this.context.getResources().getDisplayMetrics();
		int complexUnitDIP = TypedValue.COMPLEX_UNIT_DIP;
	    int leaderboardWidth = (int) TypedValue.applyDimension(complexUnitDIP, IAB_LEADERBOARD_WIDTH, metrics);
	    int mediumBannerWidth = (int) TypedValue.applyDimension(complexUnitDIP, MED_BANNER_WIDTH, metrics);
	    if (metrics.widthPixels >= leaderboardWidth) {
	    	this.placementWidth = IAB_LEADERBOARD_WIDTH;
		    this.placementHeight = IAB_LEADERBOARD_HEIGHT;
	    } else if (metrics.widthPixels >= mediumBannerWidth) {
	    	this.placementWidth = MED_BANNER_WIDTH;
			this.placementHeight = MED_BANNER_HEIGHT;
	    } else {
	    	this.placementWidth = BANNER_AD_WIDTH;
			this.placementHeight = BANNER_AD_HEIGHT;
	    }
	}
	
	/**
	 * @method initalizeSDK
	 */
	private void initalizeSDK() {
		MMSDK.initialize(this.context);
		this.isIntalized = true;
	}

}