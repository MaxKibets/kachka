// Kachka wireframes · prototype mode runtime.
// Activated by ?proto=1 in URL. Hides wireframe chrome, wires [data-href] clicks.

(function () {
  const params = new URLSearchParams(window.location.search);
  const isProto = params.get('proto') === '1';

  if (!isProto) return;

  document.documentElement.classList.add('proto-mode');
  document.title = 'Kachka prototype';

  document.addEventListener('click', function (e) {
    const target = e.target.closest('[data-href]');
    if (!target) return;

    const href = target.getAttribute('data-href');
    if (!href || href === '#') {
      e.preventDefault();
      return;
    }

    e.preventDefault();

    const isExternal = /^(https?:|mailto:|tel:)/.test(href);
    if (isExternal) {
      window.open(href, '_blank');
      return;
    }

    try {
      const url = new URL(href, window.location.href);
      url.searchParams.set('proto', '1');
      window.location.href = url.toString();
    } catch (err) {
      window.location.href = href + (href.includes('?') ? '&' : '?') + 'proto=1';
    }
  });
})();
