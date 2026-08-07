"use strict";

/**
 * Simple Fitness Planner
 * Progress page functionality.
 */


/* =========================================================
   STORAGE KEYS
========================================================= */

const PROGRESS_DAILY_WORKOUT_KEY =
    "fitness_daily_workout";

const PROGRESS_WORKOUT_HISTORY_KEY =
    "fitness_workout_history";

const PROGRESS_WATER_TODAY_KEY =
    "fitness_water_today";

const PROGRESS_WATER_HISTORY_KEY =
    "fitness_water_history";


/* =========================================================
   PAGE DATA
========================================================= */

let dailyWorkout = null;

let workoutHistory = [];

let waterToday = null;

let waterHistory = [];


/* =========================================================
   INITIALISATION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    if (
        document.body.dataset.page !==
        "progress"
    ) {
        return;
    }

    initialiseProgressButtons();
    loadProgressData();
    renderProgressPage();

});


/* =========================================================
   LOAD DATA
========================================================= */

/**
 * Read all fitness data.
 */
function loadProgressData() {

    dailyWorkout =
        readProgressStorage(
            PROGRESS_DAILY_WORKOUT_KEY,
            null
        );

    const savedWorkoutHistory =
        readProgressStorage(
            PROGRESS_WORKOUT_HISTORY_KEY,
            []
        );

    workoutHistory =
        Array.isArray(savedWorkoutHistory)
            ? savedWorkoutHistory
            : [];

    waterToday =
        readProgressStorage(
            PROGRESS_WATER_TODAY_KEY,
            null
        );

    const savedWaterHistory =
        readProgressStorage(
            PROGRESS_WATER_HISTORY_KEY,
            []
        );

    waterHistory =
        Array.isArray(savedWaterHistory)
            ? savedWaterHistory
            : [];

}


/* =========================================================
   RENDER PAGE
========================================================= */

/**
 * Render all progress sections.
 */
function renderProgressPage() {

    renderOverallSummary();
    renderTodayWorkoutProgress();
    renderTodayWaterProgress();
    renderStreaks();
    renderWorkoutHistory();
    renderWaterHistory();

}


/* =========================================================
   OVERALL SUMMARY
========================================================= */

/**
 * Calculate and display overall statistics.
 */
function renderOverallSummary() {

    const totalWorkouts =
        workoutHistory.length;

    const totalExercises =
        workoutHistory.reduce(
            function (total, record) {

                return (
                    total +
                    getSafeNumber(
                        record.completedExercises
                    )
                );

            },
            0
        );

    const totalMinutes =
        workoutHistory.reduce(
            function (total, record) {

                return (
                    total +
                    getSafeNumber(
                        record.duration
                    )
                );

            },
            0
        );

    const totalWater =
        waterHistory.reduce(
            function (total, record) {

                return (
                    total +
                    getSafeNumber(
                        record.consumed
                    )
                );

            },
            0
        );

    setProgressText(
        "totalWorkoutsCompleted",
        String(totalWorkouts)
    );

    setProgressText(
        "totalExercisesCompleted",
        String(totalExercises)
    );

    setProgressText(
        "totalWorkoutMinutes",
        String(totalMinutes)
    );

    setProgressText(
        "totalWaterGlasses",
        String(totalWater)
    );

}


/* =========================================================
   TODAY'S WORKOUT
========================================================= */

/**
 * Display current daily workout progress.
 */
function renderTodayWorkoutProgress() {

    const todayKey =
        getProgressTodayKey();

    let completed = 0;
    let total = 0;

    if (
        dailyWorkout &&
        dailyWorkout.date === todayKey &&
        Array.isArray(
            dailyWorkout.exercises
        )
    ) {

        total =
            dailyWorkout.exercises.length;

        completed =
            dailyWorkout.exercises.filter(
                function (exercise) {
                    return (
                        exercise.completed === true
                    );
                }
            ).length;

    }

    const remaining =
        Math.max(
            0,
            total - completed
        );

    const percentage =
        calculateProgressPercentage(
            completed,
            total
        );

    setProgressText(
        "todayWorkoutPercentage",
        `${percentage}%`
    );

    setProgressText(
        "todayWorkoutCompletedText",
        `${completed} of ${total} completed`
    );

    setProgressText(
        "todayWorkoutRemainingText",
        `${remaining} remaining`
    );

    const messageElement =
        document.getElementById(
            "todayWorkoutMessage"
        );

    if (messageElement) {

        if (total === 0) {

            messageElement.textContent =
                "No workout is currently selected.";

        } else if (percentage === 100) {

            messageElement.textContent =
                "Excellent! Every exercise is complete.";

        } else if (percentage >= 50) {

            messageElement.textContent =
                "Good progress. Keep going to finish the workout.";

        } else if (completed > 0) {

            messageElement.textContent =
                "You have started today’s workout.";

        } else {

            messageElement.textContent =
                "Your workout is ready to begin.";

        }

    }

    updateProgressBar(
        "todayWorkoutProgressFill",
        "todayWorkoutProgressBar",
        percentage,
        percentage === 100
    );

}


/* =========================================================
   TODAY'S WATER
========================================================= */

/**
 * Display current daily water progress.
 */
function renderTodayWaterProgress() {

    const todayKey =
        getProgressTodayKey();

    let consumed = 0;
    let goal = 8;

    if (
        waterToday &&
        waterToday.date === todayKey
    ) {

        consumed =
            getSafeNumber(
                waterToday.consumed ??
                waterToday.glasses ??
                waterToday.count
            );

        goal =
            Math.max(
                1,
                getSafeNumber(
                    waterToday.goal
                ) || 8
            );

    }

    const remaining =
        Math.max(
            0,
            goal - consumed
        );

    const percentage =
        calculateProgressPercentage(
            consumed,
            goal
        );

    setProgressText(
        "todayWaterPercentage",
        `${percentage}%`
    );

    setProgressText(
        "todayWaterConsumedText",
        `${consumed} of ${goal} glasses`
    );

    setProgressText(
        "todayWaterRemainingText",
        `${remaining} remaining`
    );

    const messageElement =
        document.getElementById(
            "todayWaterMessage"
        );

    if (messageElement) {

        if (consumed === 0) {

            messageElement.textContent =
                "No water has been recorded today.";

        } else if (consumed >= goal) {

            messageElement.textContent =
                "Excellent! Your daily hydration goal is complete.";

        } else if (percentage >= 75) {

            messageElement.textContent =
                "Almost there. Only a little more water is needed.";

        } else if (percentage >= 50) {

            messageElement.textContent =
                "You are at least halfway to your water goal.";

        } else {

            messageElement.textContent =
                "Good start. Continue drinking water regularly.";

        }

    }

    updateProgressBar(
        "todayWaterProgressFill",
        "todayWaterProgressBar",
        Math.min(100, percentage),
        consumed >= goal
    );

}


/* =========================================================
   STREAKS
========================================================= */

/**
 * Display workout and water streaks.
 */
function renderStreaks() {

    const workoutDates =
        workoutHistory
            .map(
                function (record) {
                    return record.date;
                }
            )
            .filter(Boolean);

    const completedWaterDates =
        waterHistory
            .filter(
                function (record) {

                    return (
                        record.goalCompleted === true ||
                        getSafeNumber(record.consumed) >=
                        Math.max(
                            1,
                            getSafeNumber(record.goal)
                        )
                    );

                }
            )
            .map(
                function (record) {
                    return record.date;
                }
            )
            .filter(Boolean);

    const workoutStreak =
        calculateDateStreak(
            workoutDates
        );

    const waterStreak =
        calculateDateStreak(
            completedWaterDates
        );

    setProgressText(
        "workoutStreakValue",
        formatDayCount(workoutStreak)
    );

    setProgressText(
        "waterStreakValue",
        formatDayCount(waterStreak)
    );

    displayBestWorkoutDay();

}


/**
 * Display the best workout record.
 */
function displayBestWorkoutDay() {

    if (workoutHistory.length === 0) {

        setProgressText(
            "bestWorkoutDayValue",
            "No records"
        );

        setProgressText(
            "bestWorkoutDayDescription",
            "Finish workouts to create statistics."
        );

        return;

    }

    const bestRecord =
        [...workoutHistory].sort(
            function (first, second) {

                const firstScore =
                    getSafeNumber(
                        first.completedExercises
                    ) * 10 +
                    getSafeNumber(
                        first.duration
                    );

                const secondScore =
                    getSafeNumber(
                        second.completedExercises
                    ) * 10 +
                    getSafeNumber(
                        second.duration
                    );

                return secondScore - firstScore;

            }
        )[0];

    setProgressText(
        "bestWorkoutDayValue",
        formatProgressDate(
            bestRecord.date
        )
    );

    setProgressText(
        "bestWorkoutDayDescription",
        `${getSafeNumber(
            bestRecord.completedExercises
        )} exercises and ${getSafeNumber(
            bestRecord.duration
        )} minutes`
    );

}


/**
 * Calculate a streak ending today or yesterday.
 *
 * @param {Array<string>} dates
 * @returns {number}
 */
function calculateDateStreak(dates) {

    const uniqueDates =
        [...new Set(dates)]
            .filter(Boolean)
            .sort()
            .reverse();

    if (uniqueDates.length === 0) {
        return 0;
    }

    const today =
        parseLocalDate(
            getProgressTodayKey()
        );

    const yesterday =
        new Date(today);

    yesterday.setDate(
        yesterday.getDate() - 1
    );

    const latestDate =
        parseLocalDate(
            uniqueDates[0]
        );

    if (
        !sameCalendarDate(
            latestDate,
            today
        ) &&
        !sameCalendarDate(
            latestDate,
            yesterday
        )
    ) {
        return 0;
    }

    let streak = 1;
    let previousDate =
        latestDate;

    for (
        let index = 1;
        index < uniqueDates.length;
        index += 1
    ) {

        const currentDate =
            parseLocalDate(
                uniqueDates[index]
            );

        const expectedDate =
            new Date(previousDate);

        expectedDate.setDate(
            expectedDate.getDate() - 1
        );

        if (
            sameCalendarDate(
                currentDate,
                expectedDate
            )
        ) {

            streak += 1;
            previousDate =
                currentDate;

        } else {

            break;

        }

    }

    return streak;

}


/* =========================================================
   WEEKLY CHARTS
========================================================= */

/**
 * Render workout minutes for seven days.
 */
function renderWorkoutWeeklyChart() {

    const days =
        getLastSevenDays();

    const values =
        days.map(
            function (day) {

                const matchingRecords =
                    workoutHistory.filter(
                        function (record) {
                            return (
                                record.date ===
                                day.dateKey
                            );
                        }
                    );

                return matchingRecords.reduce(
                    function (total, record) {

                        return (
                            total +
                            getSafeNumber(
                                record.duration
                            )
                        );

                    },
                    0
                );

            }
        );

    renderWeeklyChart(
        "workoutWeeklyChart",
        days,
        values,
        false
    );

}


/**
 * Render water glasses for seven days.
 */
function renderWaterWeeklyChart() {

    const days =
        getLastSevenDays();

    const values =
        days.map(
            function (day) {

                const record =
                    waterHistory.find(
                        function (item) {
                            return (
                                item.date ===
                                day.dateKey
                            );
                        }
                    );

                if (record) {
                    return getSafeNumber(
                        record.consumed
                    );
                }

                if (
                    waterToday &&
                    waterToday.date ===
                    day.dateKey
                ) {

                    return getSafeNumber(
                        waterToday.consumed
                    );

                }

                return 0;

            }
        );

    renderWeeklyChart(
        "waterWeeklyChart",
        days,
        values,
        true
    );

}


/**
 * Render a CSS bar chart.
 *
 * @param {string} containerId
 * @param {Array} days
 * @param {Array<number>} values
 * @param {boolean} waterChart
 */
function renderWeeklyChart(
    containerId,
    days,
    values,
    waterChart
) {

    const container =
        document.getElementById(
            containerId
        );

    if (!container) {
        return;
    }

    container.innerHTML = "";

    const maximum =
        Math.max(
            ...values,
            1
        );

    days.forEach(
        function (day, index) {

            const value =
                values[index];

            const height =
                value === 0
                    ? 2
                    : Math.max(
                        8,
                        Math.round(
                            (value / maximum) * 100
                        )
                    );

            const column =
                document.createElement(
                    "div"
                );

            column.className =
                "weekly-chart-column";

            column.innerHTML = `
                <span class="weekly-chart-value">
                    ${value}
                </span>

                <div class="weekly-chart-bar-wrapper">

                    <div
                        class="weekly-chart-bar ${
                            waterChart
                                ? "water-bar"
                                : ""
                        }"
                        style="height: ${height}%"
                        title="${escapeProgressHTML(
                            day.fullLabel
                        )}: ${value}"
                    ></div>

                </div>

                <span class="weekly-chart-day">
                    ${escapeProgressHTML(
                        day.shortLabel
                    )}
                </span>
            `;

            container.appendChild(
                column
            );

        }
    );

}


/* =========================================================
   WORKOUT HISTORY
========================================================= */

/**
 * Display recent workout records.
 */
function renderWorkoutHistory() {

    const list =
        document.getElementById(
            "workoutHistoryList"
        );

    const emptyState =
        document.getElementById(
            "workoutHistoryEmptyState"
        );

    if (!list || !emptyState) {
        return;
    }

    list.innerHTML = "";

    if (workoutHistory.length === 0) {

        list.classList.add("hidden");

        emptyState.classList.remove(
            "hidden"
        );

        return;

    }

    list.classList.remove("hidden");

    emptyState.classList.add(
        "hidden"
    );

    const recentRecords =
        [...workoutHistory]
            .sort(sortHistoryNewestFirst)
            .slice(0, 8);

    recentRecords.forEach(
        function (record) {

            const item =
                document.createElement(
                    "article"
                );

            item.className =
                "history-item";

            const completed =
                getSafeNumber(
                    record.completedExercises
                );

            const total =
                getSafeNumber(
                    record.totalExercises
                );

            const duration =
                getSafeNumber(
                    record.duration
                );

            item.innerHTML = `
                <div class="history-item-icon">
                    🏋️
                </div>

                <div class="history-item-content">

                    <h3>
                        ${escapeProgressHTML(
                            record.planName ||
                            "Workout"
                        )}
                    </h3>

                    <p>
                        ${escapeProgressHTML(
                            formatProgressDate(
                                record.date
                            )
                        )}
                        · ${completed} of ${total} exercises
                    </p>

                </div>

                <div class="history-item-value">
                    ${duration} min
                </div>
            `;

            list.appendChild(item);

        }
    );

}


/* =========================================================
   WATER HISTORY
========================================================= */

/**
 * Display recent water records.
 */
function renderWaterHistory() {

    const list =
        document.getElementById(
            "waterHistoryList"
        );

    const emptyState =
        document.getElementById(
            "waterHistoryEmptyState"
        );

    if (!list || !emptyState) {
        return;
    }

    list.innerHTML = "";

    if (waterHistory.length === 0) {

        list.classList.add("hidden");

        emptyState.classList.remove(
            "hidden"
        );

        return;

    }

    list.classList.remove("hidden");

    emptyState.classList.add(
        "hidden"
    );

    const recentRecords =
        [...waterHistory]
            .sort(sortHistoryNewestFirst)
            .slice(0, 8);

    recentRecords.forEach(
        function (record) {

            const item =
                document.createElement(
                    "article"
                );

            item.className =
                "history-item";

            const consumed =
                getSafeNumber(
                    record.consumed
                );

            const goal =
                Math.max(
                    1,
                    getSafeNumber(
                        record.goal
                    )
                );

            const percentage =
                record.percentage ??
                calculateProgressPercentage(
                    consumed,
                    goal
                );

            item.innerHTML = `
                <div class="history-item-icon">
                    💧
                </div>

                <div class="history-item-content">

                    <h3>
                        ${consumed} of ${goal} glasses
                    </h3>

                    <p>
                        ${escapeProgressHTML(
                            formatProgressDate(
                                record.date
                            )
                        )}
                        · ${
                            consumed >= goal
                                ? "Goal completed"
                                : "Goal incomplete"
                        }
                    </p>

                </div>

                <div class="history-item-value">
                    ${percentage}%
                </div>
            `;

            list.appendChild(item);

        }
    );

}


/* =========================================================
   CLEAR HISTORY
========================================================= */

/**
 * Remove all workout history.
 */
function clearWorkoutHistory() {

    if (workoutHistory.length === 0) {

        showProgressMessage(
            "Workout history is already empty.",
            "info"
        );

        return;

    }

    const shouldClear =
        window.confirm(
            "Clear all saved workout history?"
        );

    if (!shouldClear) {
        return;
    }

    try {

        StorageManager.remove(
            PROGRESS_WORKOUT_HISTORY_KEY
        );

        workoutHistory = [];

        renderProgressPage();

        showProgressMessage(
            "Workout history was cleared.",
            "success"
        );

    } catch (error) {

        console.warn(error);

        showProgressMessage(
            "Workout history could not be cleared.",
            "error"
        );

    }

}


/**
 * Remove all water history.
 */
function clearWaterHistory() {

    if (waterHistory.length === 0) {

        showProgressMessage(
            "Water history is already empty.",
            "info"
        );

        return;

    }

    const shouldClear =
        window.confirm(
            "Clear all saved water history?"
        );

    if (!shouldClear) {
        return;
    }

    try {

        StorageManager.remove(
            PROGRESS_WATER_HISTORY_KEY
        );

        waterHistory = [];

        renderProgressPage();

        showProgressMessage(
            "Water history was cleared.",
            "success"
        );

    } catch (error) {

        console.warn(error);

        showProgressMessage(
            "Water history could not be cleared.",
            "error"
        );

    }

}


/* =========================================================
   BUTTON EVENTS
========================================================= */

/**
 * Connect progress-page buttons.
 */
function initialiseProgressButtons() {

    connectProgressButton(
        "refreshProgressButton",
        refreshProgressData
    );

    connectProgressButton(
        "clearWorkoutHistoryButton",
        clearWorkoutHistory
    );

    connectProgressButton(
        "clearWaterHistoryButton",
        clearWaterHistory
    );

}


/**
 * Reload localStorage data.
 */
function refreshProgressData() {

    loadProgressData();
    renderProgressPage();

    showProgressMessage(
        "Progress data was refreshed.",
        "success"
    );

}


/**
 * Connect one button.
 *
 * @param {string} buttonId
 * @param {Function} handler
 */
function connectProgressButton(
    buttonId,
    handler
) {

    const button =
        document.getElementById(
            buttonId
        );

    if (button) {

        button.addEventListener(
            "click",
            handler
        );

    }

}


/* =========================================================
   PROGRESS BAR
========================================================= */

/**
 * Update a progress bar.
 *
 * @param {string} fillId
 * @param {string} barId
 * @param {number} percentage
 * @param {boolean} completed
 */
function updateProgressBar(
    fillId,
    barId,
    percentage,
    completed
) {

    const fill =
        document.getElementById(
            fillId
        );

    const bar =
        document.getElementById(
            barId
        );

    const safePercentage =
        Math.min(
            100,
            Math.max(
                0,
                percentage
            )
        );

    if (fill) {

        fill.style.width =
            `${safePercentage}%`;

        fill.classList.toggle(
            "progress-fill-success",
            completed
        );

    }

    if (bar) {

        bar.setAttribute(
            "aria-valuenow",
            String(safePercentage)
        );

    }

}


/* =========================================================
   DATE HELPERS
========================================================= */

/**
 * Return seven days ending today.
 *
 * @returns {Array}
 */
function getLastSevenDays() {

    const days = [];

    const today =
        parseLocalDate(
            getProgressTodayKey()
        );

    for (
        let offset = 6;
        offset >= 0;
        offset -= 1
    ) {

        const date =
            new Date(today);

        date.setDate(
            date.getDate() - offset
        );

        days.push({
            dateKey:
                formatDateKey(date),

            shortLabel:
                new Intl.DateTimeFormat(
                    "en-US",
                    {
                        weekday: "short"
                    }
                ).format(date),

            fullLabel:
                new Intl.DateTimeFormat(
                    "en-US",
                    {
                        weekday: "long",
                        month: "short",
                        day: "numeric"
                    }
                ).format(date)
        });

    }

    return days;

}


/**
 * Format a YYYY-MM-DD date.
 *
 * @param {string} dateKey
 * @returns {string}
 */
function formatProgressDate(dateKey) {

    if (!dateKey) {
        return "Unknown date";
    }

    const date =
        parseLocalDate(dateKey);

    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return dateKey;
    }

    return new Intl.DateTimeFormat(
        "en-US",
        {
            month: "short",
            day: "numeric",
            year: "numeric"
        }
    ).format(date);

}


/**
 * Return today as YYYY-MM-DD.
 *
 * @returns {string}
 */
function getProgressTodayKey() {

    return formatDateKey(
        new Date()
    );

}


/**
 * Format a Date as YYYY-MM-DD.
 *
 * @param {Date} date
 * @returns {string}
 */
function formatDateKey(date) {

    const year =
        date.getFullYear();

    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            date.getDate()
        ).padStart(2, "0");

    return `${year}-${month}-${day}`;

}


/**
 * Parse a local YYYY-MM-DD value.
 *
 * @param {string} dateKey
 * @returns {Date}
 */
function parseLocalDate(dateKey) {

    const parts =
        String(dateKey)
            .split("-")
            .map(Number);

    return new Date(
        parts[0],
        parts[1] - 1,
        parts[2]
    );

}


/**
 * Compare calendar dates.
 *
 * @param {Date} first
 * @param {Date} second
 * @returns {boolean}
 */
function sameCalendarDate(
    first,
    second
) {

    return (
        first.getFullYear() ===
            second.getFullYear() &&
        first.getMonth() ===
            second.getMonth() &&
        first.getDate() ===
            second.getDate()
    );

}


/**
 * Sort records newest first.
 *
 * @param {Object} first
 * @param {Object} second
 * @returns {number}
 */
function sortHistoryNewestFirst(
    first,
    second
) {

    return String(
        second.date || ""
    ).localeCompare(
        String(
            first.date || ""
        )
    );

}


/* =========================================================
   GENERAL HELPERS
========================================================= */

/**
 * Calculate a percentage.
 *
 * @param {number} value
 * @param {number} total
 * @returns {number}
 */
function calculateProgressPercentage(
    value,
    total
) {

    if (total <= 0) {
        return 0;
    }

    return Math.round(
        (value / total) * 100
    );

}


/**
 * Return a safe number.
 *
 * @param {*} value
 * @returns {number}
 */
function getSafeNumber(value) {

    const number =
        Number(value);

    return Number.isFinite(number)
        ? number
        : 0;

}


/**
 * Format a day count.
 *
 * @param {number} count
 * @returns {string}
 */
function formatDayCount(count) {

    return `${count} ${
        count === 1
            ? "day"
            : "days"
    }`;

}


/**
 * Set text safely.
 *
 * @param {string} id
 * @param {string} value
 */
function setProgressText(
    id,
    value
) {

    const element =
        document.getElementById(id);

    if (element) {
        element.textContent = value;
    }

}


/**
 * Read JSON safely.
 *
 * @param {string} key
 * @param {*} defaultValue
 * @returns {*}
 */
function readProgressStorage(
    key,
    defaultValue
) {

    return StorageManager.read(
        key,
        defaultValue
    );

}


/**
 * Show a progress-page message.
 *
 * @param {string} message
 * @param {"success"|"info"|"error"} type
 */
function showProgressMessage(
    message,
    type
) {

    const messageElement =
        document.getElementById(
            "progressMessage"
        );

    if (!messageElement) {
        return;
    }

    messageElement.textContent =
        message;

    messageElement.className =
        `progress-message visible ${type}`;

    window.clearTimeout(
        showProgressMessage.timeoutId
    );

    showProgressMessage.timeoutId =
        window.setTimeout(
            function () {

                messageElement.className =
                    "progress-message";

                messageElement.textContent =
                    "";

            },
            3500
        );

}


/**
 * Escape generated HTML.
 *
 * @param {*} value
 * @returns {string}
 */
function escapeProgressHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}

/* =========================================================
   PAGE CONNECTION REFRESH
========================================================= */

/**
 * Reload shared data when the user returns from another page
 * using the browser Back or Forward buttons.
 */
window.addEventListener("pageshow", function (event) {

    if (
        document.body.dataset.page !== "progress" ||
        typeof StorageManager === "undefined"
    ) {
        return;
    }

    if (event.persisted) {
        loadProgressData();
        renderProgressPage();
    }

});


/**
 * Refresh the Progress page when another tab updates fitness data.
 */
window.addEventListener("storage", function (event) {

    const connectedKeys = [
        PROGRESS_DAILY_WORKOUT_KEY,
        PROGRESS_WORKOUT_HISTORY_KEY,
        PROGRESS_WATER_TODAY_KEY,
        PROGRESS_WATER_HISTORY_KEY
    ];

    if (
        document.body.dataset.page === "progress" &&
        connectedKeys.includes(event.key)
    ) {
        loadProgressData();
        renderProgressPage();
    }

});
