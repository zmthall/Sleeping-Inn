const stickyItem = document.querySelector("[data-sticky]");
const buttons = document.querySelectorAll("[data-button]");
const selectionButtons = document.querySelectorAll("[data-selection-btn]");
const hiddenForms = document.querySelectorAll("[data-hidden]");
var topScreen = false;
var width = screen.width;
var height = screen.height;
var selectionCounts = [1, 1, 0];

addSubtractSelections();
minMaxDate();

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
                if(button.classList.contains("active")) {
                    button.classList.remove("active");
                    setTimeout(function () {
                        button.classList.add("inactive");
                    }, 500)
                } 
            }
        }
    })
})

// listening for clicks within any button to add the .active class to the button
buttons.forEach(button => {
    button.addEventListener("click", () => {
        if(button.classList.contains("active")) {
            button.classList.remove("active");
            setTimeout(function () {
                button.classList.add("inactive");
            }, 500)
        } else if(button.classList.contains("inactive")) {
            button.classList.remove("inactive");
            setTimeout(function () {
                button.classList.add("active");
            }, 100)
        }
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
        if(item.classList.contains("active")) {
            item.classList.remove("active");
            setTimeout(function () {
                item.classList.add("inactive");
            }, 500)
        } 
    })
}

// Intersection observer for when the booking information container intersects with the header
const topOptions = {
    root: null,
    threshold: 1,
    rootMargin: "-84px 0px 0px 0px"
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

function minMaxDate() {
    const date = new Date();
    const bookingDates = document.querySelectorAll("[data-check]");
    let minDate = [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")];
    date.setDate(date.getDate() + 31);
    let maxDate = [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")];

    minDate = minDate[0] + "-" + minDate[1] + "-" + minDate[2];
    maxDate = maxDate[0] + "-" + maxDate[1] + "-" + maxDate[2];
    bookingDates.forEach(bookingDate => {
        if(bookingDate.getAttribute("data-check") === "check-in") {
            bookingDate.min = minDate;
            bookingDate.max = maxDate;
        }


        if(bookingDate.getAttribute("data-check") === "checkout") {
            bookingDate.min = minDate;
            bookingDate.max = maxDate;
        }
    })
}

function addSubtractSelections() {
    let roomCount = document.querySelector("[data-room]");
    let adultCount = document.querySelector("[data-adult]");
    let childCount = document.querySelector("[data-child]");
    selectionButtons.forEach(function callback(button, i) {
        button.addEventListener("click", () => {
            if(button.getAttribute("data-selection-btn") === "room") {
                if(button.classList.contains("add") && selectionCounts[0] < 9) {
                    roomCount.innerHTML = ++selectionCounts[0];
                } else if(button.classList.contains("minus") && selectionCounts[0] > 1) {
                    roomCount.innerHTML = --selectionCounts[0];
                }
            } else if(button.getAttribute("data-selection-btn") === "adult") {
                if(button.classList.contains("add") && selectionCounts[1] < 4) {
                    adultCount.innerHTML = ++selectionCounts[1];
                } else if(button.classList.contains("minus") && selectionCounts[1] > 1) {
                    adultCount.innerHTML = --selectionCounts[1];
                }
            } else if(button.getAttribute("data-selection-btn") === "child") {
                if(button.classList.contains("add") && selectionCounts[2] < 8) {
                    childCount.innerHTML = ++selectionCounts[2];
                } else if(button.classList.contains("minus") && selectionCounts[2] > 0) {
                    childCount.innerHTML = --selectionCounts[2];
                }
            } else {
                return -1;
            }

            selectionCounts.forEach(function callback(count, j) {
                if((count === 9 || (count === 1 && j != 2))) {
                    let temp;
                    if(count === 1) {
                        if(j === 0) {
                            temp = j;
                        } else if(j === 1) {
                            temp = j + 1;
                        } else if(j === 2) {
                            temp = j + 2;
                        }
                    } else if(count === 9) {
                        if(j === 0) {
                            temp = j + 1;
                        } else if(j === 1) {
                            temp = j + 2;
                        } else if(j === 2) {
                            temp = j + 3;
                        }
                    }
                    
                    if(temp >= 0 && !selectionButtons[temp].classList.contains("fade")) {
                        selectionButtons[temp].classList.add("fade");
                    }
                } else if(count === 0 && j === 2) {
                    selectionButtons[j + 2].classList.add("fade");
                } else if(count === 4 && j === 1) {
                    selectionButtons[j + 2].classList.add("fade");
                } else if(count === 8 && j === 2) {
                    selectionButtons[j + 3].classList.add("fade");
                } else {
                    if(button.classList.contains("add")) {
                        selectionButtons[i - 1].classList.remove("fade");
                    } else if(button.classList.contains("minus")) {
                        selectionButtons[i + 1].classList.remove("fade");
                    }
                }
            })
            let temp = document.querySelector("[data-button='guest-selection']");
            let tempString;

            if(roomCount.innerHTML > 1)
            {
                tempString = roomCount.innerHTML + " Rooms";
            } else {
                tempString = roomCount.innerHTML + " Room";
            }

            if((parseInt(adultCount.innerHTML) + parseInt(childCount.innerHTML)) === 1)
                tempString += ", " + (parseInt(adultCount.innerHTML) + parseInt(childCount.innerHTML)) + " Guest";
            else 
                tempString += ", " + (parseInt(adultCount.innerHTML) + parseInt(childCount.innerHTML)) + " Guests";
            temp.innerHTML = tempString;

            for(let i = 0; i < hiddenForms.length; i++)
            {
                if(hiddenForms) 
                    hiddenForms[i].value = selectionCounts[i];
            }
        })
    })
}
