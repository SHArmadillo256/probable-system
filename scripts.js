// Function to update glow position
function updateGlowPosition(x, y) {
    var cursorGlow = document.getElementById('cursor-glow');
    cursorGlow.style.left = x + 'px';
    cursorGlow.style.top = y + 'px';
}

// Desktop: Move glow with mouse
document.addEventListener('mousemove', function(e) {
    updateGlowPosition(e.clientX, e.clientY);
});

// Mobile: Move glow with touch and modify glow attributes
document.addEventListener('touchmove', function(e) {
    e.preventDefault();  // Prevents the screen from scrolling.
    var touch = e.touches[0];
    updateGlowPosition(touch.clientX, touch.clientY);
}, { passive: false });

// Add touch start and end effects
document.addEventListener('touchstart', function(e) {
    var touch = e.touches[0];
    var cursorGlow = document.getElementById('cursor-glow');
    cursorGlow.style.backgroundColor = 'rgba(255, 20, 147, 0.75)'; // Hot pink glow start
    cursorGlow.style.boxShadow = '0 0 15px 15px rgba(255, 20, 147, 0.75)'; // Larger glow effect
    updateGlowPosition(touch.clientX, touch.clientY);
});

document.addEventListener('touchend', function() {
    var cursorGlow = document.getElementById('cursor-glow');
    cursorGlow.style.backgroundColor = 'rgba(255, 165, 0, 0.5)'; // Revert to original color
    cursorGlow.style.boxShadow = '0 0 8px 8px rgba(255, 165, 0, 0.5)'; // Revert to original size
});

// Mouse click effects for Desktop
document.addEventListener('mousedown', function() {
    var cursorGlow = document.getElementById('cursor-glow');
    cursorGlow.style.backgroundColor = 'rgba(255, 69, 0, 0.75)';
    cursorGlow.style.boxShadow = '0 0 12px 12px rgba(255, 69, 0, 0.75)';
});

/* JavaScript for dynamic gradient on mouse down */
document.addEventListener('mousedown', function() {
    document.getElementById('cursor-glow').style.background = 
        "radial-gradient(circle at center, rgba(255, 140, 0, 0.8), rgba(0, 0, 0, 0) 70%)";
});

document.addEventListener('mouseup', function() {
    var cursorGlow = document.getElementById('cursor-glow');
    cursorGlow.style.backgroundColor = 'rgba(255, 165, 0, 0.5)';
    cursorGlow.style.boxShadow = '0 0 8px 8px rgba(255, 165, 0, 0.5)';
});

document.addEventListener('mousemove', function(e) {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var xPos = e.clientX / width;
    var yPos = e.clientY / height;
    var lightIntensity = 0.1 + 0.9*(1 - Math.max(Math.abs(xPos - 0.5), Math.abs(yPos - 0.5))*2);
    document.body.style.backgroundColor = `rgba(0, 0, 0, ${lightIntensity})`;
});

setInterval(function() {
    var ember = document.createElement('div');
    ember.style.position = 'absolute';
    ember.style.left = (Math.random() * 100) + '%';
    ember.style.bottom = '0px';
    ember.style.background = 'rgba(255, 100, 0, 0.8)';
    ember.style.width = ember.style.height = '5px';
    ember.style.borderRadius = '50%';
    document.getElementById('cursor-glow').appendChild(ember);

    setTimeout(function() {
        ember.style.bottom = '100px';
        ember.style.opacity = '0';
        setTimeout(function() {
            document.getElementById('cursor-glow').removeChild(ember);
        }, 1000);
    }, 50);
}, 200);
