"use strict";

/**
 * Simple Fitness Planner
 * Common JavaScript and home-page JavaScript.
 */

document.addEventListener("DOMContentLoaded", function () {

    setCurrentYear();
    setActiveNavigationLink();
    initialiseMobileMenu();
    initialiseScrollTopButton();

    initialiseHomePage();

});


/* =========================================================
   1. CURRENT YEAR
========================================================= */

/**
 * Display the current year in the footer.
 */
function setCurrentYear() {

    const yearElements = document.querySelectorAll(
        "#currentYear"
    );

    const currentYear = new Date().getFullYear();

    yearElements.forEach(function (yearElement) {
        yearElement.textContent = currentYear;
    });

}


/* =========================================================
   2. ACTIVE NAVIGATION
========================================================= */

/**
 * Highlight the navigation link for the current page.
 */
function setActiveNavigationLink() {

    const currentPage = document.body.dataset.page;

    if (!currentPage) {
        return;
    }

    const navigationLinks = document.querySelectorAll(
        "[data-page-link]"
    );

    navigationLinks.forEach(function (navigationLink) {

        const linkPage = navigationLink.dataset.pageLink;

        if (linkPage === currentPage) {

            navigationLink.classList.add("active");

            navigationLink.setAttribute(
                "aria-current",
                "page"
            );

        } else {

            navigationLink.classList.remove("active");

            navigationLink.removeAttribute(
                "aria-current"
            );

        }

    });

}


/* =========================================================
   3. MOBILE NAVIGATION
========================================================= */

/**
 * Initialise the mobile navigation menu.
 */
function initialiseMobileMenu() {

    const menuButton = document.getElementById(
        "mobileMenuButton"
    );

    const navigation = document.getElementById(
        "mainNavigation"
    );

    if (!menuButton || !navigation) {
        return;
    }

    menuButton.addEventListener("click", function () {

        const menuIsOpen = navigation.classList.toggle(
            "open"
        );

        menuButton.classList.toggle(
            "active",
            menuIsOpen
        );

        document.body.classList.toggle(
            "menu-open",
            menuIsOpen
        );

        menuButton.setAttribute(
            "aria-expanded",
            String(menuIsOpen)
        );

        menuButton.setAttribute(
            "aria-label",
            menuIsOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

    });


    const navigationLinks = navigation.querySelectorAll(
        ".navigation-link"
    );

    navigationLinks.forEach(function (navigationLink) {

        navigationLink.addEventListener(
            "click",
            function () {

                closeMobileMenu(
                    menuButton,
                    navigation
                );

            }
        );

    });


    document.addEventListener("click", function (event) {

        const clickedInsideNavigation = navigation.contains(
            event.target
        );

        const clickedMenuButton = menuButton.contains(
            event.target
        );

        if (
            !clickedInsideNavigation &&
            !clickedMenuButton
        ) {

            closeMobileMenu(
                menuButton,
                navigation
            );

        }

    });


    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            closeMobileMenu(
                menuButton,
                navigation
            );

        }

    });


    window.addEventListener("resize", function () {

        if (window.innerWidth > 900) {

            closeMobileMenu(
                menuButton,
                navigation
            );

        }

    });

}


/**
 * Close the mobile menu.
 *
 * @param {HTMLElement} menuButton
 * @param {HTMLElement} navigation
 */
function closeMobileMenu(menuButton, navigation) {

    navigation.classList.remove("open");

    menuButton.classList.remove("active");

    document.body.classList.remove("menu-open");

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );

    menuButton.setAttribute(
        "aria-label",
        "Open navigation menu"
    );

}


/* =========================================================
   4. SCROLL-TO-TOP BUTTON
========================================================= */

/**
 * Show the scroll-to-top button after scrolling.
 */
function initialiseScrollTopButton() {

    const scrollTopButton = document.getElementById(
        "scrollTopButton"
    );

    if (!scrollTopButton) {
        return;
    }

    function updateScrollButton() {

        if (window.scrollY > 300) {

            scrollTopButton.classList.add(
                "visible"
            );

        } else {

            scrollTopButton.classList.remove(
                "visible"
            );

        }

    }

    window.addEventListener(
        "scroll",
        updateScrollButton
    );

    updateScrollButton();

    scrollTopButton.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   5. HOME PAGE INITIALISATION
========================================================= */

/**
 * Run home-page features only on index.html.
 */
function initialiseHomePage() {

    if (document.body.dataset.page !== "home") {
        return;
    }

    displayTodayDate();
    initialiseMotivationalQuotes();
    displayWorkoutSummary();
    displayWaterSummary();

}


/* =========================================================
   6. TODAY'S DATE
========================================================= */

/**
 * Display today's formatted date.
 */
function displayTodayDate() {

    const dateElement = document.getElementById(
        "todayDate"
    );

    if (!dateElement) {
        return;
    }

    const today = new Date();

    const formattedDate = new Intl.DateTimeFormat(
        "en-US",
        {
            weekday: "long",
            month: "long",
            day: "numeric"
        }
    ).format(today);

    dateElement.textContent = formattedDate;

}


/* =========================================================
   7. MOTIVATIONAL QUOTES
========================================================= */

const motivationalQuotes = [
    "Success starts with showing up.",
    "A little progress each day adds up to big results.",
    "Consistency is more important than perfection.",
    "Small healthy choices create lasting change.",
    "Every workout is a step forward.",
    "Stay patient and trust your progress.",
    "Your only competition is who you were yesterday.",
    "Strong habits create a stronger you.",
    "The hardest step is often the first one.",
    "Do something today that your future self will thank you for.",
    "You do not have to be great to begin.",
    "Your body can do more than your mind thinks."
];


/**
 * Initialise the random quote button.
 */
function initialiseMotivationalQuotes() {

    const quoteElement = document.getElementById(
        "motivationalQuote"
    );

    const newQuoteButton = document.getElementById(
        "newQuoteButton"
    );

    if (!quoteElement) {
        return;
    }

    displayRandomQuote(quoteElement);

    if (newQuoteButton) {

        newQuoteButton.addEventListener(
            "click",
            function () {

                displayRandomQuote(
                    quoteElement
                );

            }
        );

    }

}


/**
 * Display a random quote.
 *
 * @param {HTMLElement} quoteElement
 */
function displayRandomQuote(quoteElement) {

    const currentQuote = quoteElement.textContent.trim();

    let selectedQuote = currentQuote;

    if (motivationalQuotes.length === 1) {

        selectedQuote = motivationalQuotes[0];

    } else {

        while (selectedQuote === currentQuote) {

            const randomIndex = Math.floor(
                Math.random() *
                motivationalQuotes.length
            );

            selectedQuote =
                motivationalQuotes[randomIndex];

        }

    }

    quoteElement.classList.add(
        "quote-changing"
    );

    window.setTimeout(function () {

        quoteElement.textContent = selectedQuote;

        quoteElement.classList.remove(
            "quote-changing"
        );

    }, 150);

}


/* =========================================================
   8. LOCAL STORAGE HELPERS
========================================================= */

/**
 * Read JSON safely from localStorage.
 *
 * @param {string} key
 * @param {*} defaultValue
 * @returns {*}
 */
function readLocalStorage(key, defaultValue) {

    return StorageManager.read(key, defaultValue);

}


/**
 * Return today's date as YYYY-MM-DD.
 *
 * @returns {string}
 */
function getTodayDateKey() {

    const today = new Date();

    const year = today.getFullYear();

    const month = String(
        today.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        today.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;

}


/**
 * Calculate a percentage.
 *
 * @param {number} completed
 * @param {number} total
 * @returns {number}
 */
function calculatePercentage(completed, total) {

    if (total <= 0) {
        return 0;
    }

    return Math.min(
        100,
        Math.round(
            (completed / total) * 100
        )
    );

}


/* =========================================================
   9. WORKOUT SUMMARY
========================================================= */

/**
 * Display today's workout information.
 */
function displayWorkoutSummary() {

    const workoutData = readLocalStorage(
        "fitness_daily_workout",
        null
    );

    const messageElement = document.getElementById(
        "workoutSummaryMessage"
    );

    const percentageElement = document.getElementById(
        "workoutPercentageText"
    );

    const progressFill = document.getElementById(
        "workoutProgressFill"
    );

    const progressBar = document.getElementById(
        "workoutProgressBar"
    );

    const completedElement = document.getElementById(
        "completedExerciseCount"
    );

    const totalElement = document.getElementById(
        "totalExerciseCount"
    );

    const durationElement = document.getElementById(
        "workoutDuration"
    );

    if (
        !messageElement ||
        !percentageElement ||
        !progressFill ||
        !completedElement ||
        !totalElement
    ) {
        return;
    }

    let completedCount = 0;
    let totalCount = 0;
    let duration = 0;

    const todayKey = getTodayDateKey();

    if (
        workoutData &&
        (
            !workoutData.date ||
            workoutData.date === todayKey
        )
    ) {

        if (Array.isArray(workoutData.exercises)) {

            totalCount =
                workoutData.exercises.length;

            completedCount =
                workoutData.exercises.filter(
                    function (exercise) {

                        return (
                            exercise.completed === true
                        );

                    }
                ).length;

        } else {

            totalCount = Number(
                workoutData.totalExercises
            ) || 0;

            completedCount = Number(
                workoutData.completedExercises
            ) || 0;

        }

        duration = Number(
            workoutData.duration
        ) || 0;

    }

    const percentage = calculatePercentage(
        completedCount,
        totalCount
    );

    completedElement.textContent =
        completedCount;

    totalElement.textContent =
        totalCount;

    percentageElement.textContent =
        `${percentage}%`;

    progressFill.style.width =
        `${percentage}%`;

    if (progressBar) {

        progressBar.setAttribute(
            "aria-valuenow",
            String(percentage)
        );

    }

    if (durationElement) {

        durationElement.textContent =
            duration;

    }

    progressFill.classList.remove(
        "progress-fill-success"
    );

    if (totalCount === 0) {

        messageElement.textContent =
            "You have not added any exercises for today.";

    } else if (percentage === 100) {

        messageElement.textContent =
            "Excellent! You completed today’s workout.";

        progressFill.classList.add(
            "progress-fill-success"
        );

    } else if (percentage >= 50) {

        messageElement.textContent =
            "Great progress! Keep going to finish your workout.";

    } else if (completedCount > 0) {

        messageElement.textContent =
            "You have started. Complete another exercise.";

    } else {

        messageElement.textContent =
            "Your workout is ready. Begin with the first exercise.";

    }

}


/* =========================================================
   10. WATER SUMMARY
========================================================= */

/**
 * Display today's water information.
 */
function displayWaterSummary() {

    const waterData = readLocalStorage(
        "fitness_water_today",
        null
    );

    const messageElement = document.getElementById(
        "waterSummaryMessage"
    );

    const percentageElement = document.getElementById(
        "waterPercentageText"
    );

    const progressFill = document.getElementById(
        "waterProgressFill"
    );

    const progressBar = document.getElementById(
        "waterProgressBar"
    );

    const consumedElement = document.getElementById(
        "waterConsumedCount"
    );

    const goalElement = document.getElementById(
        "waterGoalCount"
    );

    if (
        !messageElement ||
        !percentageElement ||
        !progressFill ||
        !consumedElement ||
        !goalElement
    ) {
        return;
    }

    let consumed = 0;
    let goal = 8;

    const todayKey = getTodayDateKey();

    if (
        waterData &&
        (
            !waterData.date ||
            waterData.date === todayKey
        )
    ) {

        consumed = Number(
            waterData.consumed ??
            waterData.glasses ??
            waterData.count
        ) || 0;

        goal = Number(
            waterData.goal
        ) || 8;

    }

    consumed = Math.max(
        0,
        consumed
    );

    goal = Math.max(
        1,
        goal
    );

    const percentage = Math.min(
        100,
        calculatePercentage(
            consumed,
            goal
        )
    );

    consumedElement.textContent =
        consumed;

    goalElement.textContent =
        goal;

    percentageElement.textContent =
        `${percentage}%`;

    progressFill.style.width =
        `${percentage}%`;

    if (progressBar) {

        progressBar.setAttribute(
            "aria-valuenow",
            String(percentage)
        );

    }

    progressFill.classList.remove(
        "progress-fill-success"
    );

    if (consumed === 0) {

        messageElement.textContent =
            "Start recording your daily water intake.";

    } else if (consumed >= goal) {

        messageElement.textContent =
            "Excellent! You reached your daily water goal.";

        progressFill.classList.add(
            "progress-fill-success"
        );

    } else if (percentage >= 75) {

        messageElement.textContent =
            "Almost there! Only a little more water is needed.";

    } else if (percentage >= 50) {

        messageElement.textContent =
            "You are halfway towards your water goal.";

    } else {

        messageElement.textContent =
            "Good start. Remember to drink water regularly.";

    }

}

/* =========================================================
   7. PAGE CONNECTION REFRESH
========================================================= */

/**
 * Refresh the home dashboard after returning from another page
 * through the browser Back or Forward controls.
 */
window.addEventListener("pageshow", function (event) {

    if (
        document.body.dataset.page === "home" &&
        event.persisted
    ) {
        displayWorkoutSummary();
        displayWaterSummary();
    }

});


/**
 * Refresh home-page summaries when another browser tab changes
 * workout or water data.
 */
window.addEventListener("storage", function (event) {

    const connectedKeys = [
        "fitness_daily_workout",
        "fitness_workout_history",
        "fitness_water_today",
        "fitness_water_history"
    ];

    if (
        document.body.dataset.page === "home" &&
        connectedKeys.includes(event.key)
    ) {
        displayWorkoutSummary();
        displayWaterSummary();
    }

});
