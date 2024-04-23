document.addEventListener('DOMContentLoaded', function() {
    // Get the modal
    var modal = document.getElementById("settingsModal");

    // Get the button that opens the modal
    var btn = document.getElementById("settingsBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function() {
        modal.style.display = "block";
    };

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
});


// Get the modal
var modal = document.getElementById("settingsModal");

// Get the button that opens the modal
var btn = document.getElementById("settingsBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


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
    link.href = `css/${effectName}.css`;  // Path to the cursor CSS file
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


// Adjusting ember creation to be more dynamic and visually logical
function createRisingFallingEmber() {
    var ember = document.createElement('div');
    ember.className = 'rising-ember';
    ember.style.left = `${Math.random() * 100}%`;
    ember.style.bottom = '0px'; // Starts from the bottom
    document.body.appendChild(ember);
    ember.style.animation = 'riseAndFall 8s forwards'; // Ensures the ember rises and then falls
}

setInterval(createRisingFallingEmber, 1000);






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




document.addEventListener('mousemove', updatePosition2);
document.addEventListener('touchmove', function(e) {
    e.preventDefault();
    updatePosition2(e.touches[0]);
}, { passive: false });

function updatePosition2(e) {
    const glow = document.getElementById('cursor-glow');
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
}
