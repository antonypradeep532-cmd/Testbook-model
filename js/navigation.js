(() => {
  const menu = document.querySelector('.main-nav');
  const toggle = document.querySelector('.menu-toggle');
  const examsMenu = document.querySelector('.nav-menu');
  const examsButton = document.querySelector('.nav-trigger');

  const closeMenu = () => {
    menu?.classList.remove('is-open');
    toggle?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  };

  toggle?.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    menu.classList.toggle('is-open', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen);
  });

  examsButton?.addEventListener('click', () => {
    const isOpen = examsButton.getAttribute('aria-expanded') === 'true';
    examsButton.setAttribute('aria-expanded', String(!isOpen));
    examsMenu.classList.toggle('menu-active', !isOpen);
  });

  menu?.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeMenu();
      examsButton?.setAttribute('aria-expanded', 'false');
      examsMenu?.classList.remove('menu-active');
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 920) closeMenu();
  });
})();