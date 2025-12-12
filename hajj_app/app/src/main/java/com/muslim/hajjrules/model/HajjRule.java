package com.muslim.hajjrules.model;

import androidx.room.Entity;
import androidx.room.PrimaryKey;
import androidx.room.ColumnInfo;
import androidx.room.Ignore;
import androidx.room.Index;

/**
 * Entity representing a Hajj rule in the database
 */
@Entity(
    tableName = "hajj_rules",
    indices = {
        @Index(value = {"category"}),
        @Index(value = {"isFavorite"}),
        @Index(value = {"title"}),
        @Index(value = {"category", "displayOrder"})
    }
)
public class HajjRule {
    @PrimaryKey(autoGenerate = true)
    private int id;

    @ColumnInfo(name = "title")
    private String title;

    @ColumnInfo(name = "description")
    private String description;

    @ColumnInfo(name = "category")
    private String category;

    @ColumnInfo(name = "image")
    private String image;

    @ColumnInfo(name = "isFavorite")
    private boolean isFavorite;

    @ColumnInfo(name = "displayOrder") // Order in category
    private int displayOrder;

    @ColumnInfo(name = "quranicReference")
    private String quranicReference;

    @ColumnInfo(name = "hadithReference")
    private String hadithReference;

    @ColumnInfo(name = "lastAccessed")
    private Long lastAccessed;
    
    // Backward compatibility field
    @Deprecated
    @ColumnInfo(name = "imageResourceId")
    private int imageResourceId;

    // Default constructor for Room
    public HajjRule() {}

    // Constructor for creating new rules
    @Ignore
    public HajjRule(String title, String description, String category, boolean isFavorite, int displayOrder, String image, String quranicReference) {
        this.title = title;
        this.description = description;
        this.category = category;
        this.isFavorite = isFavorite;
        this.displayOrder = displayOrder;
        this.image = image;
        this.quranicReference = quranicReference;
        this.lastAccessed = null;
    }

    // Constructor with basic fields (backward compatibility)
    @Ignore
    public HajjRule(String title, String description, String category, int imageResourceId) {
        this.title = title;
        this.description = description;
        this.category = category;
        this.imageResourceId = imageResourceId;
        this.isFavorite = false;
        this.displayOrder = 0;
        this.image = null;
        this.quranicReference = null;
        this.hadithReference = null;
        this.lastAccessed = null;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    @Deprecated
    public int getImageResourceId() {
        return imageResourceId;
    }

    @Deprecated
    public void setImageResourceId(int imageResourceId) {
        this.imageResourceId = imageResourceId;
    }

    public boolean isFavorite() {
        return isFavorite;
    }

    public void setFavorite(boolean favorite) {
        isFavorite = favorite;
    }

    public int getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(int displayOrder) {
        this.displayOrder = displayOrder;
    }

    public String getQuranicReference() {
        return quranicReference;
    }

    public void setQuranicReference(String quranicReference) {
        this.quranicReference = quranicReference;
    }

    public String getHadithReference() {
        return hadithReference;
    }

    public void setHadithReference(String hadithReference) {
        this.hadithReference = hadithReference;
    }

    public Long getLastAccessed() {
        return lastAccessed;
    }

    public void setLastAccessed(Long lastAccessed) {
        this.lastAccessed = lastAccessed;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;

        HajjRule hajjRule = (HajjRule) obj;

        return id == hajjRule.id &&
                (title != null ? title.equals(hajjRule.title) : hajjRule.title == null) &&
                (description != null ? description.equals(hajjRule.description) : hajjRule.description == null) &&
                (category != null ? category.equals(hajjRule.category) : hajjRule.category == null);
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (title != null ? title.hashCode() : 0);
        result = 31 * result + (description != null ? description.hashCode() : 0);
        result = 31 * result + (category != null ? category.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "HajjRule{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", category='" + category + '\'' +
                ", image='" + image + '\'' +
                ", isFavorite=" + isFavorite +
                ", displayOrder=" + displayOrder +
                ", quranicReference='" + quranicReference + '\'' +
                ", hadithReference='" + hadithReference + '\'' +
                ", lastAccessed=" + lastAccessed +
                '}';
    }
}
