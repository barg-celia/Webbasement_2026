'use strict';
setTimeout(function() {
    window.location.href = "index.html";
}, 5000); 

// --- LOGIQUE DU CLAVIER ---
let currentInput = "";
const secretCode = "118218";
const display = document.getElementById('code-display');
const keypad = document.getElementById('keypad-ui');
const carteMere = document.querySelector('.carte_mere');

function toggleKeypad() {
    keypad.classList.toggle('hidden');
}

function pressKey(num) {
    display.value += num;

    if (display.value * 1 === secretCode * 1) {
        unlockSecret();
    } else if (display.value.length >= secretCode.length) {
        setTimeout(resetCode, 500);
    }
}

function unlockSecret() {
    display.value = "ACCÈS OK";
    display.style.color = "cyan";
    if (carteMere) carteMere.classList.add('active');
    setTimeout(() => { toggleKeypad(); }, 1000);
}

function resetCode() {
    currentInput = "";
    if (display) display.innerText = "_ _ _ _ _ _";
}

// --- LOGIQUE DU JEU (HAMSTER) ---
(function() {
    const HAMSTER_SIZE = 80;
    const hamster = document.getElementById('hamster');
    const houses = Array.from(document.querySelectorAll('.house'));

    let hX = window.innerWidth / 2;
    let hY = window.innerHeight / 2;
    let gameRunning = true;
    let isStretching = false;

    // INSTRUCTIONS
    const instr = document.createElement('div');
    instr.id = 'instructions';
    instr.textContent = '🖱️ Déplace la souris pour diriger le hamster !';
    document.body.appendChild(instr);
    setTimeout(() => { instr.style.opacity = '0'; }, 5000);

    // --- CONTRÔLE À LA SOURIS ---
    document.addEventListener('mousemove', (e) => {
        if (gameRunning && !isStretching) {
            hX = e.clientX - (HAMSTER_SIZE / 2);
            hY = e.clientY - (HAMSTER_SIZE / 2);
        }
    });

    function checkCollision(ax, ay, bEl) {
        const br = bEl.getBoundingClientRect();
        const margin = 30;
        return (
            ax + margin < br.right - margin &&
            ax + HAMSTER_SIZE - margin > br.left + margin &&
            ay + margin < br.bottom - margin &&
            ay + HAMSTER_SIZE - margin > br.top + margin
        );
    }

    function triggerStretch(house) {
        isStretching = true;
        gameRunning = false;
        house.style.transition = "transform 0.5s ease-in";
        house.style.transform = "translateX(120vw)";
        
        hamster.classList.add('stretching');
        setTimeout(() => {
            hamster.classList.remove('stretching');
            isStretching = false;
            gameRunning = true;
        }, 1200);
    }

    function update() {
        if (hamster && !isStretching) {
            hamster.style.left = hX + 'px';
            hamster.style.top = hY + 'px';

            houses.forEach(house => {
                if (house.style.display !== 'none' && checkCollision(hX, hY, house)) {
                    triggerStretch(house);
                }
            });
        }
        requestAnimationFrame(update);
    }

    update();
})();

const robot = document.querySelector('.robot');

robot.addEventListener( 'click', () => {
    keypad.classList.toggle('hidden');
});
