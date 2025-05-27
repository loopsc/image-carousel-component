import "./styles.css";

const buttons = document.querySelectorAll("[data-carousel-button]");

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        // Offset to keep track of if user presses back or next
        const offset = button.dataset.carouselButton === "next" ? 1 : -1;

        // Get the ul element
        const slides = document.querySelector("[data-slides]");
        console.log("slides",slides)
        console.log("slides.children", slides.children)
        console.log("slides.children.length", slides.children.length)

        const activeSlide = slides.querySelector("[data-active]");
        console.log("activeSlide", activeSlide)

        // index of the current active slide + next or prev button
        let newIndex = [...slides.children].indexOf(activeSlide) + offset;
        console.log("newIndex", newIndex)

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
    });
});
