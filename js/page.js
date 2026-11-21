(() => {
  const page = document.body.dataset.page;
  const root = document.querySelector('#page-content');
  if (!root || !page) return;
  const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const affairTitle = item => document.documentElement.dataset.language === 'ta' ? item.taTitle || item.title : item.title;
  const affairSummary = item => document.documentElement.dataset.language === 'ta' ? item.taSummary || item.summary : item.summary;
  const exam = PrepData.exams.find(item => item.id === page);
  const pageTitle = exam?.name || ({ 'mock-tests': 'Mock tests', 'study-materials': 'Study materials', 'current-affairs': 'Current affairs', 'daily-quiz': 'Daily quiz', 'previous-papers': 'Previous-year questions', 'latest-jobs': 'Latest opportunities', dashboard: 'Your study dashboard' }[page] || 'Explore TNPSC_TAMILQUIZ');
  const intro = exam?.description || ({ 'mock-tests': 'Choose a practice set, settle into the timer, and learn from your review.', 'study-materials': 'Find a clear starting point for the topics on your examination syllabus.', 'current-affairs': 'Make the news useful with brief, syllabus-aware explainers.', 'daily-quiz': 'Ten questions. Immediate explanations. A small habit that compounds.', 'previous-papers': 'Explore sample past-paper questions by examination, year and subject.', 'latest-jobs': 'A careful place to track the kinds of opportunities you are preparing for.', dashboard: 'A personal view of your practice, saved materials and next steps.' }[page] || 'A focused preparation space for your next step.');
  const heading = (eyebrow, title, copy = '') => `<header class="page-title"><span class="eyebrow">${eyebrow}</span><h1>${title}</h1>${copy ? `<p>${copy}</p>` : ''}</header>`;
  const testCard = test => `<article class="test-card"><div class="test-card-top"><span class="test-label">${escape(test.exam)} · ${escape(test.type)}</span><span class="test-card-tags">${test.recent ? '<span class="test-new">NEW</span>' : ''}${test.free ? '<span class="test-free">FREE</span>' : ''}</span></div><h3>${escape(test.title)}</h3><p>${escape(test.level)} · ${test.questions} questions</p><div class="test-card-bottom"><span>◷ &nbsp;${test.duration} min</span><button data-test-start="${escape(test.id)}">Start test →</button></div></article>`;
  const isSaved = (collection, id) => (PrepApp.getProgress()[collection] || []).includes(id);
  const materialCard = item => `<article class="material-card"><span class="material-icon">${escape(item.icon)}</span><div><h3>${escape(item.title)}</h3><p>${escape(item.topics)}</p><button data-material-preview="${escape(item.id)}">Preview notes</button><button class="material-bookmark ${isSaved('materials', item.id) ? 'is-saved' : ''}" data-material-bookmark="${escape(item.id)}">${isSaved('materials', item.id) ? '♥ Saved' : '♡ Save'}</button></div></article>`;
  const pyqCard = item => `<article class="pyq-card"><div><div class="pyq-meta"><span>${escape(item.exam)}</span><span>·</span><span>${escape(item.year)}</span><span>·</span><span>${escape(item.subject)}</span></div><h3>${escape(item.question)}</h3><div class="pyq-options">${item.options.map((option, index) => `<span class="${index === item.answer ? 'is-answer' : ''}">${String.fromCharCode(65 + index)}. ${escape(option)}</span>`).join('')}</div></div><button class="pyq-save ${isSaved('questions', item.id) ? 'is-saved' : ''}" data-pyq-bookmark="${escape(item.id)}" aria-label="${isSaved('questions', item.id) ? 'Remove bookmark' : 'Bookmark'} question">${isSaved('questions', item.id) ? '♥' : '♡'}</button><details><summary>View explanation</summary><p>${escape(item.explanation)}</p></details></article>`;
  const jobCard = job => `<article class="job-card"><div class="job-card-top"><span class="job-org">${escape(job.exam)} · SAMPLE DATA</span><span class="sample-pill">DEMO ONLY</span></div><h3>${escape(job.title)}</h3><p class="job-organization">${escape(job.organization)}</p><div class="job-details"><span>Vacancies<b>${escape(job.vacancies)}</b></span><span>Qualification<b>${escape(job.qualification)}</b></span><span>Application deadline<b>${escape(job.deadline)}</b></span><span>Listing status<b>Illustrative sample</b></span></div><div class="job-links"><a href="${job.url}" target="_blank" rel="noopener noreferrer">Official website ↗</a><a href="${job.url}" target="_blank" rel="noopener noreferrer">Check opportunities ↗</a></div></article>`;

  let content = '';
  if (exam) {
    const tests = PrepData.tests.filter(test => test.exam === exam.name || (exam.id === 'railway' && test.exam === 'Railway'));
    const materials = PrepData.materials.filter(item => item.exam === exam.name || item.exam === 'All exams');
    content = `
      <section class="page-hero exam-page-hero exam-page-${exam.id}"><div><span class="eyebrow">EXAM TRACK · ${escape(exam.subtitle.toUpperCase())}</span><h1>${escape(exam.name)} <em>preparation.</em></h1><p>${escape(intro)}</p><div class="page-hero-actions"><a class="button button-dark" href="#exam-list">Explore examinations ↓</a><button class="button button-primary" data-action="start-mock">Start a free mock test →</button></div></div><span class="page-hero-glyph">${escape(exam.icon)}</span></section>
      <section class="section page-section" id="exam-list"><div class="section-heading"><div><span class="eyebrow">CHOOSE YOUR EXAM</span><h2>One clear next <em>step.</em></h2></div></div><div class="subexam-grid">${exam.exams.map((name, index) => `<article class="subexam-card"><span>0${index + 1}</span><h3>${escape(name)}</h3><p>Focused syllabus, practice questions and exam-day preparation.</p><a href="#practice">Explore preparation →</a></article>`).join('')}</div></section>
      <section class="section page-section section-tint" id="practice"><div class="section-heading"><div><span class="eyebrow">PRACTISE FOR ${escape(exam.name)}</span><h2>Ready when <em>you are.</em></h2></div><a class="arrow-link" href="mock-tests.html">All mock tests ↗</a></div><div class="test-grid">${tests.map(testCard).join('') || PrepData.tests.slice(0, 3).map(testCard).join('')}</div></section>
      <section class="section page-section"><div class="section-heading"><div><span class="eyebrow">A GOOD PLACE TO BEGIN</span><h2>Useful study <em>resources.</em></h2></div><a class="arrow-link" href="study-materials.html">Browse library ↗</a></div><div class="material-grid">${(materials.length ? materials : PrepData.materials.slice(0, 4)).map(materialCard).join('')}</div></section>
      <section class="section page-section section-tint"><div class="section-heading"><div><span class="eyebrow">PAST-PAPER PRACTICE</span><h2>Spot the <em>patterns.</em></h2></div><a class="arrow-link" href="previous-papers.html">Explore questions ↗</a></div><div class="pyq-list">${PrepData.pyq.slice(0, 2).map(pyqCard).join('')}</div></section>`;
  } else if (page === 'mock-tests') {
    content = `${heading('PRACTICE LIBRARY', 'Mock tests, <em>made purposeful.</em>', intro)}<section class="page-section"><div class="filter-row page-filter-row">${['all', 'Free', 'Full length', 'Subject-wise', 'Topic-wise', 'Previous year', 'recent'].map((filter, index) => `<button class="filter-chip ${index === 0 ? 'is-active' : ''}" data-page-test-filter="${filter}">${index === 0 ? 'All tests' : filter === 'recent' ? 'Recently added' : filter}</button>`).join('')}</div><div class="test-grid" id="page-test-grid">${PrepData.tests.map(testCard).join('')}</div></section><section class="page-section section-tint"><div class="page-inline-note"><span class="eyebrow">EVERY TEST ENDS WITH A PLAN</span><h2>Review is where <em>the gains happen.</em></h2><p>Each mock includes answer analysis, detailed explanations and configurable negative marking.</p></div></section>`;
  } else if (page === 'study-materials') {
    content = `${heading('THE LEARNING LIBRARY', 'Make the syllabus <em>feel smaller.</em>', intro)}<section class="page-section"><div class="material-tools"><label class="material-search"><span>⌕</span><input id="page-material-search" type="search" placeholder="Find a subject or topic" aria-label="Search materials"></label><select id="page-material-filter" aria-label="Filter by exam"><option value="all">All exams</option>${PrepData.exams.map(item => `<option>${escape(item.name)}</option>`).join('')}</select></div><div class="material-grid" id="page-material-grid">${PrepData.materials.map(materialCard).join('')}</div></section>`;
  } else if (page === 'current-affairs') {
    content = `${heading('DAILY BRIEFING', 'The news, <em>with context.</em>', intro)}<section class="page-section"><div class="affairs-category-row"><button class="filter-chip is-active" data-affair-category="all">All topics</button>${['National', 'International', 'Tamil Nadu', 'Economy', 'Science', 'Sports', 'Awards', 'Important days', 'Schemes'].map(item => `<button class="filter-chip" data-affair-category="${item}">${item}</button>`).join('')}</div><div class="page-affairs-grid" id="page-affairs-grid">${PrepData.affairs.map((item, index) => `<article class="page-affair-card"><span class="category-label">${escape(item.category)}</span><span class="affair-date">${escape(item.date)} · 2026</span><h2>${escape(affairTitle(item))}</h2><p>${escape(affairSummary(item))}</p><button class="arrow-link" data-read-affair="${index}">Read more <span>↗</span></button></article>`).join('')}</div><div class="page-inline-note"><span class="eyebrow">REVIEW IN THREE CADENCES</span><h2>Daily, weekly, <em>monthly.</em></h2><p>Use a quick daily read, a weekly recap and a monthly revision session to revisit what matters.</p><a class="arrow-link" href="daily-quiz.html">Try a current affairs quiz ↗</a></div></section>`;
  } else if (page === 'daily-quiz') {
    content = `${heading('A DAILY PRACTICE HABIT', 'Ten questions. <em>One good start.</em>', intro)}<section class="page-section"><div class="daily-quiz-panel"><div><span class="eyebrow">TODAY'S CHALLENGE</span><h2>Take a moment.<br>Test what you know.</h2><p>Questions span polity, science, history, geography, economy and reasoning. Choose Tamil or English with the language switch above.</p><ul><li>10 questions with instant feedback</li><li>Clear explanations for each answer</li><li>Your attempts stay on this device</li></ul><button class="button button-primary" data-action="start-quiz">Start today's quiz →</button></div><div class="daily-quiz-number">10<span>questions<br>every day</span></div></div></section><section class="page-section section-tint"><div class="page-inline-note"><span class="eyebrow">CONSISTENCY, NOT PERFECTION</span><h2>Your recent attempts</h2><p id="page-quiz-history">Your completed quiz scores will appear in your student dashboard.</p><a class="arrow-link" href="dashboard.html">Open your dashboard ↗</a></div></section>`;
  } else if (page === 'previous-papers') {
    content = `${heading('QUESTION EXPLORER', 'Past questions, <em>new perspective.</em>', intro)}<section class="page-section"><div class="pyq-toolbar"><span>Sample previous-year questions</span><div class="filter-row"><select id="page-pyq-exam"><option value="all">All examinations</option>${[...new Set(PrepData.pyq.map(item => item.exam))].map(item => `<option>${escape(item)}</option>`).join('')}</select><select id="page-pyq-subject"><option value="all">All subjects</option>${[...new Set(PrepData.pyq.map(item => item.subject))].map(item => `<option>${escape(item)}</option>`).join('')}</select><select id="page-pyq-difficulty"><option value="all">Any difficulty</option>${['Easy', 'Medium', 'Hard'].map(item => `<option>${item}</option>`).join('')}</select></div></div><div class="pyq-list" id="page-pyq-list">${PrepData.pyq.map(pyqCard).join('')}</div></section>`;
  } else if (page === 'latest-jobs') {
    content = `${heading('OPPORTUNITY WATCH', 'Your next role, <em>carefully tracked.</em>', intro)}<section class="page-section"><div class="notice-banner"><span class="notice-mark">i</span><p>Every listing below is sample data for demonstration only. No vacancy or date is a real announcement. Confirm details in the official notification.</p></div><div class="filter-row page-job-filters">${['all', 'TNPSC', 'SSC', 'Railway', 'Banking'].map((item, index) => `<button class="filter-chip ${index === 0 ? 'is-active' : ''}" data-page-job-filter="${item}">${index === 0 ? 'All tracks' : item}</button>`).join('')}</div><div class="jobs-grid" id="page-jobs-grid">${PrepData.jobs.map(jobCard).join('')}</div></section>`;
  } else if (page === 'dashboard') {
    content = `${heading('YOUR PREPARATION, IN ONE PLACE', 'A little progress <em>adds up.</em>', intro)}<section class="page-section"><div class="dashboard-page-summary"><div><span class="eyebrow">YOUR TARGET EXAM</span><h2>TNPSC Group II</h2><p>Personalize your track in your profile settings.</p></div><div class="dash-metric-page"><small>TESTS ATTEMPTED</small><strong id="dash-tests">12</strong></div><div class="dash-metric-page"><small>AVERAGE ACCURACY</small><strong id="dash-accuracy">78%</strong></div><div class="dash-metric-page"><small>DAILY STREAK</small><strong id="dash-streak">6 days</strong></div></div><div class="dashboard-preview page-dashboard-preview"><aside class="dash-sidebar"><span class="dash-avatar">A</span><b>Good morning, Arun</b><small>Your next chapter is taking shape.</small><div class="dash-nav-active">◧ &nbsp; Overview</div><div>◷ &nbsp; Test history</div><div>♡ &nbsp; Bookmarks</div><div>▤ &nbsp; Study plan</div></aside><div class="dash-main"><div class="dash-top"><div><small>WEEKLY STUDY GOAL</small><h3>7.5 <span>/ 10 hours</span></h3></div><span class="target-date" id="countdown-days">199 days</span></div><div class="progress-track"><span style="width:75%"></span></div><div class="metric-grid"><div><small>Latest test score</small><strong id="dash-latest-score">--</strong><span>Take a mock to begin</span></div><div><small>Quiz attempts</small><strong id="page-quiz-attempts">0</strong><span>Keep the streak alive</span></div><div><small>Saved resources</small><strong id="page-saved-count">0</strong><span>Ready for revision</span></div></div><div class="subject-tags"><span>Strong: Polity</span><span>Focus next: Geography</span></div></div></div></section><section class="section page-section section-tint" id="planner"><div class="section-heading"><div><span class="eyebrow">A PLAN FOR TODAY</span><h2>Make room for <em>the goal.</em></h2></div></div><div class="planner-card page-planner"><div class="planner-head"><div><span class="eyebrow">TODAY'S PLAN</span><h3>Saturday, October 31</h3></div><button class="text-button" data-action="add-task">+ Add task</button></div><div id="planner-tasks" class="planner-tasks"></div><div class="planner-foot"><span id="planner-complete">0 of 4 complete</span><button class="text-button" data-action="reset-plan">Reset day</button></div></div></section><section class="page-section"><div class="section-heading"><div><span class="eyebrow">YOUR SAVED RESOURCES</span><h2>Keep the useful <em>close.</em></h2></div></div><div id="page-saved-items" class="saved-items"><p>Questions and study materials you bookmark will be collected here.</p></div></section>`;
  }

  root.innerHTML = content;
  document.title = `${pageTitle} | TNPSC_TAMILQUIZ`;
  document.body.insertAdjacentHTML('beforeend', '<button class="floating-quiz" data-action="start-quiz" aria-label="Start daily quiz"><span>✳</span><b>Daily quiz</b></button><button class="back-to-top" aria-label="Back to top">↑</button>');
  if (page === 'daily-quiz') {
    const startButton = root.querySelector('[data-action="start-quiz"]');
    const subjects = [...new Set(PrepData.quizQuestions.map(item => item.subject))].sort();
    startButton?.insertAdjacentHTML('beforebegin', `<div class="quiz-selectors"><label>Focus subject<select id="daily-quiz-subject"><option value="all">All subjects</option>${subjects.map(subject => `<option>${escape(subject)}</option>`).join('')}</select></label><label>Exam track<select id="daily-quiz-exam"><option value="all">All tracks</option>${PrepData.exams.map(item => `<option value="${escape(item.name)}">${escape(item.name)}</option>`).join('')}</select></label></div>`);
  }
  if (page === 'dashboard') {
    root.querySelector('.dashboard-preview')?.insertAdjacentHTML('afterend', '<section class="page-test-history"><div class="section-heading"><div><span class="eyebrow">RECENT PRACTICE</span><h2>Test <em>history.</em></h2></div><a class="arrow-link" href="mock-tests.html">Practice again ↗</a></div><div id="page-test-history-list" class="history-list"></div></section>');
    const weekDays = [['MON', 'Polity + PYQ', '75 min'], ['TUE', 'Quantitative aptitude', '60 min'], ['WED', 'History + revision', '70 min'], ['THU', 'Reasoning practice', '60 min'], ['FRI', 'Current affairs review', '45 min'], ['SAT', 'Full mock + analysis', '90 min'], ['SUN', 'Light revision', '40 min']];
    const weeklyPlan = `<section class="weekly-plan"><div class="section-heading"><div><span class="eyebrow">A BALANCED WEEK</span><h2>Your weekly <em>rhythm.</em></h2></div></div><div class="weekly-grid">${weekDays.map(day => `<article><small>${day[0]}</small><b>${day[1]}</b><span>${day[2]}</span></article>`).join('')}</div></section>`;
    root.querySelector('.page-planner')?.insertAdjacentHTML('afterend', weeklyPlan);
  }

  const pageTestGrid = document.querySelector('#page-test-grid');
  const pageMaterialGrid = document.querySelector('#page-material-grid');
  const pagePyqList = document.querySelector('#page-pyq-list');
  const pageJobsGrid = document.querySelector('#page-jobs-grid');
  const pageAffairsGrid = document.querySelector('#page-affairs-grid');
  let affairPeriod = 'daily';
  if (pageAffairsGrid) pageAffairsGrid.insertAdjacentHTML('beforebegin', '<div class="affairs-period-row" role="group" aria-label="Current affairs period"><button class="filter-chip is-active" data-affair-period="daily">Daily</button><button class="filter-chip" data-affair-period="weekly">Weekly</button><button class="filter-chip" data-affair-period="monthly">Monthly</button></div>');
  const pagePyqToolbar = document.querySelector('#page-pyq-exam')?.parentElement;
  if (pagePyqToolbar && !document.querySelector('#page-pyq-year')) pagePyqToolbar.insertAdjacentHTML('beforeend', '<select id="page-pyq-year" aria-label="Filter by year"><option value="all">All years</option></select><select id="page-pyq-topic" aria-label="Filter by topic"><option value="all">All topics</option></select>');
  const pagePyqYear = document.querySelector('#page-pyq-year');
  if (pagePyqYear) pagePyqYear.innerHTML = '<option value="all">All years</option>' + [...new Set(PrepData.pyq.map(item => item.year))].sort((a, b) => b - a).map(year => `<option>${escape(year)}</option>`).join('');
  const pagePyqTopic = document.querySelector('#page-pyq-topic');
  if (pagePyqTopic) pagePyqTopic.innerHTML = '<option value="all">All topics</option>' + [...new Set(PrepData.pyq.map(item => item.topic))].sort().map(topic => `<option>${escape(topic)}</option>`).join('');
  const renderPagePyq = () => {
    const examFilter = document.querySelector('#page-pyq-exam')?.value || 'all';
    const yearFilter = document.querySelector('#page-pyq-year')?.value || 'all';
    const subjectFilter = document.querySelector('#page-pyq-subject')?.value || 'all';
    const topicFilter = document.querySelector('#page-pyq-topic')?.value || 'all';
    const difficultyFilter = document.querySelector('#page-pyq-difficulty')?.value || 'all';
    const selected = PrepData.pyq.filter(item => (examFilter === 'all' || item.exam === examFilter) && (yearFilter === 'all' || item.year === yearFilter) && (subjectFilter === 'all' || item.subject === subjectFilter) && (topicFilter === 'all' || item.topic === topicFilter) && (difficultyFilter === 'all' || item.difficulty === difficultyFilter));
    pagePyqList.innerHTML = selected.length ? selected.map(pyqCard).join('') : '<div class="empty-state">No questions match those filters.</div>';
  };
  const renderPageAffairs = category => {
    if (!pageAffairsGrid) return;
    const categorized = category === 'all' ? PrepData.affairs : PrepData.affairs.filter(item => item.category.toLowerCase().includes(category) || (category === 'national' && item.category === 'GOVERNMENT SCHEMES'));
    const selected = categorized.slice(0, affairPeriod === 'daily' ? 3 : affairPeriod === 'weekly' ? 7 : categorized.length);
    pageAffairsGrid.innerHTML = selected.length ? selected.map(item => {
      const index = PrepData.affairs.indexOf(item);
      return `<article class="page-affair-card"><span class="category-label">${escape(item.category)}</span><h2>${escape(affairTitle(item))}</h2><p>${escape(affairSummary(item))}</p><button class="arrow-link" data-read-affair="${index}">Read more <span>↗</span></button></article>`;
    }).join('') : '<div class="empty-state">More sample briefings in this topic will appear here.</div>';
  };
  const renderSavedItems = () => {
    const progress = PrepApp.getProgress();
    const savedMaterials = PrepData.materials.filter(item => (progress.materials || []).includes(item.id));
    const savedQuestions = PrepData.pyq.filter(item => (progress.questions || []).includes(item.id));
    const items = [...savedMaterials.map(item => `<article class="saved-item"><span class="material-icon">${escape(item.icon)}</span><div><b>${escape(item.title)}</b><small>Study material</small><button data-material-preview="${escape(item.id)}">Open resource →</button></div></article>`), ...savedQuestions.map(item => `<article class="saved-item"><span class="material-icon">♡</span><div><b>${escape(item.question)}</b><small>${escape(item.exam)} · ${escape(item.year)}</small><a href="previous-papers.html">Open question bank →</a></div></article>`)];
    const savedCount = document.querySelector('#page-saved-count');
    const savedItems = document.querySelector('#page-saved-items');
    if (savedCount) savedCount.textContent = String(savedMaterials.length + savedQuestions.length);
    if (savedItems) savedItems.innerHTML = items.length ? items.join('') : '<p>Questions and study materials you bookmark will be collected here.</p>';
  };
  const renderTestHistory = () => {
    const host = document.querySelector('#page-test-history-list');
    if (!host) return;
    const history = PrepApp.getProgress().testHistory || [];
    host.innerHTML = history.length ? history.slice(0, 5).map(test => `<article class="history-row"><div><b>${escape(test.title)}</b><small>${new Date(test.date).toLocaleDateString()} · ${test.accuracy}% accuracy</small></div><strong>${test.score}/${test.total}</strong></article>`).join('') : '<p class="empty-state">Your completed mock tests will appear here.</p>';
  };

  document.addEventListener('input', event => {
    if (event.target.matches('#page-material-search')) {
      const query = event.target.value.toLowerCase();
      const examFilter = document.querySelector('#page-material-filter')?.value || 'all';
      const selected = PrepData.materials.filter(item => `${item.title} ${item.topics} ${item.subject}`.toLowerCase().includes(query) && (examFilter === 'all' || item.exam === examFilter || item.exam === 'All exams'));
      pageMaterialGrid.innerHTML = selected.length ? selected.map(materialCard).join('') : '<div class="empty-state">No materials match your search.</div>';
    }
  });
  document.addEventListener('change', event => {
    if (event.target.matches('#page-material-filter')) {
      const query = document.querySelector('#page-material-search').value.toLowerCase();
      const selected = PrepData.materials.filter(item => `${item.title} ${item.topics} ${item.subject}`.toLowerCase().includes(query) && (event.target.value === 'all' || item.exam === event.target.value || item.exam === 'All exams'));
      pageMaterialGrid.innerHTML = selected.length ? selected.map(materialCard).join('') : '<div class="empty-state">No materials match your filters.</div>';
    }
    if (event.target.matches('#page-pyq-exam, #page-pyq-year, #page-pyq-subject, #page-pyq-topic, #page-pyq-difficulty')) renderPagePyq();
  });
  document.addEventListener('click', event => {
    const testFilter = event.target.closest('[data-page-test-filter]');
    if (testFilter && pageTestGrid) {
      document.querySelectorAll('[data-page-test-filter]').forEach(button => button.classList.toggle('is-active', button === testFilter));
      const filter = testFilter.dataset.pageTestFilter;
      const tests = PrepData.tests.filter(item => filter === 'all' || item.type === filter || (filter === 'Free' && item.free) || (filter === 'recent' && item.recent));
      pageTestGrid.innerHTML = tests.length ? tests.map(testCard).join('') : '<div class="empty-state">No tests in this category yet.</div>';
    }
    const jobFilter = event.target.closest('[data-page-job-filter]');
    if (jobFilter && pageJobsGrid) {
      document.querySelectorAll('[data-page-job-filter]').forEach(button => button.classList.toggle('is-active', button === jobFilter));
      const filter = jobFilter.dataset.pageJobFilter;
      pageJobsGrid.innerHTML = PrepData.jobs.filter(item => filter === 'all' || item.exam === filter).map(jobCard).join('');
    }
    const affairFilter = event.target.closest('[data-affair-category]');
    if (affairFilter && pageAffairsGrid) {
      const category = affairFilter.dataset.affairCategory.toLowerCase();
      renderPageAffairs(category);
      document.querySelectorAll('[data-affair-category]').forEach(button => button.classList.toggle('is-active', button === affairFilter));
    }
    const periodFilter = event.target.closest('[data-affair-period]');
    if (periodFilter) {
      affairPeriod = periodFilter.dataset.affairPeriod;
      document.querySelectorAll('[data-affair-period]').forEach(button => button.classList.toggle('is-active', button === periodFilter));
      const activeCategory = document.querySelector('[data-affair-category].is-active')?.dataset.affairCategory || 'all';
      renderPageAffairs(activeCategory.toLowerCase());
    }
    const read = event.target.closest('[data-read-affair]');
    if (read) {
      const item = PrepData.affairs[Number(read.dataset.readAffair)];
      PrepApp.setDialog(`<span class="eyebrow">${escape(item.category)} · DAILY EXPLAINER</span><h2>${escape(affairTitle(item))}</h2><p>${escape(affairSummary(item))}</p><div class="resource-preview"><div><strong>Connect the headline to your syllabus</strong><p>Identify the institution, the policy context and the likely exam topic. Add one concise note to your weekly revision list.</p><small>Sample explainer · Verify current facts with trusted official sources.</small></div></div>`);
    }
  });
  window.addEventListener('northstar:language', () => {
    const activeCategory = document.querySelector('[data-affair-category].is-active')?.dataset.affairCategory || 'all';
    renderPageAffairs(activeCategory.toLowerCase());
  });
  renderPageAffairs('all');
  window.addEventListener('northstar:bookmarks', () => {
    if (pageMaterialGrid) {
      const query = document.querySelector('#page-material-search').value.toLowerCase();
      const filter = document.querySelector('#page-material-filter').value;
      const selected = PrepData.materials.filter(item => `${item.title} ${item.topics} ${item.subject}`.toLowerCase().includes(query) && (filter === 'all' || item.exam === filter || item.exam === 'All exams'));
      pageMaterialGrid.innerHTML = selected.map(materialCard).join('');
    }
    if (pagePyqList) renderPagePyq();
    renderSavedItems();
  });
  window.addEventListener('northstar:progress', renderTestHistory);

  const settings = (() => { try { return JSON.parse(localStorage.getItem('northstar-prep-progress-v1')) || {}; } catch { return {}; } })();
  const attempts = document.querySelector('#page-quiz-attempts');
  const history = document.querySelector('#page-quiz-history');
  const latest = document.querySelector('#dash-latest-score');
  const quizHistory = settings.quizHistory || [];
  if (attempts) attempts.textContent = String(quizHistory.length);
  if (history && quizHistory.length) history.textContent = `Latest score: ${quizHistory[0].score}/${quizHistory[0].total}. Your recent activity is saved in this browser.`;
  if (latest && settings.testHistory?.length) latest.textContent = `${settings.testHistory[0].score}/${settings.testHistory[0].total}`;
  renderSavedItems();
  renderTestHistory();
  PrepApp.renderDashboard();
})();