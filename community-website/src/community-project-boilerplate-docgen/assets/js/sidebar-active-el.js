window.addEventListener('load', () => {
  const $sidebar = document.querySelector('.sidebar-elements');

  if ($sidebar) {
    let { id: title } = document.querySelector('.documentation-container h1');
    title = title
      .replace('ais-', '')
      .replace(/-/g, ' ')
      .toLowerCase();

    const links = Array.from(document.querySelectorAll('li.sidebar-element a'));
    const activeLink = links.find(l => l.textContent.toLowerCase() === title);

    if (activeLink) {
      activeLink.className = 'navItem-active';
    }
  }
});
