package com.muslim.hajjrules.util;

import android.os.Bundle;
import androidx.fragment.app.Fragment;

/**
 * Utility class for managing state in fragments and activities
 */
public class StateManager {
    
    private static final String KEY_SCROLL_POSITION = "scroll_position";
    private static final String KEY_SELECTED_TAB = "selected_tab";
    private static final String KEY_SEARCH_QUERY = "search_query";
    
    /**
     * Saves the vertical scroll position of a fragment
     */
    public static void saveScrollPosition(Fragment fragment, int position) {
        Bundle bundle = fragment.getArguments();
        if (bundle == null) {
            bundle = new Bundle();
            fragment.setArguments(bundle);
        }
        bundle.putInt(KEY_SCROLL_POSITION, position);
    }
    
    /**
     * Retrieves the saved scroll position for a fragment
     */
    public static int getScrollPosition(Fragment fragment) {
        Bundle bundle = fragment.getArguments();
        return bundle != null ? bundle.getInt(KEY_SCROLL_POSITION, 0) : 0;
    }
    
    /**
     * Saves the currently selected tab position
     */
    public static void saveSelectedTab(Fragment fragment, int position) {
        Bundle bundle = fragment.getArguments();
        if (bundle == null) {
            bundle = new Bundle();
            fragment.setArguments(bundle);
        }
        bundle.putInt(KEY_SELECTED_TAB, position);
    }
    
    /**
     * Retrieves the saved tab position
     */
    public static int getSelectedTab(Fragment fragment) {
        Bundle bundle = fragment.getArguments();
        return bundle != null ? bundle.getInt(KEY_SELECTED_TAB, 0) : 0;
    }
    
    /**
     * Saves the current search query
     */
    public static void saveSearchQuery(Fragment fragment, String query) {
        Bundle bundle = fragment.getArguments();
        if (bundle == null) {
            bundle = new Bundle();
            fragment.setArguments(bundle);
        }
        bundle.putString(KEY_SEARCH_QUERY, query);
    }
    
    /**
     * Retrieves the saved search query
     */
    public static String getSearchQuery(Fragment fragment) {
        Bundle bundle = fragment.getArguments();
        return bundle != null ? bundle.getString(KEY_SEARCH_QUERY, "") : "";
    }
}