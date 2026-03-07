// moving from login page to main page 
const signInBtn = document.getElementById('signInBtn');
const usernameInput = document.getElementById('usernameInput');
const passwordInput = document.getElementById('passwordInput');
const errorMessage = document.getElementById('errorMessage');

signInBtn.addEventListener('click', function() {
    const user = usernameInput.value;
    const pass = passwordInput.value;

    if (user === 'admin' && pass === 'admin123') {
        window.location.href = 'main.html';
    } else {
        errorMessage.classList.remove('hidden');
    }
});

