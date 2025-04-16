// Task Manager
let tasks = [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    
    if (taskText === '') return;
    
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };
    
    tasks.push(task);
    taskInput.value = '';
    renderTasks();
}

function toggleTask(id) {
    tasks = tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} 
                   onchange="toggleTask(${task.id})">
            <span>${task.text}</span>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        
        taskList.appendChild(li);
    });
}

// Pomodoro Timer
let timerInterval = null;
let timeLeft = 25 * 60; // 25 minutes in seconds
let isWorkSession = true;
let cycleCount = 0;

function startTimer() {
    if (timerInterval) return;
    
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            isWorkSession = !isWorkSession;
            cycleCount = isWorkSession ? cycleCount + 1 : cycleCount;
            timeLeft = isWorkSession ? 25 * 60 : 5 * 60; // 25 min work, 5 min break
            updateTimerDisplay();
            updateSessionInfo();
            return;
        }
        
        timeLeft--;
        updateTimerDisplay();
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    timeLeft = 25 * 60;
    isWorkSession = true;
    updateTimerDisplay();
    updateSessionInfo();
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateSessionInfo() {
    document.getElementById('sessionType').textContent = isWorkSession ? 'Work' : 'Break';
    document.getElementById('cycleCount').textContent = cycleCount;
}

// Initialize
updateTimerDisplay();
updateSessionInfo();