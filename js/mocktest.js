(() => {
  let test = null;
  let questions = [];
  let answers = [];
  let reviewed = [];
  let current = 0;
  let secondsLeft = 0;
  let timerId = null;
  let negativeMark = 0.25;

  const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const stopTimer = () => {
    window.clearInterval(timerId);
    timerId = null;
  };
  const formatTime = seconds => `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

  const renderQuestion = () => {
    const item = questions[current];
    const isReviewed = reviewed.includes(current);
    const isAnswered = answers[current] !== undefined;
    PrepApp.setDialog(`
      <span class="eyebrow">${escape(test.exam)} · ${escape(test.title)}</span>
      <div class="mock-topline"><h2>Question ${current + 1} of ${questions.length}</h2><span class="timer" data-mock-timer>${formatTime(secondsLeft)}</span></div>
      <div class="mock-progress"><span style="width:${Math.round(((current + 1) / questions.length) * 100)}%"></span></div>
      <p class="dialog-question">${escape(item.question)}</p>
      <div class="dialog-options">${item.options.map((option, index) => `<button class="dialog-option${answers[current] === index ? ' is-selected' : ''}" data-mock-answer="${index}"><span>${String.fromCharCode(65 + index)}.</span>${escape(option)}</button>`).join('')}</div>
      <div class="question-palette" aria-label="Question navigation">${questions.map((_, index) => `<button class="${index === current ? 'is-current ' : ''}${answers[index] !== undefined ? 'is-answered ' : ''}${reviewed.includes(index) ? 'is-reviewed' : ''}" data-mock-question="${index}" aria-label="Question ${index + 1}">${index + 1}</button>`).join('')}</div>
      <div class="dialog-footer mock-controls"><button class="text-button review-toggle" data-mock-review>${isReviewed ? '★ Marked for review' : '☆ Mark for review'}</button><button class="text-button" data-mock-clear>Clear response</button><button class="button button-primary" data-mock-next>${current === questions.length - 1 ? 'Save & review' : 'Save & next'} →</button></div>
      <div class="mock-submit-line"><span>${answers.filter(answer => answer !== undefined).length} answered · ${reviewed.length} marked for review · −${negativeMark} per wrong answer</span><button class="text-button" data-mock-submit>Submit test</button></div>
    `);
    const timer = document.querySelector('[data-mock-timer]');
    if (timer) timer.textContent = formatTime(secondsLeft);
  };

  const showResults = () => {
    stopTimer();
    const correct = answers.filter((answer, index) => answer === questions[index].answer).length;
    const wrong = answers.filter((answer, index) => answer !== undefined && answer !== questions[index].answer).length;
    const skipped = questions.length - correct - wrong;
    const score = Math.max(0, correct - wrong * negativeMark);
    const accuracy = answers.filter(answer => answer !== undefined).length ? Math.round(correct / answers.filter(answer => answer !== undefined).length * 100) : 0;
    const progress = PrepApp.getProgress();
    progress.testHistory = [{ title: test.title, score, total: questions.length, accuracy, date: new Date().toISOString() }, ...(progress.testHistory || [])].slice(0, 20);
    PrepApp.saveProgress(progress);
    PrepApp.renderDashboard();
    PrepApp.setDialog(`
      <span class="eyebrow">TEST REPORT · ${escape(test.exam)}</span><h2>Your review starts here.</h2>
      <div class="modal-score"><div><strong>${score.toFixed(score % 1 ? 2 : 0)}/${questions.length}</strong><small>Net score</small></div><div><strong>${accuracy}%</strong><small>Accuracy</small></div><div><strong>${correct} / ${wrong} / ${skipped}</strong><small>Correct / wrong / skipped</small></div></div>
      <p>Negative marking: −${negativeMark} per incorrect response. Read each explanation to strengthen recall.</p>
      <div class="review-analysis">${questions.map((item, index) => {
        const answer = answers[index];
        const correctAnswer = answer === item.answer;
        return `<article class="analysis-item"><div><b class="analysis-status ${answer === undefined ? 'is-skipped' : correctAnswer ? 'is-correct' : 'is-wrong'}">${answer === undefined ? 'Skipped' : correctAnswer ? 'Correct' : 'Review'}</b><strong>Q${index + 1}. ${escape(item.question)}</strong></div><p>Your answer: ${answer === undefined ? 'No answer' : escape(item.options[answer])} · Correct: ${escape(item.options[item.answer])}</p><small>${escape(item.explanation)}</small></article>`;
      }).join('')}</div>
      <div class="dialog-footer"><button class="text-button" data-action="close-results">Close report</button><button class="button button-primary" data-action="retry-mock">Retake test</button></div>
    `);
  };

  const askSubmit = () => {
    const button = document.querySelector('[data-mock-submit]');
    if (!button) return;
    if (button.dataset.confirm === 'true') {
      showResults();
      return;
    }
    button.dataset.confirm = 'true';
    button.textContent = 'Confirm submission?';
    PrepApp.notify('Submit your test now, or continue reviewing your answers.');
  };

  const begin = () => {
    answers = Array(questions.length);
    reviewed = [];
    current = 0;
    secondsLeft = test.duration * 60;
    renderQuestion();
    stopTimer();
    timerId = window.setInterval(() => {
      secondsLeft -= 1;
      const timer = document.querySelector('[data-mock-timer]');
      if (timer) timer.textContent = formatTime(secondsLeft);
      if (secondsLeft <= 0) {
        PrepApp.notify('Time is up. Your test has been submitted.');
        showResults();
      }
    }, 1000);
  };

  document.addEventListener('click', event => {
    const answer = event.target.closest('[data-mock-answer]');
    if (answer) {
      answers[current] = Number(answer.dataset.mockAnswer);
      renderQuestion();
      return;
    }
    const nav = event.target.closest('[data-mock-question]');
    if (nav) {
      current = Number(nav.dataset.mockQuestion);
      renderQuestion();
      return;
    }
    if (event.target.closest('[data-mock-review]')) {
      reviewed = reviewed.includes(current) ? reviewed.filter(index => index !== current) : [...reviewed, current];
      renderQuestion();
      return;
    }
    if (event.target.closest('[data-mock-clear]')) {
      answers[current] = undefined;
      renderQuestion();
      return;
    }
    if (event.target.closest('[data-mock-next]')) {
      current = Math.min(current + 1, questions.length - 1);
      renderQuestion();
      return;
    }
    if (event.target.closest('[data-mock-submit]')) askSubmit();
    if (event.target.closest('[data-action="begin-mock"]')) begin();
    if (event.target.closest('[data-action="retry-mock"]')) window.PrepMock.start(test);
    if (event.target.closest('[data-action="close-results"]')) PrepApp.closeDialog();
  });

  document.addEventListener('change', event => {
    if (event.target.matches('#negative-mark-setting')) negativeMark = Number(event.target.value);
  });

  window.PrepMock = {
    start(testInfo) {
      test = testInfo || PrepData.tests[0];
      questions = PrepData.quizQuestions.slice(0, test.questions);
      negativeMark = 0.25;
      PrepApp.setDialog(`
        <span class="eyebrow">${escape(test.exam)} · PRACTICE SESSION</span><h2>${escape(test.title)}</h2>
        <p>${test.questions} questions · ${test.duration} minutes · ${escape(test.level)}. This practice set is sample content for demonstration.</p>
        <label class="setting-label" for="negative-mark-setting">Incorrect answer penalty</label>
        <select id="negative-mark-setting" class="setting-select"><option value="0">No negative marking</option><option value="0.25" selected>−0.25 per incorrect answer</option><option value="0.33">−0.33 per incorrect answer</option></select>
        <p class="setting-note">The timer begins when you start. Answers are saved as you move between questions.</p>
        <button class="button button-primary" data-action="begin-mock">Start test <span>→</span></button>
      `);
    }
  };
})();