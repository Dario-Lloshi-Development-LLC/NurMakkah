package com.muslim.hajjrules.data;

import android.app.Application;

import androidx.lifecycle.LiveData;

import com.muslim.hajjrules.model.HajjRule;

import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class HajjRepository {
    private final HajjRuleDao hajjRuleDao;
    private final ExecutorService executorService;

    public HajjRepository(Application application) {
        HajjDatabase database = HajjDatabase.getDatabase(application);
        hajjRuleDao = database.hajjRuleDao();
        executorService = Executors.newSingleThreadExecutor();
    }

    public LiveData<List<HajjRule>> getAllRules() {
        return hajjRuleDao.getAllRules();
    }

    public LiveData<List<HajjRule>> getRulesByCategory(String category) {
        return hajjRuleDao.getRulesByCategory(category);
    }

    public LiveData<List<HajjRule>> getFavoriteRules() {
        return hajjRuleDao.getFavoriteRules();
    }

    public LiveData<List<HajjRule>> searchRules(String query) {
        return hajjRuleDao.searchRules(query);
    }

    public void insert(HajjRule rule) {
        executorService.execute(() -> hajjRuleDao.insert(rule));
    }

    public void update(HajjRule rule) {
        executorService.execute(() -> hajjRuleDao.update(rule));
    }

    public void delete(HajjRule rule) {
        executorService.execute(() -> hajjRuleDao.delete(rule));
    }
}