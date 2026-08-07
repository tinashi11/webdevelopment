"use strict";

/**
 * Simple Fitness Planner
 * Exercise List page functionality.
 */


/* =========================================================
   1. EXERCISE DATA
========================================================= */

const exercises = [
    {
        id: 1,
        name: "Arm Circles",
        icon: "🔄",
        category: "Warm-up",
        difficulty: "Beginner",
        muscleGroup: "Shoulders",
        target: "30 seconds",
        description:
            "A simple shoulder warm-up that prepares the upper body for exercise.",
        instructions: [
            "Stand straight with your feet shoulder-width apart.",
            "Extend both arms out to your sides.",
            "Make small forward circles with your arms.",
            "Increase the circle size slowly.",
            "Repeat the movement in the opposite direction."
        ],
        tip:
            "Keep your shoulders relaxed and move your arms slowly."
    },
    {
        id: 2,
        name: "March in Place",
        icon: "🚶",
        category: "Warm-up",
        difficulty: "Beginner",
        muscleGroup: "Full Body",
        target: "2 minutes",
        description:
            "A gentle warm-up exercise that increases your heart rate gradually.",
        instructions: [
            "Stand upright with your arms relaxed.",
            "Lift one knee towards your waist.",
            "Lower the leg and lift the opposite knee.",
            "Move your arms naturally while marching.",
            "Continue at a comfortable pace."
        ],
        tip:
            "Keep your back straight and land softly on your feet."
    },
    {
        id: 3,
        name: "Jumping Jacks",
        icon: "⭐",
        category: "Cardio",
        difficulty: "Beginner",
        muscleGroup: "Full Body",
        target: "30 repetitions",
        description:
            "A full-body cardio movement that increases heart rate and body temperature.",
        instructions: [
            "Stand with your feet together and arms at your sides.",
            "Jump while moving your feet apart.",
            "Raise both arms above your head.",
            "Jump again and return to the starting position.",
            "Repeat using a steady rhythm."
        ],
        tip:
            "Land softly with slightly bent knees."
    },
    {
        id: 4,
        name: "High Knees",
        icon: "🏃",
        category: "Cardio",
        difficulty: "Intermediate",
        muscleGroup: "Legs and Core",
        target: "30 seconds",
        description:
            "A fast cardio exercise that strengthens the legs and engages the core.",
        instructions: [
            "Stand upright with your feet hip-width apart.",
            "Lift your right knee towards your chest.",
            "Quickly switch and lift your left knee.",
            "Move your arms as if you are running.",
            "Continue at a controlled but fast pace."
        ],
        tip:
            "Keep your chest lifted and avoid leaning backwards."
    },
    {
        id: 5,
        name: "Mountain Climbers",
        icon: "⛰️",
        category: "Cardio",
        difficulty: "Advanced",
        muscleGroup: "Full Body",
        target: "30 seconds",
        description:
            "A challenging cardio exercise that also works the arms, core, and legs.",
        instructions: [
            "Begin in a high plank position.",
            "Keep your hands directly under your shoulders.",
            "Bring one knee towards your chest.",
            "Quickly switch legs.",
            "Continue alternating while keeping your body stable."
        ],
        tip:
            "Keep your hips low and your abdominal muscles engaged."
    },
    {
        id: 6,
        name: "Bodyweight Squats",
        icon: "🦵",
        category: "Strength",
        difficulty: "Beginner",
        muscleGroup: "Legs and Glutes",
        target: "15 repetitions",
        description:
            "A basic lower-body exercise that strengthens the legs and glutes.",
        instructions: [
            "Stand with your feet slightly wider than hip-width.",
            "Keep your chest lifted and look forward.",
            "Push your hips backwards and bend your knees.",
            "Lower your body as far as comfortable.",
            "Push through your feet to stand again."
        ],
        tip:
            "Keep your knees pointing in the same direction as your toes."
    },
    {
        id: 7,
        name: "Reverse Lunges",
        icon: "↩️",
        category: "Strength",
        difficulty: "Intermediate",
        muscleGroup: "Legs and Glutes",
        target: "10 each side",
        description:
            "A lower-body exercise that develops leg strength, balance, and control.",
        instructions: [
            "Stand upright with your feet together.",
            "Step backwards with your right foot.",
            "Lower your back knee towards the floor.",
            "Push through your front foot to return.",
            "Repeat on the opposite side."
        ],
        tip:
            "Keep your front knee above your ankle."
    },
    {
        id: 8,
        name: "Wall Push-Ups",
        icon: "🧱",
        category: "Strength",
        difficulty: "Beginner",
        muscleGroup: "Chest and Arms",
        target: "12 repetitions",
        description:
            "A beginner-friendly push-up variation performed against a wall.",
        instructions: [
            "Stand facing a wall at arm's length.",
            "Place your hands on the wall at shoulder height.",
            "Bend your elbows and move your chest towards the wall.",
            "Keep your body straight.",
            "Push away from the wall to return."
        ],
        tip:
            "Avoid allowing your hips to move forward or backwards."
    },
    {
        id: 9,
        name: "Push-Ups",
        icon: "💪",
        category: "Strength",
        difficulty: "Intermediate",
        muscleGroup: "Chest and Arms",
        target: "10 repetitions",
        description:
            "A classic upper-body exercise for the chest, shoulders, arms, and core.",
        instructions: [
            "Begin in a high plank position.",
            "Place your hands slightly wider than your shoulders.",
            "Lower your chest towards the floor.",
            "Keep your elbows at a comfortable angle.",
            "Push back to the starting position."
        ],
        tip:
            "Keep your body in one straight line from head to heels."
    },
    {
        id: 10,
        name: "Tricep Dips",
        icon: "🪑",
        category: "Strength",
        difficulty: "Intermediate",
        muscleGroup: "Arms",
        target: "10 repetitions",
        description:
            "An arm-strengthening exercise usually performed using a strong chair.",
        instructions: [
            "Sit on the edge of a stable chair.",
            "Place your hands beside your hips.",
            "Move your hips slightly away from the chair.",
            "Bend your elbows and lower your body.",
            "Push through your hands to return."
        ],
        tip:
            "Only use a chair that cannot slide or tip over."
    },
    {
        id: 11,
        name: "Glute Bridge",
        icon: "🌉",
        category: "Strength",
        difficulty: "Beginner",
        muscleGroup: "Glutes and Hamstrings",
        target: "15 repetitions",
        description:
            "A floor exercise that strengthens the glutes, hamstrings, and lower body.",
        instructions: [
            "Lie on your back with your knees bent.",
            "Place your feet flat on the floor.",
            "Keep your arms beside your body.",
            "Lift your hips by squeezing your glutes.",
            "Lower your hips slowly."
        ],
        tip:
            "Do not over-arch your lower back."
    },
    {
        id: 12,
        name: "Plank",
        icon: "📏",
        category: "Core",
        difficulty: "Intermediate",
        muscleGroup: "Core",
        target: "30 seconds",
        description:
            "A static exercise that develops abdominal and full-body stability.",
        instructions: [
            "Place your forearms on the floor.",
            "Extend your legs behind you.",
            "Keep your elbows under your shoulders.",
            "Maintain a straight line from head to heels.",
            "Hold the position while breathing normally."
        ],
        tip:
            "Avoid allowing your hips to drop or rise too high."
    },
    {
        id: 13,
        name: "Dead Bug",
        icon: "🐞",
        category: "Core",
        difficulty: "Beginner",
        muscleGroup: "Core",
        target: "10 each side",
        description:
            "A controlled core exercise that improves stability and coordination.",
        instructions: [
            "Lie on your back with your arms pointing upwards.",
            "Lift your knees so they are bent at 90 degrees.",
            "Lower one arm and the opposite leg.",
            "Return to the starting position.",
            "Repeat on the opposite side."
        ],
        tip:
            "Keep your lower back gently pressed against the floor."
    },
    {
        id: 14,
        name: "Bicycle Crunches",
        icon: "🚲",
        category: "Core",
        difficulty: "Intermediate",
        muscleGroup: "Abdominals",
        target: "20 repetitions",
        description:
            "A rotating abdominal exercise that works the core and side muscles.",
        instructions: [
            "Lie on your back with your hands behind your head.",
            "Lift your shoulders and legs off the floor.",
            "Bring one knee towards your chest.",
            "Rotate the opposite elbow towards that knee.",
            "Switch sides using a controlled movement."
        ],
        tip:
            "Do not pull your head forward with your hands."
    },
    {
        id: 15,
        name: "Leg Raises",
        icon: "⬆️",
        category: "Core",
        difficulty: "Intermediate",
        muscleGroup: "Lower Abdominals",
        target: "12 repetitions",
        description:
            "A floor exercise that mainly targets the lower abdominal muscles.",
        instructions: [
            "Lie on your back with both legs straight.",
            "Place your hands beside your body.",
            "Lift both legs slowly towards the ceiling.",
            "Lower your legs without touching the floor.",
            "Repeat while keeping your body controlled."
        ],
        tip:
            "Bend your knees slightly if straight-leg raises are too difficult."
    },
    {
        id: 16,
        name: "Standing Side Stretch",
        icon: "🌙",
        category: "Flexibility",
        difficulty: "Beginner",
        muscleGroup: "Sides and Shoulders",
        target: "30 seconds each side",
        description:
            "A simple standing stretch for the sides of the body and shoulders.",
        instructions: [
            "Stand with your feet shoulder-width apart.",
            "Raise both arms above your head.",
            "Hold one wrist with the opposite hand.",
            "Lean gently towards one side.",
            "Return and repeat on the other side."
        ],
        tip:
            "Avoid twisting your body while leaning."
    },
    {
        id: 17,
        name: "Seated Hamstring Stretch",
        icon: "🧘",
        category: "Flexibility",
        difficulty: "Beginner",
        muscleGroup: "Hamstrings",
        target: "30 seconds each side",
        description:
            "A gentle seated stretch for the muscles at the back of the legs.",
        instructions: [
            "Sit on the floor with one leg extended.",
            "Bend the opposite knee comfortably.",
            "Keep your back as straight as possible.",
            "Reach towards the foot of the extended leg.",
            "Hold and repeat on the opposite side."
        ],
        tip:
            "Only stretch until you feel gentle tension."
    },
    {
        id: 18,
        name: "Child's Pose",
        icon: "🌿",
        category: "Cool-down",
        difficulty: "Beginner",
        muscleGroup: "Back and Hips",
        target: "60 seconds",
        description:
            "A gentle resting position that stretches the back, hips, and shoulders.",
        instructions: [
            "Begin on your hands and knees.",
            "Move your hips backwards towards your heels.",
            "Extend your arms forward.",
            "Lower your chest towards the floor.",
            "Relax and breathe slowly."
        ],
        tip:
            "Place a cushion under your knees if needed."
    },
    {
        id: 19,
        name: "Standing Forward Fold",
        icon: "🙇",
        category: "Cool-down",
        difficulty: "Beginner",
        muscleGroup: "Back and Hamstrings",
        target: "30 seconds",
        description:
            "A relaxing standing stretch for the hamstrings and lower back.",
        instructions: [
            "Stand with your feet hip-width apart.",
            "Bend forward slowly from your hips.",
            "Allow your head and arms to relax.",
            "Keep your knees slightly bent.",
            "Return to standing slowly."
        ],
        tip:
            "Do not force your hands to reach the floor."
    },
    {
        id: 20,
        name: "Burpees",
        icon: "🔥",
        category: "Cardio",
        difficulty: "Advanced",
        muscleGroup: "Full Body",
        target: "10 repetitions",
        description:
            "A demanding full-body movement that combines strength and cardio.",
        instructions: [
            "Stand with your feet shoulder-width apart.",
            "Lower into a squat and place your hands down.",
            "Jump your feet backwards into a plank.",
            "Jump your feet forwards again.",
            "Stand or jump upwards to finish."
        ],
        tip:
            "Perform the movement slowly before increasing your speed."
    }
];


/* =========================================================
   2. PAGE STATE
========================================================= */

let filteredExercises = [...exercises];


/* =========================================================
   3. INITIALISATION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    if (
        document.body.dataset.page !==
        "exercises"
    ) {
        return;
    }

    displayExercises(exercises);
    initialiseExerciseFilters();
    initialiseExerciseResetButtons();
    updateSelectedWorkoutSummary();

});


/* =========================================================
   4. DISPLAY EXERCISES
========================================================= */

/**
 * Display exercise cards.
 *
 * @param {Array} exerciseItems
 */
function displayExercises(exerciseItems) {

    const exerciseContainer =
        document.getElementById(
            "exerciseListContainer"
        );

    const emptyState =
        document.getElementById(
            "exerciseEmptyState"
        );

    if (!exerciseContainer || !emptyState) {
        return;
    }

    exerciseContainer.innerHTML = "";

    updateExerciseResultCount(
        exerciseItems.length
    );

    if (exerciseItems.length === 0) {

        emptyState.classList.remove(
            "hidden"
        );

        return;

    }

    emptyState.classList.add(
        "hidden"
    );

    const dailyWorkout =
        readExerciseStorage(
            "fitness_daily_workout",
            null
        );

    const selectedExerciseNames =
        getSelectedExerciseNames(
            dailyWorkout
        );

    exerciseItems.forEach(
        function (exercise) {

            const isAdded =
                selectedExerciseNames.includes(
                    exercise.name.toLowerCase()
                );

            const card =
                createExerciseCard(
                    exercise,
                    isAdded
                );

            exerciseContainer.appendChild(
                card
            );

        }
    );

}


/**
 * Create one exercise card.
 *
 * @param {Object} exercise
 * @param {boolean} isAdded
 * @returns {HTMLElement}
 */
function createExerciseCard(
    exercise,
    isAdded
) {

    const article =
        document.createElement("article");

    article.className =
        isAdded
            ? "exercise-card added"
            : "exercise-card";

    article.dataset.exerciseId =
        String(exercise.id);

    const difficultyClass =
        getExerciseDifficultyClass(
            exercise.difficulty
        );

    const instructionsHTML =
        exercise.instructions.map(
            function (instruction) {

                return `
                    <li>
                        ${escapeExerciseHTML(instruction)}
                    </li>
                `;

            }
        ).join("");

    article.innerHTML = `
        <div class="exercise-card-content">

            <div class="exercise-card-header">

                <div
                    class="exercise-card-icon"
                    aria-hidden="true"
                >
                    ${exercise.icon}
                </div>

                <div class="exercise-card-badges">

                    <span class="exercise-category-badge">
                        ${escapeExerciseHTML(exercise.category)}
                    </span>

                    <span
                        class="exercise-difficulty-badge ${difficultyClass}"
                    >
                        ${escapeExerciseHTML(exercise.difficulty)}
                    </span>

                </div>

            </div>

            <h3>
                ${escapeExerciseHTML(exercise.name)}
            </h3>

            <p class="exercise-description">
                ${escapeExerciseHTML(exercise.description)}
            </p>

            <div class="exercise-meta-grid">

                <div class="exercise-meta-item">

                    <span
                        class="exercise-meta-icon"
                        aria-hidden="true"
                    >
                        🎯
                    </span>

                    <span class="exercise-meta-value">
                        ${escapeExerciseHTML(exercise.muscleGroup)}
                    </span>

                    <span class="exercise-meta-label">
                        Muscle Group
                    </span>

                </div>

                <div class="exercise-meta-item">

                    <span
                        class="exercise-meta-icon"
                        aria-hidden="true"
                    >
                        ⏱️
                    </span>

                    <span class="exercise-meta-value">
                        ${escapeExerciseHTML(exercise.target)}
                    </span>

                    <span class="exercise-meta-label">
                        Target
                    </span>

                </div>

            </div>

            <div class="exercise-details-section">

                <button
                    type="button"
                    class="exercise-details-toggle"
                    aria-expanded="false"
                >
                    <span>
                        View Instructions
                    </span>

                    <span
                        class="exercise-details-arrow"
                        aria-hidden="true"
                    >
                        ▾
                    </span>
                </button>

                <div class="exercise-details-content">

                    <ol class="exercise-instruction-list">
                        ${instructionsHTML}
                    </ol>

                    <p class="exercise-tip">
                        <strong>Tip:</strong>
                        ${escapeExerciseHTML(exercise.tip)}
                    </p>

                </div>

            </div>

            <div class="exercise-card-actions">

                <button
                    type="button"
                    class="button exercise-add-button ${
                        isAdded
                            ? "added"
                            : "button-primary"
                    }"
                    data-exercise-action="${exercise.id}"
                >
                    ${
                        isAdded
                            ? "Remove from Workout"
                            : "Add to Workout"
                    }
                </button>

                <button
                    type="button"
                    class="button button-light exercise-details-button"
                    aria-label="Show instructions for ${escapeExerciseHTML(exercise.name)}"
                >
                    +
                </button>

            </div>

        </div>
    `;

    initialiseExerciseCardEvents(
        article,
        exercise
    );

    return article;

}


/* =========================================================
   5. CARD EVENTS
========================================================= */

/**
 * Initialise exercise-card buttons.
 *
 * @param {HTMLElement} card
 * @param {Object} exercise
 */
function initialiseExerciseCardEvents(
    card,
    exercise
) {

    const detailsToggle =
        card.querySelector(
            ".exercise-details-toggle"
        );

    const detailsButton =
        card.querySelector(
            ".exercise-details-button"
        );

    const addButton =
        card.querySelector(
            ".exercise-add-button"
        );

    if (detailsToggle) {

        detailsToggle.addEventListener(
            "click",
            function () {

                toggleExerciseDetails(card);

            }
        );

    }

    if (detailsButton) {

        detailsButton.addEventListener(
            "click",
            function () {

                toggleExerciseDetails(card);

            }
        );

    }

    if (addButton) {

        addButton.addEventListener(
            "click",
            function () {

                toggleExerciseInWorkout(
                    exercise
                );

            }
        );

    }

}


/**
 * Open or close exercise instructions.
 *
 * @param {HTMLElement} card
 */
function toggleExerciseDetails(card) {

    const detailsContent =
        card.querySelector(
            ".exercise-details-content"
        );

    const detailsToggle =
        card.querySelector(
            ".exercise-details-toggle"
        );

    const detailsButton =
        card.querySelector(
            ".exercise-details-button"
        );

    if (
        !detailsContent ||
        !detailsToggle
    ) {
        return;
    }

    const isOpen =
        detailsContent.classList.toggle(
            "open"
        );

    detailsToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    const toggleText =
        detailsToggle.querySelector(
            "span:first-child"
        );

    if (toggleText) {

        toggleText.textContent =
            isOpen
                ? "Hide Instructions"
                : "View Instructions";

    }

    if (detailsButton) {

        detailsButton.textContent =
            isOpen ? "−" : "+";

    }

}


/* =========================================================
   6. ADD OR REMOVE EXERCISE
========================================================= */

/**
 * Add or remove an exercise from today's workout.
 *
 * @param {Object} exercise
 */
function toggleExerciseInWorkout(exercise) {

    const todayKey =
        getExerciseTodayKey();

    let dailyWorkout =
        readExerciseStorage(
            "fitness_daily_workout",
            null
        );

    if (
        !dailyWorkout ||
        dailyWorkout.date !== todayKey ||
        !Array.isArray(
            dailyWorkout.exercises
        )
    ) {

        dailyWorkout = {
            date: todayKey,
            planId: null,
            planName: "Custom Workout",
            difficulty: "Custom",
            suggestedDuration: 0,
            duration: 0,
            completed: false,
            exercises: []
        };

    }

    const exerciseIndex =
        dailyWorkout.exercises.findIndex(
            function (savedExercise) {

                return (
                    String(
                        savedExercise.name
                    ).toLowerCase() ===
                    exercise.name.toLowerCase()
                );

            }
        );

    let message = "";
    let messageType = "success";

    if (exerciseIndex >= 0) {

        dailyWorkout.exercises.splice(
            exerciseIndex,
            1
        );

        message =
            `${exercise.name} was removed from today’s workout.`;

        messageType = "info";

    } else {

        dailyWorkout.exercises.push({
            id: `custom-${exercise.id}-${Date.now()}`,
            exerciseId: exercise.id,
            name: exercise.name,
            category: exercise.category,
            difficulty: exercise.difficulty,
            muscleGroup: exercise.muscleGroup,
            target: exercise.target,
            completed: false
        });

        message =
            `${exercise.name} was added to today’s workout.`;

    }

    const saved =
        writeExerciseStorage(
            "fitness_daily_workout",
            dailyWorkout
        );

    if (!saved) {

        showExerciseMessage(
            "The exercise could not be saved. Please check your browser settings.",
            "error"
        );

        return;

    }

    showExerciseMessage(
        message,
        messageType
    );

    displayExercises(
        filteredExercises
    );

    updateSelectedWorkoutSummary();

}


/* =========================================================
   7. SELECTED WORKOUT SUMMARY
========================================================= */

/**
 * Update the selected-exercise summary panel.
 */
function updateSelectedWorkoutSummary() {

    const countElement =
        document.getElementById(
            "selectedExerciseCount"
        );

    const messageElement =
        document.getElementById(
            "selectedWorkoutMessage"
        );

    if (!countElement || !messageElement) {
        return;
    }

    const dailyWorkout =
        readExerciseStorage(
            "fitness_daily_workout",
            null
        );

    const todayKey =
        getExerciseTodayKey();

    let count = 0;

    if (
        dailyWorkout &&
        dailyWorkout.date === todayKey &&
        Array.isArray(
            dailyWorkout.exercises
        )
    ) {

        count =
            dailyWorkout.exercises.length;

    }

    countElement.textContent =
        String(count);

    if (count === 0) {

        messageElement.textContent =
            "Add exercises from the library to create your daily routine.";

    } else if (count === 1) {

        messageElement.textContent =
            "You have one exercise in today’s workout.";

    } else {

        messageElement.textContent =
            `You have ${count} exercises ready in today’s workout.`;

    }

}


/**
 * Return saved exercise names.
 *
 * @param {*} dailyWorkout
 * @returns {Array<string>}
 */
function getSelectedExerciseNames(
    dailyWorkout
) {

    const todayKey =
        getExerciseTodayKey();

    if (
        !dailyWorkout ||
        dailyWorkout.date !== todayKey ||
        !Array.isArray(
            dailyWorkout.exercises
        )
    ) {
        return [];
    }

    return dailyWorkout.exercises.map(
        function (savedExercise) {

            return String(
                savedExercise.name
            ).toLowerCase();

        }
    );

}


/* =========================================================
   8. FILTERS
========================================================= */

/**
 * Initialise exercise filters.
 */
function initialiseExerciseFilters() {

    const searchInput =
        document.getElementById(
            "exerciseSearch"
        );

    const categoryFilter =
        document.getElementById(
            "exerciseCategoryFilter"
        );

    const difficultyFilter =
        document.getElementById(
            "exerciseDifficultyFilter"
        );

    if (
        !searchInput ||
        !categoryFilter ||
        !difficultyFilter
    ) {
        return;
    }

    searchInput.addEventListener(
        "input",
        filterExercises
    );

    categoryFilter.addEventListener(
        "change",
        filterExercises
    );

    difficultyFilter.addEventListener(
        "change",
        filterExercises
    );

}


/**
 * Filter exercise data.
 */
function filterExercises() {

    const searchInput =
        document.getElementById(
            "exerciseSearch"
        );

    const categoryFilter =
        document.getElementById(
            "exerciseCategoryFilter"
        );

    const difficultyFilter =
        document.getElementById(
            "exerciseDifficultyFilter"
        );

    const searchValue =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";

    const categoryValue =
        categoryFilter
            ? categoryFilter.value
            : "all";

    const difficultyValue =
        difficultyFilter
            ? difficultyFilter.value
            : "all";

    filteredExercises =
        exercises.filter(
            function (exercise) {

                const searchableText = `
                    ${exercise.name}
                    ${exercise.category}
                    ${exercise.difficulty}
                    ${exercise.muscleGroup}
                    ${exercise.description}
                `.toLowerCase();

                const matchesSearch =
                    searchableText.includes(
                        searchValue
                    );

                const matchesCategory =
                    categoryValue === "all" ||
                    exercise.category ===
                    categoryValue;

                const matchesDifficulty =
                    difficultyValue === "all" ||
                    exercise.difficulty ===
                    difficultyValue;

                return (
                    matchesSearch &&
                    matchesCategory &&
                    matchesDifficulty
                );

            }
        );

    displayExercises(
        filteredExercises
    );

}


/* =========================================================
   9. RESET FILTERS
========================================================= */

/**
 * Initialise reset buttons.
 */
function initialiseExerciseResetButtons() {

    const resetButton =
        document.getElementById(
            "resetExerciseFiltersButton"
        );

    const emptyResetButton =
        document.getElementById(
            "emptyExerciseResetButton"
        );

    if (resetButton) {

        resetButton.addEventListener(
            "click",
            resetExerciseFilters
        );

    }

    if (emptyResetButton) {

        emptyResetButton.addEventListener(
            "click",
            resetExerciseFilters
        );

    }

}


/**
 * Clear exercise search and filters.
 */
function resetExerciseFilters() {

    const searchInput =
        document.getElementById(
            "exerciseSearch"
        );

    const categoryFilter =
        document.getElementById(
            "exerciseCategoryFilter"
        );

    const difficultyFilter =
        document.getElementById(
            "exerciseDifficultyFilter"
        );

    if (searchInput) {
        searchInput.value = "";
    }

    if (categoryFilter) {
        categoryFilter.value = "all";
    }

    if (difficultyFilter) {
        difficultyFilter.value = "all";
    }

    filteredExercises = [
        ...exercises
    ];

    displayExercises(
        filteredExercises
    );

}


/* =========================================================
   10. RESULT COUNT
========================================================= */

/**
 * Update the result counter.
 *
 * @param {number} count
 */
function updateExerciseResultCount(count) {

    const resultCount =
        document.getElementById(
            "exerciseResultCount"
        );

    if (!resultCount) {
        return;
    }

    resultCount.textContent =
        `${count} ${
            count === 1
                ? "exercise"
                : "exercises"
        } found`;

}


/* =========================================================
   11. MESSAGE
========================================================= */

/**
 * Show an exercise-page message.
 *
 * @param {string} message
 * @param {"success"|"error"|"info"} type
 */
function showExerciseMessage(
    message,
    type
) {

    const messageElement =
        document.getElementById(
            "exerciseMessage"
        );

    if (!messageElement) {
        return;
    }

    messageElement.textContent =
        message;

    messageElement.className =
        `exercise-message visible ${type}`;

    window.clearTimeout(
        showExerciseMessage.timeoutId
    );

    showExerciseMessage.timeoutId =
        window.setTimeout(
            function () {

                messageElement.className =
                    "exercise-message";

                messageElement.textContent =
                    "";

            },
            3500
        );

}


/* =========================================================
   12. DIFFICULTY CLASS
========================================================= */

/**
 * Return the exercise difficulty class.
 *
 * @param {string} difficulty
 * @returns {string}
 */
function getExerciseDifficultyClass(
    difficulty
) {

    return (
        "exercise-difficulty-" +
        difficulty.toLowerCase()
    );

}


/* =========================================================
   13. LOCAL STORAGE HELPERS
========================================================= */

/**
 * Read JSON from localStorage safely.
 *
 * @param {string} key
 * @param {*} defaultValue
 * @returns {*}
 */
function readExerciseStorage(
    key,
    defaultValue
) {

    return StorageManager.read(
        key,
        defaultValue
    );

}


/**
 * Save JSON to localStorage safely.
 *
 * @param {string} key
 * @param {*} value
 * @returns {boolean}
 */
function writeExerciseStorage(
    key,
    value
) {

    return StorageManager.save(
        key,
        value
    );

}


/**
 * Return today's local date.
 *
 * @returns {string}
 */
function getExerciseTodayKey() {

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
   14. HTML ESCAPING
========================================================= */

/**
 * Escape text inserted into generated HTML.
 *
 * @param {*} value
 * @returns {string}
 */
function escapeExerciseHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}