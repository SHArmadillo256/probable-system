document.addEventListener('DOMContentLoaded', () => {
    const background = document.querySelector('.animated-background');
    const switchControl = document.getElementById('theme-switch');

    // Check for saved theme or use system preference
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    if (savedTheme === 'light') {
        background.classList.add('animated-background-light');
        background.classList.remove('animated-background-dark');
        switchControl.checked = true;
    } else {
        background.classList.add('animated-background-dark');
        background.classList.remove('animated-background-light');
        switchControl.checked = false;
    }
    
    switchControl.addEventListener('change', function() {
        if (this.checked) {
            background.classList.add('animated-background-light');
            background.classList.remove('animated-background-dark');
            localStorage.setItem('theme', 'light');
        } else {
            background.classList.add('animated-background-dark');
            background.classList.remove('animated-background-light');
            localStorage.setItem('theme', 'dark');
        }
    });
});
