"use strict";

/**
 * Simple Fitness Planner
 * Fitness Tips page functionality.
 */


/* =========================================================
   STORAGE KEY
========================================================= */

const FAVOURITE_TIPS_KEY =
    "fitness_favourite_tips";


/* =========================================================
   FITNESS TIP DATA
========================================================= */

const fitnessTips = [
    {
        id: 1,
        title: "Warm Up Before Exercise",
        icon: "🔥",
        category: "Exercise",
        summary:
            "Prepare your muscles and joints before beginning your main workout.",
        details: [
            "Warm up for at least three to five minutes.",
            "Begin with slow, easy movements.",
            "Increase your movement speed gradually.",
            "Use movements related to the workout you plan to perform."
        ],
        note: "Before workouts"
    },
    {
        id: 2,
        title: "Start with Beginner Exercises",
        icon: "🌱",
        category: "Exercise",
        summary:
            "Choose simple movements when you are starting a new fitness routine.",
        details: [
            "Learn the correct technique before increasing difficulty.",
            "Use fewer repetitions at first.",
            "Take longer rest periods when needed.",
            "Increase difficulty only when the exercise feels controlled."
        ],
        note: "For new users"
    },
    {
        id: 3,
        title: "Use Controlled Movements",
        icon: "🎯",
        category: "Safety",
        summary:
            "Move carefully instead of rushing through each repetition.",
        details: [
            "Avoid using uncontrolled momentum.",
            "Keep your body balanced.",
            "Focus on the muscles involved in the exercise.",
            "Stop if you cannot maintain proper form."
        ],
        note: "During exercise"
    },
    {
        id: 4,
        title: "Stop When You Feel Sharp Pain",
        icon: "🛑",
        category: "Safety",
        summary:
            "Sharp or unusual pain may be a sign that you should stop exercising.",
        details: [
            "Do not try to exercise through sharp pain.",
            "Rest the affected area.",
            "Change or avoid movements that cause pain.",
            "Seek professional guidance when pain continues."
        ],
        note: "Safety first"
    },
    {
        id: 5,
        title: "Drink Water Regularly",
        icon: "💧",
        category: "Hydration",
        summary:
            "Drink water throughout the day instead of waiting until you feel very thirsty.",
        details: [
            "Keep water nearby during exercise.",
            "Take small drinks at regular intervals.",
            "Increase intake during hot weather.",
            "Use the Water Tracker to monitor your daily goal."
        ],
        note: "Daily hydration"
    },
    {
        id: 6,
        title: "Hydrate Before Workouts",
        icon: "🥤",
        category: "Hydration",
        summary:
            "Begin workouts already hydrated instead of drinking everything during exercise.",
        details: [
            "Drink water before the workout starts.",
            "Avoid drinking a very large amount immediately before exercise.",
            "Continue taking small drinks during longer sessions.",
            "Replace water after the workout."
        ],
        note: "Before exercise"
    },
    {
        id: 7,
        title: "Rest Between Difficult Workouts",
        icon: "🛌",
        category: "Recovery",
        summary:
            "Your body needs time to recover after challenging exercise.",
        details: [
            "Avoid training the same tired muscles intensely every day.",
            "Use light activity on recovery days.",
            "Rest when your body feels unusually tired.",
            "Return to difficult exercise gradually."
        ],
        note: "Recovery days"
    },
    {
        id: 8,
        title: "Sleep Supports Recovery",
        icon: "😴",
        category: "Recovery",
        summary:
            "Good sleep can support energy, exercise performance, and recovery.",
        details: [
            "Try to maintain a regular sleep schedule.",
            "Reduce stimulating activities close to bedtime.",
            "Create a quiet and comfortable sleep environment.",
            "Avoid replacing sleep with extra workouts."
        ],
        note: "Every night"
    },
    {
        id: 9,
        title: "Stretch Gently",
        icon: "🧘",
        category: "Recovery",
        summary:
            "Stretch slowly and stop before the movement becomes painful.",
        details: [
            "Move into stretches gradually.",
            "Hold a gentle stretch without bouncing.",
            "Breathe normally while stretching.",
            "Do not force your joints beyond a comfortable position."
        ],
        note: "After workouts"
    },
    {
        id: 10,
        title: "Eat Balanced Meals",
        icon: "🥗",
        category: "Nutrition",
        summary:
            "Balanced meals help provide energy for daily activity and exercise.",
        details: [
            "Include a variety of foods.",
            "Add vegetables and fruit when possible.",
            "Include useful protein sources.",
            "Avoid depending on only one food group."
        ],
        note: "Daily meals"
    },
    {
        id: 11,
        title: "Avoid Exercising Immediately After a Heavy Meal",
        icon: "🍽️",
        category: "Nutrition",
        summary:
            "Allow your body time to digest a large meal before intense activity.",
        details: [
            "Wait before starting difficult exercise.",
            "Choose a lighter meal when exercising soon.",
            "Notice how different foods affect your comfort.",
            "Drink water without overfilling your stomach."
        ],
        note: "Before workouts"
    },
    {
        id: 12,
        title: "Progress Gradually",
        icon: "📈",
        category: "Exercise",
        summary:
            "Increase workout difficulty slowly instead of making sudden large changes.",
        details: [
            "Increase only one part of the workout at a time.",
            "Add a few repetitions before adding many.",
            "Increase duration gradually.",
            "Reduce difficulty when your form becomes poor."
        ],
        note: "Long-term progress"
    },
    {
        id: 13,
        title: "Set Small Fitness Goals",
        icon: "🎯",
        category: "Motivation",
        summary:
            "Small goals can feel more achievable and help you remain consistent.",
        details: [
            "Choose one clear goal at a time.",
            "Make the goal realistic for your current level.",
            "Track completed activities.",
            "Celebrate useful progress instead of waiting for perfection."
        ],
        note: "Weekly planning"
    },
    {
        id: 14,
        title: "Consistency Matters More Than Perfection",
        icon: "🔁",
        category: "Motivation",
        summary:
            "A simple routine completed regularly is often more useful than an extreme plan.",
        details: [
            "Choose activities you can repeat.",
            "Do not stop completely after one missed day.",
            "Return to the routine as soon as possible.",
            "Focus on long-term habits."
        ],
        note: "Stay consistent"
    },
    {
        id: 15,
        title: "Track Your Progress",
        icon: "📊",
        category: "Motivation",
        summary:
            "Recording completed workouts can help you see improvement over time.",
        details: [
            "Finish workouts in the Workout Tracker.",
            "Save daily water records.",
            "Review the Progress page regularly.",
            "Use records to adjust future goals."
        ],
        note: "Use FitPlanner"
    },
    {
        id: 16,
        title: "Choose Activities You Enjoy",
        icon: "😊",
        category: "Motivation",
        summary:
            "Enjoyable activities can make regular movement easier to maintain.",
        details: [
            "Try different workout styles.",
            "Choose indoor or outdoor activities.",
            "Exercise with a friend when helpful.",
            "Change routines when you become bored."
        ],
        note: "Make it enjoyable"
    },
    {
        id: 17,
        title: "Wear Suitable Clothing",
        icon: "👟",
        category: "Safety",
        summary:
            "Wear clothing and footwear that allow safe and comfortable movement.",
        details: [
            "Choose footwear suitable for the activity.",
            "Avoid clothing that restricts movement.",
            "Use weather-appropriate clothing outdoors.",
            "Check that laces and loose items are secure."
        ],
        note: "Before starting"
    },
    {
        id: 18,
        title: "Keep Your Exercise Area Clear",
        icon: "🧹",
        category: "Safety",
        summary:
            "Remove objects that could cause slipping, tripping, or collisions.",
        details: [
            "Check the floor before starting.",
            "Move furniture when more space is needed.",
            "Keep water bottles away from walking areas.",
            "Use a stable surface."
        ],
        note: "Home workouts"
    }
];


/* =========================================================
   PAGE STATE
========================================================= */

let favouriteTipIds = [];

let filteredTips = [...fitnessTips];

let favouritesOnly = false;


/* =========================================================
   INITIALISATION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    if (
        document.body.dataset.page !==
        "fitness-tips"
    ) {
        return;
    }

    loadFavouriteTips();
    displayRandomFitnessTip();
    renderFitnessTips(fitnessTips);
    initialiseTipsFilters();
    initialiseTipsButtons();
    updateFavouriteSummary();

});


/* =========================================================
   FAVOURITE STORAGE
========================================================= */

/**
 * Load saved favourite tip IDs.
 */
function loadFavouriteTips() {

    const storedFavourites =
        readTipsStorage(
            FAVOURITE_TIPS_KEY,
            []
        );

    favouriteTipIds =
        Array.isArray(storedFavourites)
            ? storedFavourites
                .map(Number)
                .filter(Number.isFinite)
            : [];

}


/**
 * Save favourites.
 *
 * @returns {boolean}
 */
function saveFavouriteTips() {

    return writeTipsStorage(
        FAVOURITE_TIPS_KEY,
        favouriteTipIds
    );

}


/* =========================================================
   RENDER TIP CARDS
========================================================= */

/**
 * Display fitness-tip cards.
 *
 * @param {Array} tips
 */
function renderFitnessTips(tips) {

    const container =
        document.getElementById(
            "fitnessTipsContainer"
        );

    const emptyState =
        document.getElementById(
            "tipsEmptyState"
        );

    if (!container || !emptyState) {
        return;
    }

    container.innerHTML = "";

    updateTipsResultCount(
        tips.length
    );

    if (tips.length === 0) {

        emptyState.classList.remove(
            "hidden"
        );

        return;

    }

    emptyState.classList.add(
        "hidden"
    );

    tips.forEach(function (tip) {

        const isFavourite =
            favouriteTipIds.includes(
                tip.id
            );

        const card =
            createFitnessTipCard(
                tip,
                isFavourite
            );

        container.appendChild(card);

    });

}


/**
 * Create one fitness-tip card.
 *
 * @param {Object} tip
 * @param {boolean} isFavourite
 * @returns {HTMLElement}
 */
function createFitnessTipCard(
    tip,
    isFavourite
) {

    const article =
        document.createElement(
            "article"
        );

    article.className =
        isFavourite
            ? "fitness-tip-card favourite"
            : "fitness-tip-card";

    article.dataset.tipId =
        String(tip.id);

    const detailsHTML =
        tip.details.map(
            function (detail) {

                return `
                    <li>
                        ${escapeTipsHTML(detail)}
                    </li>
                `;

            }
        ).join("");

    article.innerHTML = `
        <div class="fitness-tip-content">

            <div class="fitness-tip-header">

                <div
                    class="fitness-tip-icon"
                    aria-hidden="true"
                >
                    ${tip.icon}
                </div>

                <button
                    type="button"
                    class="tip-favourite-button ${
                        isFavourite
                            ? "active"
                            : ""
                    }"
                    data-favourite-tip="${tip.id}"
                    aria-label="${
                        isFavourite
                            ? "Remove from favourites"
                            : "Add to favourites"
                    }"
                    aria-pressed="${isFavourite}"
                >
                    ${isFavourite ? "♥" : "♡"}
                </button>

            </div>

            <span class="tip-category-badge">
                ${escapeTipsHTML(tip.category)}
            </span>

            <h3>
                ${escapeTipsHTML(tip.title)}
            </h3>

            <p class="tip-summary">
                ${escapeTipsHTML(tip.summary)}
            </p>

            <div class="tip-details-section">

                <button
                    type="button"
                    class="tip-details-toggle"
                    aria-expanded="false"
                >
                    <span>
                        Read More
                    </span>

                    <span
                        class="tip-details-arrow"
                        aria-hidden="true"
                    >
                        ▾
                    </span>
                </button>

                <div class="tip-details-content">

                    <ul class="tip-detail-list">
                        ${detailsHTML}
                    </ul>

                </div>

            </div>

            <div class="tip-card-footer">

                <span class="tip-card-note">
                    ${escapeTipsHTML(tip.note)}
                </span>

                <span>
                    ${isFavourite ? "Saved ♥" : ""}
                </span>

            </div>

        </div>
    `;

    initialiseTipCardEvents(
        article,
        tip
    );

    return article;

}


/* =========================================================
   CARD EVENTS
========================================================= */

/**
 * Add events to one tip card.
 *
 * @param {HTMLElement} card
 * @param {Object} tip
 */
function initialiseTipCardEvents(
    card,
    tip
) {

    const detailsButton =
        card.querySelector(
            ".tip-details-toggle"
        );

    const favouriteButton =
        card.querySelector(
            ".tip-favourite-button"
        );

    if (detailsButton) {

        detailsButton.addEventListener(
            "click",
            function () {

                toggleTipDetails(card);

            }
        );

    }

    if (favouriteButton) {

        favouriteButton.addEventListener(
            "click",
            function () {

                toggleFavouriteTip(
                    tip.id,
                    tip.title
                );

            }
        );

    }

}


/**
 * Open or close details.
 *
 * @param {HTMLElement} card
 */
function toggleTipDetails(card) {

    const content =
        card.querySelector(
            ".tip-details-content"
        );

    const button =
        card.querySelector(
            ".tip-details-toggle"
        );

    if (!content || !button) {
        return;
    }

    const isOpen =
        content.classList.toggle(
            "open"
        );

    button.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    const text =
        button.querySelector(
            "span:first-child"
        );

    if (text) {

        text.textContent =
            isOpen
                ? "Show Less"
                : "Read More";

    }

}


/* =========================================================
   FAVOURITES
========================================================= */

/**
 * Add or remove a favourite tip.
 *
 * @param {number} tipId
 * @param {string} tipTitle
 */
function toggleFavouriteTip(
    tipId,
    tipTitle
) {

    const existingIndex =
        favouriteTipIds.indexOf(
            tipId
        );

    let message = "";

    if (existingIndex >= 0) {

        favouriteTipIds.splice(
            existingIndex,
            1
        );

        message =
            `${tipTitle} was removed from favourites.`;

    } else {

        favouriteTipIds.push(
            tipId
        );

        message =
            `${tipTitle} was added to favourites.`;

    }

    const saved =
        saveFavouriteTips();

    if (!saved) {

        showTipsMessage(
            "Favourite tips could not be saved.",
            "error"
        );

        return;

    }

    applyTipsFilters();
    updateFavouriteSummary();

    showTipsMessage(
        message,
        "success"
    );

}


/**
 * Update favourite summary.
 */
function updateFavouriteSummary() {

    const count =
        favouriteTipIds.length;

    setTipsText(
        "favouriteTipsCount",
        String(count)
    );

    const messageElement =
        document.getElementById(
            "favouriteTipsMessage"
        );

    if (!messageElement) {
        return;
    }

    if (count === 0) {

        messageElement.textContent =
            "Save useful tips so you can find them quickly.";

    } else if (count === 1) {

        messageElement.textContent =
            "You have saved one fitness tip.";

    } else {

        messageElement.textContent =
            `You have saved ${count} fitness tips.`;

    }

}


/**
 * Enable or disable favourites-only mode.
 */
function toggleFavouritesOnly() {

    favouritesOnly =
        !favouritesOnly;

    const button =
        document.getElementById(
            "showFavouritesButton"
        );

    if (button) {

        button.classList.toggle(
            "active",
            favouritesOnly
        );

        button.setAttribute(
            "aria-pressed",
            String(favouritesOnly)
        );

        button.textContent =
            favouritesOnly
                ? "Show All Tips"
                : "Show Favourites";

    }

    applyTipsFilters();

}


/* =========================================================
   RANDOM TIP
========================================================= */

/**
 * Display a random tip.
 */
function displayRandomFitnessTip() {

    if (fitnessTips.length === 0) {
        return;
    }

    const currentTitle =
        document.getElementById(
            "randomTipTitle"
        )?.textContent.trim() || "";

    let selectedTip =
        fitnessTips[
            Math.floor(
                Math.random() *
                fitnessTips.length
            )
        ];

    if (fitnessTips.length > 1) {

        while (
            selectedTip.title ===
            currentTitle
        ) {

            selectedTip =
                fitnessTips[
                    Math.floor(
                        Math.random() *
                        fitnessTips.length
                    )
                ];

        }

    }

    setTipsText(
        "randomTipTitle",
        selectedTip.title
    );

    setTipsText(
        "randomTipText",
        selectedTip.summary
    );

}


/* =========================================================
   FILTERS
========================================================= */

/**
 * Initialise search and category filter.
 */
function initialiseTipsFilters() {

    const searchInput =
        document.getElementById(
            "tipsSearch"
        );

    const categoryFilter =
        document.getElementById(
            "tipsCategoryFilter"
        );

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            applyTipsFilters
        );

    }

    if (categoryFilter) {

        categoryFilter.addEventListener(
            "change",
            applyTipsFilters
        );

    }

}


/**
 * Apply all active filters.
 */
function applyTipsFilters() {

    const searchInput =
        document.getElementById(
            "tipsSearch"
        );

    const categoryFilter =
        document.getElementById(
            "tipsCategoryFilter"
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

    filteredTips =
        fitnessTips.filter(
            function (tip) {

                const searchableText = `
                    ${tip.title}
                    ${tip.category}
                    ${tip.summary}
                    ${tip.details.join(" ")}
                    ${tip.note}
                `.toLowerCase();

                const matchesSearch =
                    searchableText.includes(
                        searchValue
                    );

                const matchesCategory =
                    categoryValue === "all" ||
                    tip.category ===
                    categoryValue;

                const matchesFavourite =
                    !favouritesOnly ||
                    favouriteTipIds.includes(
                        tip.id
                    );

                return (
                    matchesSearch &&
                    matchesCategory &&
                    matchesFavourite
                );

            }
        );

    renderFitnessTips(
        filteredTips
    );

}


/* =========================================================
   RESET FILTERS
========================================================= */

/**
 * Reset search, category, and favourites mode.
 */
function resetTipsFilters() {

    const searchInput =
        document.getElementById(
            "tipsSearch"
        );

    const categoryFilter =
        document.getElementById(
            "tipsCategoryFilter"
        );

    const favouritesButton =
        document.getElementById(
            "showFavouritesButton"
        );

    if (searchInput) {
        searchInput.value = "";
    }

    if (categoryFilter) {
        categoryFilter.value = "all";
    }

    favouritesOnly = false;

    if (favouritesButton) {

        favouritesButton.classList.remove(
            "active"
        );

        favouritesButton.setAttribute(
            "aria-pressed",
            "false"
        );

        favouritesButton.textContent =
            "Show Favourites";

    }

    filteredTips = [
        ...fitnessTips
    ];

    renderFitnessTips(
        filteredTips
    );

}


/* =========================================================
   BUTTON EVENTS
========================================================= */

/**
 * Initialise page buttons.
 */
function initialiseTipsButtons() {

    connectTipsButton(
        "newRandomTipButton",
        displayRandomFitnessTip
    );

    connectTipsButton(
        "showFavouritesButton",
        toggleFavouritesOnly
    );

    connectTipsButton(
        "resetTipsFiltersButton",
        resetTipsFilters
    );

    connectTipsButton(
        "emptyTipsResetButton",
        resetTipsFilters
    );

}


/**
 * Connect one button.
 *
 * @param {string} id
 * @param {Function} handler
 */
function connectTipsButton(
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
   RESULT COUNT
========================================================= */

/**
 * Update result counter.
 *
 * @param {number} count
 */
function updateTipsResultCount(count) {

    const element =
        document.getElementById(
            "tipsResultCount"
        );

    if (!element) {
        return;
    }

    element.textContent =
        `${count} ${
            count === 1
                ? "tip"
                : "tips"
        } found`;

}


/* =========================================================
   MESSAGES
========================================================= */

/**
 * Show a page message.
 *
 * @param {string} message
 * @param {"success"|"info"|"error"} type
 */
function showTipsMessage(
    message,
    type
) {

    const element =
        document.getElementById(
            "tipsMessage"
        );

    if (!element) {
        return;
    }

    element.textContent =
        message;

    element.className =
        `tips-message visible ${type}`;

    window.clearTimeout(
        showTipsMessage.timeoutId
    );

    showTipsMessage.timeoutId =
        window.setTimeout(
            function () {

                element.className =
                    "tips-message";

                element.textContent =
                    "";

            },
            3500
        );

}


/* =========================================================
   STORAGE HELPERS
========================================================= */

/**
 * Read JSON safely.
 *
 * @param {string} key
 * @param {*} defaultValue
 * @returns {*}
 */
function readTipsStorage(
    key,
    defaultValue
) {

    return StorageManager.read(
        key,
        defaultValue
    );

}


/**
 * Save JSON safely.
 *
 * @param {string} key
 * @param {*} value
 * @returns {boolean}
 */
function writeTipsStorage(
    key,
    value
) {

    return StorageManager.save(
        key,
        value
    );

}


/* =========================================================
   GENERAL HELPERS
========================================================= */

/**
 * Set text safely.
 *
 * @param {string} id
 * @param {string} value
 */
function setTipsText(
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
 * Escape generated HTML.
 *
 * @param {*} value
 * @returns {string}
 */
function escapeTipsHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}