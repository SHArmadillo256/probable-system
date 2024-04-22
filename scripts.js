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