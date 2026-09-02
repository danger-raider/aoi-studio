(()=>{
  const portrait=document.querySelector('.hero-visual .aoi-portrait');
  if(portrait){ portrait.src='/assets/aoi-hero-v8.webp?v=8'; portrait.removeAttribute('srcset'); }
  const localCard=document.querySelector('[data-modal-title="AoiLocal"]');
  if(localCard) localCard.style.setProperty('--bg',"url('/assets/aoi-hero-v8.webp?v=8')");
  const visual=document.querySelector('.hero-visual');
  if(visual && !visual.querySelector('.holo-card')){
    const card=document.createElement('div');
    card.className='holo-card';
    card.innerHTML='<strong>つながる</strong><span>Human ↔ AI</span>';
    visual.appendChild(card);
  }
  const og=document.querySelector('meta[property="og:image"]');
  if(og) og.setAttribute('content','/assets/aoi-hero-v8.webp?v=8');
})();
