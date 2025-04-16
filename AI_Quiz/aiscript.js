const GEMINI_API_KEY = "AIzaSyCkfkv8Xp83dzJAM-BE0h5xnGnk2rNwLO0";
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
let quizData = [];

const syllabus = [
    {
        subject: "Managerial Economics and Financial Analysis",
        subtopics: [
            "Unit I: Introduction to Managerial Economics",
            "Unit II: Production and Cost Analysis",
            "Unit III: Business Organizations and Markets",
            "Unit IV: Capital Budgeting",
            "Unit V: Financial Accounting and Analysis"
        ]
    },
    {
        subject: "Number Theory & Applications",
        subtopics: [
            "Unit I: Integers, Greatest Common Divisors, and Prime Factorization",
            "Unit II: Congruences",
            "Unit III: Applications of Congruences",
            "Unit IV: Finite Fields, Primality Testing, and Factorization",
            "Unit V: Cryptology"
        ]
    },
    {
        subject: "Operating Systems",
        subtopics: [
            "Unit I: Operating Systems Overview",
            "Unit II: Processes, Threads, and Concurrency",
            "Unit III: Synchronization Tools and Deadlocks",
            "Unit IV: Memory Management Strategies",
            "Unit V: File System and Protection"
        ]
    },
    {
        subject: "Database Management Systems",
        subtopics: [
            "Unit I: Introduction and Entity Relationship Model",
            "Unit II: Relational Model",
            "Unit III: SQL and NoSQL Databases",
            "Unit IV: Schema Refinement (Normalization)",
            "Unit V: Transaction Concept and Indexing Techniques"
        ]
    },
    {
        subject: "Computer Networks",
        subtopics: [
            "Unit I: Introduction to Computer Networks",
            "Unit II: The Data Link Layer",
            "Unit III: The Network Layer",
            "Unit IV: The Transport Layer",
            "Unit V: The Application Layer"
        ]
    },
    {
        subject: "Full Stack Development",
        subtopics: [
            "Experiment 1: Building a RESTful API with Node.js and Express",
            "Experiment 2: Creating a Responsive Front-End with React",
            "Experiment 3: Database Integration with MongoDB",
            "Experiment 4: User Authentication with JWT",
            "Experiment 5: Deploying a Full Stack Application to the Cloud"
        ]
    },
    {
        subject: "Design Thinking & Innovation",
        subtopics: [
            "Unit I: Introduction to Design Thinking",
            "Unit II: The Design Thinking Process",
            "Unit III: The Art of Innovation",
            "Unit IV: Problem Formation and Product Design",
            "Unit V: Design Thinking in Business"
        ]
    }
];

document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    setupThemeToggle();
    renderSyllabus();
});

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
        updateThemeToggleText(savedTheme === 'dark-mode' ? 'Toggle Light Mode' : 'Toggle Dark Mode');
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        const theme = prefersDark.matches ? 'dark-mode' : 'light-mode';
        document.body.classList.add(theme);
        localStorage.setItem('theme', theme);
        updateThemeToggleText(theme === 'dark-mode' ? 'Toggle Light Mode' : 'Toggle Dark Mode');
    }
}

function setupThemeToggle() {
    document.getElementById('theme-toggle').addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        document.body.classList.toggle('dark-mode');
        const theme = document.body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
        localStorage.setItem('theme', theme);
        updateThemeToggleText(theme === 'dark-mode' ? 'Toggle Light Mode' : 'Toggle Dark Mode');
    });
}

function updateThemeToggleText(text) {
    document.getElementById('theme-toggle').textContent = text;
}

function renderSyllabus() {
    const syllabusDiv = document.getElementById("syllabus");
    syllabusDiv.innerHTML = '';
    syllabus.forEach(subject => {
        const subjectDiv = document.createElement("div");
        subjectDiv.className = "subject";
        subjectDiv.innerHTML = `<h2>${subject.subject}</h2>`;
        const ul = document.createElement("ul");
        ul.className = "subtopics";
        subject.subtopics.forEach(subtopic => {
            const li = document.createElement("li");
            li.textContent = subtopic;
            li.onclick = () => generateQuiz(subtopic);
            ul.appendChild(li);
        });
        subjectDiv.appendChild(ul);
        syllabusDiv.appendChild(subjectDiv);
    });
}

async function generateQuiz(subtopic) {
    const numQuestions = document.getElementById("numQuestions").value;
    const container = document.getElementById("quiz-container");
    if (!numQuestions || numQuestions < 1) {
        container.innerHTML = '<div class="alert alert-danger">Please enter a positive number of questions</div>';
        return;
    }
    container.style.display = "block";
    container.innerHTML = '<div class="alert alert-info">Generating quiz...</div>';
    try {
        const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Create ${numQuestions} unique multiple choice questions with 4 options each about "${subtopic}". For each question, include an explanation of the correct answer. Return as pure JSON without markdown: {"questions":[{"question":"", "options":[{"option":"", "isCorrect":""}],"explanation":""}]}`
                    }]
                }]
            })
        });
        if (response.status === 429) {
            container.innerHTML = '<div class="alert alert-warning">Too many requests. Please wait a moment and try again.</div>';
            return;
        }
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const data = await response.json();
        let quizText = data.candidates[0].content.parts[0].text.replace(/```json/g, '').replace(/```/g, '').trim();
        quizData = JSON.parse(quizText).questions;
        container.innerHTML = '';
        const topicHeader = document.createElement("h3");
        topicHeader.className = "quiz-topic";
        topicHeader.textContent = `Quiz: ${subtopic}`;
        container.appendChild(topicHeader);
        quizData.forEach((q, i) => {
            const div = document.createElement("div");
            div.className = "card";
            div.innerHTML = `<div class="card-header">${i + 1}. ${q.question}</div>`;
            const ul = document.createElement("ul");
            ul.className = "list-group list-group-flush";
            q.options.forEach(opt => {
                const li = document.createElement("li");
                li.className = "list-group-item";
                li.innerHTML = `
                    <label class="option-label">
                        <input type="radio" name="q${i}" value="${opt.option}" data-correct="${opt.isCorrect}">
                        <span>${opt.option}</span>
                    </label>
                `;
                ul.appendChild(li);
            });
            const explanationDiv = document.createElement("div");
            explanationDiv.className = "explanation";
            explanationDiv.textContent = q.explanation;
            const explainBtn = document.createElement("button");
            explainBtn.className = "show-explanation";
            explainBtn.textContent = "Show Explanation";
            explainBtn.onclick = function() {
                explanationDiv.style.display = explanationDiv.style.display === "block" ? "none" : "block";
                explainBtn.textContent = explanationDiv.style.display === "block" ? "Hide Explanation" : "Show Explanation";
            };
            div.appendChild(ul);
            div.appendChild(explainBtn);
            div.appendChild(explanationDiv);
            container.appendChild(div);
        });
        const submitBtn = document.createElement("button");
        submitBtn.className = "btn btn-success";
        submitBtn.textContent = "Submit Quiz";
        submitBtn.onclick = showResults;
        container.appendChild(submitBtn);
    } catch (error) {
        container.innerHTML = `<div class="alert alert-danger">Error: ${error.message}</div>`;
    }
}

function showResults() {
    let score = 0, unanswered = 0;
    quizData.forEach((q, i) => {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        const options = document.querySelectorAll(`input[name="q${i}"]`);
        if (!selected) unanswered++;
        options.forEach(opt => {
            const li = opt.closest('.list-group-item');
            const isCorrect = opt.getAttribute("data-correct") === "true";
            li.classList.remove("correct", "incorrect");
            if (isCorrect) li.classList.add("correct");
            if (selected === opt && !isCorrect) li.classList.add("incorrect");
            if (selected === opt && isCorrect) score++;
        });
    });
    const container = document.getElementById("quiz-container");
    if (unanswered > 0) {
        const warningDiv = document.createElement("div");
        warningDiv.className = "alert alert-warning";
        warningDiv.textContent = `Warning: You have ${unanswered} question${unanswered > 1 ? 's' : ''}.`;
        container.appendChild(warningDiv);
    }
    const percentage = Math.round((score / quizData.length) * 100);
    const scoreDiv = document.createElement("div");
    scoreDiv.className = "alert alert-info";
    scoreDiv.innerHTML = `<h4>Your Score: ${score} / ${quizData.length} (${percentage}%)</h4><p>${getFeedbackMessage(percentage)}</p>`;
    container.appendChild(scoreDiv);
    container.querySelector(".btn-success").style.display = "none";
    const retryBtn = document.createElement("button");
    retryBtn.className = "btn btn-primary";
    retryBtn.textContent = "Try Another Quiz";
    retryBtn.onclick = () => document.getElementById("syllabus").scrollIntoView({behavior: 'smooth'});
    container.appendChild(retryBtn);
    scoreDiv.scrollIntoView({behavior: 'smooth'});
}

function getFeedbackMessage(percentage) {
    return percentage >= 90 ? "Excellent! You've mastered this topic!" :
           percentage >= 75 ? "Great job! You have a solid understanding of this topic." :
           percentage >= 60 ? "Good effort! With a bit more study, you'll master this topic." :
           percentage >= 40 ? "Keep practicing! Review the explanations to improve your understanding." :
           "This topic needs more of your attention. Don't give up!";
}