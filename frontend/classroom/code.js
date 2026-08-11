document.addEventListener("DOMContentLoaded", function () {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.page-section');
    const navLinksList = document.querySelectorAll('.nav-links a');

    // Dynamic Navigation Switcher
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            if (!targetId) return;

            // Highlight active navigation link
            navLinksList.forEach(link => link.classList.remove('active-link'));
            const matchedLink = document.querySelector(`.nav-links a[data-target="${targetId}"]`);
            if (matchedLink) matchedLink.classList.add('active-link');

            // Toggle view sections
            sections.forEach(sec => {
                if (sec.id === targetId) {
                    sec.classList.remove('hidden');
                } else {
                    sec.classList.add('hidden');
                }
            });

            // Smooth scroll to top of view
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Certificates Click Handler
    const certCard = document.getElementById('certCard');
    const certMessage = document.getElementById('certMessage');

    if (certCard) {
        certCard.addEventListener('click', function () {
            if (certMessage) {
                certMessage.textContent = "ℹ️ You have no certificates yet. Complete course modules to earn certificates!";
                certMessage.style.color = "#fbbf24";
                certMessage.style.backgroundColor = "rgba(234, 179, 8, 0.15)";
                certMessage.style.border = "1px solid rgba(234, 179, 8, 0.2)";
                certMessage.style.display = "block";
            }
        });
    }

    // Quiz Grading System
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            const correctAnswers = {
                q1: 'b',
                q2: 'c',
                q3: 'b'
            };

            let score = 0;
            const totalQuestions = Object.keys(correctAnswers).length;

            for (let i = 1; i <= totalQuestions; i++) {
                const questionName = 'q' + i;
                const feedbackElement = document.getElementById('feedback' + i);
                const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);

                if (!feedbackElement) continue;

                if (selectedOption) {
                    if (selectedOption.value === correctAnswers[questionName]) {
                        feedbackElement.textContent = "✅ Correct!";
                        feedbackElement.style.color = "#4ade80";
                        feedbackElement.style.backgroundColor = "rgba(34, 197, 94, 0.15)";
                        feedbackElement.style.border = "1px solid rgba(34, 197, 94, 0.2)";
                        feedbackElement.style.display = "block";
                        score++;
                    } else {
                        feedbackElement.textContent = "❌ Incorrect.";
                        feedbackElement.style.color = "#f87171";
                        feedbackElement.style.backgroundColor = "rgba(239, 68, 68, 0.15)";
                        feedbackElement.style.border = "1px solid rgba(239, 68, 68, 0.2)";
                        feedbackElement.style.display = "block";
                    }
                } else {
                    feedbackElement.textContent = "⚠️ Please select an answer!";
                    feedbackElement.style.color = "#fbbf24";
                    feedbackElement.style.backgroundColor = "rgba(234, 179, 8, 0.15)";
                    feedbackElement.style.border = "1px solid rgba(234, 179, 8, 0.2)";
                    feedbackElement.style.display = "block";
                }
            }

            const finalScoreElement = document.getElementById('finalScore');
            if (finalScoreElement) {
                finalScoreElement.textContent = `You scored ${score} out of ${totalQuestions}!`;
                finalScoreElement.style.display = 'block';

                if (score === totalQuestions) {
                    finalScoreElement.style.backgroundColor = 'rgba(34, 197, 94, 0.2)';
                    finalScoreElement.style.color = '#4ade80';
                    finalScoreElement.style.border = '1px solid rgba(34, 197, 94, 0.4)';
                } else {
                    finalScoreElement.style.backgroundColor = 'rgba(234, 179, 8, 0.2)';
                    finalScoreElement.style.color = '#fde047';
                    finalScoreElement.style.border = '1px solid rgba(234, 179, 8, 0.4)';
                }
            }
        });
    }
});
///log out
function logout() {
    localStorage.removeItem('user')
    window.location.href = '../index.html'
}