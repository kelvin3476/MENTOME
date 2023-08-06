const exitButton = document.getElementById('exit');

function autoEnterRoom() {
    console.log("do it")
    handleWelcomeSubmit();
    handleRoomSubmit();
}

exitButton.addEventListener('click', () => {
    window.location.href = '/';
});