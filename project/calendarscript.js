const calendar = document.querySelector(".calendar"),
    date = document.querySelector(".date"),
    daysContainer = document.querySelector(".days"),
    prev = document.querySelector(".prev"),
    next = document.querySelector(".next"),
    todayBtn = document.querySelector(".today-btn"),
    gotoBtn = document.querySelector(".goto-btn"),
    dateInput = document.querySelector(".date-input"),
    eventDay = document.querySelector(".event-day"),
    eventDate = document.querySelector(".event-date"),
    eventsContainer = document.querySelector(".events"),
    comingUpEvents = document.querySelector(".coming-up-events"),
    addEventBtn = document.querySelector(".add-event"),
    addEventWrapper = document.querySelector(".add-event-wrapper"),
    addEventCloseBtn = document.querySelector(".close"),
    addEventType = document.querySelector(".event-type"),
    addEventTitle = document.querySelector(".event-name"),
    addEventRoom = document.querySelector(".event-room"),
    addEventCode = document.querySelector(".event-code"),
    addEventMarks = document.querySelector(".event-marks"),
    addEventDuration = document.querySelector(".event-duration"),
    addEventFrom = document.querySelector(".event-time-from"),
    addEventTo = document.querySelector(".event-time-to"),
    addEventSubmit = document.querySelector(".add-event-btn"),
    themeToggle = document.querySelector(".theme-toggle");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

// Sample data
const eventsArr = [
    {
        day: 19,
        month: 4,
        year: 2025,
        events: [
            {
                type: "lab",
                title: "CNOS Lab",
                time: "10:00 AM - 12:00 PM",
                details: "Lab session for Computer Networks and Operating Systems"
            }
        ]
    },
    {
        day: 23,
        month: 4,
        year: 2025,
        events: [
            {
                type: "lab",
                title: "DBMS Lab",
                time: "09:00 AM - 11:00 AM",
                details: "Database Management Systems practical session"
            }
        ]
    },
    {
        day: 25,
        month: 4,
        year: 2025,
        events: [
            {
                type: "lab",
                title: "FSD Lab",
                time: "02:00 PM - 04:00 PM",
                details: "Full Stack Development lab session"
            }
        ]
    },
    {
        day: 26,
        month: 4,
        year: 2025,
        events: [
            {
                type: "cultural",
                title: "Cultural Fest",
                time: "06:00 PM - 10:00 PM",
                details: "Annual college cultural event with performances"
            }
        ]
    },
    {
        day: 29,
        month: 4,
        year: 2025,
        events: [
            {
                type: "exam",
                title: "MEFA Mid 2 Exam",
                time: "09:00 AM - 10:30 AM",
                room: "A-101",
                code: "23AHMMB01",
                marks: 30,
                duration: "1.5 hours",
                details: "Managerial Economics and Financial Analysis (Descriptive: 15, Objective: 10, Assignment: 5)"
            }
        ]
    },
    {
        day: 30,
        month: 4,
        year: 2025,
        events: [
            {
                type: "exam",
                title: "NTA Mid 2 Exam",
                time: "09:00 AM - 10:30 AM",
                room: "A-102",
                code: "23ABS9917",
                marks: 30,
                duration: "1.5 hours",
                details: "Number Theory & Applications (Descriptive: 15, Objective: 10, Assignment: 5)"
            }
        ]
    },
    {
        day: 1,
        month: 5,
        year: 2025,
        events: [
            {
                type: "exam",
                title: "OS Mid 2 Exam",
                time: "09:00 AM - 10:30 AM",
                room: "A-103",
                code: "23APC0510",
                marks: 30,
                duration: "1.5 hours",
                details: "Operating Systems (Descriptive: 15, Objective: 10, Assignment: 5)"
            }
        ]
    },
    {
        day: 2,
        month: 5,
        year: 2025,
        events: [
            {
                type: "exam",
                title: "DBMS Mid 2 Exam",
                time: "09:00 AM - 10:30 AM",
                room: "A-104",
                code: "23APC0508",
                marks: 30,
                duration: "1.5 hours",
                details: "Database Management Systems (Descriptive: 15, Objective: 10, Assignment: 5)"
            }
        ]
    },
    {
        day: 3,
        month: 5,
        year: 2025,
        events: [
            {
                type: "exam",
                title: "CN Mid 2 Exam",
                time: "09:00 AM - 10:30 AM",
                room: "A-105",
                code: "23APC3601",
                marks: 30,
                duration: "1.5 hours",
                details: "Computer Networks (Descriptive: 15, Objective: 10, Assignment: 5)"
            }
        ]
    },
    {
        day: 4,
        month: 5,
        year: 2025,
        events: [
            {
                type: "exam",
                title: "DTI Mid 2 Exam",
                time: "09:00 AM - 10:30 AM",
                room: "A-106",
                code: "23AES0304",
                marks: 30,
                duration: "1.5 hours",
                details: "Design Thinking & Innovation (Descriptive: 15, Objective: 10, Assignment: 5)"
            }
        ]
    },
    {
        day: 5,
        month: 4,
        year: 2025,
        events: [
            {
                type: "other",
                title: "Guest Lecture",
                time: "11:00 AM - 01:00 PM",
                details: "Talk on AI advancements"
            }
        ]
    },
    {
        day: 12,
        month: 4,
        year: 2025,
        events: [
            {
                type: "lab",
                title: "AI Lab",
                time: "02:00 PM - 04:00 PM",
                details: "Artificial Intelligence practical session"
            }
        ]
    },
    {
        day: 15,
        month: 4,
        year: 2025,
        events: [
            {
                type: "cultural",
                title: "Dance Workshop",
                time: "04:00 PM - 06:00 PM",
                details: "Learn contemporary dance"
            }
        ]
    }
];

// Initialize calendar
function initCalendar() {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    date.innerHTML = months[month] + " " + year;

    let days = "";

    for (let x = day; x > 0; x--) {
        days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
    }

    for (let i = 1; i <= lastDate; i++) {
        let event = false;
        let eventType = "";
        eventsArr.forEach((eventObj) => {
            if (eventObj.day === i && eventObj.month === month + 1 && eventObj.year === year) {
                event = true;
                eventType = eventObj.events[0].type;
            }
        });

        let classes = ["day"];
        if (event) classes.push(`event event-${eventType}`);
        if (
            i === today.getDate() &&
            year === today.getFullYear() &&
            month === today.getMonth()
        ) {
            activeDay = i;
            classes.push("today");
            getActiveDay(i);
            updateEvents(i);
        }
        if (activeDay === i) classes.push("active");

        days += `<div class="${classes.join(" ")}">${i}</div>`;
    }

    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="day next-date">${j}</div>`;
    }

    daysContainer.innerHTML = days;
    addListener();
    updateComingUp();
}

// Navigation
function prevMonth() {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    initCalendar();
}

function nextMonth() {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

todayBtn.addEventListener("click", () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
});

gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
    const dateArr = dateInput.value.split("/");
    if (dateArr.length === 2 && dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
        month = dateArr[0] - 1;
        year = parseInt(dateArr[1]);
        initCalendar();
    } else {
        alert("Invalid Date");
    }
}

// Add listeners to days
function addListener() {
    const days = document.querySelectorAll(".day");
    days.forEach((day) => {
        day.addEventListener("click", (e) => {
            const selectedDay = Number(e.target.innerHTML);
            getActiveDay(selectedDay);
            updateEvents(selectedDay);
            activeDay = selectedDay;

            days.forEach((d) => d.classList.remove("active"));
            if (e.target.classList.contains("prev-date")) {
                prevMonth();
                setTimeout(() => {
                    document.querySelectorAll(".day").forEach((d) => {
                        if (!d.classList.contains("prev-date") && d.innerHTML === e.target.innerHTML) {
                            d.classList.add("active");
                        }
                    });
                }, 100);
            } else if (e.target.classList.contains("next-date")) {
                nextMonth();
                setTimeout(() => {
                    document.querySelectorAll(".day").forEach((d) => {
                        if (!d.classList.contains("next-date") && d.innerHTML === e.target.innerHTML) {
                            d.classList.add("active");
                        }
                    });
                }, 100);
            } else {
                e.target.classList.add("active");
            }
        });
    });
}

// Update active day
function getActiveDay(date) {
    const day = new Date(year, month, date);
    const dayName = day.toString().split(" ")[0];
    eventDay.innerHTML = dayName;
    eventDate.innerHTML = date + " " + months[month] + " " + year;
}

// Update events for selected day
function updateEvents(date) {
    let events = "";
    eventsArr.forEach((event) => {
        if (date === event.day && month + 1 === event.month && year === event.year) {
            event.events.forEach((evt) => {
                events += `
                    <div class="event event-${evt.type}">
                        <div class="title">
                            <i class="fas fa-circle"></i>
                            <h3 class="event-title">${evt.title}</h3>
                        </div>
                        <div class="event-time">${evt.time}</div>
                        ${evt.room ? `<div class="event-details">Room: ${evt.room}</div>` : ""}
                        ${evt.code ? `<div class="event-details">Code: ${evt.code}</div>` : ""}
                        ${evt.marks ? `<div class="event-details">Marks: ${evt.marks}</div>` : ""}
                        ${evt.duration ? `<div class="event-details">Duration: ${evt.duration}</div>` : ""}
                        ${evt.details ? `<div class="event-details">${evt.details}</div>` : ""}
                    </div>`;
            });
        }
    });
    eventsContainer.innerHTML = events || `<div class="no-event"><h3>No Events</h3></div>`;
}

// Update coming up section
function updateComingUp() {
    const comingUp = eventsArr
        .filter((event) => {
            const eventDate = new Date(event.year, event.month - 1, event.day);
            return eventDate >= today;
        })
        .sort((a, b) => {
            const dateA = new Date(a.year, a.month - 1, a.day);
            const dateB = new Date(b.year, b.month - 1, b.day);
            return dateA - dateB;
        })
        .slice(0, 5);

    let events = "";
    comingUp.forEach((event) => {
        event.events.forEach((evt) => {
            events += `
                <div class="event event-${evt.type}">
                    <div class="title">
                        <i class="fas fa-circle"></i>
                        <h3 class="event-title">${evt.title} (${event.day}/${event.month}/${event.year})</h3>
                    </div>
                    <div class="event-time">${evt.time}</div>
                </div>`;
        });
    });
    comingUpEvents.innerHTML = events || `<div class="no-event"><h3>No Upcoming Events</h3></div>`;
}

// Add event form handling
addEventBtn.addEventListener("click", () => {
    addEventWrapper.classList.toggle("active");
});

addEventCloseBtn.addEventListener("click", () => {
    addEventWrapper.classList.remove("active");
});

document.addEventListener("click", (e) => {
    if (e.target !== addEventBtn && !addEventWrapper.contains(e.target)) {
        addEventWrapper.classList.remove("active");
    }
});

addEventType.addEventListener("change", (e) => {
    const examDetails = document.querySelectorAll(".exam-details");
    examDetails.forEach((el) => {
        el.style.display = e.target.value === "exam" ? "block" : "none";
    });
});

addEventSubmit.addEventListener("click", () => {
    const eventType = addEventType.value;
    const eventTitle = addEventTitle.value;
    const eventRoom = addEventRoom.value;
    const eventCode = addEventCode.value;
    const eventMarks = addEventMarks.value;
    const eventDuration = addEventDuration.value;
    const eventTimeFrom = addEventFrom.value;
    const eventTimeTo = addEventTo.value;

    if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
        alert("Please fill all required fields");
        return;
    }

    if (eventType === "exam" && (!eventRoom || !eventCode || !eventMarks || !eventDuration)) {
        alert("Please fill all exam details");
        return;
    }

    const timeFromArr = eventTimeFrom.split(":");
    const timeToArr = eventTimeTo.split(":");
    if (
        timeFromArr.length !== 2 ||
        timeToArr.length !== 2 ||
        timeFromArr[0] > 23 ||
        timeFromArr[1] > 59 ||
        timeToArr[0] > 23 ||
        timeToArr[1] > 59
    ) {
        alert("Invalid Time Format");
        return;
    }

    const newEvent = {
        type: eventType,
        title: eventTitle,
        time: `${convertTime(eventTimeFrom)} - ${convertTime(eventTimeTo)}`
    };

    if (eventType === "exam") {
        newEvent.room = eventRoom;
        newEvent.code = eventCode;
        newEvent.marks = eventMarks;
        newEvent.duration = eventDuration;
        newEvent.details = `${eventTitle} (Descriptive: 15, Objective: 10, Assignment: 5)`;
    }

    let eventAdded = false;
    eventsArr.forEach((item) => {
        if (item.day === activeDay && item.month === month + 1 && item.year === year) {
            item.events.push(newEvent);
            eventAdded = true;
        }
    });

    if (!eventAdded) {
        eventsArr.push({
            day: activeDay,
            month: month + 1,
            year: year,
            events: [newEvent]
        });
    }

    addEventWrapper.classList.remove("active");
    addEventType.value = "exam";
    addEventTitle.value = "";
    addEventRoom.value = "";
    addEventCode.value = "";
    addEventMarks.value = "";
    addEventDuration.value = "";
    addEventFrom.value = "";
    addEventTo.value = "";
    document.querySelectorAll(".exam-details").forEach((el) => (el.style.display = "none"));

    updateEvents(activeDay);
    updateComingUp();
    initCalendar();
});

// Delete event
eventsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("event")) {
        if (confirm("Are you sure you want to delete this event?")) {
            const eventTitle = e.target.querySelector(".event-title").innerHTML;
            eventsArr.forEach((event) => {
                if (event.day === activeDay && event.month === month + 1 && event.year === year) {
                    event.events = event.events.filter((evt) => evt.title !== eventTitle);
                    if (event.events.length === 0) {
                        eventsArr.splice(eventsArr.indexOf(event), 1);
                    }
                }
            });
            updateEvents(activeDay);
            updateComingUp();
            initCalendar();
        }
    }
});

// Theme toggle
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");
    themeToggle.querySelector("i").classList.toggle("fa-moon");
    themeToggle.querySelector("i").classList.toggle("fa-sun");
    themeToggle.querySelector("span").innerText = document.body.classList.contains("dark-mode")
        ? "Light Mode"
        : "Dark Mode";
});

// Time conversion
function convertTime(time) {
    let [hour, min] = time.split(":");
    hour = parseInt(hour);
    const period = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${min} ${period}`;
}

// Initialize
initCalendar();