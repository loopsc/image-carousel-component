import "./styles.css";

const buttons = document.querySelectorAll("[data-carousel-button]");
const indicatorsContainer = document.querySelector("[data-indicators]");

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        // Offset to keep track of if user presses back or next
        const offset = button.dataset.carouselButton === "next" ? 1 : -1;

        // Get the ul element
        const slides = document.querySelector("[data-slides]");

        // Current active slide with the 'data-actice' attribute
        const activeSlide = slides.querySelector("[data-active]");

        // index of the current active slide + next or prev button
        let newIndex = [...slides.children].indexOf(activeSlide) + offset;

        if (newIndex < 0) {
            // -1 because slides of slides starts at 0
            // but length starts counting from 1
            newIndex = slides.children.length - 1;
        }
        if (newIndex >= slides.children.length) {
            newIndex = 0;
        }

        // Set 'data-active' to the new slide
        slides.children[newIndex].dataset.active = true;
        // Delete 'data-active' attribute from the previously active slide
        delete activeSlide.dataset.active;

        document.querySelector(".indicator.active")?.classList.remove("active");
        indicatorsContainer.children[newIndex].classList.add("active");
    });
});

// HTML collection of li elements for each image
const slides = document.querySelector("[data-slides]").children;

// Loops through each slide, keeping track of the index
[...slides].forEach((_,index) => {
    // For each slide create a button with the 'indicator' class
    const indicator = document.createElement('button');
    indicator.classList.add('indicator');
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
        document.querySelector("[data-active-indicator]")?.removeAttribute("data-active-indicator")
        // Make the currently selected indicator to be active
        indicator.dataset.activeIndicator = true;
    });
    // Ensure that on page load, the first indicator is active
    indicatorsContainer.children[0].classList.add("active");
})