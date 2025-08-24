// Typewriter functionality with language support
(function(){
  const el = document.getElementById('typewriter');
  if(!el) return;
  
  const defaultText = "Hi, my name is Alhassan";
  const speed = 70; // ms per char
  let currentAnimation = null;
  
  function startTypewriter(text = defaultText) {
    if(!el) return;
    
    // Clear any existing animation
    if(currentAnimation) {
      clearTimeout(currentAnimation);
    }
    
    // Prefer reduced motion users: show text instantly
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if(mq.matches){ 
      el.textContent = text + "."; 
      return; 
    }
    
    let i = 0;
    function typeNext(){
      if(i <= text.length){
        el.textContent = text.slice(0, i);
        i++;
        currentAnimation = window.setTimeout(typeNext, speed);
      } else {
        // small pause then add a period
        currentAnimation = setTimeout(()=>{ 
          el.textContent = text + "."; 
        }, 400);
      }
    }
    typeNext();
  }
  
  // Export function for language manager to use
  window.startTypewriter = startTypewriter;
  
  // Initial animation
  startTypewriter();
})();
