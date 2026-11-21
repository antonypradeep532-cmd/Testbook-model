(() => {
  const form = document.querySelector('#global-search');
  const input = document.querySelector('#search-input');
  const results = document.querySelector('#search-results');
  if (!form || !input || !results) return;

  const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const entries = [
    ...PrepData.exams.map(item => ({ title: item.name, detail: item.subtitle, href: item.href, keywords: item.exams.join(' ') })),
    ...PrepData.tests.map(item => ({ title: item.title, detail: `${item.exam} · ${item.type}`, href: '#mock-tests', keywords: item.level })),
    ...PrepData.materials.map(item => ({ title: item.title, detail: `${item.exam} · ${item.topics}`, href: '#materials', keywords: item.subject })),
    ...PrepData.affairs.map(item => ({ title: item.title, detail: item.category, href: '#current-affairs', keywords: item.summary }))
  ];

  const render = query => {
    const term = query.trim().toLowerCase();
    if (!term) {
      results.innerHTML = '';
      return;
    }
    const matches = entries.filter(entry => `${entry.title} ${entry.detail} ${entry.keywords}`.toLowerCase().includes(term)).slice(0, 6);
    results.innerHTML = matches.length
      ? matches.map(entry => `<a class="search-result" href="${entry.href}"><span>${escape(entry.title)}<small>${escape(entry.detail)}</small></span><b>↗</b></a>`).join('')
      : '<div class="search-result"><span>No matches yet.<small>Try an exam, subject or test type.</small></span></div>';
  };

  input.addEventListener('input', () => render(input.value));
  form.addEventListener('submit', event => {
    event.preventDefault();
    render(input.value);
    if (!input.value.trim()) input.focus();
  });
  document.addEventListener('click', event => {
    if (!form.contains(event.target)) results.innerHTML = '';
  });
})();