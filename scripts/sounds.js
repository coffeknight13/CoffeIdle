document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.button');
    const clickSound = document.getElementById('clickSound');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (clickSound) {
                clickSound.currentTime = 0;
                clickSound.play();
            }
        });
    });

    const innerUpgradeButtons = document.querySelectorAll('.item-upgrade');
    innerUpgradeButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (clickSound) {
                clickSound.currentTime = 0;
                clickSound.play();
            }
        });
    });
});





document.addEventListener('DOMContentLoaded', function() {
    const tracks = [
        document.getElementById('track1'),
        document.getElementById('track2'),
        document.getElementById('track3'),
        document.getElementById('track4'),
        document.getElementById('track5'),
        document.getElementById('track6'),
        document.getElementById('track7'),
        document.getElementById('track8'),
        document.getElementById('track9')
    ];

    const playMusicButton = document.getElementById('playMusicButton'); // Знаходимо кнопку за її ID

    function playRandomTrack() {
        tracks.forEach(track => {
            track.pause();
            track.currentTime = 0;
        });
        const randomIndex = Math.floor(Math.random() * tracks.length);
        tracks[randomIndex].play();
    }

    if (playMusicButton) {
        playMusicButton.addEventListener('click', playRandomTrack);
    }
});