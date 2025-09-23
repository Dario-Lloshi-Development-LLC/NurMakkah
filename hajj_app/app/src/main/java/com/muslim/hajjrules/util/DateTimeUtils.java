package com.muslim.hajjrules.util;

import android.content.Context;
import android.text.format.DateFormat;
import android.text.format.DateUtils;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;

/**
 * Utility class for date and time operations
 */
public class DateTimeUtils {
    
    private static final String DATE_FORMAT_PATTERN = "yyyy-MM-dd";
    private static final String TIME_FORMAT_PATTERN = "HH:mm";
    private static final String DATETIME_FORMAT_PATTERN = "yyyy-MM-dd HH:mm:ss";
    
    /**
     * Format date to string using default pattern
     */
    public static String formatDate(Date date) {
        if (date == null) return "";
        return new SimpleDateFormat(DATE_FORMAT_PATTERN, Locale.getDefault()).format(date);
    }
    
    /**
     * Format date to string using custom pattern
     */
    public static String formatDate(Date date, String pattern) {
        if (date == null) return "";
        return new SimpleDateFormat(pattern, Locale.getDefault()).format(date);
    }
    
    /**
     * Format time to string using default pattern
     */
    public static String formatTime(Date date) {
        if (date == null) return "";
        return new SimpleDateFormat(TIME_FORMAT_PATTERN, Locale.getDefault()).format(date);
    }
    
    /**
     * Format date and time to string using default pattern
     */
    public static String formatDateTime(Date date) {
        if (date == null) return "";
        return new SimpleDateFormat(DATETIME_FORMAT_PATTERN, Locale.getDefault()).format(date);
    }
    
    /**
     * Get relative time span string (e.g., "2 hours ago")
     */
    public static String getRelativeTimeSpanString(Context context, long timeInMillis) {
        if (context == null) return "";
        return DateUtils.getRelativeTimeSpanString(
            timeInMillis,
            System.currentTimeMillis(),
            DateUtils.MINUTE_IN_MILLIS
        ).toString();
    }
    
    /**
     * Convert date to Calendar
     */
    public static Calendar dateToCalendar(Date date) {
        Calendar calendar = Calendar.getInstance();
        if (date != null) {
            calendar.setTime(date);
        }
        return calendar;
    }
    
    /**
     * Get start of day for given date
     */
    public static Date getStartOfDay(Date date) {
        if (date == null) return null;
        Calendar calendar = dateToCalendar(date);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        return calendar.getTime();
    }
    
    /**
     * Get end of day for given date
     */
    public static Date getEndOfDay(Date date) {
        if (date == null) return null;
        Calendar calendar = dateToCalendar(date);
        calendar.set(Calendar.HOUR_OF_DAY, 23);
        calendar.set(Calendar.MINUTE, 59);
        calendar.set(Calendar.SECOND, 59);
        calendar.set(Calendar.MILLISECOND, 999);
        return calendar.getTime();
    }
    
    /**
     * Check if given date is today
     */
    public static boolean isToday(Date date) {
        if (date == null) return false;
        Calendar calendar = dateToCalendar(date);
        Calendar today = Calendar.getInstance();
        return calendar.get(Calendar.YEAR) == today.get(Calendar.YEAR) &&
               calendar.get(Calendar.DAY_OF_YEAR) == today.get(Calendar.DAY_OF_YEAR);
    }
    
    /**
     * Format time based on system's 24-hour time preference
     */
    public static String formatTimeWithSystemPreference(Context context, Date date) {
        if (context == null || date == null) return "";
        
        String pattern = DateFormat.is24HourFormat(context) ? "HH:mm" : "hh:mm a";
        return new SimpleDateFormat(pattern, Locale.getDefault()).format(date);
    }
    
    /**
     * Convert time zone of a date
     */
    public static Date convertTimeZone(Date date, TimeZone fromTimeZone, TimeZone toTimeZone) {
        if (date == null || fromTimeZone == null || toTimeZone == null) return date;
        
        long fromOffset = fromTimeZone.getOffset(date.getTime());
        long toOffset = toTimeZone.getOffset(date.getTime());
        
        return new Date(date.getTime() + (toOffset - fromOffset));
    }
}