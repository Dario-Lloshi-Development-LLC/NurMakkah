package com.muslim.hajjrules;

import android.app.Application;

import dagger.hilt.android.HiltAndroidApp;

@HiltAndroidApp
public class HajjApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
    }
}