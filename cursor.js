if (window.matchMedia('(pointer: fine)').matches) {
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  document.body.classList.add('has-custom-cursor');
  dot.style.display = 'block';
  ring.style.display = 'block';

  window.addEventListener('pointermove', (event) => {
    dot.style.left = `${event.clientX}px`;
    dot.style.top = `${event.clientY}px`;
    ring.style.left = `${event.clientX}px`;
    ring.style.top = `${event.clientY}px`;
  }, { passive: true });

  document.querySelectorAll('a, button, input, textarea').forEach((element) => {
    element.addEventListener('pointerenter', () => ring.classList.add('is-hover'));
    element.addEventListener('pointerleave', () => ring.classList.remove('is-hover'));
  });
}
