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

    // Слухач подій для закриття модального вікна при кліку поза ним
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
                    leaderboardHtml += `<li class="leaderboard-item">${player.nickname} <span class="prestige-level">Престиж: ${player.prestige_level}</span>`;

                    // Логіка для додавання кнопки видалення
                    // Перевірка, чи користувач авторизований як 'coffeknight'
                    // та чи це не його власний запис у списку
                    if (window.isAuthenticated && window.userNickname === 'coffeknight' && player.nickname !== 'coffeknight') {
                        leaderboardHtml += ` <button class="delete-user-btn" data-nickname="${player.nickname}">❌</button>`;
                    }

                    leaderboardHtml += `</li>`;
                });
                leaderboardHtml += '</ol>';
                leaderboardContent.innerHTML = leaderboardHtml;

                // Додавання слухачів подій для кнопок видалення після їх додавання в DOM
                if (window.isAuthenticated && window.userNickname === 'coffeknight') {
                    const deleteButtons = leaderboardContent.querySelectorAll('.delete-user-btn');
                    deleteButtons.forEach(button => {
                        button.addEventListener('click', async (event) => {
                            const nicknameToDelete = event.target.dataset.nickname;
                            if (confirm(`Ви впевнені, що хочете видалити користувача ${nicknameToDelete}?`)) {
                                try {
                                    const deleteResponse = await fetch('/api/delete-user', {
                                        method: 'DELETE',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({
                                            nicknameToDelete: nicknameToDelete,
                                            requestingUserNickname: window.userNickname
                                        })
                                    });
                                    const deleteResult = await deleteResponse.json();

                                    if (deleteResult.success) {
                                        alert(deleteResult.message);
                                        window.renderLeaderboard();
                                    } else {
                                        alert(`Помилка: ${deleteResult.message}`);
                                    }
                                } catch (deleteError) {
                                    console.error('Помилка запиту на видалення:', deleteError);
                                    alert('Помилка зв\'язку з сервером при видаленні користувача.');
                                }
                            }
                        });
                    });
                }

            } else {
                leaderboardContent.innerHTML = `<p>Помилка завантаження списку лідерів: ${result.message || 'Невідома помилка.'}</p>`;
            }
        } catch (error) {
            console.error('Помилка отримання списку лідерів:', error);
            leaderboardContent.innerHTML = '<p>Виникла помилка мережі. Перевірте підключення або спробуйте пізніше.</p>';
        }
    };
});
