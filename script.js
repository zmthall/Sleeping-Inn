const stickyItem = document.querySelector("[data-test]")
var topScreen = false;

addEventListener("scroll", (event) =>
{
    var temp = document.querySelector(".booking-input-container");
    if(stickyItem.getBoundingClientRect().y === 90) {
        temp.classList.add("top-screen");
    } else {
        temp.classList.remove("top-screen")
    }
    
}

 )