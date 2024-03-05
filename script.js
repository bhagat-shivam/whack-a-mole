const holes = document.querySelectorAll('.hole');
const scoreboard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lasthole;
let timeup = false;
let score = 0;

function randomTime(min, max)
{
    return Math.round(Math.random() * (max-min) + min);
}

function randomHole(holes)
{
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];

    if(hole==lasthole)
    {
        return randomHole(holes);
    }
    lasthole = hole;
    return hole;
}

function peep() {
    const time = randomTime(500,1000);
    const hole = randomHole(holes);

    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if(!timeup)
        {
            peep();
        }
    }, time );
}

function startgame() {
    scoreboard.textContent = 0;
    timeup = false;
    score = 0;
    peep();
    setTimeout(() => timeup, 15000)
}


function wack(e)
{
    if(!e.isTrusted) return;
    score++;
    this.parentNode.classList.remove('up');
    scoreboard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', wack))