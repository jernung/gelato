package com.jernung.gelato.plugin.google.billing;

import java.util.ArrayList;
import java.util.List;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.jernung.gelato.plugin.google.billing.util.IabHelper;
import com.jernung.gelato.plugin.google.billing.util.IabResult;
import com.jernung.gelato.plugin.google.billing.util.Inventory;
import com.jernung.gelato.plugin.google.billing.util.Purchase;
import com.jernung.gelato.plugin.google.billing.util.SkuDetails;
import com.jernung.gelato.test.R;

public class GelatoPluginGoogleBilling extends CordovaPlugin {
	
	private IabHelper billing;
	private CallbackContext callback;
	private Inventory inventory;
	
	public void initialize(CordovaInterface cordova, CordovaWebView webView) {
		super.initialize(cordova, webView);
	}
	
	public boolean execute(String action, JSONArray data, CallbackContext callbackContext) throws JSONException {
		this.callback = callbackContext;
		if (action.equals("initialize")) {
			List<String> productIds = new ArrayList<String>();
			if (data.length() > 0) {
				JSONArray jsonProductIds = new JSONArray(data.getString(0));
				for (int i = 0, length = jsonProductIds.length(); i < length; i++) {
					productIds.add(jsonProductIds.get(i).toString());
				}
			}
			handleInitialize(productIds);
			return true;
		}
		if (action.equals("getProducts")) {
			handleGetProducts();
			return true;
		}
		if (action.equals("getPurchases")) {
			handleGetPurchases();
			return true;
		}
		return false;
	}
	
	IabHelper.QueryInventoryFinishedListener onInitializedInventory = new IabHelper.QueryInventoryFinishedListener() {
		@Override
		public void onQueryInventoryFinished(IabResult result, Inventory inventory) {
			if (GelatoPluginGoogleBilling.this.updateInventory(result, inventory)) {
				GelatoPluginGoogleBilling.this.callback.success();
			} else {
				GelatoPluginGoogleBilling.this.callback.error(result.getMessage());
			}
		}
	};
	
	/**
	 * @method getPublicKey
	 * @return {String}
	 */
	private String getPublicKey() {
		return cordova.getActivity().getResources().getString(R.string.google_public_key);
    }
	
	/**
	 * @method handleInitialize
	 * @param {List<String>} productIds
	 */
	private void handleInitialize(final List<String> productIds) {
		this.billing = new IabHelper(cordova.getActivity(), getPublicKey());
		this.billing.startSetup(new IabHelper.OnIabSetupFinishedListener() {
			@Override
			public void onIabSetupFinished(IabResult result) {
				if (result.isSuccess()) {
					if (productIds.size() > 0) {
						GelatoPluginGoogleBilling.this.billing.queryInventoryAsync(true, productIds, onInitializedInventory);
					} else {
						GelatoPluginGoogleBilling.this.billing.queryInventoryAsync(onInitializedInventory);
					}
				} else {
					GelatoPluginGoogleBilling.this.callback.error(result.getMessage());
				}
			}
		});
	}
	
	/**
	 * @method handleGetProducts
	 * @throws JSONException
	 */
	private void handleGetProducts() throws JSONException {
		if (this.inventory != null) {
			List<SkuDetails> productList = this.inventory.getAllProducts();
			JSONArray jsonProducts = new JSONArray();
			for (SkuDetails product : productList) {
				jsonProducts.put(product.toJson());
	        }
			this.callback.success(jsonProducts);
		} else {
			this.callback.error("Billing plugin is not initialized.");
		}
	}
	
	/**
	 * @method handleGetPurchases
	 * @throws JSONException
	 */
	private void handleGetPurchases() throws JSONException {
		if (this.inventory != null) {
			List<Purchase> purchases = this.inventory.getAllPurchases();
			JSONArray jsonPurchases = new JSONArray();
	        for (Purchase purchase : purchases) {
	        	jsonPurchases.put(new JSONObject(purchase.getOriginalJson()));
	        }
	        this.callback.success(jsonPurchases);
		} else {
			this.callback.error("Billing plugin is not initialized.");
		}
	}
	
	/**
	 * @method updateInventory
	 * @param {IabResult} result
	 * @param {Inventory} inventory
	 * @return {boolean}
	 */
	private boolean updateInventory(IabResult result, Inventory inventory) {
		if (result.isSuccess()) {
			 this.inventory = inventory;
			 return true;
		}
		return false;
	}

}
