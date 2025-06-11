document.addEventListener('DOMContentLoaded', function() {
    const leaderboardButtonMain = document.getElementById('leaderboardButtonMain');
    const leaderboardModal = document.getElementById('leaderboardModal');
    const leaderboardContent = document.getElementById('leaderboardContent');

    function openLeaderboardModal() {
        if (leaderboardModal) {
            leaderboardModal.style.display = 'flex';

            if (typeof window.renderLeaderboard === 'function') {
                window.renderLeaderboard();
            } else {
                if (leaderboardContent) {
                    leaderboardContent.innerHTML = '<p>Не вдалося завантажити список лідерів.</p>';
                }
            }
        }
    }

    function closeLeaderboardModal() {
        if (leaderboardModal) {
            leaderboardModal.style.display = 'none';
        }
    }

    if (leaderboardButtonMain) {
        leaderboardButtonMain.addEventListener('click', openLeaderboardModal);
    }

    // Cлухач подій для закриття модального вікна при кліку поза ним
    if (leaderboardModal) {
        window.addEventListener('click', function(event) {
            if (event.target === leaderboardModal) {
                closeLeaderboardModal();
            }
        });
    }

    window.renderLeaderboard = async function() {
        if (!leaderboardContent) {
            return;
        }

        leaderboardContent.innerHTML = '<p>Завантаження списку лідерів...</p>';

        try {
            const response = await fetch('/leaderboard');
            const result = await response.json();

            if (result.success && Array.isArray(result.leaderboard)) {
                if (result.leaderboard.length === 0) {
                    leaderboardContent.innerHTML = '<p>Список лідерів поки порожній.</p>';
                    return;
                }

                let leaderboardHtml = '<h3>Топ гравців:</h3><ol class="leaderboard-list">';
                result.leaderboard.forEach((player) => {
                    leaderboardHtml += `<li class="leaderboard-item">${player.nickname} <span class="prestige-level">Престиж: ${player.prestige_level}</span></li>`;
                });
                leaderboardHtml += '</ol>';
                leaderboardContent.innerHTML = leaderboardHtml;
            } else {
                leaderboardContent.innerHTML = `<p>Помилка завантаження списку лідерів: ${result.message || 'Невідома помилка.'}</p>`;
            }
        } catch (error) {
            leaderboardContent.innerHTML = '<p>Виникла помилка мережі. Перевірте підключення або спробуйте пізніше.</p>';
        }
    };
});
