const body = document.querySelector("body"),
    hourPointer = document.querySelector(".pointer.hour"),
    minutePointer = document.querySelector(".pointer.minute"),
    secondPointer = document.querySelector(".pointer.second"),
    themeToggleBtn = document.querySelector(".toggle-theme");

//load saved theme mode
if(localStorage.getItem("theme") === "night") {
    body.classList.add("night");
    themeToggleBtn.textContent = "Day Mode";
} else {
    themeToggleBtn.textContent = "Night Mode"
}

//Toggle dark/light mode on button click
themeToggleBtn.addEventListener("click", () => {
    body.classList.toggle("night");
    const isNight = body.classList.contains("night");
    themeToggleBtn.textContent = isNight ? "Day Mode" : "Night Mode";
    localStorage.setItem("theme", isNight ? "Night" : "Day");
});

//Update analog clock hands
    function updateClock() {
    const now = new Date();
    const secondsDeg = (now.getSeconds() / 60) * 360;
    const minutsDeg = (now.getMinutes() / 60) * 350 + (secondsDeg/ 60)
    const hoursDeg = ((now.getHours() % 12) / 12) * 360 + (minutsDeg/ 12);

    secondPointer.style.transform = `rotate(${secondsDeg}deg)`;
    minutePointer.style.transform = `rotate(${minutsDeg}deg)`;
    hourPointer.style.transform = `rotate(${hoursDeg}deg)`;
    }

//Update clock every sec
setInterval(updateClock, 1000);

//Initial call to set clock immediately
updateClock();