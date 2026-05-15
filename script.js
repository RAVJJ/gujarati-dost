// ============= QUIZ DATABASE =============
const quizzes = {
    vocabulary: [
        { question: 'પાણી (Pani) means?', options: ['Water', 'Fire', 'Earth', 'Air'], correct: 0 },
        { question: 'આગ (Aag) means?', options: ['Water', 'Fire', 'Earth', 'Air'], correct: 1 },
        { question: 'ધોળું (Dholu) means?', options: ['Black', 'White', 'Red', 'Green'], correct: 1 },
        { question: 'લાલ (Laal) means?', options: ['White', 'Red', 'Blue', 'Yellow'], correct: 1 },
        { question: 'પક્ષી (Pakshi) means?', options: ['Bird', 'Fish', 'Animal', 'Insect'], correct: 0 }
    ],
    grammar: [
        { question: 'Select the correct form: "હું ___ જાઉં"', options: ['હતો', 'છું', 'હોય', 'હોઈશ'], correct: 1 },
        { question: 'Complete: "તમે ___ વાત કરી રહ્યા છો?"', options: ['શું', 'જે', 'કે', 'તે'], correct: 0 },
        { question: 'Choose correct: "આમ કરવું ___"', options: ['ખોટું', 'ખોટો', 'ખોટી', 'ખોટે'], correct: 0 },
        { question: 'Fill: "તે ___ ઘરે જશે"', options: ['તેનું', 'તેનો', 'તેનાં', 'તેની'], correct: 1 },
        { question: 'Complete: "આજ ___ શુક્રવાર છે"', options: ['આ', 'એ', 'આપણું', 'આમ'], correct: 0 }
    ],
    writing: [
        { question: 'Translate to Gujarati: "Good Morning"', options: ['શુભ સાંજ', 'શુભ પ્રાતઃ', 'હાય', 'બાય'], correct: 1 },
        { question: 'What means "ધન્યવાદ"?', options: ['Please', 'Thank you', 'Hello', 'Goodbye'], correct: 1 },
        { question: 'Translate: "How are you?"', options: ['તમે કોણ છો?', 'તમે કેવા છો?', 'તમે ક્યાં છો?', 'તમે શું છો?'], correct: 1 },
        { question: 'Complete: "મેરું નામ ___ છે" (Fill with your wish)', options: ['કમલ', 'રાજ', 'જય', 'All'], correct: 3 },
        { question: 'Say in Gujarati: "Good Night"', options: ['શુભ રાત્રિ', 'શુભ દિવસ', 'શુભ સંધ્યા', 'શુભ સાયંકાળ'], correct: 0 }
    ],
    pronunciation: [
        { question: 'How to pronounce "અ"?', options: ['Aa', 'A', 'Uh', 'Oh'], correct: 0 },
        { question: 'Pronounce "ક"?', options: ['Ka', 'Cha', 'Tha', 'Da'], correct: 0 },
        { question: 'Sound of "ણ"?', options: ['Na', 'Nha', 'Gna', 'Ja'], correct: 2 },
        { question: 'Pronounce "શ"?', options: ['Sa', 'Sha', 'Tha', 'Da'], correct: 1 },
        { question: 'Sound of "ધ"?', options: ['Dha', 'Ttha', 'Tha', 'Da'], correct: 0 }
    ]
};

// ============= VOCABULARY DATABASE =============
const vocabulary = [
    { gujarati: 'નમસ્તે', english: 'Hello', pronunciation: 'Namaste' },
    { gujarati: 'પાણી', english: 'Water', pronunciation: 'Pani' },
    { gujarati: 'આગ', english: 'Fire', pronunciation: 'Aag' },
    { gujarati: 'ધોળું', english: 'White', pronunciation: 'Dholu' },
    { gujarati: 'લાલ', english: 'Red', pronunciation: 'Laal' },
    { gujarati: 'લીલો', english: 'Green', pronunciation: 'Leelo' },
    { gujarati: 'વાદળી', english: 'Blue', pronunciation: 'Vadli' },
    { gujarati: 'પીળો', english: 'Yellow', pronunciation: 'Peelo' },
    { gujarati: 'પક્ષી', english: 'Bird', pronunciation: 'Pakshi' },
    { gujarati: 'માછલી', english: 'Fish', pronunciation: 'Machli' },
    { gujarati: 'ધન્યવાદ', english: 'Thank you', pronunciation: 'Dhanyavaad' },
    { gujarati: 'કૃપા કરીને', english: 'Please', pronunciation: 'Kripa karine' }
];

// ============= STATE VARIABLES =============
let currentQuiz = null;
let currentQuestion = 0;
let score = 0;
let quizType = '';
let currentAudioWord = vocabulary[Math.floor(Math.random() * vocabulary.length)];

// ============= QUIZ FUNCTIONALITY =============
function startVocabularyQuiz() {
    startQuiz('vocabulary', 'Vocabulary Quiz - શબ્દ પરીક્ષણ');
}

function startGrammarQuiz() {
    startQuiz('grammar', 'Grammar Quiz - વ્યાકરણ પરીક્ષણ');
}

function startWritingQuiz() {
    startQuiz('writing', 'Writing Quiz - લેખન કસોટી');
}

function startPronunciationQuiz() {
    startQuiz('pronunciation', 'Pronunciation Quiz - ઉચ્ચારણ કસોટી');
}

function startQuiz(type, title) {
    quizType = type;
    currentQuiz = quizzes[type];
    currentQuestion = 0;
    score = 0;
    
    document.getElementById('quizContainer').classList.remove('hidden');
    document.getElementById('quizTitle').innerText = title;
    
    showQuestion();
    window.scrollIntoView({behavior: 'smooth'});
}

function showQuestion() {
    const question = currentQuiz[currentQuestion];
    const total = currentQuiz.length;
    
    document.getElementById('questionCounter').innerText = `Question ${currentQuestion + 1} of ${total}`;
    document.getElementById('quizQuestion').innerText = question.question;
    
    const progressPercent = ((currentQuestion + 1) / total) * 100;
    document.getElementById('progressFill').style.width = progressPercent + '%';
    
    const optionsContainer = document.getElementById('quizOptions');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.innerText = option;
        btn.onclick = () => selectOption(index, question.correct);
        optionsContainer.appendChild(btn);
    });
    
    document.getElementById('quizFeedback').classList.add('hidden');
}

function selectOption(selected, correct) {
    const feedback = document.getElementById('quizFeedback');
    feedback.classList.remove('hidden');
    
    if (selected === correct) {
        score++;
        feedback.innerHTML = '<span style="color: #6BCB77; font-weight: bold;">✓ Correct!</span>';
        feedback.style.background = 'rgba(107, 203, 119, 0.2)';
        showToast('Great Job! ✓', 'success');
    } else {
        feedback.innerHTML = `<span style="color: #FF6B6B; font-weight: bold;">✗ Wrong! Correct answer: ${quizzes[quizType][currentQuestion].options[correct]}</span>`;
        feedback.style.background = 'rgba(255, 107, 107, 0.2)';
        showToast('Try Again! ✗', 'error');
    }
    
    document.querySelectorAll('.quiz-option').forEach(btn => {
        btn.style.pointerEvents = 'none';
    });
}

function nextQuestion() {
    if (currentQuestion < currentQuiz.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    const total = currentQuiz.length;
    const percentage = (score / total) * 100;
    
    let message = '';
    if (percentage === 100) {
        message = '🌟 Perfect Score! You are Awesome!';
    } else if (percentage >= 80) {
        message = '🎉 Excellent! Keep it up!';
    } else if (percentage >= 60) {
        message = '👍 Good! Practice more!';
    } else {
        message = '💪 Keep Learning! You will do better!';
    }
    
    document.getElementById('quizContainer').innerHTML = `
        <div class="quiz-result" style="text-align: center; padding: 3rem;">
            <h2 style="font-size: 2.5rem; margin-bottom: 1rem;">Quiz Complete!</h2>
            <p style="font-size: 1.5rem; margin-bottom: 1rem;">Your Score: ${score}/${total} (${Math.round(percentage)}%)</p>
            <p style="font-size: 1.3rem; margin-bottom: 2rem;">${message}</p>
            <button class="btn btn-primary" onclick="location.reload()">Try Again</button>
            <button class="btn btn-secondary" onclick="closeQuiz()" style="margin-left: 1rem;">Close Quiz</button>
        </div>
    `;
    
    // Save to localStorage
    let scores = JSON.parse(localStorage.getItem('quizScores')) || {};
    scores[quizType] = { score, total, percentage, date: new Date().toLocaleDateString() };
    localStorage.setItem('quizScores', JSON.stringify(scores));
}

function closeQuiz() {
    document.getElementById('quizContainer').classList.add('hidden');
    location.reload();
}

// ============= FLASHCARD FUNCTIONALITY =============
function flipCard(element) {
    element.classList.toggle('flipped');
}

function startFlashcards() {
    let currentIndex = 0;
    const cards = vocabulary;
    
    const modal = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                    background: white; padding: 2rem; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); 
                    z-index: 2000; max-width: 400px; width: 90%;">
            <h2 style="margin-bottom: 1rem; text-align: center;">Flashcard Learning</h2>
            <div id="flashcard-container" style="perspective: 1000px;">
                <div class="flashcard-demo flipped-modal" onclick="flipCardModal(this)" 
                     style="height: 250px; margin-bottom: 1.5rem;">
                    <div class="flashcard-inner-modal">
                        <div class="flashcard-front-modal">
                            <p id="card-word"></p>
                        </div>
                        <div class="flashcard-back-modal">
                            <p id="card-translation"></p>
                        </div>
                    </div>
                </div>
            </div>
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button class="btn btn-secondary" onclick="prevCard()">← Previous</button>
                <span id="card-counter" style="align-self: center; font-weight: bold;"></span>
                <button class="btn btn-secondary" onclick="nextCard()">Next →</button>
            </div>
            <button class="btn btn-primary" onclick="closeFlashcardModal()" style="width: 100%; margin-top: 1rem;">Close</button>
        </div>
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1999;" onclick="closeFlashcardModal()"></div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modal);
    
    window.currentFlashIndex = currentIndex;
    window.allFlashcards = cards;
    updateFlashcard();
}

function updateFlashcard() {
    const card = window.allFlashcards[window.currentFlashIndex];
    document.getElementById('card-word').innerText = card.gujarati;
    document.getElementById('card-translation').innerText = card.english;
    document.getElementById('card-counter').innerText = `${window.currentFlashIndex + 1} / ${window.allFlashcards.length}`;
    document.querySelector('.flipped-modal').classList.remove('flipped-modal');
}

function flipCardModal(element) {
    element.classList.toggle('flipped-modal');
}

function nextCard() {
    if (window.currentFlashIndex < window.allFlashcards.length - 1) {
        window.currentFlashIndex++;
        updateFlashcard();
    }
}

function prevCard() {
    if (window.currentFlashIndex > 0) {
        window.currentFlashIndex--;
        updateFlashcard();
    }
}

function closeFlashcardModal() {
    document.querySelectorAll('[style*="fixed"][style*="z-index"]').forEach(el => {
        if (el.parentElement) el.parentElement.removeChild(el);
    });
}

// ============= AUDIO FUNCTIONALITY =============
function playAudio() {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(currentAudioWord.gujarati);
    utterance.lang = 'gu-IN';
    synth.speak(utterance);
    showToast('🔊 Playing: ' + currentAudioWord.gujarati, 'success');
}

function checkAudioAnswer() {
    const userAnswer = document.getElementById('audioGuess').value.trim().toLowerCase();
    const correctAnswer = currentAudioWord.english.toLowerCase();
    
    if (userAnswer === correctAnswer) {
        showToast('✓ Correct! ' + currentAudioWord.gujarati + ' = ' + currentAudioWord.english, 'success');
        currentAudioWord = vocabulary[Math.floor(Math.random() * vocabulary.length)];
        document.getElementById('audioGuess').value = '';
    } else {
        showToast('✗ Try Again! The answer is: ' + currentAudioWord.english, 'error');
    }
}

// ============= GAME FUNCTIONS =============
function startLesson(type) {
    showToast(`📚 Starting ${type} lesson!`, 'success');
}

function startFlashcards() {
    showToast('🎴 Opening Flashcard Mode...', 'success');
}

function startColorGame() {
    showToast('🎨 Color Learning Mode Started!', 'success');
}

function startConversation() {
    showToast('💬 Conversation Practice Started!', 'success');
}

function checkWriting() {
    const text = document.getElementById('writingInput').value.trim();
    
    if (!text) {
        showToast('⚠️ Please enter some text first!', 'error');
        return;
    }
    
    const feedback = document.getElementById('writingFeedback');
    feedback.innerHTML = `
        <div style="padding: 1rem; background: rgba(107, 203, 119, 0.2); border-radius: 12px; margin-top: 1rem;">
            <h4 style="color: var(--primary); margin-bottom: 0.5rem;">✓ Writing Check Complete</h4>
            <p><strong>Length:</strong> ${text.length} characters</p>
            <p><strong>Words:</strong> ${text.split(/\s+/).length} words</p>
            <p><strong>Feedback:</strong> Good structure! Keep writing in Gujarati! 🎉</p>
            <p style="margin-top: 0.5rem; opacity: 0.8; font-size: 0.9rem;">💡 Tip: Use formal conjunctions like તથા and તેમજ in formal writing.</p>
        </div>
    `;
    showToast('✓ Writing checked!', 'success');
}

// ============= TOAST NOTIFICATION =============
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.className = 'toast show';
    
    if (type === 'success') {
        toast.style.background = 'linear-gradient(135deg, var(--success) 0%, #5ab86d 100%)';
    } else if (type === 'error') {
        toast.style.background = 'linear-gradient(135deg, var(--danger) 0%, #ff4757 100%)';
    } else {
        toast.style.background = 'linear-gradient(135deg, var(--primary) 0%, #FF5252 100%)';
    }
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ============= KEYBOARD SHORTCUTS =============
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'q') {
        document.getElementById('practice').scrollIntoView({behavior: 'smooth'});
    } else if (e.key.toLowerCase() === 'g') {
        document.getElementById('interactive').scrollIntoView({behavior: 'smooth'});
    } else if (e.key.toLowerCase() === 'l') {
        document.getElementById('learning').scrollIntoView({behavior: 'smooth'});
    }
});

// ============= LANGUAGE SWITCHING =============
function changeLanguage(lang) {
    showToast(`Language changed to ${lang}!`, 'success');
    // Implementation for multi-language support
}

// ============= SMOOTH SCROLL & ANIMATIONS =============
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({behavior: 'smooth'});
            }
        });
    });

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.learning-card, .game-card, .quiz-card, .stat-card').forEach(el => {
        observer.observe(el);
    });

    // Initialize progress display
    displayProgressStats();
});

// ============= PROGRESS TRACKING =============
function displayProgressStats() {
    const scores = JSON.parse(localStorage.getItem('quizScores')) || {};
    
    // Update progress bars based on saved scores
    if (scores.vocabulary) {
        const vocabPercent = scores.vocabulary.percentage;
        document.querySelectorAll('.progress-item')[0].querySelector('.progress-fill').style.width = vocabPercent + '%';
        document.querySelectorAll('.progress-item')[0].querySelector('p').innerText = Math.round(vocabPercent) + '%';
    }
    
    if (scores.grammar) {
        const grammarPercent = scores.grammar.percentage;
        document.querySelectorAll('.progress-item')[1].querySelector('.progress-fill').style.width = grammarPercent + '%';
        document.querySelectorAll('.progress-item')[1].querySelector('p').innerText = Math.round(grammarPercent) + '%';
    }
    
    if (scores.writing) {
        const writingPercent = scores.writing.percentage;
        document.querySelectorAll('.progress-item')[2].querySelector('.progress-fill').style.width = writingPercent + '%';
        document.querySelectorAll('.progress-item')[2].querySelector('p').innerText = Math.round(writingPercent) + '%';
    }
    
    if (scores.pronunciation) {
        const pronouncePercent = scores.pronunciation.percentage;
        document.querySelectorAll('.progress-item')[3].querySelector('.progress-fill').style.width = pronouncePercent + '%';
        document.querySelectorAll('.progress-item')[3].querySelector('p').innerText = Math.round(pronouncePercent) + '%';
    }
}

// ============= HOVER ANIMATIONS =============
document.querySelectorAll('.learning-card, .game-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ============= RESPONSIVE ADJUSTMENTS =============
window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
        document.querySelectorAll('.hero-buttons').forEach(btn => {
            btn.style.flexDirection = 'column';
        });
    }
});

// ============= PAGE LOAD ANIMATION =============
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    showToast('Welcome to Gujarati Dost! 🌟', 'success');
});
