"use strict";

/**
 * Simple Fitness Planner
 * Workout Tracker page functionality.
 */


/* =========================================================
   STORAGE KEYS
========================================================= */

const DAILY_WORKOUT_KEY =
    "fitness_daily_workout";

const WORKOUT_HISTORY_KEY =
    "fitness_workout_history";


/* =========================================================
   PAGE STATE
========================================================= */

let currentWorkout = null;

let timerInterval = null;

let timerIsRunning = false;

let timerSeconds = 0;


/* =========================================================
   INITIALISATION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    if (
        document.body.dataset.page !==
        "workout-tracker"
    ) {
        return;
    }

    loadTodayWorkout();
    initialiseTrackerButtons();
    initialiseCustomExerciseForm();

});


/* =========================================================
   LOAD WORKOUT
========================================================= */

/**
 * Load today's workout from localStorage.
 */
function loadTodayWorkout() {

    const savedWorkout =
        readTrackerStorage(
            DAILY_WORKOUT_KEY,
            null
        );

    const todayKey =
        getTrackerTodayKey();

    if (
        !savedWorkout ||
        savedWorkout.date !== todayKey ||
        !Array.isArray(savedWorkout.exercises)
    ) {

        currentWorkout = null;
        showWorkoutEmptyState();
        return;

    }

    currentWorkout =
        normaliseWorkout(savedWorkout);

    timerSeconds =
        Number(currentWorkout.durationSeconds) ||
        Number(currentWorkout.duration || 0) * 60 ||
        0;

    saveCurrentWorkout();
    showWorkoutTracker();
    renderWorkout();

}


/**
 * Make sure the workout has all required fields.
 *
 * @param {Object} workout
 * @returns {Object}
 */
function normaliseWorkout(workout) {

    return {
        date:
            workout.date ||
            getTrackerTodayKey(),

        planId:
            workout.planId ?? null,

        planName:
            workout.planName ||
            "Custom Workout",

        icon:
            workout.icon ||
            "🏋️",

        difficulty:
            workout.difficulty ||
            "Custom",

        goal:
            workout.goal ||
            "Daily Activity",

        suggestedDuration:
            Number(
                workout.suggestedDuration
            ) || 0,

        duration:
            Number(
                workout.duration
            ) || 0,

        durationSeconds:
            Number(
                workout.durationSeconds
            ) ||
            Number(workout.duration || 0) * 60 ||
            0,

        completed:
            workout.completed === true,

        completedAt:
            workout.completedAt || null,

        exercises:
            workout.exercises.map(
                function (exercise, index) {

                    return {
                        id:
                            exercise.id ||
                            `exercise-${index + 1}`,

                        name:
                            exercise.name ||
                            `Exercise ${index + 1}`,

                        target:
                            exercise.target ||
                            "Complete exercise",

                        category:
                            exercise.category ||
                            "",

                        difficulty:
                            exercise.difficulty ||
                            "",

                        completed:
                            exercise.completed === true
                    };

                }
            )
    };

}


/* =========================================================
   PAGE VISIBILITY
========================================================= */

/**
 * Show the no-workout message.
 */
function showWorkoutEmptyState() {

    const emptyState =
        document.getElementById(
            "trackerEmptyState"
        );

    const trackerContainer =
        document.getElementById(
            "workoutTrackerContainer"
        );

    if (emptyState) {
        emptyState.classList.remove("hidden");
    }

    if (trackerContainer) {
        trackerContainer.classList.add("hidden");
    }

}


/**
 * Show the workout tracker.
 */
function showWorkoutTracker() {

    const emptyState =
        document.getElementById(
            "trackerEmptyState"
        );

    const trackerContainer =
        document.getElementById(
            "workoutTrackerContainer"
        );

    if (emptyState) {
        emptyState.classList.add("hidden");
    }

    if (trackerContainer) {
        trackerContainer.classList.remove("hidden");
    }

}


/* =========================================================
   RENDER WORKOUT
========================================================= */

/**
 * Render all workout information.
 */
function renderWorkout() {

    if (!currentWorkout) {
        return;
    }

    displayWorkoutHeading();
    renderExerciseList();
    updateWorkoutProgress();
    updateTimerDisplay();

}


/**
 * Display plan details.
 */
function displayWorkoutHeading() {

    setTrackerText(
        "currentWorkoutName",
        currentWorkout.planName
    );

    setTrackerText(
        "currentWorkoutIcon",
        currentWorkout.icon || "🏋️"
    );

    setTrackerText(
        "currentWorkoutDifficulty",
        currentWorkout.difficulty
    );

    setTrackerText(
        "currentWorkoutGoal",
        currentWorkout.goal
    );

    setTrackerText(
        "currentWorkoutExerciseTotal",
        String(currentWorkout.exercises.length)
    );

    setTrackerText(
        "currentWorkoutSuggestedTime",
        currentWorkout.suggestedDuration > 0
            ? `${currentWorkout.suggestedDuration} minutes`
            : "Not specified"
    );

    const formattedDate =
        new Intl.DateTimeFormat(
            "en-US",
            {
                weekday: "long",
                month: "long",
                day: "numeric"
            }
        ).format(new Date());

    setTrackerText(
        "currentWorkoutDate",
        formattedDate
    );

    const difficultyElement =
        document.getElementById(
            "currentWorkoutDifficulty"
        );

    if (difficultyElement) {

        difficultyElement.className =
            "tracker-difficulty-badge";

        const difficultyClass =
            currentWorkout.difficulty
                .toLowerCase();

        if (
            [
                "beginner",
                "intermediate",
                "advanced"
            ].includes(difficultyClass)
        ) {

            difficultyElement.classList.add(
                difficultyClass
            );

        }

    }

}


/* =========================================================
   EXERCISE LIST
========================================================= */

/**
 * Render exercise checklist.
 */
function renderExerciseList() {

    const exerciseList =
        document.getElementById(
            "trackerExerciseList"
        );

    if (!exerciseList || !currentWorkout) {
        return;
    }

    exerciseList.innerHTML = "";

    if (currentWorkout.exercises.length === 0) {

        exerciseList.innerHTML = `
            <div class="tracker-exercise-list-empty">
                No exercises are currently in this workout.
                Add a custom exercise below.
            </div>
        `;

        return;

    }

    currentWorkout.exercises.forEach(
        function (exercise, index) {

            const exerciseElement =
                document.createElement("article");

            exerciseElement.className =
                exercise.completed
                    ? "tracker-exercise-item completed"
                    : "tracker-exercise-item";

            exerciseElement.innerHTML = `
                <input
                    type="checkbox"
                    class="tracker-exercise-checkbox"
                    data-exercise-index="${index}"
                    aria-label="Mark ${escapeTrackerHTML(exercise.name)} complete"
                    ${exercise.completed ? "checked" : ""}
                >

                <div class="tracker-exercise-info">

                    <h3>
                        ${escapeTrackerHTML(exercise.name)}
                    </h3>

                    <p>
                        ${escapeTrackerHTML(exercise.target)}
                    </p>

                </div>

                <div class="tracker-exercise-actions">

                    <button
                        type="button"
                        class="tracker-exercise-action tracker-toggle-button"
                        data-toggle-index="${index}"
                        aria-label="${
                            exercise.completed
                                ? "Mark incomplete"
                                : "Mark complete"
                        }"
                    >
                        ${exercise.completed ? "↩" : "✓"}
                    </button>

                    <button
                        type="button"
                        class="tracker-exercise-action tracker-remove-button"
                        data-remove-index="${index}"
                        aria-label="Remove ${escapeTrackerHTML(exercise.name)}"
                    >
                        ×
                    </button>

                </div>
            `;

            exerciseList.appendChild(
                exerciseElement
            );

        }
    );

    initialiseExerciseEvents();

}


/**
 * Add events to exercise buttons.
 */
function initialiseExerciseEvents() {

    const checkboxes =
        document.querySelectorAll(
            "[data-exercise-index]"
        );

    checkboxes.forEach(
        function (checkbox) {

            checkbox.addEventListener(
                "change",
                function () {

                    const index =
                        Number(
                            checkbox.dataset.exerciseIndex
                        );

                    setExerciseCompleted(
                        index,
                        checkbox.checked
                    );

                }
            );

        }
    );

    const toggleButtons =
        document.querySelectorAll(
            "[data-toggle-index]"
        );

    toggleButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const index =
                        Number(
                            button.dataset.toggleIndex
                        );

                    toggleExerciseCompleted(index);

                }
            );

        }
    );

    const removeButtons =
        document.querySelectorAll(
            "[data-remove-index]"
        );

    removeButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const index =
                        Number(
                            button.dataset.removeIndex
                        );

                    removeWorkoutExercise(index);

                }
            );

        }
    );

}


/**
 * Set exercise completion.
 *
 * @param {number} index
 * @param {boolean} completed
 */
function setExerciseCompleted(
    index,
    completed
) {

    if (
        !currentWorkout ||
        !currentWorkout.exercises[index]
    ) {
        return;
    }

    currentWorkout.exercises[index].completed =
        completed;

    currentWorkout.completed =
        currentWorkout.exercises.length > 0 &&
        currentWorkout.exercises.every(
            function (exercise) {
                return exercise.completed;
            }
        );

    saveCurrentWorkout();
    renderExerciseList();
    updateWorkoutProgress();

}


/**
 * Reverse exercise completion.
 *
 * @param {number} index
 */
function toggleExerciseCompleted(index) {

    if (
        !currentWorkout ||
        !currentWorkout.exercises[index]
    ) {
        return;
    }

    setExerciseCompleted(
        index,
        !currentWorkout.exercises[index].completed
    );

}


/**
 * Remove one exercise.
 *
 * @param {number} index
 */
function removeWorkoutExercise(index) {

    if (
        !currentWorkout ||
        !currentWorkout.exercises[index]
    ) {
        return;
    }

    const exerciseName =
        currentWorkout.exercises[index].name;

    const shouldRemove =
        window.confirm(
            `Remove "${exerciseName}" from today's workout?`
        );

    if (!shouldRemove) {
        return;
    }

    currentWorkout.exercises.splice(
        index,
        1
    );

    currentWorkout.completed = false;

    saveCurrentWorkout();
    renderWorkout();

    showTrackerMessage(
        `${exerciseName} was removed.`,
        "info"
    );

}


/* =========================================================
   PROGRESS
========================================================= */

/**
 * Update progress values.
 */
function updateWorkoutProgress() {

    if (!currentWorkout) {
        return;
    }

    const total =
        currentWorkout.exercises.length;

    const completed =
        currentWorkout.exercises.filter(
            function (exercise) {
                return exercise.completed;
            }
        ).length;

    const remaining =
        Math.max(0, total - completed);

    const percentage =
        total === 0
            ? 0
            : Math.round(
                (completed / total) * 100
            );

    setTrackerText(
        "trackerPercentage",
        `${percentage}%`
    );

    setTrackerText(
        "trackerProgressText",
        `${completed} of ${total} exercises completed`
    );

    setTrackerText(
        "trackerRemainingText",
        `${remaining} remaining`
    );

    setTrackerText(
        "completedTrackerCount",
        String(completed)
    );

    setTrackerText(
        "remainingTrackerCount",
        String(remaining)
    );

    setTrackerText(
        "totalTrackerCount",
        String(total)
    );

    setTrackerText(
        "currentWorkoutExerciseTotal",
        String(total)
    );

    const progressFill =
        document.getElementById(
            "trackerProgressFill"
        );

    const progressBar =
        document.getElementById(
            "trackerProgressBar"
        );

    if (progressFill) {

        progressFill.style.width =
            `${percentage}%`;

        progressFill.classList.toggle(
            "progress-fill-success",
            percentage === 100
        );

    }

    if (progressBar) {

        progressBar.setAttribute(
            "aria-valuenow",
            String(percentage)
        );

    }

}


/* =========================================================
   CUSTOM EXERCISE
========================================================= */

/**
 * Initialise custom exercise form.
 */
function initialiseCustomExerciseForm() {

    const form =
        document.getElementById(
            "customExerciseForm"
        );

    if (!form) {
        return;
    }

    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();
            addCustomExercise();

        }
    );

}


/**
 * Add a custom exercise.
 */
function addCustomExercise() {

    if (!currentWorkout) {
        return;
    }

    const nameInput =
        document.getElementById(
            "customExerciseName"
        );

    const targetInput =
        document.getElementById(
            "customExerciseTarget"
        );

    const nameError =
        document.getElementById(
            "customExerciseNameError"
        );

    const targetError =
        document.getElementById(
            "customExerciseTargetError"
        );

    const name =
        nameInput
            ? nameInput.value.trim()
            : "";

    const target =
        targetInput
            ? targetInput.value.trim()
            : "";

    let valid = true;

    if (nameError) {
        nameError.textContent = "";
    }

    if (targetError) {
        targetError.textContent = "";
    }

    if (name.length < 2) {

        valid = false;

        if (nameError) {
            nameError.textContent =
                "Enter an exercise name.";
        }

    }

    if (target.length < 2) {

        valid = false;

        if (targetError) {
            targetError.textContent =
                "Enter a target or duration.";
        }

    }

    const duplicateExists =
        currentWorkout.exercises.some(
            function (exercise) {

                return (
                    exercise.name.toLowerCase() ===
                    name.toLowerCase()
                );

            }
        );

    if (duplicateExists) {

        valid = false;

        if (nameError) {
            nameError.textContent =
                "This exercise is already in the workout.";
        }

    }

    if (!valid) {
        return;
    }

    currentWorkout.exercises.push({
        id: `custom-${Date.now()}`,
        name: name,
        target: target,
        category: "Custom",
        difficulty: "Custom",
        completed: false
    });

    currentWorkout.completed = false;

    saveCurrentWorkout();
    renderWorkout();

    if (nameInput) {
        nameInput.value = "";
    }

    if (targetInput) {
        targetInput.value = "";
    }

    showTrackerMessage(
        `${name} was added to the workout.`,
        "success"
    );

}


/* =========================================================
   TIMER
========================================================= */

/**
 * Start the workout timer.
 */
function startWorkoutTimer() {

    if (!currentWorkout || timerIsRunning) {
        return;
    }

    timerIsRunning = true;

    updateTimerButtons();

    setTrackerText(
        "timerStatus",
        "Workout timer is running."
    );

    timerInterval =
        window.setInterval(
            function () {

                timerSeconds += 1;

                currentWorkout.durationSeconds =
                    timerSeconds;

                currentWorkout.duration =
                    Math.floor(
                        timerSeconds / 60
                    );

                updateTimerDisplay();

                if (timerSeconds % 5 === 0) {
                    saveCurrentWorkout();
                }

            },
            1000
        );

}


/**
 * Pause the workout timer.
 */
function pauseWorkoutTimer() {

    if (!timerIsRunning) {
        return;
    }

    window.clearInterval(
        timerInterval
    );

    timerInterval = null;
    timerIsRunning = false;

    saveCurrentWorkout();
    updateTimerButtons();

    setTrackerText(
        "timerStatus",
        "Timer is paused."
    );

}


/**
 * Reset the workout timer.
 */
function resetWorkoutTimer() {

    const shouldReset =
        window.confirm(
            "Reset the workout timer to zero?"
        );

    if (!shouldReset) {
        return;
    }

    window.clearInterval(
        timerInterval
    );

    timerInterval = null;
    timerIsRunning = false;
    timerSeconds = 0;

    if (currentWorkout) {
        currentWorkout.duration = 0;
        currentWorkout.durationSeconds = 0;
        saveCurrentWorkout();
    }

    updateTimerDisplay();
    updateTimerButtons();

    setTrackerText(
        "timerStatus",
        "Timer was reset."
    );

}


/**
 * Update timer text.
 */
function updateTimerDisplay() {

    const timerDisplay =
        document.getElementById(
            "timerDisplay"
        );

    if (!timerDisplay) {
        return;
    }

    const hours =
        Math.floor(
            timerSeconds / 3600
        );

    const minutes =
        Math.floor(
            (timerSeconds % 3600) / 60
        );

    const seconds =
        timerSeconds % 60;

    timerDisplay.textContent =
        [
            hours,
            minutes,
            seconds
        ]
            .map(
                function (value) {
                    return String(value).padStart(
                        2,
                        "0"
                    );
                }
            )
            .join(":");

}


/**
 * Enable and disable timer buttons.
 */
function updateTimerButtons() {

    const startButton =
        document.getElementById(
            "startTimerButton"
        );

    const pauseButton =
        document.getElementById(
            "pauseTimerButton"
        );

    if (startButton) {
        startButton.disabled =
            timerIsRunning;
    }

    if (pauseButton) {
        pauseButton.disabled =
            !timerIsRunning;
    }

}


/* =========================================================
   WORKOUT ACTIONS
========================================================= */

/**
 * Initialise all tracker buttons.
 */
function initialiseTrackerButtons() {

    connectTrackerButton(
        "startTimerButton",
        startWorkoutTimer
    );

    connectTrackerButton(
        "pauseTimerButton",
        pauseWorkoutTimer
    );

    connectTrackerButton(
        "resetTimerButton",
        resetWorkoutTimer
    );

    connectTrackerButton(
        "finishWorkoutButton",
        finishWorkout
    );

    connectTrackerButton(
        "resetWorkoutProgressButton",
        resetWorkoutProgress
    );

    connectTrackerButton(
        "deleteWorkoutButton",
        deleteDailyWorkout
    );

    connectTrackerButton(
        "markAllCompleteButton",
        markAllExercisesComplete
    );

}


/**
 * Mark every exercise complete.
 */
function markAllExercisesComplete() {

    if (
        !currentWorkout ||
        currentWorkout.exercises.length === 0
    ) {
        return;
    }

    const allCompleted =
        currentWorkout.exercises.every(
            function (exercise) {
                return exercise.completed;
            }
        );

    currentWorkout.exercises.forEach(
        function (exercise) {
            exercise.completed =
                !allCompleted;
        }
    );

    currentWorkout.completed =
        !allCompleted;

    saveCurrentWorkout();
    renderWorkout();

    showTrackerMessage(
        allCompleted
            ? "All exercises were marked incomplete."
            : "All exercises were marked complete.",
        "info"
    );

}


/**
 * Finish and save workout history.
 */
function finishWorkout() {

    if (!currentWorkout) {
        return;
    }

    if (
        currentWorkout.exercises.length === 0
    ) {

        showTrackerMessage(
            "Add at least one exercise before finishing.",
            "error"
        );

        return;

    }

    const incompleteCount =
        currentWorkout.exercises.filter(
            function (exercise) {
                return !exercise.completed;
            }
        ).length;

    if (incompleteCount > 0) {

        const continueFinishing =
            window.confirm(
                `${incompleteCount} exercises are incomplete. Finish the workout anyway?`
            );

        if (!continueFinishing) {
            return;
        }

    }

    pauseTimerIfRunning();

    const completedCount =
        currentWorkout.exercises.filter(
            function (exercise) {
                return exercise.completed;
            }
        ).length;

    currentWorkout.completed = true;
    currentWorkout.completedAt =
        new Date().toISOString();

    currentWorkout.durationSeconds =
        timerSeconds;

    currentWorkout.duration =
        Math.floor(timerSeconds / 60);

    const history =
        readTrackerStorage(
            WORKOUT_HISTORY_KEY,
            []
        );

    const safeHistory =
        Array.isArray(history)
            ? history
            : [];

    const historyRecord = {
        id: `workout-${Date.now()}`,
        date: currentWorkout.date,
        completedAt:
            currentWorkout.completedAt,
        planName:
            currentWorkout.planName,
        difficulty:
            currentWorkout.difficulty,
        goal:
            currentWorkout.goal,
        completedExercises:
            completedCount,
        totalExercises:
            currentWorkout.exercises.length,
        duration:
            currentWorkout.duration,
        durationSeconds:
            currentWorkout.durationSeconds
    };

    const existingIndex =
        safeHistory.findIndex(
            function (record) {

                return (
                    record.date ===
                        currentWorkout.date &&
                    record.planName ===
                        currentWorkout.planName
                );

            }
        );

    if (existingIndex >= 0) {

        safeHistory[existingIndex] =
            historyRecord;

    } else {

        safeHistory.unshift(
            historyRecord
        );

    }

    writeTrackerStorage(
        WORKOUT_HISTORY_KEY,
        safeHistory
    );

    saveCurrentWorkout();
    renderWorkout();

    showTrackerMessage(
        "Workout completed and saved to your progress history!",
        "success"
    );

}


/**
 * Reset exercise completion.
 */
function resetWorkoutProgress() {

    if (!currentWorkout) {
        return;
    }

    const shouldReset =
        window.confirm(
            "Reset all exercise progress for today?"
        );

    if (!shouldReset) {
        return;
    }

    currentWorkout.exercises.forEach(
        function (exercise) {
            exercise.completed = false;
        }
    );

    currentWorkout.completed = false;
    currentWorkout.completedAt = null;

    saveCurrentWorkout();
    renderWorkout();

    showTrackerMessage(
        "Workout progress was reset.",
        "info"
    );

}


/**
 * Delete today's workout.
 */
function deleteDailyWorkout() {

    if (!currentWorkout) {
        return;
    }

    const shouldDelete =
        window.confirm(
            "Delete today's complete workout and all its exercises?"
        );

    if (!shouldDelete) {
        return;
    }

    pauseTimerIfRunning();

    try {
        StorageManager.remove(
            DAILY_WORKOUT_KEY
        );

        StorageManager.remove(
            "fitness_selected_plan"
        );
    } catch (error) {
        console.warn(
            "Unable to delete workout:",
            error
        );
    }

    currentWorkout = null;
    timerSeconds = 0;

    showWorkoutEmptyState();

    showTrackerMessage(
        "Today's workout was deleted.",
        "info"
    );

}


/**
 * Pause timer without user messages.
 */
function pauseTimerIfRunning() {

    if (!timerIsRunning) {
        return;
    }

    window.clearInterval(
        timerInterval
    );

    timerInterval = null;
    timerIsRunning = false;

    updateTimerButtons();

}


/* =========================================================
   SAVE WORKOUT
========================================================= */

/**
 * Save the current workout.
 *
 * @returns {boolean}
 */
function saveCurrentWorkout() {

    if (!currentWorkout) {
        return false;
    }

    currentWorkout.durationSeconds =
        timerSeconds;

    currentWorkout.duration =
        Math.floor(timerSeconds / 60);

    return writeTrackerStorage(
        DAILY_WORKOUT_KEY,
        currentWorkout
    );

}


/* =========================================================
   MESSAGES
========================================================= */

/**
 * Display a tracker message.
 *
 * @param {string} message
 * @param {"success"|"error"|"info"} type
 */
function showTrackerMessage(
    message,
    type
) {

    const messageElement =
        document.getElementById(
            "trackerMessage"
        );

    if (!messageElement) {
        return;
    }

    messageElement.textContent =
        message;

    messageElement.className =
        `tracker-message visible ${type}`;

    window.clearTimeout(
        showTrackerMessage.timeoutId
    );

    showTrackerMessage.timeoutId =
        window.setTimeout(
            function () {

                messageElement.className =
                    "tracker-message";

                messageElement.textContent =
                    "";

            },
            4000
        );

}


/* =========================================================
   GENERAL HELPERS
========================================================= */

/**
 * Connect a button to a function.
 *
 * @param {string} buttonId
 * @param {Function} handler
 */
function connectTrackerButton(
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


/**
 * Set element text safely.
 *
 * @param {string} id
 * @param {string} value
 */
function setTrackerText(id, value) {

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
function getTrackerTodayKey() {

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
function readTrackerStorage(
    key,
    defaultValue
) {

    return StorageManager.read(
        key,
        defaultValue
    );

}


/**
 * Save JSON in localStorage.
 *
 * @param {string} key
 * @param {*} value
 * @returns {boolean}
 */
function writeTrackerStorage(
    key,
    value
) {

    const saved = StorageManager.save(
        key,
        value
    );

    if (!saved) {
        showTrackerMessage(
            "The workout could not be saved.",
            "error"
        );
    }

    return saved;

}


/**
 * Escape generated HTML.
 *
 * @param {*} value
 * @returns {string}
 */
function escapeTrackerHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =========================================================
   SAVE BEFORE LEAVING
========================================================= */

window.addEventListener(
    "beforeunload",
    function () {

        if (currentWorkout) {
            saveCurrentWorkout();
        }

    }
);