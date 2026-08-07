"use strict";

/**
 * Simple Fitness Planner
 * Water Tracker page functionality.
 */


/* =========================================================
   STORAGE KEYS
========================================================= */

const WATER_TODAY_KEY =
    "fitness_water_today";

const WATER_HISTORY_KEY =
    "fitness_water_history";


/* =========================================================
   PAGE STATE
========================================================= */

let waterData = {
    date: "",
    consumed: 0,
    goal: 8
};


/* =========================================================
   INITIALISATION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    if (
        document.body.dataset.page !==
        "water-tracker"
    ) {
        return;
    }

    loadWaterData();
    initialiseWaterButtons();
    initialiseWaterGoalForm();
    renderWaterTracker();

});


/* =========================================================
   LOAD DATA
========================================================= */

/**
 * Load today's saved water data.
 */
function loadWaterData() {

    const todayKey =
        getWaterTodayKey();

    const savedData =
        readWaterStorage(
            WATER_TODAY_KEY,
            null
        );

    if (
        savedData &&
        savedData.date === todayKey
    ) {

        waterData = normaliseWaterData(
            savedData
        );

        return;

    }

    if (
        savedData &&
        savedData.date &&
        savedData.date !== todayKey
    ) {

        savePreviousWaterDayToHistory(
            savedData
        );

    }

    const previousGoal =
        savedData &&
        Number(savedData.goal) > 0
            ? Number(savedData.goal)
            : 8;

    waterData = {
        date: todayKey,
        consumed: 0,
        goal: previousGoal
    };

    saveWaterData();

}


/**
 * Ensure valid water data.
 *
 * @param {Object} data
 * @returns {Object}
 */
function normaliseWaterData(data) {

    return {
        date:
            data.date ||
            getWaterTodayKey(),

        consumed:
            Math.max(
                0,
                Number(
                    data.consumed ??
                    data.glasses ??
                    data.count
                ) || 0
            ),

        goal:
            Math.min(
                20,
                Math.max(
                    1,
                    Number(data.goal) || 8
                )
            )
    };

}


/* =========================================================
   RENDER TRACKER
========================================================= */

/**
 * Update every water-tracker element.
 */
function renderWaterTracker() {

    const consumed =
        waterData.consumed;

    const goal =
        waterData.goal;

    const remaining =
        Math.max(
            0,
            goal - consumed
        );

    const percentage =
        calculateWaterPercentage(
            consumed,
            goal
        );

    displayWaterDate();
    displayWaterMainValues(
        consumed,
        goal,
        remaining,
        percentage
    );

    displayWaterProgress(
        percentage
    );

    displayWaterStatus(
        consumed,
        goal,
        percentage
    );

    displayWaterGlasses(
        consumed,
        goal
    );

    displayWaterSummary(
        consumed,
        goal,
        remaining,
        percentage
    );

    updateWaterGoalInput();

}


/**
 * Display today's date.
 */
function displayWaterDate() {

    const dateElement =
        document.getElementById(
            "waterTrackerDate"
        );

    if (!dateElement) {
        return;
    }

    dateElement.textContent =
        new Intl.DateTimeFormat(
            "en-US",
            {
                weekday: "long",
                month: "long",
                day: "numeric"
            }
        ).format(new Date());

}


/**
 * Display water counts and statistics.
 *
 * @param {number} consumed
 * @param {number} goal
 * @param {number} remaining
 * @param {number} percentage
 */
function displayWaterMainValues(
    consumed,
    goal,
    remaining,
    percentage
) {

    setWaterText(
        "waterConsumedDisplay",
        String(consumed)
    );

    setWaterText(
        "waterGoalDisplay",
        String(goal)
    );

    setWaterText(
        "waterProgressPercentage",
        `${percentage}%`
    );

    setWaterText(
        "waterConsumedStat",
        String(consumed)
    );

    setWaterText(
        "waterRemainingStat",
        String(remaining)
    );

    setWaterText(
        "waterGoalStat",
        String(goal)
    );

    setWaterText(
        "waterGlassSummary",
        `${consumed} of ${goal}`
    );

}


/**
 * Update progress bar.
 *
 * @param {number} percentage
 */
function displayWaterProgress(
    percentage
) {

    const progressFill =
        document.getElementById(
            "waterProgressFill"
        );

    const progressBar =
        document.getElementById(
            "waterProgressBar"
        );

    const displayPercentage =
        Math.min(
            100,
            percentage
        );

    if (progressFill) {

        progressFill.style.width =
            `${displayPercentage}%`;

        progressFill.classList.toggle(
            "goal-complete",
            percentage >= 100
        );

    }

    if (progressBar) {

        progressBar.setAttribute(
            "aria-valuenow",
            String(displayPercentage)
        );

    }

}


/**
 * Display status badge and hydration message.
 *
 * @param {number} consumed
 * @param {number} goal
 * @param {number} percentage
 */
function displayWaterStatus(
    consumed,
    goal,
    percentage
) {

    const badge =
        document.getElementById(
            "waterStatusBadge"
        );

    const message =
        document.getElementById(
            "waterHydrationMessage"
        );

    const dropVisual =
        document.getElementById(
            "waterDropVisual"
        );

    let badgeText =
        "Start Drinking";

    let badgeClass = "";

    let hydrationMessage =
        "Start recording your water intake.";

    if (consumed >= goal) {

        badgeText =
            "Goal Completed";

        badgeClass =
            "completed";

        hydrationMessage =
            "Excellent! You reached your daily water goal.";

    } else if (percentage >= 75) {

        badgeText =
            "Almost There";

        badgeClass =
            "almost";

        hydrationMessage =
            "You are close to your goal. Keep drinking water.";

    } else if (percentage >= 50) {

        badgeText =
            "Halfway There";

        badgeClass =
            "halfway";

        hydrationMessage =
            "Great progress! You are at least halfway to your goal.";

    } else if (consumed > 0) {

        badgeText =
            "Good Start";

        badgeClass =
            "started";

        hydrationMessage =
            "Good start. Continue drinking water regularly.";

    }

    if (badge) {

        badge.textContent =
            badgeText;

        badge.className =
            "water-status-badge";

        if (badgeClass) {
            badge.classList.add(
                badgeClass
            );
        }

    }

    if (message) {
        message.textContent =
            hydrationMessage;
    }

    if (dropVisual) {

        dropVisual.classList.toggle(
            "goal-complete",
            consumed >= goal
        );

    }

}


/* =========================================================
   VISUAL GLASSES
========================================================= */

/**
 * Display visual water glasses.
 *
 * @param {number} consumed
 * @param {number} goal
 */
function displayWaterGlasses(
    consumed,
    goal
) {

    const container =
        document.getElementById(
            "waterGlassesContainer"
        );

    if (!container) {
        return;
    }

    container.innerHTML = "";

    const totalGlasses =
        Math.max(
            goal,
            consumed
        );

    for (
        let index = 1;
        index <= totalGlasses;
        index += 1
    ) {

        const glass =
            document.createElement("div");

        glass.className =
            "water-glass-item";

        if (index <= consumed) {
            glass.classList.add(
                "filled"
            );
        }

        if (index > goal) {
            glass.classList.add(
                "extra"
            );
        }

        glass.setAttribute(
            "aria-label",
            index <= consumed
                ? `Glass ${index} completed`
                : `Glass ${index} not completed`
        );

        glass.innerHTML = `
            <span aria-hidden="true">
                ${index <= consumed ? "💧" : "○"}
            </span>
        `;

        container.appendChild(
            glass
        );

    }

}


/* =========================================================
   SUMMARY
========================================================= */

/**
 * Display sidebar summary.
 *
 * @param {number} consumed
 * @param {number} goal
 * @param {number} remaining
 * @param {number} percentage
 */
function displayWaterSummary(
    consumed,
    goal,
    remaining,
    percentage
) {

    setWaterText(
        "waterCurrentSummary",
        `${consumed} ${
            consumed === 1
                ? "glass"
                : "glasses"
        }`
    );

    setWaterText(
        "waterRemainingSummary",
        `${remaining} ${
            remaining === 1
                ? "glass"
                : "glasses"
        }`
    );

    let status =
        "Not started";

    if (consumed >= goal) {
        status = "Completed";
    } else if (percentage >= 75) {
        status = "Almost complete";
    } else if (percentage >= 50) {
        status = "Halfway";
    } else if (consumed > 0) {
        status = "In progress";
    }

    setWaterText(
        "waterGoalStatusSummary",
        status
    );

}


/* =========================================================
   ADD AND REMOVE WATER
========================================================= */

/**
 * Add one glass.
 */
function addWaterGlass() {

    waterData.consumed += 1;

    saveWaterData();
    renderWaterTracker();

    if (
        waterData.consumed ===
        waterData.goal
    ) {

        showWaterMessage(
            "Congratulations! You reached your daily water goal.",
            "success"
        );

    } else if (
        waterData.consumed >
        waterData.goal
    ) {

        showWaterMessage(
            "One extra glass was added.",
            "info"
        );

    } else {

        showWaterMessage(
            "One glass of water was added.",
            "success"
        );

    }

}


/**
 * Remove one glass.
 */
function removeWaterGlass() {

    if (waterData.consumed <= 0) {

        showWaterMessage(
            "Water intake cannot be lower than zero.",
            "error"
        );

        return;

    }

    waterData.consumed -= 1;

    saveWaterData();
    renderWaterTracker();

    showWaterMessage(
        "One glass of water was removed.",
        "info"
    );

}


/* =========================================================
   DAILY GOAL
========================================================= */

/**
 * Initialise goal form.
 */
function initialiseWaterGoalForm() {

    const form =
        document.getElementById(
            "waterGoalForm"
        );

    if (!form) {
        return;
    }

    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();
            saveWaterGoal();

        }
    );

}


/**
 * Validate and save the daily goal.
 */
function saveWaterGoal() {

    const input =
        document.getElementById(
            "waterGoalInput"
        );

    const errorElement =
        document.getElementById(
            "waterGoalError"
        );

    if (!input) {
        return;
    }

    if (errorElement) {
        errorElement.textContent = "";
    }

    const goal =
        Number(input.value);

    if (
        !Number.isInteger(goal) ||
        goal < 1 ||
        goal > 20
    ) {

        if (errorElement) {

            errorElement.textContent =
                "Enter a whole number between 1 and 20.";

        }

        input.classList.add("error");
        return;

    }

    input.classList.remove("error");

    waterData.goal = goal;

    saveWaterData();
    renderWaterTracker();

    showWaterMessage(
        `Your daily goal was changed to ${goal} glasses.`,
        "success"
    );

}


/**
 * Keep input synchronized.
 */
function updateWaterGoalInput() {

    const input =
        document.getElementById(
            "waterGoalInput"
        );

    if (input) {
        input.value =
            String(waterData.goal);
    }

}


/* =========================================================
   RESET AND HISTORY
========================================================= */

/**
 * Reset today's water intake.
 */
function resetWaterIntake() {

    if (waterData.consumed === 0) {

        showWaterMessage(
            "Today’s water intake is already zero.",
            "info"
        );

        return;

    }

    const shouldReset =
        window.confirm(
            "Reset today’s water intake to zero?"
        );

    if (!shouldReset) {
        return;
    }

    waterData.consumed = 0;

    saveWaterData();
    renderWaterTracker();

    showWaterMessage(
        "Today’s water intake was reset.",
        "info"
    );

}


/**
 * Save today's result to history.
 */
function saveTodayWaterHistory() {

    const history =
        readWaterStorage(
            WATER_HISTORY_KEY,
            []
        );

    const safeHistory =
        Array.isArray(history)
            ? history
            : [];

    const record = {
        id:
            `water-${waterData.date}`,

        date:
            waterData.date,

        consumed:
            waterData.consumed,

        goal:
            waterData.goal,

        percentage:
            calculateWaterPercentage(
                waterData.consumed,
                waterData.goal
            ),

        goalCompleted:
            waterData.consumed >=
            waterData.goal,

        savedAt:
            new Date().toISOString()
    };

    const existingIndex =
        safeHistory.findIndex(
            function (item) {

                return (
                    item.date ===
                    waterData.date
                );

            }
        );

    if (existingIndex >= 0) {

        safeHistory[existingIndex] =
            record;

    } else {

        safeHistory.unshift(
            record
        );

    }

    const saved =
        writeWaterStorage(
            WATER_HISTORY_KEY,
            safeHistory
        );

    if (!saved) {
        return;
    }

    showWaterMessage(
        "Today’s water intake was saved to history.",
        "success"
    );

}


/**
 * Save previous day automatically.
 *
 * @param {Object} previousData
 */
function savePreviousWaterDayToHistory(
    previousData
) {

    const normalisedData =
        normaliseWaterData(
            previousData
        );

    const history =
        readWaterStorage(
            WATER_HISTORY_KEY,
            []
        );

    const safeHistory =
        Array.isArray(history)
            ? history
            : [];

    const record = {
        id:
            `water-${normalisedData.date}`,

        date:
            normalisedData.date,

        consumed:
            normalisedData.consumed,

        goal:
            normalisedData.goal,

        percentage:
            calculateWaterPercentage(
                normalisedData.consumed,
                normalisedData.goal
            ),

        goalCompleted:
            normalisedData.consumed >=
            normalisedData.goal,

        savedAt:
            new Date().toISOString()
    };

    const existingIndex =
        safeHistory.findIndex(
            function (item) {

                return (
                    item.date ===
                    normalisedData.date
                );

            }
        );

    if (existingIndex >= 0) {

        safeHistory[existingIndex] =
            record;

    } else {

        safeHistory.unshift(
            record
        );

    }

    writeWaterStorage(
        WATER_HISTORY_KEY,
        safeHistory
    );

}


/* =========================================================
   BUTTON EVENTS
========================================================= */

/**
 * Initialise tracker buttons.
 */
function initialiseWaterButtons() {

    connectWaterButton(
        "addWaterButton",
        addWaterGlass
    );

    connectWaterButton(
        "removeWaterButton",
        removeWaterGlass
    );

    connectWaterButton(
        "resetWaterButton",
        resetWaterIntake
    );

    connectWaterButton(
        "saveWaterHistoryButton",
        saveTodayWaterHistory
    );

}


/**
 * Connect one button.
 *
 * @param {string} id
 * @param {Function} handler
 */
function connectWaterButton(
    id,
    handler
) {

    const button =
        document.getElementById(id);

    if (button) {

        button.addEventListener(
            "click",
            handler
        );

    }

}


/* =========================================================
   SAVE CURRENT DATA
========================================================= */

/**
 * Save current water information.
 *
 * @returns {boolean}
 */
function saveWaterData() {

    return writeWaterStorage(
        WATER_TODAY_KEY,
        waterData
    );

}


/* =========================================================
   MESSAGES
========================================================= */

/**
 * Show a water page message.
 *
 * @param {string} message
 * @param {"success"|"error"|"info"} type
 */
function showWaterMessage(
    message,
    type
) {

    const messageElement =
        document.getElementById(
            "waterMessage"
        );

    if (!messageElement) {
        return;
    }

    messageElement.textContent =
        message;

    messageElement.className =
        `water-message visible ${type}`;

    window.clearTimeout(
        showWaterMessage.timeoutId
    );

    showWaterMessage.timeoutId =
        window.setTimeout(
            function () {

                messageElement.className =
                    "water-message";

                messageElement.textContent =
                    "";

            },
            3500
        );

}


/* =========================================================
   GENERAL HELPERS
========================================================= */

/**
 * Calculate water percentage.
 *
 * @param {number} consumed
 * @param {number} goal
 * @returns {number}
 */
function calculateWaterPercentage(
    consumed,
    goal
) {

    if (goal <= 0) {
        return 0;
    }

    return Math.round(
        (consumed / goal) * 100
    );

}


/**
 * Set text safely.
 *
 * @param {string} id
 * @param {string} value
 */
function setWaterText(id, value) {

    const element =
        document.getElementById(id);

    if (element) {
        element.textContent = value;
    }

}


/**
 * Return today's local date.
 *
 * @returns {string}
 */
function getWaterTodayKey() {

    const today = new Date();

    const year =
        today.getFullYear();

    const month = String(
        today.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        today.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;

}


/**
 * Read JSON from localStorage.
 *
 * @param {string} key
 * @param {*} defaultValue
 * @returns {*}
 */
function readWaterStorage(
    key,
    defaultValue
) {

    return StorageManager.read(
        key,
        defaultValue
    );

}


/**
 * Write JSON to localStorage.
 *
 * @param {string} key
 * @param {*} value
 * @returns {boolean}
 */
function writeWaterStorage(
    key,
    value
) {

    return StorageManager.save(
        key,
        value
    );

}