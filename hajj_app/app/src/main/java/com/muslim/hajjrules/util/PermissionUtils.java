package com.muslim.hajjrules.util;

import android.app.Activity;
import android.content.Context;
import android.content.pm.PackageManager;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.Fragment;

import java.util.ArrayList;
import java.util.List;

/**
 * Utility class for handling runtime permissions
 */
public class PermissionUtils {
    
    /**
     * Check if all the required permissions are granted
     */
    public static boolean hasPermissions(Context context, String... permissions) {
        if (context != null && permissions != null) {
            for (String permission : permissions) {
                if (ContextCompat.checkSelfPermission(context, permission) != PackageManager.PERMISSION_GRANTED) {
                    return false;
                }
            }
        }
        return true;
    }
    
    /**
     * Request permissions from an Activity
     */
    public static void requestPermissions(Activity activity, String[] permissions, int requestCode) {
        List<String> permissionsToRequest = new ArrayList<>();
        
        for (String permission : permissions) {
            if (ContextCompat.checkSelfPermission(activity, permission) != PackageManager.PERMISSION_GRANTED) {
                permissionsToRequest.add(permission);
            }
        }
        
        if (!permissionsToRequest.isEmpty()) {
            ActivityCompat.requestPermissions(
                activity,
                permissionsToRequest.toArray(new String[0]),
                requestCode
            );
        }
    }
    
    /**
     * Request permissions from a Fragment
     */
    public static void requestPermissions(Fragment fragment, String[] permissions, int requestCode) {
        List<String> permissionsToRequest = new ArrayList<>();
        
        for (String permission : permissions) {
            if (ContextCompat.checkSelfPermission(fragment.requireContext(), permission) != PackageManager.PERMISSION_GRANTED) {
                permissionsToRequest.add(permission);
            }
        }
        
        if (!permissionsToRequest.isEmpty()) {
            fragment.requestPermissions(
                permissionsToRequest.toArray(new String[0]),
                requestCode
            );
        }
    }
    
    /**
     * Check if we should show permission rationale for any of the permissions
     */
    public static boolean shouldShowRationale(Activity activity, String[] permissions) {
        for (String permission : permissions) {
            if (ActivityCompat.shouldShowRequestPermissionRationale(activity, permission)) {
                return true;
            }
        }
        return false;
    }
    
    /**
     * Check if we should show permission rationale for any of the permissions (Fragment version)
     */
    public static boolean shouldShowRationale(Fragment fragment, String[] permissions) {
        for (String permission : permissions) {
            if (fragment.shouldShowRequestPermissionRationale(permission)) {
                return true;
            }
        }
        return false;
    }
}