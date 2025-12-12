package com.muslim.hajjrules.viewmodel;

import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import android.app.Application;

import com.muslim.hajjrules.data.repository.HajjRepositoryInterface;
import com.muslim.hajjrules.model.HajjRule;

import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import javax.inject.Inject;

import dagger.hilt.android.lifecycle.HiltViewModel;

/**
 * ViewModel for CategoryFragment that manages rules data for a specific category
 * Uses Hilt for dependency injection
 */
@HiltViewModel
public class CategoryViewModel extends AndroidViewModel {

    private final HajjRepositoryInterface repository;
    private final ExecutorService executorService;

    private LiveData<List<HajjRule>> rules;
    private final MutableLiveData<Boolean> isLoading = new MutableLiveData<>();
    private final MutableLiveData<String> errorMessage = new MutableLiveData<>();
    private final MutableLiveData<String> categoryTitle = new MutableLiveData<>();

    private int categoryId;

    @Inject
    public CategoryViewModel(Application application, HajjRepositoryInterface repository) {
        super(application);
        this.repository = repository;
        this.executorService = Executors.newSingleThreadExecutor();
    }

    public LiveData<List<HajjRule>> getRules() {
        return rules;
    }

    public LiveData<Boolean> getIsLoading() {
        return isLoading;
    }

    public LiveData<String> getErrorMessage() {
        return errorMessage;
    }

    public LiveData<String> getCategoryTitle() {
        return categoryTitle;
    }

    /**
     * Set the category and load its rules
     */
    public void setCategory(int categoryId, String title) {
        this.categoryId = categoryId;
        this.categoryTitle.setValue(title);
        loadRules();
    }

    /**
     * Load rules for the current category from repository
     */
    public void loadRules() {
        isLoading.setValue(true);
        errorMessage.setValue(null);

        rules = repository.getRulesByCategory(String.valueOf(categoryId));
        
        rules.observeForever(hajjRules -> {
            isLoading.setValue(false);
        });
    }

    /**
     * Refresh rules data
     */
    public void refreshRules() {
        loadRules();
    }

    /**
     * Toggle favorite status for a rule
     */
    public void toggleFavorite(HajjRule rule) {
        executorService.execute(() -> {
            try {
                rule.setFavorite(!rule.isFavorite());
                repository.update(rule);

                // Refresh the list to update UI
                loadRules();
            } catch (Exception e) {
                errorMessage.postValue("Error updating favorite: " + e.getMessage());
            }
        });
    }

    @Override
    protected void onCleared() {
        super.onCleared();
        executorService.shutdown();
    }
}