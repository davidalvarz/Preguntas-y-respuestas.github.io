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
    {
        question: "¿En qué año llegó el hombre a la luna?",
        answers: [
            { text: "1965", correct: false },
            { text: "1969", correct: true },
            { text: "1971", correct: false },
            { text: "1975", correct: false }
        ]
    },
    {
        question: "¿Cuál es el río más largo del mundo?",
        answers: [
            { text: "Amazonas", correct: true },
            { text: "Nilo", correct: false },
            { text: "Yangtsé", correct: false },
            { text: "Misisipi", correct: false }
        ]
    },
    {
        question: "¿Quién pintó La Mona Lisa?",
        answers: [
            { text: "Vincent Van Gogh", correct: false },
            { text: "Pablo Picasso", correct: false },
            { text: "Leonardo da Vinci", correct: true },
            { text: "Claude Monet", correct: false }
        ]
    },
    {
        question: "¿Cuál es el idioma más hablado en el mundo?",
        answers: [
            { text: "Inglés", correct: false },
            { text: "Español", correct: false },
            { text: "Chino mandarín", correct: true },
            { text: "Hindú", correct: false }
        ]
    },
    {
        question: "¿Cuál es el animal terrestre más rápido?",
        answers: [
            { text: "León", correct: false },
            { text: "Guepardo", correct: true },
            { text: "Tigre", correct: false },
            { text: "Antílope", correct: false }
        ]
    },
    {
        question: "¿Qué país tiene la mayor población del mundo?",
        answers: [
            { text: "Estados Unidos", correct: false },
            { text: "India", correct: false },
            { text: "China", correct: true },
            { text: "Rusia", correct: false }
        ]
    },
    {
        question: "¿Cuál es el metal más abundante en la corteza terrestre?",
        answers: [
            { text: "Hierro", correct: false },
            { text: "Aluminio", correct: true },
            { text: "Cobre", correct: false },
            { text: "Plata", correct: false }
        ]
    },
    {
        question: "¿Cuál es el libro más vendido del mundo?",
        answers: [
            { text: "El Quijote", correct: false },
            { text: "La Biblia", correct: true },
            { text: "Harry Potter", correct: false },
            { text: "El Señor de los Anillos", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

document.addEventListener('DOMContentLoaded', () => {
    const questionElement = document.getElementById('question');
    const answersElement = document.getElementById('answers');
    const nextButton = document.getElementById('next-btn');
    const scoreContainer = document.getElementById('score-container');
    const scoreElement = document.getElementById('score');
    const restartButton = document.getElementById('restart-btn');

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
        if (correct) {
            score++;
        }
        Array.from(answersElement.children).forEach(button => {
            setStatusClass(button, button.dataset.correct === 'true');
        });
        selectedButton.classList.add('selected');
        if (currentQuestionIndex < questions.length - 1) {
            nextButton.disabled = false;
        } else {
            nextButton.innerText = 'Mostrar puntuación';
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
        element.classList.remove('selected');
    }

    function showNextQuestion() {
        currentQuestionIndex++;
        nextButton.disabled = true;
        if (currentQuestionIndex < questions.length) {
            showQuestion(questions[currentQuestionIndex]);
        } else {
            showScore();
        }
    }

    function showScore() {
        scoreElement.innerText = `${score} de ${questions.length}`;
        scoreContainer.style.display = 'block';
        nextButton.style.display = 'none';
    }

    function resetGame() {
        currentQuestionIndex = 0;
        score = 0;
        scoreContainer.style.display = 'none';
        nextButton.style.display = 'block';
        nextButton.innerText = 'Siguiente';
        showQuestion(questions[currentQuestionIndex]);
    }

    nextButton.addEventListener('click', showNextQuestion);
    restartButton.addEventListener('click', resetGame);

    showQuestion(questions[currentQuestionIndex]);
});
