document.addEventListener('DOMContentLoaded', function() {
    var connectButton = document.getElementById('connectWalletButton');
    var walletAndSettings = document.getElementById('walletAndSettings');
    var modal = document.getElementById("settingsModal");
    var settingsBtutton = document.getElementById("settingsButton");
    var span = document.getElementsByClassName("close")[0];

    connectButton.addEventListener('click', function() {
        // Simulate wallet connection
        connectButton.style.display = 'none';
        walletAndSettings.style.display = 'flex';  // Show wallet info and settings
    });
    
    settingsButton.onclick = function() {
        modal.style.display = "block";
    };

    span.onclick = function() {
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
});



function changeCursor(cursorType) {
    document.documentElement.style.cursor = 'url(css/' + cursorType + '.cur), auto';
}

document.getElementById('cursor-choice').addEventListener('change', function() {
    const selectedCursor = this.value;
    applyCursorEffect(selectedCursor);
    localStorage.setItem('userCursorChoice', selectedCursor);  // Save choice in localStorage
});

function applyCursorEffect(effectName) {
    const linkId = 'cursor-style';
    let link = document.getElementById(linkId);
    if (!link) {
        link = document.createElement('link');
        link.id = linkId;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }
    link.href = `Cursor_Designs/${effectName}.css`;  // Path to the cursor CSS file
}

// On load, apply saved cursor effect if any
window.onload = () => {
    const savedCursor = localStorage.getItem('userCursorChoice') || 'default';
    applyCursorEffect(savedCursor);
    document.getElementById('cursor-choice').value = savedCursor;
};


/* Position cursor glow based on mouse or touch movement */
document.addEventListener('mousemove', updatePosition);
document.addEventListener('touchmove', function(e) {
    e.preventDefault();  // Optional: prevent scrolling when touching the glow
    updatePosition(e.touches[0]);
});

function updatePosition(e) {
    const glow = document.getElementById('cursor-glow');
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
}

/* Randomly create embers around the cursor */
setInterval(function() {
    const ember = document.createElement('div');
    ember.className = 'ember';
    document.body.appendChild(ember);
    ember.style.left = (Math.random() * window.innerWidth) + 'px';
    ember.style.top = (Math.random() * window.innerHeight) + 'px';
    
    setTimeout(() => { ember.remove(); }, 5100);
}, 500);

document.addEventListener('mousemove', function(e) {
    var xPos = e.clientX / window.innerWidth;
    var yPos = e.clientY / window.innerHeight;
    var wallBrightness = Math.max(0, 1 - yPos * 2);
    
    document.getElementById('left-wall').style.backgroundColor = `rgba(0, 0, 0, ${wallBrightness})`;
    document.getElementById('right-wall').style.backgroundColor = `rgba(0, 0, 0, ${wallBrightness})`;
});

// Click effects to create more embers
document.addEventListener('mousedown', function() {
    for (let i = 0; i < 5; i++) dropEmber();  // Drop multiple embers on click
});

function createAtomWithTrail() {
    const atom = document.createElement('div');
    atom.className = 'atom';
    document.getElementById('cursor-glow').appendChild(atom);
    atom.style.animation = 'atomOrbit 10s infinite linear';

    const trail = document.createElement('div');
    trail.className = 'trail';
    trail.style.width = '50px';  // Example trail length
    trail.style.animation = 'trailFade 10s infinite linear';
    document.getElementById('cursor-glow').appendChild(trail);
}

for (let i = 0; i < 3; i++) {
    createAtomWithTrail();
}

function createEmberWithTrail() {
    const ember = document.createElement('div');
    ember.className = 'ember';
    document.body.appendChild(ember);
    ember.style.left = `${Math.random() * window.innerWidth}px`;
    ember.style.top = `${Math.random() * window.innerHeight}px`;

    // Creating a trail for each ember
    const trail = document.createElement('div');
    trail.className = 'trail';
    document.body.appendChild(trail);
    trail.style.left = ember.style.left; // Initial position matching the ember
    trail.style.top = ember.style.top; // Initial position matching the ember

    // Animation to move trail with ember
    trail.style.animation = 'trailMove 5s infinite';
    setTimeout(() => { ember.remove(); trail.remove(); }, 5100);
}

setInterval(createEmberWithTrail, 500);



document.addEventListener('mousemove', function(e) {
    const glow = document.getElementById('cursor-glow');
    if (glow) {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    }
});

document.addEventListener('touchmove', function(e) {
    e.preventDefault(); // Prevent scrolling
    const touch = e.touches[0];
    const glow = document.getElementById('cursor-glow');
    if (glow) {
        glow.style.left = touch.clientX + 'px';
        glow.style.top = touch.clientY + 'px';
    }
}, { passive: false });

let lastScrollTop = 0; // Tracks the last scroll position

document.addEventListener('scroll', function() {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const buttons = document.querySelectorAll('.neon-button-before');

    buttons.forEach(button => {
        if (currentScrollTop > lastScrollTop) {
            // Scrolling down
            button.querySelector(':after').style.animationPlayState = 'running';
        } else {
            // Scrolling up
            button.querySelector(':after').style.animationPlayState = 'paused';
            button.querySelector(':after').style.transform = 'scaleY(0)';
        }
    });

    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
}, { passive: true });

