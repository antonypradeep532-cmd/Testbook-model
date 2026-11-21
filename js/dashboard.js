(() => {
  const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  let period = 'week';

  const renderTasks = () => {
    const host = document.querySelector('#planner-tasks');
    if (!host) return;
    const progress = PrepApp.getProgress();
    const tasks = progress.plannerTasks || PrepData.plannerTasks;
    host.innerHTML = tasks.map(task => `
      <label class="planner-task ${task.done ? 'is-done' : ''}"><input type="checkbox" data-task-toggle="${escape(task.id)}" ${task.done ? 'checked' : ''}><span>${escape(task.title)}</span><small>${escape(task.time || '20 min')}</small>${task.custom ? `<button type="button" class="task-remove" data-task-remove="${escape(task.id)}" aria-label="Remove task">×</button>` : ''}</label>
    `).join('');
    const done = tasks.filter(task => task.done).length;
    const counter = document.querySelector('#planner-complete');
    if (counter) counter.textContent = `${done} of ${tasks.length} complete`;
  };

  const renderLeaderboard = () => {
    const host = document.querySelector('#leaderboard-table');
    if (!host) return;
    host.innerHTML = PrepData.leaders[period].map((student, index) => `
      <div class="leader-row"><span class="leader-rank">${String(index + 1).padStart(2, '0')}</span><span class="leader-student"><i>${escape(student.initials)}</i>${escape(student.name)}</span><span class="leader-points">${student.points.toLocaleString()} pts</span><span class="leader-badge">${escape(student.badge)}</span></div>
    `).join('');
  };

  const addTask = () => {
    PrepApp.setDialog(`
      <span class="eyebrow">TODAY'S STUDY PLAN</span><h2>Add a task</h2>
      <form class="task-form"><label for="task-title">What would you like to work on?</label><input id="task-title" name="title" maxlength="72" required placeholder="e.g. Revise Indian geography"><label for="task-time">Time target</label><select id="task-time" name="time"><option>15 min</option><option>20 min</option><option>30 min</option><option>45 min</option><option>60 min</option></select><button class="button button-primary" type="submit">Add to today's plan →</button></form>
    `);
  };

  const renderDashboard = () => {
    const progress = PrepApp.getProgress();
    const tests = progress.testHistory || [];
    const quizHistory = progress.quizHistory || [];
    const testCount = document.querySelector('#dash-tests');
    const accuracy = document.querySelector('#dash-accuracy');
    const streak = document.querySelector('#dash-streak');
    const quizStreak = document.querySelector('#quiz-streak');
    if (testCount) testCount.textContent = String(12 + tests.length);
    if (accuracy && tests.length) accuracy.textContent = `${Math.round(tests.reduce((sum, item) => sum + item.accuracy, 0) / tests.length)}%`;
    if (streak) {
      const days = progress.quizStreak || 6;
      streak.textContent = `${days} ${days === 1 ? 'day' : 'days'}`;
    }
    if (quizStreak) quizStreak.textContent = `${progress.quizStreak || 0} ${progress.quizStreak === 1 ? 'day' : 'days'}`;
    const countdown = document.querySelector('#countdown-days');
    if (countdown) {
      const remaining = Math.max(0, Math.ceil((new Date('2027-05-18T00:00:00') - new Date()) / 86400000));
      countdown.textContent = `${remaining} days`;
    }
    const quizCount = document.querySelector('#quiz-count');
    if (quizCount) quizCount.textContent = String(quizHistory.length);
    renderTasks();
    renderLeaderboard();
  };

  document.addEventListener('change', event => {
    if (!event.target.matches('[data-task-toggle]')) return;
    const progress = PrepApp.getProgress();
    const tasks = progress.plannerTasks || PrepData.plannerTasks;
    const task = tasks.find(item => item.id === event.target.dataset.taskToggle);
    if (task) task.done = event.target.checked;
    progress.plannerTasks = tasks;
    PrepApp.saveProgress(progress);
    renderTasks();
  });

  document.addEventListener('click', event => {
    const rank = event.target.closest('[data-rank-period]');
    if (rank) {
      period = rank.dataset.rankPeriod;
      document.querySelectorAll('[data-rank-period]').forEach(button => button.classList.toggle('is-active', button === rank));
      renderLeaderboard();
    }
    if (event.target.closest('[data-action="add-task"]')) addTask();
    if (event.target.closest('[data-action="reset-plan"]')) {
      const progress = PrepApp.getProgress();
      progress.plannerTasks = [...PrepData.plannerTasks];
      PrepApp.saveProgress(progress);
      renderTasks();
      PrepApp.notify('Today’s plan is reset.');
    }
    const remove = event.target.closest('[data-task-remove]');
    if (remove) {
      const progress = PrepApp.getProgress();
      progress.plannerTasks = (progress.plannerTasks || PrepData.plannerTasks).filter(task => task.id !== remove.dataset.taskRemove);
      PrepApp.saveProgress(progress);
      renderTasks();
    }
  });

  document.addEventListener('submit', event => {
    if (!event.target.matches('.task-form')) return;
    event.preventDefault();
    const formData = new FormData(event.target);
    const title = String(formData.get('title') || '').trim();
    if (!title) return;
    const progress = PrepApp.getProgress();
    const tasks = progress.plannerTasks || PrepData.plannerTasks;
    tasks.push({ id: `custom-${Date.now()}`, title, time: formData.get('time'), done: false, custom: true });
    progress.plannerTasks = tasks;
    PrepApp.saveProgress(progress);
    PrepApp.closeDialog();
    renderTasks();
    PrepApp.notify('Task added to your study plan.');
  });

  window.PrepDashboard = { render: renderDashboard, addTask };
})();