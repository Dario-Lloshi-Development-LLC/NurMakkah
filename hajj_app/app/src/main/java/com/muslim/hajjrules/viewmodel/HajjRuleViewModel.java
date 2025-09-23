package com.muslim.hajjrules.viewmodel;

import android.app.Application;

import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;

import com.muslim.hajjrules.data.HajjRepository;
import com.muslim.hajjrules.model.HajjRule;

import java.util.List;

public class HajjRuleViewModel extends AndroidViewModel {
    private final HajjRepository repository;
    private final LiveData<List<HajjRule>> allRules;

    public HajjRuleViewModel(Application application) {
        super(application);
        repository = new HajjRepository(application);
        allRules = repository.getAllRules();
    }

    public LiveData<List<HajjRule>> getAllRules() {
        return allRules;
    }

    public LiveData<List<HajjRule>> getRulesByCategory(String category) {
        return repository.getRulesByCategory(category);
    }

    public LiveData<List<HajjRule>> getFavoriteRules() {
        return repository.getFavoriteRules();
    }

    public LiveData<List<HajjRule>> searchRules(String query) {
        return repository.searchRules(query);
    }

    public void insert(HajjRule rule) {
        repository.insert(rule);
    }

    public void update(HajjRule rule) {
        repository.update(rule);
    }

    public void delete(HajjRule rule) {
        repository.delete(rule);
    }
}