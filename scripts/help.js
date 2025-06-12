document.addEventListener('DOMContentLoaded', function() {
    const helpButton = document.querySelector('.help-button');
    const helpModal = document.getElementById('helpModal');
    const closeButtonSpan = helpModal.querySelector('.close-button');


    function openHelpModal() {
        helpModal.style.display = 'flex';
    }

    function closeHelpModal() {
        helpModal.style.display = 'none';
    }

    if (helpButton) {
        helpButton.addEventListener('click', openHelpModal);
    }

    if (closeButtonSpan) {
        closeButtonSpan.addEventListener('click', closeHelpModal);
    }

    // Закриття модального вікна, якщо клікнути за його межами
    if (helpModal) {
        window.addEventListener('click', function(event) {
            if (event.target === helpModal) {
                closeHelpModal();
            }
        });
    }

});