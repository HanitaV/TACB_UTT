// ============================================
// DATA AND STATE MANAGEMENT
// ============================================

let questionsData = {};
let currentQuestionType = null;
let currentQuestionGroup = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let startTime = null;

// Progress tracking (stored in localStorage)
const STORAGE_KEY = 'english_practice_progress';

function getProgress() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {
        completed: 0,
        correct: 0,
        total: 0,
        streak: 0,
        lastDate: null
    };
}

function saveProgress(progress) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    loadQuestions();
    setupEventListeners();
    updateStats();
});

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

async function loadQuestions() {
    try {
        const response = await fetch('questions.json');
        const data = await response.json();
        questionsData = data.questionTypes;
        renderQuestionTypes();
    } catch (error) {
        console.error('Error loading questions:', error);
        showError('Không thể tải dữ liệu câu hỏi. Vui lòng refresh trang.');
    }
}

function setupEventListeners() {
    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);

    // Back button
    document.getElementById('backBtn').addEventListener('click', () => {
        showScreen('dashboard');
    });

    // Check answer button
    document.getElementById('checkBtn').addEventListener('click', checkAnswer);

    // Next question button
    document.getElementById('nextBtn').addEventListener('click', nextQuestion);

    // Results buttons
    document.getElementById('retryBtn').addEventListener('click', retryQuiz);
    document.getElementById('homeBtn').addEventListener('click', () => showScreen('dashboard'));
}

// ============================================
// THEME
// ============================================

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// ============================================
// UI RENDERING
// ============================================

function renderQuestionTypes() {
    const grid = document.getElementById('questionTypesGrid');
    grid.innerHTML = '';

    questionsData.forEach(type => {
        const totalQuestions = type.questionGroups.reduce((sum, group) =>
            sum + group.questions.length, 0);
        const totalUnits = type.questionGroups.length;

        const card = document.createElement('div');
        card.className = 'question-type-card';
        card.innerHTML = `
            <span class="card-icon">${type.icon}</span>
            <h3 class="card-title">${type.name}</h3>
            <p class="card-description">${type.description}</p>
            <span class="card-count">${totalUnits} units • ${totalQuestions} câu hỏi</span>
        `;
        card.addEventListener('click', () => showUnitSelection(type));
        grid.appendChild(card);
    });
}

function showUnitSelection(questionType) {
    const grid = document.getElementById('questionTypesGrid');
    const sectionTitle = document.querySelector('.section-title');

    // Update title with back button
    sectionTitle.innerHTML = `
        <button class="back-link" onclick="location.reload()">← Back to Types</button>
        <span style="margin-left: 10px;">${questionType.name}</span>
    `;

    // Render unit cards
    grid.innerHTML = '';
    questionType.questionGroups.forEach((group, index) => {
        const card = document.createElement('div');
        card.className = 'question-type-card unit-card';
        card.innerHTML = `
            <span class="card-icon">📋</span>
            <h3 class="card-title">${group.title || group.unit}</h3>
            <p class="card-description">${group.unit}</p>
            <span class="card-count">${group.questions.length} câu hỏi</span>
        `;
        card.addEventListener('click', () => startQuizFromGroup(questionType, index));
        grid.appendChild(card);
    });
}

function showScreen(screenName) {
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('quizScreen').classList.add('hidden');
    document.getElementById('resultsScreen').classList.add('hidden');

    if (screenName === 'dashboard') {
        document.getElementById('dashboard').classList.remove('hidden');
    } else if (screenName === 'quiz') {
        document.getElementById('quizScreen').classList.remove('hidden');
    } else if (screenName === 'results') {
        document.getElementById('resultsScreen').classList.remove('hidden');
    }
}

// ============================================
// QUIZ LOGIC
// ============================================

function startQuiz(typeId) {
    const questionType = questionsData.find(t => t.id === typeId);
    if (!questionType) return;

    // Show unit selection instead
    showUnitSelection(questionType);
}

function startQuizFromGroup(questionType, groupIndex) {
    currentQuestionType = questionType;
    currentQuestionGroup = questionType.questionGroups[groupIndex];
    currentQuestionIndex = 0;
    userAnswers = [];
    startTime = Date.now();

    // Update quiz header
    document.getElementById('quizTitle').textContent = questionType.name;
    document.getElementById('quizSubtitle').textContent = currentQuestionGroup.unit;

    showScreen('quiz');
    renderQuestion();
}

function renderQuestion() {
    const question = currentQuestionGroup.questions[currentQuestionIndex];
    const totalQuestions = currentQuestionGroup.questions.length;

    // Update progress
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    document.getElementById('totalQuestions').textContent = totalQuestions;
    updateProgressBar();

    // Show context if available
    const contextBox = document.getElementById('contextBox');
    const contextContent = document.getElementById('contextContent');
    const questionLayout = document.getElementById('questionLayout');
    const leftPane = document.getElementById('leftPane');
    if (currentQuestionGroup.context) {
        if (questionLayout) {
            questionLayout.classList.add('has-context');
            questionLayout.classList.remove('no-context');
        }

        if (leftPane) {
            leftPane.classList.remove('hidden');
        }

        contextBox.classList.remove('hidden');

        // Format context based on type
        let formattedContext = currentQuestionGroup.context;

        // Check if it's a conversation/dialogue
        if (formattedContext.includes('A:') || formattedContext.includes('B:')) {
            formattedContext = formatConversation(formattedContext);
        }

        contextContent.innerHTML = formattedContext;
    } else {
        contextBox.classList.add('hidden');

        if (leftPane) {
            leftPane.classList.add('hidden');
        }

        if (questionLayout) {
            questionLayout.classList.remove('has-context');
            questionLayout.classList.add('no-context');
        }
    }

    // Show image if needed
    const questionImage = document.getElementById('questionImage');
    const imageElement = document.getElementById('imageElement');
    if (question.hasImage || (currentQuestionGroup.hasImages && currentQuestionIndex < 10)) {
        questionImage.classList.remove('hidden');
        const imagePath = question.imagePath || getImagePath(currentQuestionGroup.unit, currentQuestionIndex);
        imageElement.src = imagePath;
        imageElement.alt = question.imageAlt || 'Question image';
    } else {
        questionImage.classList.add('hidden');
    }

    // Build question HTML
    const questionTextEl = document.getElementById('questionText');
    let questionHTML = '';

    // Add instructions if available
    if (question.instructions || currentQuestionGroup.instructions) {
        const instructions = question.instructions || currentQuestionGroup.instructions;
        questionHTML += `<div class="exercise-instructions">${instructions}</div>`;
    }

    // Add word bank if available
    if (question.wordBank || currentQuestionGroup.wordBank) {
        const words = question.wordBank || currentQuestionGroup.wordBank;
        questionHTML += `
            <div class="word-bank">
                <div class="word-bank-title">Choose from these words:</div>
                <div class="word-bank-words">
                    ${words.map(word => `<span class="word-bank-word">${word}</span>`).join('')}
                </div>
            </div>
        `;
    }

    // Add question number tag if it's a multi-part question
    if (totalQuestions > 1 && question.questionNumber) {
        questionHTML += `<span class="question-number">Question ${question.questionNumber}</span>`;
    }

    // Add main question text
    questionHTML += `<div>${question.question}</div>`;

    questionTextEl.innerHTML = questionHTML;

    // Render answer options
    const answerOptions = document.getElementById('answerOptions');
    answerOptions.innerHTML = '';

    if (question.type === 'multiple-choice') {
        question.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'answer-option';
            optionDiv.innerHTML = `
                <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                <span>${option}</span>
            `;
            optionDiv.addEventListener('click', () => selectOption(optionDiv, option));
            answerOptions.appendChild(optionDiv);
        });
    } else if (question.type === 'fill-in') {
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'answer-input';
        input.placeholder = 'Type your answer here...';
        input.id = 'answerInput';
        answerOptions.appendChild(input);
    } else if (question.type === 'choose-option') {
        // For questions like "choose the correct option" with two choices
        const container = document.createElement('div');
        container.className = 'choose-options';
        container.innerHTML = question.choiceHTML || '';
        answerOptions.appendChild(container);

        // Make choices clickable
        container.querySelectorAll('.choice-item').forEach(item => {
            item.addEventListener('click', () => {
                container.querySelectorAll('.choice-item').forEach(i => i.classList.remove('selected'));
                item.classList.add('selected');
                item.dataset.selected = 'true';
            });
        });
    }

    // Reset feedback and buttons
    document.getElementById('feedback').classList.add('hidden');
    document.getElementById('checkBtn').classList.remove('hidden');
    document.getElementById('nextBtn').classList.add('hidden');
    document.getElementById('checkBtn').textContent = 'Check Answer';

    // Add question navigation
    renderQuestionNavigation();
}

function renderQuestionNavigation() {
    const totalQuestions = currentQuestionGroup.questions.length;
    const navContainer = document.getElementById('questionNavigation');

    if (!navContainer) {
        // Create navigation container if it doesn't exist
        const container = document.createElement('div');
        container.id = 'questionNavigation';
        container.className = 'question-navigation';

        const progressBar = document.querySelector('.progress-bar-container');
        progressBar.parentNode.insertBefore(container, progressBar);
    }

    const nav = document.getElementById('questionNavigation');
    nav.innerHTML = '<div class="nav-title">Jump to question:</div><div class="nav-buttons"></div>';

    const buttonsContainer = nav.querySelector('.nav-buttons');

    for (let i = 0; i < totalQuestions; i++) {
        const btn = document.createElement('button');
        btn.className = 'nav-btn';
        btn.textContent = i + 1;

        // Mark current question
        if (i === currentQuestionIndex) {
            btn.classList.add('active');
        }

        // Mark answered questions
        const answered = userAnswers.find(a => a.questionIndex === i);
        if (answered) {
            btn.classList.add(answered.isCorrect ? 'correct' : 'incorrect');
        }

        btn.addEventListener('click', () => jumpToQuestion(i));
        buttonsContainer.appendChild(btn);
    }
}

function jumpToQuestion(index) {
    currentQuestionIndex = index;
    renderQuestion();
}

function formatConversation(text) {
    // Format conversation with A: and B: into styled dialogue
    const lines = text.split('\n');
    let formatted = '';

    lines.forEach(line => {
        line = line.trim();
        if (!line) return;

        if (line.startsWith('A:')) {
            formatted += `<div class="conversation-line speaker-a"><span class="speaker-label">A:</span>${line.substring(2).trim()}</div>`;
        } else if (line.startsWith('B:')) {
            formatted += `<div class="conversation-line speaker-b"><span class="speaker-label">B:</span>${line.substring(2).trim()}</div>`;
        } else {
            formatted += `<p>${line}</p>`;
        }
    });

    return formatted;
}

function getImagePath(unit, questionIndex) {
    // Map units to image folders with new naming convention
    if (unit.includes('Unit 1')) {
        const letters = ['a', 'b', 'c', 'd'];
        return `assets/1/1-${letters[questionIndex]}.png`;
    } else if (unit.includes('Unit 5')) {
        return `assets/14/14-${questionIndex + 1}.png`;
    } else if (unit.includes('Unit 2') && unit.includes('Memory')) {
        return `assets/3/3-room.png`;
    } else if (unit.includes('Unit 4') && unit.includes('Mindset')) {
        return `assets/9/9-mindset.png`;
    } else if (unit.includes('Review') && unit.includes('Spork')) {
        return `assets/12/12-spork.png`;
    }
    return '';
}

function selectOption(optionElement, optionText) {
    // Remove previous selection
    document.querySelectorAll('.answer-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    // Select new option
    optionElement.classList.add('selected');
    optionElement.dataset.answer = optionText;
}

function checkAnswer() {
    const question = currentQuestionGroup.questions[currentQuestionIndex];
    let userAnswer = null;

    if (question.type === 'multiple-choice') {
        const selected = document.querySelector('.answer-option.selected');
        if (!selected) {
            alert('Please select an answer!');
            return;
        }
        userAnswer = selected.dataset.answer;
    } else if (question.type === 'fill-in') {
        const input = document.getElementById('answerInput');
        userAnswer = input.value.trim();
        if (!userAnswer) {
            alert('Please type your answer!');
            return;
        }
    }

    const isCorrect = checkIfCorrect(userAnswer, question.answer);
    userAnswers.push({ questionIndex: currentQuestionIndex, userAnswer, isCorrect });

    // Show feedback
    showFeedback(isCorrect, question.explanation);

    // Disable further selection
    document.getElementById('checkBtn').classList.add('hidden');
    document.getElementById('nextBtn').classList.remove('hidden');

    // Mark answers
    if (question.type === 'multiple-choice') {
        document.querySelectorAll('.answer-option').forEach(opt => {
            opt.style.pointerEvents = 'none';
            const optText = opt.querySelector('span:last-child').textContent;
            if (optText === question.answer) {
                opt.classList.add('correct');
            } else if (opt.classList.contains('selected') && !isCorrect) {
                opt.classList.add('incorrect');
            }
        });
    }
}

function checkIfCorrect(userAnswer, correctAnswer) {
    // Normalize answers (lowercase, trim)
    const normalize = (str) => str.toLowerCase().trim();

    // Handle multiple correct answers (e.g., "Derek, Anusha")
    if (correctAnswer.includes(',')) {
        const correctAnswers = correctAnswer.split(',').map(normalize);
        const userAnswers = userAnswer.split(',').map(normalize);
        return correctAnswers.every(ans => userAnswers.includes(ans)) &&
            userAnswers.every(ans => correctAnswers.includes(ans));
    }

    return normalize(userAnswer) === normalize(correctAnswer);
}

function showFeedback(isCorrect, explanation) {
    const feedback = document.getElementById('feedback');
    const feedbackIcon = document.getElementById('feedbackIcon');
    const feedbackText = document.getElementById('feedbackText');
    const feedbackExplanation = document.getElementById('feedbackExplanation');

    feedback.classList.remove('hidden', 'correct', 'incorrect');
    feedback.classList.add(isCorrect ? 'correct' : 'incorrect');

    feedbackIcon.textContent = isCorrect ? '✅' : '❌';
    feedbackText.textContent = isCorrect ? 'Correct!' : 'Incorrect';
    feedbackExplanation.textContent = explanation || '';
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex >= currentQuestionGroup.questions.length) {
        showResults();
    } else {
        renderQuestion();
    }
}

function updateProgressBar() {
    const progress = ((currentQuestionIndex) / currentQuestionGroup.questions.length) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
}

// ============================================
// RESULTS
// ============================================

function showResults() {
    const correctCount = userAnswers.filter(a => a.isCorrect).length;
    const totalCount = userAnswers.length;
    const percentage = Math.round((correctCount / totalCount) * 100);
    const elapsedTime = Math.round((Date.now() - startTime) / 1000);

    // Update progress
    const progress = getProgress();
    progress.completed += totalCount;
    progress.correct += correctCount;
    progress.total += totalCount;

    // Update streak
    const today = new Date().toDateString();
    if (progress.lastDate !== today) {
        if (percentage >= 70) {
            progress.streak += 1;
        } else {
            progress.streak = 0;
        }
        progress.lastDate = today;
    }

    saveProgress(progress);
    updateStats();

    // Display results
    document.getElementById('resultsIcon').textContent = percentage >= 70 ? '🎉' : '📚';
    document.getElementById('resultsTitle').textContent =
        percentage >= 90 ? 'Perfect!' :
            percentage >= 70 ? 'Great Job!' :
                percentage >= 50 ? 'Good Effort!' : 'Keep Practicing!';

    document.getElementById('finalScore').textContent = `${correctCount}/${totalCount}`;
    document.getElementById('finalPercentage').textContent = `${percentage}%`;
    document.getElementById('finalTime').textContent = `${elapsedTime}s`;

    showScreen('results');

    if (percentage >= 90) {
        launchConfetti();
    }
}

function retryQuiz() {
    currentQuestionIndex = 0;
    userAnswers = [];
    startTime = Date.now();
    showScreen('quiz');
    renderQuestion();
}

function updateStats() {
    const progress = getProgress();
    document.getElementById('completedCount').textContent = progress.completed;

    const accuracy = progress.total > 0
        ? Math.round((progress.correct / progress.total) * 100)
        : 0;
    document.getElementById('accuracyRate').textContent = `${accuracy}%`;
    document.getElementById('streakCount').textContent = `${progress.streak}🔥`;
}

// ============================================
// CONFETTI ANIMATION
// ============================================

function launchConfetti() {
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiPieces = [];
    const confettiCount = 50;
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe', '#ffd89b', '#19547b'];

    for (let i = 0; i < confettiCount; i++) {
        confettiPieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 6 + 4,
            d: Math.random() * confettiCount,
            color: colors[Math.floor(Math.random() * colors.length)],
            tilt: Math.floor(Math.random() * 10) - 10,
            tiltAngleIncremental: Math.random() * 0.07 + 0.05,
            tiltAngle: 0
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confettiPieces.forEach((p, i) => {
            ctx.beginPath();
            ctx.lineWidth = p.r / 2;
            ctx.strokeStyle = p.color;
            ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
            ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
            ctx.stroke();

            p.tiltAngle += p.tiltAngleIncremental;
            p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
            p.tilt = Math.sin(p.tiltAngle - i / 3) * 15;

            if (p.y > canvas.height) {
                p.y = -20;
                p.x = Math.random() * canvas.width;
            }
        });

        requestAnimationFrame(draw);
    }

    draw();

    // Stop confetti after 5 seconds
    setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 5000);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function showError(message) {
    alert(message);
}
