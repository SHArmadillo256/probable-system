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

document.addEventListener('mouseup', function() {
    var cursorGlow = document.getElementById('cursor-glow');
    cursorGlow.style.backgroundColor = 'rgba(255, 165, 0, 0.5)';
    cursorGlow.style.boxShadow = '0 0 8px 8px rgba(255, 165, 0, 0.5)';
});