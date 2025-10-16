package com.muslim.hajjrules.util;

import android.app.Activity;
import android.content.Context;
import android.content.res.Configuration;
import android.os.Build;
import android.provider.Settings;
import android.util.DisplayMetrics;
import android.view.WindowManager;

/**
 * Utility class for device-specific operations
 */
public class DeviceUtils {
    
    /**
     * Check if device is in landscape mode
     */
    public static boolean isLandscape(Context context) {
        return context.getResources().getConfiguration().orientation 
            == Configuration.ORIENTATION_LANDSCAPE;
    }
    
    /**
     * Check if device is in dark mode
     */
    public static boolean isDarkMode(Context context) {
        int uiMode = context.getResources().getConfiguration().uiMode;
        return (uiMode & Configuration.UI_MODE_NIGHT_MASK) == Configuration.UI_MODE_NIGHT_YES;
    }
    
    /**
     * Get screen width in pixels
     */
    public static int getScreenWidth(Context context) {
        WindowManager windowManager = (WindowManager) context.getSystemService(Context.WINDOW_SERVICE);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            return windowManager.getCurrentWindowMetrics().getBounds().width();
        } else {
            DisplayMetrics displayMetrics = new DisplayMetrics();
            windowManager.getDefaultDisplay().getMetrics(displayMetrics);
            return displayMetrics.widthPixels;
        }
    }

    /**
     * Get screen height in pixels
     */
    public static int getScreenHeight(Context context) {
        WindowManager windowManager = (WindowManager) context.getSystemService(Context.WINDOW_SERVICE);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            return windowManager.getCurrentWindowMetrics().getBounds().height();
        } else {
            DisplayMetrics displayMetrics = new DisplayMetrics();
            windowManager.getDefaultDisplay().getMetrics(displayMetrics);
            return displayMetrics.heightPixels;
        }
    }
    
    /**
     * Convert dp to pixels
     */
    public static int dpToPx(Context context, float dp) {
        float density = context.getResources().getDisplayMetrics().density;
        return Math.round(dp * density);
    }
    
    /**
     * Convert pixels to dp
     */
    public static float pxToDp(Context context, int px) {
        float density = context.getResources().getDisplayMetrics().density;
        return px / density;
    }
    
    /**
     * Get device name
     */
    public static String getDeviceName() {
        String manufacturer = Build.MANUFACTURER;
        String model = Build.MODEL;
        if (model.startsWith(manufacturer)) {
            return capitalize(model);
        }
        return capitalize(manufacturer) + " " + model;
    }
    
    /**
     * Get Android version name
     */
    public static String getAndroidVersion() {
        return Build.VERSION.RELEASE;
    }
    
    /**
     * Get Android SDK version
     */
    public static int getAndroidSDK() {
        return Build.VERSION.SDK_INT;
    }
    
    /**
     * Check if device has navigation bar
     */
    public static boolean hasNavigationBar(Context context) {
        int id = context.getResources().getIdentifier("config_showNavigationBar", "bool", "android");
        return id > 0 && context.getResources().getBoolean(id);
    }
    
    /**
     * Get navigation bar height
     */
    public static int getNavigationBarHeight(Context context) {
        if (!hasNavigationBar(context)) return 0;
        
        int resourceId = context.getResources().getIdentifier("navigation_bar_height", 
            "dimen", "android");
            
        return resourceId > 0 
            ? context.getResources().getDimensionPixelSize(resourceId) 
            : 0;
    }
    
    /**
     * Get status bar height
     */
    public static int getStatusBarHeight(Context context) {
        int resourceId = context.getResources().getIdentifier("status_bar_height", 
            "dimen", "android");
            
        return resourceId > 0 
            ? context.getResources().getDimensionPixelSize(resourceId) 
            : 0;
    }
    
    /**
     * Check if auto-rotate is enabled
     */
    public static boolean isAutoRotateEnabled(Context context) {
        return Settings.System.getInt(context.getContentResolver(),
            Settings.System.ACCELEROMETER_ROTATION, 0) == 1;
    }
    
    private static String capitalize(String str) {
        if (str == null || str.isEmpty()) {
            return str;
        }
        char[] arr = str.toCharArray();
        boolean capitalizeNext = true;
        
        for (int i = 0; i < arr.length; i++) {
            if (capitalizeNext && Character.isLetter(arr[i])) {
                arr[i] = Character.toUpperCase(arr[i]);
                capitalizeNext = false;
            } else if (Character.isWhitespace(arr[i])) {
                capitalizeNext = true;
            }
        }
        return String.valueOf(arr);
    }
}