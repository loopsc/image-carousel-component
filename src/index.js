import "./styles.css";

const buttons = document.querySelectorAll("[data-carousel-button]");
const indicatorsContainer = document.querySelector("[data-indicators]");

function goToSlide(newIndex) {
    const slidesContainer = document.querySelector("[data-slides]");
    const activeSlide = slidesContainer.querySelector("[data-active]");

    delete activeSlide.dataset.active;
    slidesContainer.children[newIndex].dataset.active = true;

    // Update indicators
    document
        .querySelector("[data-active-indicator]")
        ?.removeAttribute("data-active-indicator");
    indicatorsContainer.children[newIndex].dataset.activeIndicator = true;
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const offset = button.dataset.carouselButton === "next" ? 1 : -1;
        const slidesContainer = document.querySelector("[data-slides]");
        const activeSlide = slidesContainer.querySelector("[data-active]");
        let newIndex =
            [...slidesContainer.children].indexOf(activeSlide) + offset;

        if (newIndex < 0) newIndex = slidesContainer.children.length - 1;
        if (newIndex >= slidesContainer.children.length) newIndex = 0;

        goToSlide(newIndex);
    });
});

// HTML collection of li elements for each image
const slides = document.querySelector("[data-slides]").children;

// Loops through each slide, keeping track of the index
[...slides].forEach((_, index) => {
    // For each slide create a button with the 'indicator' class
    const indicator = document.createElement("button");
    indicator.classList.add("indicator");
    // While looping through all the slides, when it encounters the active slide
    // add the corresponding indicator with dataset active
    if (slides[index].hasAttribute("[data-active]")) {
        indicator.dataset.activeIndicator = true;
    }
    // Mark each indicator with a corresponding index
    indicator.dataset.index = index;
    // Append to the ul
    indicatorsContainer.appendChild(indicator);

    indicator.addEventListener("click", () => {
        // Get the current active slide and delete 'data-active'
        const activeSlide = document.querySelector("[data-active]");
        delete activeSlide.dataset.active;
        // Set the clicked slide to be active
        slides[index].dataset.active = true;

        // Find the indicator previously active and remove the active tag
        document
            .querySelector("[data-active-indicator]")
            ?.removeAttribute("data-active-indicator");
        // Make the currently selected indicator to be active
        indicator.dataset.activeIndicator = true;
    });
});

// Ensure that on page load, the first indicator is active
indicatorsContainer.children[0].dataset.activeIndicator = true;

setInterval(() => {
    const slidesContainer = document.querySelector("[data-slides]");
    const activeSlide = slidesContainer.querySelector("[data-active]");
    let newIndex = [...slidesContainer.children].indexOf(activeSlide) + 1;

    if (newIndex >= slidesContainer.children.length) {
        newIndex = 0; // loop back to first slide
    }

    goToSlide(newIndex);
}, 5000);
