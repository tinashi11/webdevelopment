"use strict";

/**
 * Simple Fitness Planner
 * Workout Plans page functionality.
 */


/* =========================================================
   1. WORKOUT PLAN DATA
========================================================= */

const workoutPlans = [
    {
        id: 1,
        name: "Beginner Full Body",
        icon: "🌱",
        difficulty: "Beginner",
        duration: 20,
        goal: "General Fitness",
        description:
            "A simple full-body routine for users who are starting their fitness journey.",
        exercises: [
            {
                name: "March in Place",
                target: "2 minutes"
            },
            {
                name: "Bodyweight Squats",
                target: "2 sets × 10"
            },
            {
                name: "Wall Push-Ups",
                target: "2 sets × 8"
            },
            {
                name: "Standing Knee Raises",
                target: "2 sets × 10"
            },
            {
                name: "Standing Stretch",
                target: "2 minutes"
            }
        ]
    },
    {
        id: 2,
        name: "Quick Morning Energy",
        icon: "☀️",
        difficulty: "Beginner",
        duration: 10,
        goal: "Energy",
        description:
            "A short morning routine designed to wake up your body and improve energy.",
        exercises: [
            {
                name: "Arm Circles",
                target: "30 seconds"
            },
            {
                name: "Jumping Jacks",
                target: "30 seconds"
            },
            {
                name: "Bodyweight Squats",
                target: "12 repetitions"
            },
            {
                name: "High Knees",
                target: "30 seconds"
            },
            {
                name: "Side Stretch",
                target: "1 minute"
            }
        ]
    },
    {
        id: 3,
        name: "Upper Body Strength",
        icon: "💪",
        difficulty: "Intermediate",
        duration: 25,
        goal: "Strength",
        description:
            "Build upper-body strength using simple bodyweight exercises without equipment.",
        exercises: [
            {
                name: "Push-Ups",
                target: "3 sets × 10"
            },
            {
                name: "Shoulder Taps",
                target: "3 sets × 12"
            },
            {
                name: "Tricep Dips",
                target: "3 sets × 8"
            },
            {
                name: "Plank",
                target: "3 × 30 seconds"
            },
            {
                name: "Arm Stretch",
                target: "2 minutes"
            }
        ]
    },
    {
        id: 4,
        name: "Lower Body Builder",
        icon: "🦵",
        difficulty: "Intermediate",
        duration: 30,
        goal: "Lower Body",
        description:
            "Strengthen your legs and glutes with controlled lower-body movements.",
        exercises: [
            {
                name: "Squats",
                target: "3 sets × 15"
            },
            {
                name: "Reverse Lunges",
                target: "3 sets × 10"
            },
            {
                name: "Glute Bridges",
                target: "3 sets × 15"
            },
            {
                name: "Wall Sit",
                target: "3 × 30 seconds"
            },
            {
                name: "Calf Raises",
                target: "3 sets × 20"
            }
        ]
    },
    {
        id: 5,
        name: "Cardio Blast",
        icon: "🔥",
        difficulty: "Advanced",
        duration: 35,
        goal: "Cardio",
        description:
            "A faster cardio routine designed to increase your heart rate and endurance.",
        exercises: [
            {
                name: "Jumping Jacks",
                target: "3 × 45 seconds"
            },
            {
                name: "High Knees",
                target: "3 × 40 seconds"
            },
            {
                name: "Mountain Climbers",
                target: "3 × 30 seconds"
            },
            {
                name: "Burpees",
                target: "3 sets × 10"
            },
            {
                name: "Skater Jumps",
                target: "3 × 40 seconds"
            }
        ]
    },
    {
        id: 6,
        name: "Core Stability",
        icon: "🎯",
        difficulty: "Intermediate",
        duration: 20,
        goal: "Core",
        description:
            "Improve balance and core stability with controlled abdominal exercises.",
        exercises: [
            {
                name: "Plank",
                target: "3 × 30 seconds"
            },
            {
                name: "Dead Bug",
                target: "3 sets × 10"
            },
            {
                name: "Bicycle Crunches",
                target: "3 sets × 12"
            },
            {
                name: "Leg Raises",
                target: "3 sets × 10"
            },
            {
                name: "Bird Dog",
                target: "3 sets × 10"
            }
        ]
    },
    {
        id: 7,
        name: "Stretch and Relax",
        icon: "🧘",
        difficulty: "Beginner",
        duration: 15,
        goal: "Flexibility",
        description:
            "A gentle stretching routine to improve flexibility and reduce body tension.",
        exercises: [
            {
                name: "Neck Stretch",
                target: "1 minute"
            },
            {
                name: "Shoulder Stretch",
                target: "2 minutes"
            },
            {
                name: "Standing Forward Fold",
                target: "1 minute"
            },
            {
                name: "Seated Hamstring Stretch",
                target: "2 minutes"
            },
            {
                name: "Child's Pose",
                target: "2 minutes"
            }
        ]
    },
    {
        id: 8,
        name: "Advanced Full Body",
        icon: "⚡",
        difficulty: "Advanced",
        duration: 45,
        goal: "Full Body",
        description:
            "A challenging full-body routine for users with good exercise experience.",
        exercises: [
            {
                name: "Burpees",
                target: "4 sets × 12"
            },
            {
                name: "Push-Ups",
                target: "4 sets × 15"
            },
            {
                name: "Jump Squats",
                target: "4 sets × 12"
            },
            {
                name: "Mountain Climbers",
                target: "4 × 45 seconds"
            },
            {
                name: "Plank Shoulder Taps",
                target: "4 sets × 16"
            },
            {
                name: "Reverse Lunges",
                target: "4 sets × 12"
            }
        ]
    }
];


/* =========================================================
   2. PAGE STATE
========================================================= */

let filteredWorkoutPlans = [...workoutPlans];


/* =========================================================
   3. PAGE INITIALISATION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    if (
        document.body.dataset.page !==
        "workout-plans"
    ) {
        return;
    }

    displayWorkoutPlans(workoutPlans);
    initialiseWorkoutFilters();
    initialiseResetButtons();

});


/* =========================================================
   4. DISPLAY WORKOUT PLANS
========================================================= */

/**
 * Display workout cards.
 *
 * @param {Array} plans
 */
function displayWorkoutPlans(plans) {

    const workoutContainer =
        document.getElementById(
            "workoutPlansContainer"
        );

    const emptyState =
        document.getElementById(
            "workoutEmptyState"
        );

    if (!workoutContainer || !emptyState) {
        return;
    }

    workoutContainer.innerHTML = "";

    updateResultCount(plans.length);

    if (plans.length === 0) {

        emptyState.classList.remove("hidden");
        return;

    }

    emptyState.classList.add("hidden");

    plans.forEach(function (plan) {

        const workoutCard =
            createWorkoutPlanCard(plan);

        workoutContainer.appendChild(
            workoutCard
        );

    });

}


/**
 * Create one workout-plan card.
 *
 * @param {Object} plan
 * @returns {HTMLElement}
 */
function createWorkoutPlanCard(plan) {

    const article =
        document.createElement("article");

    article.className =
        "workout-plan-card";

    article.dataset.planId =
        String(plan.id);

    const difficultyClass =
        getDifficultyClass(
            plan.difficulty
        );

    const exerciseItems =
        plan.exercises.map(
            function (exercise) {

                return `
                    <li class="workout-exercise-item">
                        <span class="workout-exercise-name">
                            ${escapeHTML(exercise.name)}
                        </span>

                        <span class="workout-exercise-target">
                            ${escapeHTML(exercise.target)}
                        </span>
                    </li>
                `;

            }
        ).join("");

    article.innerHTML = `
        <div class="workout-card-main">

            <div class="workout-card-header">

                <div
                    class="workout-plan-icon"
                    aria-hidden="true"
                >
                    ${plan.icon}
                </div>

                <span
                    class="workout-difficulty ${difficultyClass}"
                >
                    ${escapeHTML(plan.difficulty)}
                </span>

            </div>

            <h3>
                ${escapeHTML(plan.name)}
            </h3>

            <p class="workout-plan-description">
                ${escapeHTML(plan.description)}
            </p>

            <div class="workout-plan-meta">

                <div class="workout-meta-item">

                    <span
                        class="workout-meta-icon"
                        aria-hidden="true"
                    >
                        ⏱️
                    </span>

                    <span class="workout-meta-value">
                        ${plan.duration} min
                    </span>

                    <span class="workout-meta-label">
                        Duration
                    </span>

                </div>

                <div class="workout-meta-item">

                    <span
                        class="workout-meta-icon"
                        aria-hidden="true"
                    >
                        📋
                    </span>

                    <span class="workout-meta-value">
                        ${plan.exercises.length}
                    </span>

                    <span class="workout-meta-label">
                        Exercises
                    </span>

                </div>

                <div class="workout-meta-item">

                    <span
                        class="workout-meta-icon"
                        aria-hidden="true"
                    >
                        🎯
                    </span>

                    <span class="workout-meta-value">
                        ${escapeHTML(plan.goal)}
                    </span>

                    <span class="workout-meta-label">
                        Goal
                    </span>

                </div>

            </div>

            <div class="workout-exercises-section">

                <button
                    type="button"
                    class="workout-exercises-toggle"
                    aria-expanded="false"
                >
                    <span>
                        View Exercises
                    </span>

                    <span
                        class="workout-toggle-icon"
                        aria-hidden="true"
                    >
                        ▾
                    </span>
                </button>

                <ul class="workout-exercise-list">
                    ${exerciseItems}
                </ul>

            </div>

            <div class="workout-card-actions">

                <button
                    type="button"
                    class="button button-primary workout-start-button"
                    data-start-plan="${plan.id}"
                >
                    Start Plan
                </button>

                <button
                    type="button"
                    class="button button-light workout-details-button"
                    data-toggle-plan="${plan.id}"
                    aria-label="Show exercises for ${escapeHTML(plan.name)}"
                >
                    +
                </button>

            </div>

        </div>
    `;

    initialiseCardEvents(
        article,
        plan
    );

    return article;

}


/* =========================================================
   5. CARD EVENTS
========================================================= */

/**
 * Add button events to a card.
 *
 * @param {HTMLElement} card
 * @param {Object} plan
 */
function initialiseCardEvents(card, plan) {

    const toggleButton =
        card.querySelector(
            ".workout-exercises-toggle"
        );

    const detailsButton =
        card.querySelector(
            ".workout-details-button"
        );

    const startButton =
        card.querySelector(
            ".workout-start-button"
        );

    if (toggleButton) {

        toggleButton.addEventListener(
            "click",
            function () {

                toggleExerciseList(card);

            }
        );

    }

    if (detailsButton) {

        detailsButton.addEventListener(
            "click",
            function () {

                toggleExerciseList(card);

            }
        );

    }

    if (startButton) {

        startButton.addEventListener(
            "click",
            function () {

                startWorkoutPlan(plan);

            }
        );

    }

}


/**
 * Open or close a card's exercise list.
 *
 * @param {HTMLElement} card
 */
function toggleExerciseList(card) {

    const exerciseList =
        card.querySelector(
            ".workout-exercise-list"
        );

    const toggleButton =
        card.querySelector(
            ".workout-exercises-toggle"
        );

    const detailsButton =
        card.querySelector(
            ".workout-details-button"
        );

    if (
        !exerciseList ||
        !toggleButton
    ) {
        return;
    }

    const isOpen =
        exerciseList.classList.toggle("open");

    toggleButton.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    const buttonText =
        toggleButton.querySelector(
            "span:first-child"
        );

    if (buttonText) {

        buttonText.textContent =
            isOpen
                ? "Hide Exercises"
                : "View Exercises";

    }

    if (detailsButton) {

        detailsButton.textContent =
            isOpen ? "−" : "+";

    }

}


/* =========================================================
   6. START WORKOUT PLAN
========================================================= */

/**
 * Save the selected workout for the tracker.
 *
 * @param {Object} plan
 */
function startWorkoutPlan(plan) {

    const existingWorkout =
        readWorkoutStorage(
            "fitness_daily_workout",
            null
        );

    const todayKey =
        getWorkoutTodayKey();

    let replaceWorkout = true;

    if (
        existingWorkout &&
        existingWorkout.date === todayKey &&
        Array.isArray(existingWorkout.exercises) &&
        existingWorkout.exercises.length > 0
    ) {

        replaceWorkout = window.confirm(
            "You already have a workout for today. Replace it with this plan?"
        );

    }

    if (!replaceWorkout) {
        return;
    }

    const selectedPlan = {
        id: plan.id,
        name: plan.name,
        icon: plan.icon,
        difficulty: plan.difficulty,
        duration: plan.duration,
        goal: plan.goal,
        description: plan.description,
        exercises: plan.exercises
    };

    const dailyWorkout = {
        date: todayKey,
        planId: plan.id,
        planName: plan.name,
        icon: plan.icon,
        difficulty: plan.difficulty,
        goal: plan.goal,
        suggestedDuration: plan.duration,
        duration: 0,
        completed: false,
        exercises: plan.exercises.map(
            function (exercise, index) {

                return {
                    id: `${plan.id}-${index + 1}`,
                    name: exercise.name,
                    target: exercise.target,
                    completed: false
                };

            }
        )
    };

    const planSaved =
        writeWorkoutStorage(
            "fitness_selected_plan",
            selectedPlan
        );

    const workoutSaved =
        writeWorkoutStorage(
            "fitness_daily_workout",
            dailyWorkout
        );

    if (!planSaved || !workoutSaved) {

        showWorkoutMessage(
            "The workout could not be saved. Please check your browser settings.",
            "error"
        );

        return;

    }

    showWorkoutMessage(
        `${plan.name} was selected successfully. Opening your workout tracker...`,
        "success"
    );

    window.setTimeout(function () {

        window.location.href =
            "workout-tracker.html";

    }, 700);

}


/* =========================================================
   7. FILTERS
========================================================= */

/**
 * Initialise search and filters.
 */
function initialiseWorkoutFilters() {

    const searchInput =
        document.getElementById(
            "workoutSearch"
        );

    const difficultyFilter =
        document.getElementById(
            "difficultyFilter"
        );

    const durationFilter =
        document.getElementById(
            "durationFilter"
        );

    if (
        !searchInput ||
        !difficultyFilter ||
        !durationFilter
    ) {
        return;
    }

    searchInput.addEventListener(
        "input",
        filterWorkoutPlans
    );

    difficultyFilter.addEventListener(
        "change",
        filterWorkoutPlans
    );

    durationFilter.addEventListener(
        "change",
        filterWorkoutPlans
    );

}


/**
 * Filter the workout-plan array.
 */
function filterWorkoutPlans() {

    const searchInput =
        document.getElementById(
            "workoutSearch"
        );

    const difficultyFilter =
        document.getElementById(
            "difficultyFilter"
        );

    const durationFilter =
        document.getElementById(
            "durationFilter"
        );

    const searchValue =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";

    const difficultyValue =
        difficultyFilter
            ? difficultyFilter.value
            : "all";

    const durationValue =
        durationFilter
            ? durationFilter.value
            : "all";

    filteredWorkoutPlans =
        workoutPlans.filter(
            function (plan) {

                const searchableText = `
                    ${plan.name}
                    ${plan.goal}
                    ${plan.description}
                    ${plan.difficulty}
                `.toLowerCase();

                const matchesSearch =
                    searchableText.includes(
                        searchValue
                    );

                const matchesDifficulty =
                    difficultyValue === "all" ||
                    plan.difficulty ===
                    difficultyValue;

                const matchesDuration =
                    matchesDurationFilter(
                        plan.duration,
                        durationValue
                    );

                return (
                    matchesSearch &&
                    matchesDifficulty &&
                    matchesDuration
                );

            }
        );

    displayWorkoutPlans(
        filteredWorkoutPlans
    );

}


/**
 * Check the duration category.
 *
 * @param {number} duration
 * @param {string} filterValue
 * @returns {boolean}
 */
function matchesDurationFilter(
    duration,
    filterValue
) {

    if (filterValue === "all") {
        return true;
    }

    if (filterValue === "short") {
        return duration <= 15;
    }

    if (filterValue === "medium") {

        return (
            duration >= 16 &&
            duration <= 30
        );

    }

    if (filterValue === "long") {
        return duration > 30;
    }

    return true;

}


/* =========================================================
   8. RESET FILTERS
========================================================= */

/**
 * Initialise reset buttons.
 */
function initialiseResetButtons() {

    const resetButton =
        document.getElementById(
            "resetFiltersButton"
        );

    const emptyStateResetButton =
        document.getElementById(
            "emptyStateResetButton"
        );

    if (resetButton) {

        resetButton.addEventListener(
            "click",
            resetWorkoutFilters
        );

    }

    if (emptyStateResetButton) {

        emptyStateResetButton.addEventListener(
            "click",
            resetWorkoutFilters
        );

    }

}


/**
 * Clear search and filter values.
 */
function resetWorkoutFilters() {

    const searchInput =
        document.getElementById(
            "workoutSearch"
        );

    const difficultyFilter =
        document.getElementById(
            "difficultyFilter"
        );

    const durationFilter =
        document.getElementById(
            "durationFilter"
        );

    if (searchInput) {
        searchInput.value = "";
    }

    if (difficultyFilter) {
        difficultyFilter.value = "all";
    }

    if (durationFilter) {
        durationFilter.value = "all";
    }

    filteredWorkoutPlans = [
        ...workoutPlans
    ];

    displayWorkoutPlans(
        filteredWorkoutPlans
    );

}


/* =========================================================
   9. RESULT COUNT
========================================================= */

/**
 * Update the displayed result count.
 *
 * @param {number} count
 */
function updateResultCount(count) {

    const resultCount =
        document.getElementById(
            "workoutResultCount"
        );

    if (!resultCount) {
        return;
    }

    resultCount.textContent =
        `${count} ${count === 1 ? "plan" : "plans"} found`;

}


/* =========================================================
   10. MESSAGE
========================================================= */

/**
 * Display a success or error message.
 *
 * @param {string} message
 * @param {"success"|"error"} type
 */
function showWorkoutMessage(
    message,
    type
) {

    const messageElement =
        document.getElementById(
            "workoutMessage"
        );

    if (!messageElement) {
        return;
    }

    messageElement.textContent =
        message;

    messageElement.className =
        `workout-message visible ${type}`;

    messageElement.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


/* =========================================================
   11. DIFFICULTY CLASS
========================================================= */

/**
 * Return the correct CSS difficulty class.
 *
 * @param {string} difficulty
 * @returns {string}
 */
function getDifficultyClass(difficulty) {

    return (
        "difficulty-" +
        difficulty.toLowerCase()
    );

}


/* =========================================================
   12. LOCAL STORAGE HELPERS
========================================================= */

/**
 * Read JSON from localStorage safely.
 *
 * @param {string} key
 * @param {*} defaultValue
 * @returns {*}
 */
function readWorkoutStorage(
    key,
    defaultValue
) {

    return StorageManager.read(
        key,
        defaultValue
    );

}


/**
 * Write JSON to localStorage safely.
 *
 * @param {string} key
 * @param {*} value
 * @returns {boolean}
 */
function writeWorkoutStorage(
    key,
    value
) {

    return StorageManager.save(
        key,
        value
    );

}


/**
 * Return today's local date as YYYY-MM-DD.
 *
 * @returns {string}
 */
function getWorkoutTodayKey() {

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


/* =========================================================
   13. HTML ESCAPING
========================================================= */

/**
 * Escape text before inserting it into HTML.
 *
 * @param {*} value
 * @returns {string}
 */
function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}