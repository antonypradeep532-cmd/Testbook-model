(() => {
  const progressKey = 'northstar-prep-progress-v1';
  const settingsKey = 'northstar-prep-settings-v1';
  const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

  const getProgress = () => {
    try { return JSON.parse(localStorage.getItem(progressKey)) || {}; } catch { return {}; }
  };
  const saveProgress = progress => {
    try {
      localStorage.setItem(progressKey, JSON.stringify(progress));
      window.dispatchEvent(new CustomEvent('northstar:progress'));
    } catch { notify('Progress could not be saved in this browser.'); }
  };
  const getSettings = () => {
    try { return JSON.parse(localStorage.getItem(settingsKey)) || {}; } catch { return {}; }
  };
  const saveSettings = settings => {
    try { localStorage.setItem(settingsKey, JSON.stringify(settings)); } catch { /* Storage is optional in private browsing. */ }
  };

  const dialog = document.querySelector('#dialog-content');
  const backdrop = document.querySelector('#modal-backdrop');
  const openDialog = html => {
    dialog.innerHTML = html;
    backdrop.hidden = false;
    document.body.classList.add('modal-open');
    document.querySelector('.dialog-close')?.focus();
  };
  const closeDialog = () => {
    backdrop.hidden = true;
    document.body.classList.remove('modal-open');
  };
  const notify = message => {
    const region = document.querySelector('.toast-region');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    region.append(toast);
    window.setTimeout(() => toast.remove(), 3400);
  };

  window.PrepApp = { setDialog: openDialog, closeDialog, notify, getProgress, saveProgress, renderDashboard: () => window.PrepDashboard?.render(), getLanguage: () => document.documentElement.dataset.language || 'en' };

  const renderExamCards = () => {
    const cards = PrepData.exams.map(exam => `
      <article class="exam-card exam-${exam.theme}"><span class="exam-icon" aria-hidden="true">${escape(exam.icon)}</span><h3>${escape(exam.name)}</h3><p>${escape(exam.description)}</p><div class="exam-links">${exam.exams.map(name => `<span>${escape(name)}</span>`).join('')}</div><a class="arrow-link" href="${exam.href}">Explore ${escape(exam.name)} <span>↗</span></a></article>
    `).join('');
    const grid = document.querySelector('#exam-grid');
    if (grid) grid.innerHTML = cards;
    const mega = document.querySelector('#mega-exams');
    if (mega) mega.innerHTML = PrepData.exams.map(exam => `<a class="mega-link" href="${exam.href}"><span class="mega-link-icon">${escape(exam.icon)}</span><span><b>${escape(exam.name)}</b><small>${escape(exam.exams.slice(0, 3).join(' · '))}</small></span></a>`).join('');
  };

  const renderTests = filter => {
    const grid = document.querySelector('#test-grid');
    if (!grid) return;
    const tests = PrepData.tests.filter(test => filter === 'all' || test.type === filter || (filter === 'Free' && test.free) || (filter === 'recent' && test.recent));
    grid.innerHTML = tests.length ? tests.map(test => `
      <article class="test-card"><div class="test-card-top"><span class="test-label">${escape(test.exam)} · ${escape(test.type)}</span>${test.free ? '<span class="test-free">FREE</span>' : ''}</div><h3>${escape(test.title)}</h3><p>${escape(test.level)} · ${test.questions} questions</p><div class="test-card-bottom"><span>◷ &nbsp;${test.duration} min</span><button data-test-start="${escape(test.id)}">Start test →</button></div></article>
    `).join('') : '<div class="empty-state">No tests in this category yet.</div>';
  };

  const renderAffairs = () => {
    const host = document.querySelector('#affairs-list');
    if (!host) return;
    const tamil = document.documentElement.dataset.language === 'ta';
    host.innerHTML = PrepData.affairs.slice(0, 3).map(item => `<article class="affair-item"><span class="affair-date"><b>${escape(item.date.split(' ')[0])}</b>OCT</span><div><span class="category-label">${escape(item.category)}</span><h3>${escape(tamil ? item.taTitle || item.title : item.title)}</h3><p>${escape(tamil ? item.taSummary || item.summary : item.summary)}</p></div></article>`).join('');
  };

  const renderPyq = () => {
    const host = document.querySelector('#pyq-list');
    if (!host) return;
    const exam = document.querySelector('#pyq-exam')?.value || 'all';
    const year = document.querySelector('#pyq-year')?.value || 'all';
    const subject = document.querySelector('#pyq-subject')?.value || 'all';
    const topic = document.querySelector('#pyq-topic')?.value || 'all';
    const difficulty = document.querySelector('#pyq-difficulty')?.value || 'all';
    const saved = getProgress().questions || [];
    const questions = PrepData.pyq.filter(item => (exam === 'all' || item.exam === exam) && (year === 'all' || item.year === year) && (subject === 'all' || item.subject === subject) && (topic === 'all' || item.topic === topic) && (difficulty === 'all' || item.difficulty === difficulty));
    host.innerHTML = questions.length ? questions.map(item => `
      <article class="pyq-card"><div><div class="pyq-meta"><span>${escape(item.exam)}</span><span>·</span><span>${escape(item.year)}</span><span>·</span><span>${escape(item.subject)}</span><span>·</span><span>${escape(item.difficulty)}</span></div><h3>${escape(item.question)}</h3><div class="pyq-options">${item.options.map((option, index) => `<span class="${index === item.answer ? 'is-answer' : ''}">${String.fromCharCode(65 + index)}. ${escape(option)}</span>`).join('')}</div></div><button class="pyq-save ${saved.includes(item.id) ? 'is-saved' : ''}" data-pyq-bookmark="${escape(item.id)}" aria-label="${saved.includes(item.id) ? 'Remove bookmark' : 'Bookmark'} question">${saved.includes(item.id) ? '♥' : '♡'}</button><details><summary>View explanation</summary><p>${escape(item.explanation)}</p></details></article>
    `).join('') : '<div class="empty-state">No questions match those filters.</div>';
  };

  const renderJobs = filter => {
    const host = document.querySelector('#jobs-grid');
    if (!host) return;
    const jobs = PrepData.jobs.filter(job => filter === 'all' || job.exam === filter);
    host.innerHTML = jobs.map(job => `
      <article class="job-card"><div class="job-card-top"><span class="job-org">${escape(job.exam)} · SAMPLE DATA</span><span class="sample-pill">DEMO ONLY</span></div><h3>${escape(job.title)}</h3><p class="job-organization">${escape(job.organization)}</p><div class="job-details"><span>Vacancies<b>${escape(job.vacancies)}</b></span><span>Qualification<b>${escape(job.qualification)}</b></span><span>Application deadline<b>${escape(job.deadline)}</b></span><span>Listing status<b>Illustrative sample</b></span></div><div class="job-links"><a href="${job.url}" target="_blank" rel="noopener noreferrer">Official website ↗</a><a href="${job.url}" target="_blank" rel="noopener noreferrer">Check opportunities ↗</a></div></article>
    `).join('');
  };

  const renderVideos = () => {
    const host = document.querySelector('#video-grid');
    if (!host) return;
    host.innerHTML = PrepData.videos.map((video, index) => `
      <article class="video-card"><div class="video-thumb"><button class="video-play" data-video="${escape(video.videoId)}" data-video-title="${escape(video.title)}" aria-label="Play ${escape(video.title)}">▶</button><span class="video-duration">${escape(video.length)}</span></div><div class="video-card-copy"><span>${escape(video.subject)}</span><h3>${escape(video.title)}</h3><p>${escape(video.teacher)} · Sample lesson ${index + 1}</p></div></article>
    `).join('');
  };

  const populateFilters = () => {
    const materialSubject = document.querySelector('#material-subject');
    if (materialSubject) {
      const subjects = [...new Set(PrepData.materials.map(item => item.subject))].sort();
      materialSubject.innerHTML = '<option value="all">All subjects</option>' + subjects.map(subject => `<option>${escape(subject)}</option>`).join('');
    }
    const pyqExam = document.querySelector('#pyq-exam');
    if (pyqExam) pyqExam.innerHTML = '<option value="all">All exams</option>' + [...new Set(PrepData.pyq.map(item => item.exam))].map(exam => `<option>${escape(exam)}</option>`).join('');
    const pyqSubject = document.querySelector('#pyq-subject');
    if (pyqSubject) pyqSubject.innerHTML = '<option value="all">All subjects</option>' + [...new Set(PrepData.pyq.map(item => item.subject))].map(subject => `<option>${escape(subject)}</option>`).join('');
    const pyqToolbar = document.querySelector('#pyq-exam')?.parentElement;
    if (pyqToolbar && !document.querySelector('#pyq-year')) pyqToolbar.insertAdjacentHTML('beforeend', '<select id="pyq-year" aria-label="Filter questions by year"><option value="all">All years</option></select><select id="pyq-topic" aria-label="Filter questions by topic"><option value="all">All topics</option></select>');
    const pyqYear = document.querySelector('#pyq-year');
    if (pyqYear) pyqYear.innerHTML = '<option value="all">All years</option>' + [...new Set(PrepData.pyq.map(item => item.year))].sort((a, b) => b - a).map(year => `<option>${escape(year)}</option>`).join('');
    const pyqTopic = document.querySelector('#pyq-topic');
    if (pyqTopic) pyqTopic.innerHTML = '<option value="all">All topics</option>' + [...new Set(PrepData.pyq.map(item => item.topic))].sort().map(topic => `<option>${escape(topic)}</option>`).join('');
  };

  const setLanguage = language => {
    document.documentElement.dataset.language = language;
    document.documentElement.lang = language;
    const switcher = document.querySelector('.language-toggle');
    if (switcher) switcher.textContent = language === 'ta' ? 'English' : 'தமிழ்';
    const navLinks = [...document.querySelectorAll('.main-nav > a')];
    const labels = language === 'ta'
      ? ['முகப்பு', 'மாதிரி தேர்வுகள்', 'படிப்புப் பொருட்கள்', 'நடப்பு நிகழ்வுகள்', 'தினசரி வினாடி வினா', 'வேலைவாய்ப்புகள்']
      : ['Home', 'Mock tests', 'Study materials', 'Current affairs', 'Daily quiz', 'Latest jobs'];
    navLinks.forEach((link, index) => { if (labels[index]) link.textContent = labels[index]; });
    const headline = document.querySelector('h1');
    const intro = document.querySelector('.hero-intro');
    const search = document.querySelector('#search-input');
      if (language === 'ta') { 
        if (headline && !document.body.dataset.page) headline.innerHTML = 'அரசுப் பணி கனவு <span>இங்கே தொடங்குகிறது.</span>';
      if (intro) intro.textContent = 'சிறப்பாகக் கற்றுக்கொள்ளுங்கள். நம்பிக்கையுடன் பயிற்சி செய்யுங்கள். உங்கள் இலக்கை அடையுங்கள்.';
      if (search) search.placeholder = 'தேர்வுகள், பயிற்சிகள், பாடங்களைத் தேடுங்கள்...';
    } else {
      if (headline && !document.body.dataset.page) headline.innerHTML = 'Your government job journey <span>starts here.</span>';
      if (intro) intro.textContent = 'Learn smarter. Practice better. Achieve your dream government job.';
      if (search) search.placeholder = 'Search exams, tests, subjects...';
    }
    saveSettings({ ...getSettings(), language });
    renderAffairs();
    window.dispatchEvent(new CustomEvent('northstar:language', { detail: language }));
  };

  const toggleTheme = force => {
    const enabled = force ?? !document.body.classList.contains('dark-mode');
    document.body.classList.toggle('dark-mode', enabled);
    const button = document.querySelector('.theme-toggle');
    button?.setAttribute('aria-label', enabled ? 'Switch to light mode' : 'Switch to dark mode');
    const icon = document.querySelector('.theme-icon');
    if (icon) icon.textContent = enabled ? '☼' : '◐';
    saveSettings({ ...getSettings(), darkMode: enabled });
  };

  const loginDialog = () => {
    const progress = getProgress();
    openDialog(`<span class="eyebrow">YOUR STUDY SPACE</span><h2>Welcome to TNPSC_TAMILQUIZ</h2><p>This demo saves your profile on this device only. No account or password is required.</p><form class="login-form"><label for="student-name">What should we call you?</label><input id="student-name" name="name" maxlength="36" value="${escape(progress.name || '')}" placeholder="Your name" required><button class="button button-primary" type="submit">Continue →</button></form>`);
  };

  const startVideo = (id, title) => openDialog(`<span class="eyebrow">SAMPLE VIDEO LESSON</span><h2>${escape(title)}</h2><div class="video-embed"><iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?rel=0" title="${escape(title)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div><p>Placeholder YouTube player. Replace this sample clip with a reviewed lesson before launch.</p>`);

  let revealObserver;
  const observeReveals = () => {
    if (document.hidden) {
      document.querySelectorAll('.reveal').forEach(element => element.classList.add('is-visible'));
      return;
    }
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(element => element.classList.add('is-visible'));
      return;
    }
    revealObserver ||= new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    }), { threshold: .12 });
    document.querySelectorAll('.reveal:not(.is-visible)').forEach(element => revealObserver.observe(element));
  };

  const animateStats = () => {
    const counters = document.querySelectorAll('[data-count]');
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const node = entry.target;
      const goal = Number(node.dataset.count);
      const started = performance.now();
      const duration = 1100;
      const frame = now => {
        const ratio = Math.min((now - started) / duration, 1);
        const value = Math.round(goal * (1 - (1 - ratio) ** 3));
          node.textContent = goal >= 1000 ? `${(value / 1000).toFixed(value < goal ? 1 : 0)}k+` : goal === 92 ? `${value}%` : String(value);
        if (ratio < 1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
      observer.unobserve(node);
    }), { threshold: .4 });
    counters.forEach(counter => observer.observe(counter));
  };

  let scrollQueued = false;
  window.addEventListener('scroll', () => {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      document.querySelector('.back-to-top')?.classList.toggle('is-visible', scrollY > 500);
      if (window.innerWidth > 640 && scrollY < 700) {
        const offset = Math.min(scrollY * .035, 18);
        const halo = document.querySelector('.art-halo');
        const photo = document.querySelector('.hero-photo');
        if (halo) halo.style.transform = `translateY(${offset}px)`;
        if (photo) photo.style.transform = `translateY(${-offset * .45}px)`;
      }
      scrollQueued = false;
    });
  }, { passive: true });

  document.addEventListener('click', event => {
    const action = event.target.closest('[data-action]')?.dataset.action;
    if (action === 'start-quiz') window.PrepQuiz.start();
    if (action === 'start-mock') window.PrepMock.start(PrepData.tests.find(test => test.free) || PrepData.tests[0]);
    if (action === 'add-task') window.PrepDashboard.addTask();
    if (event.target.closest('.login-button')) loginDialog();
    if (event.target.closest('.theme-toggle')) toggleTheme();
    if (event.target.closest('.language-toggle')) setLanguage(document.documentElement.dataset.language === 'ta' ? 'en' : 'ta');
    if (event.target.closest('.back-to-top')) window.scrollTo({ top: 0, behavior: 'smooth' });
    if (event.target.closest('.dialog-close') || event.target === backdrop) closeDialog();

    const testButton = event.target.closest('[data-test-start]');
    if (testButton) {
      const test = PrepData.tests.find(item => item.id === testButton.dataset.testStart);
      window.PrepMock.start(test);
    }

    const testFilter = event.target.closest('[data-test-filter]');
    if (testFilter) {
      document.querySelectorAll('[data-test-filter]').forEach(button => button.classList.toggle('is-active', button === testFilter));
      renderTests(testFilter.dataset.testFilter);
    }

    const jobFilter = event.target.closest('[data-job-filter]');
    if (jobFilter) {
      document.querySelectorAll('[data-job-filter]').forEach(button => button.classList.toggle('is-active', button === jobFilter));
      renderJobs(jobFilter.dataset.jobFilter);
    }

    const questionBookmark = event.target.closest('[data-pyq-bookmark]');
    if (questionBookmark) {
      const progress = getProgress();
      const saved = new Set(progress.questions || []);
      saved.has(questionBookmark.dataset.pyqBookmark) ? saved.delete(questionBookmark.dataset.pyqBookmark) : saved.add(questionBookmark.dataset.pyqBookmark);
      progress.questions = [...saved];
      saveProgress(progress);
      renderPyq();
      notify(saved.has(questionBookmark.dataset.pyqBookmark) ? 'Question saved to bookmarks.' : 'Question removed from bookmarks.');
    }

    const video = event.target.closest('[data-video]');
    if (video) startVideo(video.dataset.video, video.dataset.videoTitle);

    const share = event.target.closest('[data-share-score]');
    if (share) {
      const message = `I scored ${share.dataset.shareScore}/10 in today's TNPSC_TAMILQUIZ quiz.`;
      if (navigator.share) navigator.share({ title: 'My daily quiz score', text: message }).catch(() => {});
      else if (navigator.clipboard) navigator.clipboard.writeText(message).then(() => notify('Score copied to clipboard.')).catch(() => notify(message));
      else notify(message);
    }
  });

  document.addEventListener('change', event => {
    if (event.target.matches('#pyq-exam, #pyq-year, #pyq-subject, #pyq-topic, #pyq-difficulty')) renderPyq();
  });

  document.addEventListener('submit', event => {
    if (event.target.matches('.login-form')) {
      event.preventDefault();
      const progress = getProgress();
      progress.name = String(new FormData(event.target).get('name') || '').trim();
      saveProgress(progress);
      const welcome = document.querySelector('.dash-sidebar b');
      if (welcome && progress.name) welcome.textContent = `Good morning, ${progress.name}`;
      closeDialog();
      notify(`Welcome${progress.name ? `, ${progress.name}` : ''}. Your progress will stay on this device.`);
    }
  });

  renderExamCards();
  renderTests('all');
  renderAffairs();
  renderJobs('all');
  renderVideos();
  populateFilters();
  renderPyq();
  window.dispatchEvent(new CustomEvent('northstar:bookmarks'));
  window.PrepMaterials.render();
  window.PrepDashboard.render();
  observeReveals();
  animateStats();

  const settings = getSettings();
  toggleTheme(Boolean(settings.darkMode));
  setLanguage(settings.language || 'en');
})();