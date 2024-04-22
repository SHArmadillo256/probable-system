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


function createRisingEmber() {
    var ember = document.createElement('div');
    ember.className = 'rising-ember';
    ember.style.left = Math.random() * window.innerWidth + 'px';
    ember.style.bottom = '0px';
    document.body.appendChild(ember);
    setTimeout(function() { ember.remove(); }, 8000);  // Match animation duration
}

setInterval(createRisingEmber, 1000);


// Function to drop embers
function dropEmber() {
    var ember = document.createElement('div');
    ember.className = 'ember';
    ember.style.left = (Math.random() * 100) + '%';
    document.body.appendChild(ember);
    setTimeout(() => ember.remove(), 5000);  // Remove after 5 seconds
}

setInterval(dropEmber, 2000);  // Drop embers every 2 seconds

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