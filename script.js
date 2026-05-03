const cursor = document.querySelector('.cursor');
const trail = document.querySelector('.cursor-trail');

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';

  setTimeout(() => {
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
  }, 80);
});

// intro
const intro = document.getElementById('intro');
const music = document.getElementById('music');
intro.onclick = () => {
  intro.style.display = 'none';
  music.play();
  document.querySelectorAll('.hidden').forEach(el => el.classList.add('show'));
};

// music toggle
const btn = document.getElementById('musicToggle');
btn.onclick = () => {
  if (music.paused) {
    music.play();
    btn.textContent = '🔊';
  } else {
    music.pause();
    btn.textContent = '🔇';
  }
};

// scroll reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
});

document.querySelectorAll('.hidden').forEach(el => observer.observe(el));

// particles
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = Array.from({length:120}, () => ({
  x: Math.random()*canvas.width,
  y: Math.random()*canvas.height,
  vx: (Math.random()-0.5)*1.5,
  vy: (Math.random()-0.5)*1.5
}));

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if(p.x<0||p.x>canvas.width) p.vx*=-1;
    if(p.y<0||p.y>canvas.height) p.vy*=-1;

    ctx.fillRect(p.x,p.y,2,2);
  });

  requestAnimationFrame(draw);
}

draw();
