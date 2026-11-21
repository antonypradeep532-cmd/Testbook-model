(() => {
  let questions = [];
  let current = 0;
  let answers = [];
  let startedAt = 0;

  const isTamil = () => document.documentElement.dataset.language === 'ta';
  const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

  const render = () => {
    const item = questions[current];
    const tamil = isTamil();
    const selected = answers[current];
    const options = tamil ? item.taOptions : item.options;
    const explanation = selected === undefined ? '' : `<div class="answer-explanation"><strong>${selected === item.answer ? (tamil ? 'சரியான பதில்' : 'Correct answer') : (tamil ? 'சரியான பதில்' : 'Correct answer')}: ${escape(options[item.answer])}</strong><br>${escape(tamil ? item.taExplanation : item.explanation)}</div>`;
    const progress = Math.round(((current + 1) / questions.length) * 100);
    PrepApp.setDialog(`
      <span class="eyebrow">${tamil ? 'தினசரி சவால்' : 'DAILY 10-QUESTION CHALLENGE'}</span>
      <h2>${tamil ? 'இன்றைய வினாடி வினா' : 'A little sharper today.'}</h2>
      <div class="quiz-progress-line"><span>${tamil ? 'கேள்வி' : 'Question'} ${current + 1} ${tamil ? ' / ' : 'of '}${questions.length}</span><b>${progress}%</b></div>
      <div class="progress-track"><span style="width:${progress}%"></span></div>
      <p class="quiz-subject">${escape(item.subject)}</p>
      <p class="dialog-question">${escape(tamil ? item.ta : item.question)}</p>
      <div class="dialog-options">${options.map((option, index) => {
        const state = selected === undefined ? '' : index === item.answer ? ' is-correct' : index === selected ? ' is-wrong' : '';
        return `<button class="dialog-option${state}" data-quiz-answer="${index}" ${selected !== undefined ? 'disabled' : ''}><span>${String.fromCharCode(65 + index)}.</span>${escape(option)}</button>`;
      }).join('')}</div>
      ${explanation}
      <div class="dialog-footer"><span class="timer">${answers.filter(answer => answer !== undefined).length} / ${questions.length} answered</span><button class="button button-primary" data-quiz-next>${current === questions.length - 1 ? (tamil ? 'முடிக்கவும்' : 'Finish quiz') : (tamil ? 'அடுத்த கேள்வி' : 'Next question')} →</button></div>
    `);
  };

  const finish = () => {
    const correct = answers.filter((answer, index) => answer === questions[index].answer).length;
    const duration = Math.max(1, Math.round((Date.now() - startedAt) / 60000));
    const progress = PrepApp.getProgress();
    const today = new Date().toISOString().slice(0, 10);
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    progress.quizHistory = [{ score: correct, total: questions.length, date: new Date().toISOString() }, ...(progress.quizHistory || [])].slice(0, 20);
    progress.quizStreak = progress.lastQuizDate === today ? (progress.quizStreak || 1) : progress.lastQuizDate === yesterday ? (progress.quizStreak || 0) + 1 : 1;
    progress.lastQuizDate = today;
    PrepApp.saveProgress(progress);
    PrepApp.renderDashboard();
    PrepApp.setDialog(`
      <span class="eyebrow">${isTamil() ? 'சவால் முடிந்தது' : 'CHALLENGE COMPLETE'}</span>
      <h2>${isTamil() ? 'இன்றைய முயற்சி முடிந்தது.' : 'You showed up today.'}</h2>
      <p>${isTamil() ? 'தினமும் சிறிய முயற்சி பெரிய முன்னேற்றத்தை உருவாக்கும்.' : 'A little practice each day makes a real difference.'}</p>
      <div class="modal-score"><div><strong>${correct}/${questions.length}</strong><small>Correct answers</small></div><div><strong>${Math.round(correct / questions.length * 100)}%</strong><small>Accuracy</small></div><div><strong>${duration} min</strong><small>Time spent</small></div></div>
      <p>${correct >= 8 ? 'Strong work. Read the explanations once more to make the learning stick.' : 'Review the explanations, then give yourself another try tomorrow.'}</p>
      <div class="dialog-footer"><button class="text-button" data-share-score="${correct}">Share score ↗</button><button class="button button-primary" data-action="retry-quiz">Try again</button></div>
    `);
  };

  document.addEventListener('click', event => {
    const answer = event.target.closest('[data-quiz-answer]');
    if (answer && questions[current]) {
      answers[current] = Number(answer.dataset.quizAnswer);
      render();
      return;
    }
    if (event.target.closest('[data-quiz-next]')) {
      if (answers[current] === undefined) {
        PrepApp.notify(isTamil() ? 'தொடர்வதற்கு முன் ஒரு பதிலைத் தேர்ந்தெடுக்கவும்.' : 'Choose an answer before continuing.');
        return;
      }
      if (current < questions.length - 1) {
        current += 1;
        render();
      } else finish();
    }
    if (event.target.closest('[data-action="retry-quiz"]')) window.PrepQuiz.start();
  });

  window.PrepQuiz = {
    start() {
      const subject = document.querySelector('#daily-quiz-subject')?.value || 'all';
      const exam = document.querySelector('#daily-quiz-exam')?.value || 'all';
      questions = PrepData.quizQuestions.filter(item => (subject === 'all' || item.subject === subject) && (exam === 'all' || item.exam === exam));
      if (!questions.length) questions = [...PrepData.quizQuestions];
      questions = questions.map(item => ({ item, sortKey: Math.random() })).sort((left, right) => left.sortKey - right.sortKey).map(entry => entry.item);
      current = 0;
      answers = Array(questions.length);
      startedAt = Date.now();
      render();
    }
  };
})();