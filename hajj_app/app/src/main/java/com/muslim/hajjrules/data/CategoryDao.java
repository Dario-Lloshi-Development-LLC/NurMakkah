package com.muslim.hajjrules.data;

import androidx.lifecycle.LiveData;
import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.OnConflictStrategy;
import androidx.room.Query;
import androidx.room.Update;

import com.muslim.hajjrules.model.Category;

import java.util.List;

/**
 * Data Access Object for Category entities
 * Provides database access methods for Category operations
 */
@Dao
public interface CategoryDao {

    /**
     * Insert a single category
     */
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    void insert(Category category);

    /**
     * Insert multiple categories
     */
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    void insertAll(List<Category> categories);

    /**
     * Update a category
     */
    @Update
    void update(Category category);

    /**
     * Delete a category
     */
    @Delete
    void delete(Category category);

    /**
     * Delete all categories
     */
    @Query("DELETE FROM categories")
    void deleteAllCategories();

    /**
     * Get all categories ordered by display order
     */
    @Query("SELECT * FROM categories ORDER BY display_order ASC")
    LiveData<List<Category>> getAllCategories();

    /**
     * Get category by ID
     */
    @Query("SELECT * FROM categories WHERE id = :id")
    LiveData<Category> getCategoryById(int id);

    /**
     * Get categories count (synchronous)
     */
    @Query("SELECT COUNT(*) FROM categories")
    int getCategoriesCountSync();

    /**
     * Get total count of categories
     */
    @Query("SELECT COUNT(*) FROM categories")
    LiveData<Integer> getCategoriesCount();

    /**
     * Search categories by title or description
     */
    @Query("SELECT * FROM categories WHERE title LIKE '%' || :query || '%' OR description LIKE '%' || :query || '%' ORDER BY title ASC")
    LiveData<List<Category>> searchCategories(String query);

    /**
     * Get featured categories
     */
    @Query("SELECT * FROM categories WHERE featured = 1 ORDER BY display_order ASC")
    LiveData<List<Category>> getFeaturedCategories();
}
