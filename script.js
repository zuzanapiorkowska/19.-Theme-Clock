const hoursNeedle = document.querySelector(".hour");
const minutesNeedle = document.querySelector(".minute");
const secondsNeedle = document.querySelector(".second");
const timeEl = document.querySelector(".time");
const dateEl = document.querySelector(".first-date-part");
const toggle = document.querySelector(".toggle");
const dayEl = document.querySelector(".circle"); 
const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num-in_min)*(out_max-out_min)/(in_max-in_min)+out_min;
};
const scaleTimeToCircle = (time, maxTime) => scale(time, 0, maxTime, 0, 360);

toggle.addEventListener("click", (e) => {
const html = document.querySelector("html");
if(html.classList.contains("dark")) {
    html.classList.remove("dark");
    e.target.innerHTML="Dark mode";
    hoursNeedle.classList.remove("light-needle");
    minutesNeedle.classList.remove("light-needle");
} else {
    html.classList.add("dark");
    e.target.innerHTML="Light mode";
    hoursNeedle.classList.add("light-needle");
    minutesNeedle.classList.add("light-needle");
}
})

// ta metoda łamie SRP

function printNeedles(hoursForClock, minutes, seconds) {
    const hoursNeedleDegree = scaleTimeToCircle(hoursForClock, 12);
    hoursNeedle.style.transform = `translate(-50%, -100%) rotate(${hoursNeedleDegree}deg)`;
    const minutesNeedleDegree = scaleTimeToCircle(minutes, 60);
    minutesNeedle.style.transform = `translate(-50%, -100%) rotate(${minutesNeedleDegree}deg)`;
    const secondsNeedleDegree = scaleTimeToCircle(seconds, 60);
    secondsNeedle.style.transform = `translate(-50%, -100%) rotate(${secondsNeedleDegree}deg)`;
}

function printHour(hours, minutes){
    timeEl.textContent = `${hours}:${minutes}`;
}

function setCurrentTime() {
    const time = new Date();
    const hours = time.getHours();
    const hoursForClock = hours % 12;
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    printNeedles(hoursForClock, minutes, seconds);
    printHour(hours, minutes);
}

function printDate(days, dayOfWeek, months, month, day) {
    dateEl.textContent = `${days[dayOfWeek-1]} ${months[month]} `;
    dayEl.textContent = day;
}

function setCurrentDate(){
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const months = ['Jan', 'Feb', 'Mar','Apr','May','Jun','Jul','Aug','Sep', 'Oct','Nov','Dec'];
    const time = new Date();
    const month = time.getMonth();
    const dayOfWeek = time.getDay();
    const day = time.getDate();

    printDate(days, dayOfWeek, months, month, day);
}

//provider czasu
//klasa odpowiedzialna za rysowanie zegarka

setCurrentTime();
setCurrentDate();

setInterval(()=>{
    
setCurrentTime();
setCurrentDate();
}, 1000);



/*
function setHour(hoursForClock) {
    const biggestHourIndex = 12;
    const smallestHourIndex = 0;
    const smallestDegree = 0;
    const biggestDegree = 360;
    const needleDegree = scale(hoursForClock, 
        smallestHourIndex, biggestHourIndex, 
        smallestDegree, biggestDegree);
    hourNeedle.style.transform = `translate(-50%, -100%) rotate(${needleDegree}deg)`;
}

let h=0;
setInterval(()=>{
    
    setHour(h)
    h++;
    h %= 12;
}, 300);
*/
