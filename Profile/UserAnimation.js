const formSlider = document.querySelector('.form-slider');
const showRegister = document.getElementById('show-register');
const showLogin = document.getElementById('show-login');

showRegister.addEventListener('click', (e) => {
    e.preventDefault();
    formSlider.style.transform = 'translateY(-50%)';
});

showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    formSlider.style.transform = 'translateY(0)';
});