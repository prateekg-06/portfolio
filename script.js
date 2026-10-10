const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const progress = document.querySelector('.progress');
const links = [...document.querySelectorAll('nav a')];
const sections = links.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);

function updateNavigation() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0}%`;
  const current = [...sections].reverse().find((section) => section.offsetTop <= window.scrollY + 120);
  links.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${current?.id || 'home'}`));
}

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 35, 180)}ms`;
    observer.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

window.addEventListener('scroll', updateNavigation, { passive: true });
updateNavigation();

document.querySelectorAll('.kinetic-title').forEach((title) => {
  const walker = document.createTreeWalker(title, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  let node;
  while ((node = walker.nextNode())) textNodes.push(node);
  let wordIndex = 0;
  textNodes.forEach((textNode) => {
    const fragment = document.createDocumentFragment();
    textNode.textContent.split(/(\s+)/).forEach((part) => {
      if (!part) return;
      if (/^\s+$/.test(part)) {
        fragment.append(part);
        return;
      }
      const word = document.createElement('span');
      word.className = 'kinetic-word';
      word.style.setProperty('--word-index', wordIndex);
      word.textContent = part;
      wordIndex += 1;
      fragment.append(word);
    });
    textNode.replaceWith(fragment);
  });
});
