/* 💥 GOLD PARTICLE BURST */

const burstCanvas = document.getElementById('burst-canvas');
const burstCtx = burstCanvas.getContext('2d');
let burstParticles = [];

function resizeBurst(){
  burstCanvas.width = window.innerWidth;
  burstCanvas.height = window.innerHeight;
}
resizeBurst();
window.addEventListener('resize', resizeBurst);

function createBurst(x,y){
  const colors = ['#C9A84C','#E8CC7A','#FFD700','#fff'];
  for(let i=0;i<80;i++){
    const angle = (Math.PI*2/80)*i;
    const speed = 2 + Math.random()*4;

    burstParticles.push({
      x,y,
      vx:Math.cos(angle)*speed,
      vy:Math.sin(angle)*speed,
      alpha:1,
      size:2+Math.random()*3,
      color:colors[Math.floor(Math.random()*colors.length)]
    });
  }
}

function animateBurst(){
  requestAnimationFrame(animateBurst);
  burstCtx.clearRect(0,0,burstCanvas.width,burstCanvas.height);

  burstParticles = burstParticles.filter(p=>p.alpha>0.02);

  burstParticles.forEach(p=>{
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.05;
    p.alpha -= 0.02;

    burstCtx.globalAlpha = p.alpha;
    burstCtx.beginPath();
    burstCtx.arc(p.x,p.y,p.size,0,Math.PI*2);
    burstCtx.fillStyle = p.color;
    burstCtx.fill();
  });
}
animateBurst();
function enterSite(){
  const rect = document.querySelector('.intro-logo-circle').getBoundingClientRect();

  // burst from logo center
  createBurst(rect.left + rect.width/2, rect.top + rect.height/2);

  setTimeout(()=>{
    document.getElementById('intro-screen').classList.add('hidden');
    document.body.style.overflow='';
  },400);
}