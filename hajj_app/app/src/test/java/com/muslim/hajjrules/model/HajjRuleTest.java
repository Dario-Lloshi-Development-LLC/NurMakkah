package com.muslim.hajjrules.model;

import static org.junit.Assert.*;
import org.junit.Test;

public class HajjRuleTest {
    
    @Test
    public void createHajjRule_isCorrect() {
        HajjRule rule = new HajjRule("Test Title", "Test Description", "Test Category", 123);
        
        assertEquals("Test Title", rule.getTitle());
        assertEquals("Test Description", rule.getDescription());
        assertEquals("Test Category", rule.getCategory());
        assertEquals(123, rule.getImageResourceId());
        assertFalse(rule.isFavorite());
    }
    
    @Test
    public void setFavorite_isCorrect() {
        HajjRule rule = new HajjRule("Test Title", "Test Description", "Test Category", 123);
        assertFalse(rule.isFavorite());
        
        rule.setFavorite(true);
        assertTrue(rule.isFavorite());
        
        rule.setFavorite(false);
        assertFalse(rule.isFavorite());
    }
    
    @Test
    public void setId_isCorrect() {
        HajjRule rule = new HajjRule("Test Title", "Test Description", "Test Category", 123);
        rule.setId(1);
        assertEquals(1, rule.getId());
    }
}