const quotes = [
    `"Code is like humor. When you have to explain it, it's bad."`,
    `"The function of good software is to make the complex appear to be simple."`,
    `"Programming isn't about what you know; it's about what you can figure out."`,
    `"Simplicity is the soul of efficiency."`,
    `"Software engineering is not just about writing code. It's about solving problems and making lives better."`
];

const authors = [
    "- Cory House",
    "- Grady Booch",
    "- Chris Pine",
    "- Austin Freeman",
    ""
]

let currentIndex = 0;

function updateQuoteAndAuthor() {
    const quoteElement = document.getElementById('quote');
    const authorElement = document.getElementById('author');
    
    if (quoteElement && authorElement) {
        quoteElement.textContent = quotes[currentIndex];
        authorElement.textContent = authors[currentIndex];

        currentIndex = (currentIndex + 1) % quotes.length;
        currentIndex = (currentIndex + 1) % authors.length;
    }
}

updateQuoteAndAuthor();

setInterval(updateQuoteAndAuthor, 10000);

document.addEventListener('DOMContentLoaded', function() {
    const needAccount = document.getElementById('need-account');
    const haveAccount = document.getElementById('have-account');
    const dropdown = document.getElementById('dropdown-menu');
    const goButton = document.getElementById('go-button');
    const gameSelection = document.getElementById('game-selection');
    const mathProblem = document.getElementById('math-problem');
    const answer = document.getElementById('user-answer');
    const checkAnswerElement = document.getElementById('check-answer');

    function registerForm() {
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        loginForm.style.display = "none";
        registerForm.style.display = "block";
    }

    if (needAccount) {
        needAccount.addEventListener('click', function(e) {
            e.preventDefault();
            registerForm();
        });
    }

    function loginForm() {
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        loginForm.style.display = "block";
        registerForm.style.display = "none";
    }

    if (haveAccount) {
        haveAccount.addEventListener('click', function(e) {
            e.preventDefault();
            loginForm();
        });
    }

    function mathGame() {
        const gameMenu = document.getElementById('math-facts-menu');
        const mathGameLayout = document.getElementById('math-game-layout');
        const clearBtn = document.getElementById('clear');
        const buttons = document.querySelectorAll('.button');

        gameMenu.style.display = 'none';
        mathGameLayout.style.display = 'block';

        answer.focus();

        clearBtn.addEventListener('click', function() {
            answer.value = "";
            answer.focus();
        });

        buttons.forEach(function(button) {
            button.addEventListener('click', function() {
                answer.value += button.value;
                answer.focus();
            });
        });
    }

    const timerDisplay = document.getElementById('timer');
    const willBeHidden = document.getElementById('will-be-hidden');
    const timesUpScreen = document.getElementById('times-up-screen');
    const finalScore = document.getElementById('final-score');
    const score = document.getElementById('score');

    let timeLeft = 30;
    let timerInterval;
    let correctAnswer;
    let i = 0;

    if (goButton) {
        goButton.addEventListener('click', function(e) {
            e.preventDefault();
    
            const selectedValue = dropdown.value;
    
            if (selectedValue !== '0') {
                mathGame();
            
                if (!timerInterval) {
                    timerInterval = setInterval(() => {
                        timeLeft--;
                        timerDisplay.textContent = timeLeft;
        
                        if (timeLeft <= 0) {
                            willBeHidden.style.display = 'none';
                            timesUpScreen.style.display = 'block';
                            finalScore.textContent = score.textContent;
                            clearInterval(timerInterval);
                        }
                    }, 1000);
                }

                if (selectedValue === 'Addition') {
                    correctAnswer = randomAddProblem();
                } else if (selectedValue === 'Subtraction') {
                    correctAnswer = randomSubProblem();
                } else if (selectedValue === 'Multiplication') {
                    correctAnswer = randomMultiProblem();
                } else {
                    if (selectedValue === 'Division') {
                        correctAnswer = randomDivProblem();
                    }
                }
            } else {
                alert('Please select a valid game')
            }
        });
    }
    
    if (dropdown) {
        dropdown.addEventListener('change', function() {
            const selectedValue = dropdown.value;
            gameSelection.textContent = selectedValue;
        });
    }

    function randomAddProblem() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const addProblemText = `${num1} + ${num2} = ?`;

        if (mathProblem) {
            mathProblem.textContent = addProblemText;
            return num1 + num2;
        }
    }

    function randomSubProblem() {
        let num1 = Math.floor(Math.random() * 10) + 1;
        let num2 = Math.floor(Math.random() * 10) + 1;

        if (num2 > num1) {
            [num1, num2] = [num2, num1];
        }

        const subProblemText = `${num1} - ${num2} = ?`;

        if (mathProblem) {
            mathProblem.textContent = subProblemText;
            return num1 - num2;
        }
    }

    function randomMultiProblem() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const multiProblemText = `${num1} x ${num2} = ?`;

        if (mathProblem) {
            mathProblem.textContent = multiProblemText;
            return num1 * num2;
        }
    }

    function randomDivProblem() {
        let num2 = Math.floor(Math.random() * 9) + 1;
        let num1 = num2 * (Math.floor(Math.random() * 10) + 1);

        const divProblemText = `${num1} / ${num2} = ?`;

        if (mathProblem) {
            mathProblem.textContent = divProblemText;
            return num1 / num2;
        }
    }

    function checkAnswer(correctAnswer) {
        const userAnswer = parseInt(document.getElementById('user-answer').value, 10);
        const result = document.getElementById('result');

        if (userAnswer === correctAnswer) {
            result.textContent = 'Correct!'
            result.style.color = 'green';
            return true;
        } else {
            result.textContent = 'Incorrect. Try again!';
            result.style.color = 'red';
            return false;
        }
    }

    if (checkAnswerElement) {
        checkAnswerElement.addEventListener('click', function() {
            const selectedValue = dropdown.value;

            if (selectedValue === 'Addition') {
                if (checkAnswer(correctAnswer)) {
                    document.getElementById('user-answer').value = '';
                    answer.focus();
                    score.textContent = ++i;
                    correctAnswer = randomAddProblem();
                } else {
                    document.getElementById('user-answer').value = '';
                    answer.focus();
                }
            } else if (selectedValue === 'Subtraction') {
                if (checkAnswer(correctAnswer)) {
                    document.getElementById('user-answer').value = '';
                    answer.focus();
                    score.textContent = ++i;
                    correctAnswer = randomSubProblem();
                } else {
                    document.getElementById('user-answer').value = '';
                    answer.focus();
                }
            } else if (selectedValue === 'Multiplication') {
                if (checkAnswer(correctAnswer)) {
                    document.getElementById('user-answer').value = '';
                    answer.focus();
                    score.textContent = ++i;
                    correctAnswer = randomMultiProblem();
                } else {
                    document.getElementById('user-answer').value = '';
                    answer.focus();
                }
            } else {
                if (selectedValue === 'Division') {
                    if (checkAnswer(correctAnswer)) {
                        document.getElementById('user-answer').value = '';
                        answer.focus();
                        score.textContent = ++i;
                        correctAnswer = randomDivProblem();
                    } else {
                        document.getElementById('user-answer').value = '';
                        answer.focus();
                    }
                }
            }
        });
    }

    if (score) {
        score.textContent = i;
    }
});

