package com.muslim.hajjrules.util;

import android.content.Context;
import com.muslim.hajjrules.model.HajjRule;
import java.util.ArrayList;
import java.util.List;

public class DataManager {
    private static DataManager instance;
    private List<HajjRule> hajjRules;

    private DataManager(Context context) {
        JsonDataLoader dataLoader = new JsonDataLoader(context);
        hajjRules = dataLoader.loadRules();
        if (hajjRules == null) {
            hajjRules = new ArrayList<>();
        }
    }

    public static synchronized DataManager getInstance(Context context) {
        if (instance == null) {
            instance = new DataManager(context.getApplicationContext());
        }
        return instance;
    }

    public List<HajjRule> searchRules(String query) {
        List<HajjRule> results = new ArrayList<>();
        if (query == null || query.trim().isEmpty()) {
            return results;
        }
        String lowerCaseQuery = query.toLowerCase();
        for (HajjRule rule : hajjRules) {
            if (rule.getTitle().toLowerCase().contains(lowerCaseQuery) ||
                rule.getDescription().toLowerCase().contains(lowerCaseQuery)) {
                results.add(rule);
            }
        }
        return results;
    }

    public List<HajjRule> getAllRules() {
        return hajjRules;
    }
}
