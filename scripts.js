document.addEventListener('DOMContentLoaded', function() {
    var connectButton = document.getElementById('connectWalletButton');
    var walletAndSettings = document.getElementById('walletAndSettings');
    var modal = document.getElementById("settingsModal");
    var settingsBtutton = document.getElementById("settingsButton");
    var span = document.getElementsByClassName("close")[0];

    connectButton.addEventListener('click', function() {
        // Simulate wallet connection
        connectButton.style.display = 'none';
        walletAndSettings.style.display = 'flex';  
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






document.addEventListener('DOMContentLoaded', function() {
    const glow = document.getElementById('cursor-glow');
    function updatePosition(e) {
    if (glow) {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    }
}
                          
/* Position cursor glow based on mouse or touch movement */
document.addEventListener('mousemove', updatePosition);
document.addEventListener('touchmove', function(e) {
    e.preventDefault();
    updatePosition(e.touches[0]);
  });
 });

/* Randomly create embers around the cursor */
setInterval(function() {
    const ember = document.createElement('div');
    ember.className = 'ember';
    document.body.appendChild(ember);
    ember.style.left = (Math.random() * window.innerWidth) + 'px';
    ember.style.top = (Math.random() * window.innerHeight) + 'px';
    
    setTimeout(() => { ember.remove(); }, 5100);
}, 500);

/* Randomly create ember 2 around the cursor */
setInterval(function() {
    const ember2 = document.createElement('div');
    ember2.className = 'ember2';
    document.body.appendChild(ember2);
    ember2.style.left = (Math.random() * window.innerWidth) + 'px';
    ember2.style.top = (Math.random() * window.innerHeight) + 'px';
    
    setTimeout(() => { ember2.remove(); }, 5100);
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
    for (let i = 0; i < 5; i++) dropEmber(); 
});

function createAtomWithTrail() {
    const atom = document.createElement('div');
    atom.className = 'atom';
    document.getElementById('cursor-glow').appendChild(atom);
    atom.style.animation = 'atomOrbit infinite linear';

    const atomtrail = document.createElement('div');
    atomtrail.className = 'atomtrail';
    atomtrail.style.width = '25px';  // Example trail length
    atomtrail.style.animation = 'trailFade 1s infinite linear';
    document.getElementById('cursor-glow').appendChild(atomtrail);
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
    const embertrail = document.createElement('div');
    embertrail.className = 'embertrail';
    document.body.appendChild(embertrail);
    embertrail.style.left = ember.style.left;
    embertrail.style.top = ember.style.top; 

    // Animation to move trail with ember
    embertrail.style.animation = 'trailMove 2.5s infinite';
    setTimeout(() => { ember.remove(); embertrail.remove(); }, 5100);
}

setInterval(createEmberWithTrail, 250);



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

