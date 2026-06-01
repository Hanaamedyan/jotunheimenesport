/* Shared JS — include at bottom of every page */
// Cursor
const cur=document.getElementById('cur'),ring=document.getElementById('cur-ring');
let mx=0,my=0,rx=0,ry=0;
if(cur&&ring){
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px';});
  (function l(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(l);})();
  document.querySelectorAll('a,button,.card,.price-card,.pkg-option').forEach(el=>{
    el.addEventListener('mouseenter',()=>document.body.classList.add('cg'));
    el.addEventListener('mouseleave',()=>document.body.classList.remove('cg'));
  });
}
// Nav scroll
const nav=document.getElementById('nav');
if(nav)window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>60),{passive:true});
// Mobile menu
const burger=document.getElementById('burger'),mob=document.getElementById('mob-nav');
if(burger&&mob){
  let mo=false;
  burger.addEventListener('click',()=>{
    mo=!mo;mob.classList.toggle('open',mo);
    const s=burger.querySelectorAll('span');
    s[0].style.transform=mo?'rotate(45deg) translate(5px,5px)':'';
    s[1].style.opacity=mo?'0':'1';
    s[2].style.transform=mo?'rotate(-45deg) translate(5px,-5px)':'';
  });
  document.querySelectorAll('.mob-l').forEach(l=>l.addEventListener('click',()=>{
    mo=false;mob.classList.remove('open');
    burger.querySelectorAll('span').forEach(s=>{s.style.transform='';s.style.opacity='';});
  }));
}
// Reveal
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');obs.unobserve(e.target);}});
},{threshold:.07,rootMargin:'0px 0px -28px 0px'});
document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(el=>obs.observe(el));
// img-wipe
const wObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.style.clipPath='inset(0 0% 0 0)';wObs.unobserve(e.target);}});
},{threshold:.1});
document.querySelectorAll('.img-wipe').forEach(el=>{
  el.style.clipPath='inset(0 100% 0 0)';el.style.transition='clip-path 1s cubic-bezier(.77,0,.18,1)';
  wObs.observe(el);
});
// BTT
const btt=document.getElementById('btt');
if(btt){
  window.addEventListener('scroll',()=>btt.classList.toggle('on',scrollY>400),{passive:true});
  btt.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
}
// Smooth anchor
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const t=document.querySelector(a.getAttribute('href'));
    if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});}
  });
});
// Form handling
document.querySelectorAll('form[data-form]').forEach(f=>{
  f.addEventListener('submit',e=>{
    e.preventDefault();
    if(!f.checkValidity()){f.reportValidity();return;}
    const id=f.dataset.form;
    const btn=document.getElementById('sub-'+id);
    if(btn){btn.disabled=true;btn.textContent='Sender...';}
    setTimeout(()=>{
      if(btn)btn.style.display='none';
      const suc=document.getElementById('suc-'+id);
      if(suc)suc.style.display='block';
      f.reset();
    },1400);
  });
});
// Package selector
document.querySelectorAll('.pkg-option').forEach(opt=>{
  opt.addEventListener('click',()=>{
    const grp=opt.closest('.pkg-selector');
    grp.querySelectorAll('.pkg-option').forEach(o=>o.classList.remove('selected'));
    opt.classList.add('selected');
    opt.querySelector('input').checked=true;
  });
});
