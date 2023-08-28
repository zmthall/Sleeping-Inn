const stickyItem = document.querySelector("[data-sticky]");
const buttons = document.querySelectorAll("[data-button]");
var topScreen = false;

// listening for clicks within the entire window to close containers that open from using .active class
window.addEventListener("click", (e) => {
    const languageDropdown = document.querySelector(".languages-dropdown-container");
    const mobileLanguage = document.querySelector(".mobile-languages-container"); 
    const mobileNav = document.querySelector(".mobile-content-nav-container");
    buttons.forEach(button => {
        if(button != e.target && button.classList.contains("active")) {
            if(languageDropdown.contains(e.target) 
                && button.getAttribute("data-button") === "languages") {
                return;
            } else if(mobileNav.contains(e.target) 
                && button.getAttribute("data-button") === "hamburger-nav") {
                return;
            } else if(mobileLanguage.contains(e.target)
                && button.getAttribute("data-button") === "mobile-languages") {
                return;
            }
            else {
                button.classList.toggle("active");
            }
        }
    })
})

// listening for clicks within any button to add the .active class to the button
buttons.forEach(button => {
    button.addEventListener("click", () => {
        button.classList.toggle("active");
    })
})

// listening when the window is being resized to reset .active class when the screen shrinks to a smaller screen
window.addEventListener("resize", () => {
    let temp = document.querySelectorAll(".active");
    let width = screen.width;
    if(width <= 960) {
        temp.forEach(item => {
            item.classList.remove("active");
        })
    }
})

// Intersection observer for when the booking information container intersects with the header
const topOptions = {
    root: null,
    threshold: 1,
    rootMargin: "-84px 0px 0px 0px"
};
const topObserver = new IntersectionObserver(entries => {
    const temp = document.querySelector(".languages-dropdown-container");
    entries.forEach(entry => {
        if(!entry.isIntersecting) {
            entry.target.classList.remove("near-top");
            if(entry.intersectionRect.y < 150 && entry.intersectionRect.y != 0) {
                entry.target.classList.add("top-screen");
                temp.classList.add("hidden");
                temp.previousElementSibling.classList.add("hidden");
                temp.previousElementSibling.firstElementChild.classList.remove("active");
            }
        } else {
            entry.target.classList.remove("top-screen");
            if(entry.intersectionRect.y < 150 && entry.intersectionRect.y != 0) {
                entry.target.classList.add("near-top");
                temp.classList.remove("hidden");
                temp.previousElementSibling.classList.remove("hidden");
            }
        }
    })
}, topOptions)

// Intersection observer for when the booking information container gets close to the header language dropdown nav element
const options = {
    root: null,
    threshold: 1,
    rootMargin: "-300px 0px 0px 0px"
};
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.boundingClientRect.y < 350) {
            if(entry.isIntersecting) {
                entry.target.classList.remove("near-top");
            }
            else {
                entry.target.classList.add("near-top");
            }
        }
    })
}, options)

observer.observe(stickyItem);
topObserver.observe(stickyItem);
