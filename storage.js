"use strict";

/**
 * Simple Fitness Planner
 * Shared localStorage manager used by every page.
 */

const StorageManager = {

    read(key, defaultValue = null) {
        try {
            const value = localStorage.getItem(key);
            return value === null ? defaultValue : JSON.parse(value);
        } catch (error) {
            console.warn(`Unable to read localStorage key "${key}":`, error);
            return defaultValue;
        }
    },

    save(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.warn(`Unable to save localStorage key "${key}":`, error);
            return false;
        }
    },

    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.warn(`Unable to remove localStorage key "${key}":`, error);
            return false;
        }
    },

    exists(key) {
        try {
            return localStorage.getItem(key) !== null;
        } catch (error) {
            console.warn(`Unable to check localStorage key "${key}":`, error);
            return false;
        }
    },

    clearFitnessData() {
        const keys = [
            "fitness_selected_plan",
            "fitness_daily_workout",
            "fitness_workout_history",
            "fitness_water_today",
            "fitness_water_history",
            "fitness_favourite_tips",
            "fitness_settings"
        ];

        try {
            keys.forEach(function (key) {
                localStorage.removeItem(key);
            });
            return true;
        } catch (error) {
            console.warn("Unable to clear fitness data:", error);
            return false;
        }
    }
};
