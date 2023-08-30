const stickyItem = document.querySelector("[data-sticky]");
const buttons = document.querySelectorAll("[data-button]");
const selectionButtons = document.querySelectorAll("[data-selection-btn]");
var topScreen = false;
var width = screen.width;
var height = screen.height;
var selectionCounts = [1, 1, 1];

addSubtractSelections();

// listening for clicks within the entire window to close containers that open from using .active class
window.addEventListener("click", (e) => {
    const languageDropdown = document.querySelector(".languages-dropdown-container");
    const mobileLanguage = document.querySelector(".mobile-languages-container"); 
    const mobileNav = document.querySelector(".mobile-content-nav-container");
    const guestSelection = document.querySelector(".guest-selection-form-container");

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
            } else if(guestSelection.contains(e.target)
                && button.getAttribute("data-button") === "guest-selection") {
                return;
            } else {
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
    width = screen.width;
    height = screen.height;
    clearActiveClass();
})


function clearActiveClass() {
    let temp = document.querySelectorAll(".active");
    temp.forEach(item => {
        item.classList.remove("active");
    })
}

// Intersection observer for when the booking information container intersects with the header
const topOptions = {
    root: null,
    threshold: 1,
    rootMargin: "-30px 0px 0px 0px"
};
const topObserver = new IntersectionObserver(entries => {
    const temp = document.querySelector(".languages-dropdown-container");
    const temp2 = document.querySelector(".mobile-content-nav-container");

    entries.forEach(entry => {
        if(!entry.isIntersecting) {
            if(entry.intersectionRect.y < 150 && entry.intersectionRect.y != 0) {
                entry.target.classList.add("top-screen");
                temp.classList.add("hidden");
                temp.previousElementSibling.classList.add("hidden");
                temp2.classList.add("hidden");
                clearActiveClass();
            }
        } else {
            entry.target.classList.remove("top-screen");
            if(entry.intersectionRect.y < 150 && entry.intersectionRect.y != 0) {
                temp.classList.remove("hidden");
                temp.previousElementSibling.classList.remove("hidden");
                temp2.classList.remove("hidden");
            }
        }
    })
}, topOptions)

topObserver.observe(stickyItem);

// functions used to determine counts for the children and other buttons

function addSubtractSelections() {
    let roomCount = document.querySelector("[data-room]");
    let adultCount = document.querySelector("[data-adult]");
    let childCount = document.querySelector("[data-child]");
    selectionButtons.forEach(button => {
        button.addEventListener("click", () => {
            if(button.getAttribute("data-selection-btn") === "room") {
                if(button.classList.contains("add") && selectionCounts[0] < 9) {
                    roomCount.innerHTML = ++selectionCounts[0];
                } else if(button.classList.contains("minus") && selectionCounts[0] > 1) {
                    roomCount.innerHTML = --selectionCounts[0];
                }

                if(selectionCounts[0] === 9 || selectionCounts[0] === 1) {
                    button.classList.add("fade");
                } else {
                    button.classList.remove("fade");
                }
            } else if(button.getAttribute("data-selection-btn") === "adult") {
                console.log("Clicking Adult");
            } else if(button.getAttribute("data-selection-btn") === "child") {
                console.log("Clicking Child");
            } else {
                return -1;
            }
        })
    })

}
