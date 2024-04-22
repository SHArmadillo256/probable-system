// Listen for mouse movement on the page
document.addEventListener('mousemove', function(e) {
  var cursorGlow = document.getElementById('cursor-glow');
  // Set the glow div to follow the cursor using the cursor's X and Y positions
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});

// Listen for mouse button press to change the glow effect
document.addEventListener('mousedown', function() {
  var cursorGlow = document.getElementById('cursor-glow');
  // Change the color and size of the glow when the mouse is clicked
  cursorGlow.style.backgroundColor = 'rgba(255, 69, 0, 0.75)';
  cursorGlow.style.boxShadow = '0 0 12px 12px rgba(255, 69, 0, 0.75)';
});

// Listen for mouse button release to revert the glow effect changes
document.addEventListener('mouseup', function() {
  var cursorGlow = document.getElementById('cursor-glow');
  // Revert the glow color and size to normal
  cursorGlow.style.backgroundColor = 'rgba(255, 165, 0, 0.5)';
  cursorGlow.style.boxShadow = '0 0 8px 8px rgba(255, 165, 0, 0.5)';
});