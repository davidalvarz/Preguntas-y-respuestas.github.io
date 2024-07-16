const questions = [
    {
        question: "¿Cuál es la capital de Francia?",
        answers: [
            { text: "París", correct: true },
            { text: "Londres", correct: false },
            { text: "Madrid", correct: false },
            { text: "Roma", correct: false }
        ]
    },
    {
        question: "¿Cuál es el planeta más grande del sistema solar?",
        answers: [
            { text: "Júpiter", correct: true },
            { text: "Marte", correct: false },
            { text: "Saturno", correct: false },
            { text: "Neptuno", correct: false }
        ]
    },
    // Agrega más preguntas según sea necesario
];

let currentQuestionIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    const questionElement = document.getElementById('question');
    const answersElement = document.getElementById('answers');
    const nextButton = document.getElementById('next-btn');

    function showQuestion(question) {
        questionElement.innerText = question.question;
        answersElement.innerHTML = '';
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener('click', selectAnswer);
            answersElement.appendChild(button);
        });
    }

    function selectAnswer(e) {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct === 'true';
        Array.from(answersElement.children).forEach(button => {
            setStatusClass(button, button.dataset.correct === 'true');
        });
        if (currentQuestionIndex < questions.length - 1) {
            nextButton.disabled = false;
        } else {
            nextButton.innerText = 'Reiniciar';
            nextButton.disabled = false;
        }
    }

    function setStatusClass(element, correct) {
        clearStatusClass(element);
        if (correct) {
            element.classList.add('correct');
        } else {
            element.classList.add('wrong');
        }
    }

    function clearStatusClass(element) {
        element.classList.remove('correct');
        element.classList.remove('wrong');
    }

    function showNextQuestion() {
        currentQuestionIndex++;
        nextButton.disabled = true;
        if (currentQuestionIndex < questions.length) {
            showQuestion(questions[currentQuestionIndex]);
        } else {
            resetGame();
        }
    }

    function resetGame() {
        currentQuestionIndex = 0;
        nextButton.innerText = 'Siguiente';
        showQuestion(questions[currentQuestionIndex]);
    }

    nextButton.addEventListener('click', showNextQuestion);

    showQuestion(questions[currentQuestionIndex]);
});
