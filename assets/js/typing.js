(function(){
  const el = document.getElementById('typewriter');
  if(!el) return;
  const text = "hi… my name is Alhassan";
  const speed = 70; // ms per char
  let i = 0;
  function typeNext(){
    if(i <= text.length){
      el.textContent = text.slice(0, i);
      i++;
      window.setTimeout(typeNext, speed);
    } else {
      // small pause then add a period
      setTimeout(()=>{ el.textContent = text + "."; }, 400);
    }
  }
  // Prefer reduced motion users: show text instantly
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  if(mq.matches){ el.textContent = text + "."; return; }
  typeNext();
})();