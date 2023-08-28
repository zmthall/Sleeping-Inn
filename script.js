const stickyItem = document.querySelector("[data-sticky]");
const buttons = document.querySelectorAll("[data-button]");
var topScreen = false;

buttons.forEach(button => {
    button.addEventListener("click", () => {
        if(button.getAttribute("data-button") === "languages") {
            button.classList.toggle("active");
        }
    })
})

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
