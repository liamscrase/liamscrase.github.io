document.addEventListener('DOMContentLoaded', () => {
  const elements = Array.from(document.querySelectorAll('.section'));
  if (!elements.length) return;

  // Ensure sections start hidden so the reveal animation can run
  elements.forEach(el => {
    if (!el.classList.contains('hidden') && !el.classList.contains('visible')) {
      el.classList.add('hidden');
    }
  });

  let ticking = false;

  function checkVisibility() {
    const bottomOfWindow = window.scrollY + window.innerHeight;
    elements.forEach(el => {
      if (el.classList.contains('visible')) return;
      const rect = el.getBoundingClientRect();
      const bottomOfObject = rect.top + window.scrollY + el.offsetHeight - 100;
      if (bottomOfWindow > bottomOfObject - 500) {
        el.classList.add('visible', 'reveal');
        el.classList.remove('hidden');
      }
    });
  }

  // initial check
  checkVisibility();

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        checkVisibility();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', () => {
    if (!ticking) requestAnimationFrame(checkVisibility);
  }, { passive: true });
});
