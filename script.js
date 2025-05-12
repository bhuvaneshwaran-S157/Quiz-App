const questions = [
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4"
    },
    {
        question: "Who is Eren in AOT?",
        options: ["heroine", "supporting role", "villain", "hero"],
        answer: "villain"
    },
    {
        question: "Who is Levi?",
        options: ["civilian", "commander", "scout", "king"],
        answer: "scout"
    },
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris"
    },
    {
        question: "Which language runs in a web browser?",
        options: ["Java", "C", "Python", "JavaScript"],
        answer: "JavaScript"
    }
];
let currentQuestion = 0;

let qNo = document.getElementById("qNo");
const questionText = document.querySelector(".question-text");
const startBtn = document.getElementById("startBut");
const restartBtn = document.getElementById("restart");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const scoreText = document.querySelector('.score-text');
const optionsContainer = document.getElementById('opt-container');
const qBox = document.querySelector(".quiz-box");
const startCont = document.querySelector(".start-cont");
const navBut = document.querySelector(".nav-buttons");
const result = document.querySelector(".result");
const msg = document.getElementById("score");
let score = 0;
let userAnswers = new Array(questions.length).fill(null);

startBtn.addEventListener("click", () => {
    startCont.style.display = "none";
    qBox.style.display = "block";
    navBut.style.display = "flex";
    showQuestion(currentQuestion);
})

function showQuestion(index) {
    qNo.textContent = `Question ${index + 1} of ${questions.length}`;
    questionText.textContent = questions[index].question;
    optionsContainer.innerHTML = "";

    questions[index].options.forEach(option => {
        const optDiv = document.createElement("div");
        optDiv.classList.add("opt");
        optDiv.textContent = option;
        optDiv.addEventListener("click", () => {
            // optDiv.style.backgroundColor = "";
            const allOptions = document.querySelectorAll('.opt');
            allOptions.forEach(opt => {
                opt.style.backgroundColor = ""; // remove previous highlight
            });

            // Highlight only the clicked one
            optDiv.style.backgroundColor = "#D1A7FF";

            selectOption(option, optDiv, questions[index].answer, index)
        });
        optionsContainer.appendChild(optDiv);
    })
}
nextBtn.addEventListener("click", () => {
    if (userAnswers[currentQuestion] === null) {
        alert("Please answer this question before proceeding.");
        return;
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion(currentQuestion);
    }
    else {
        if (userAnswers.every(ans => ans != null)) {
            showResult();
        }
        else { alert("Answer all the questions to get the result"); }
    }
})
prevBtn.addEventListener("click", () => {
    (currentQuestion > 0) ? currentQuestion-- : currentQuestion;
    showQuestion(currentQuestion);
})

function selectOption(option, optDiv, answer, index) {
    if (answer === option) {
        score++;
    }
    userAnswers[index] = option;
}

function showResult() {
    qBox.style.display = "none";
    result.style.display = "block";
    navBut.style.display = "none"
    msg.textContent = `Your Total Score is ${score}`;
}
restartBtn.addEventListener("click", () => {
    score = 0;
    currentQuestion = 0;
    result.style.display = "none";
    navBut.style.display = "flex"
    qBox.style.display = "block";
    showQuestion(currentQuestion);
})

const themeToggle = document.getElementById("toggle-theme");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
});
