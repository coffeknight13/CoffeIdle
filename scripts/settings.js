document.addEventListener('DOMContentLoaded', function() {
    const settingsButton = Array.from(document.querySelectorAll('.bottom-right-container .button')).find(button => button.textContent.trim() === 'Налаштування');
    const settingsMenu = document.querySelector('.settings-menu');
    const closeSettingsButton = document.getElementById('closeSettings');
    const musicVolumeControl = document.getElementById('musicVolume');
    const soundVolumeControl = document.getElementById('soundVolume');
    const languageSelect = document.getElementById('language');
    const musicTracks = document.querySelectorAll('audio[id^="track"]');
    const clickSound = document.getElementById('clickSound');
    const musicVolumeValueDisplay = document.getElementById('musicVolumeValue');
    const soundVolumeValueDisplay = document.getElementById('soundVolumeValue');

    // Відкриття меню налаштувань
    if (settingsButton) {
        settingsButton.addEventListener('click', function() {
            settingsMenu.style.display = 'block';
        });
    }

    // Закриття меню налаштувань
    if (closeSettingsButton) {
        closeSettingsButton.addEventListener('click', function() {
            settingsMenu.style.display = 'none';
        });
    }

    // Налаштування гучності музики
    if (musicVolumeControl) {
        musicVolumeControl.addEventListener('input', function() {
            const volume = parseFloat(this.value);
            musicTracks.forEach(track => {
                track.volume = volume;
            });
            musicVolumeValueDisplay.textContent = Math.round(volume * 100) + '%';
            localStorage.setItem('musicVolume', volume);
        });
        const savedMusicVolume = localStorage.getItem('musicVolume');
        if (savedMusicVolume !== null) {
            musicVolumeControl.value = savedMusicVolume;
            musicTracks.forEach(track => {
                track.volume = parseFloat(savedMusicVolume);
            });
            musicVolumeValueDisplay.textContent = Math.round(parseFloat(savedMusicVolume) * 100) + '%';
        }
    }

    // Налаштування гучності звуку натискання
    if (soundVolumeControl && clickSound) {
        soundVolumeControl.addEventListener('input', function() {
            const volume = parseFloat(this.value);
            clickSound.volume = volume;
            soundVolumeValueDisplay.textContent = Math.round(volume * 100) + '%';
            localStorage.setItem('soundVolume', volume);
        });
        const savedSoundVolume = localStorage.getItem('soundVolume');
        if (savedSoundVolume !== null) {
            soundVolumeControl.value = savedSoundVolume;
            clickSound.volume = parseFloat(savedSoundVolume);
            soundVolumeValueDisplay.textContent = Math.round(parseFloat(savedSoundVolume) * 100) + '%';
        }
    }

    // Зміна мови
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            const selectedLanguage = this.value;
            localStorage.setItem('language', selectedLanguage);
            console.log('Обрана мова:', selectedLanguage);
            // Тут додайте код для зміни мови контенту
        });
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            languageSelect.value = savedLanguage;
        }
    }
});