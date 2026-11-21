(() => {
  const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

  const render = () => {
    const grid = document.querySelector('#material-grid');
    if (!grid) return;
    const query = document.querySelector('#material-search')?.value.trim().toLowerCase() || '';
    const subject = document.querySelector('#material-subject')?.value || 'all';
    const exam = document.querySelector('#material-exam')?.value || 'all';
    const filtered = PrepData.materials.filter(item => {
      const matchesQuery = `${item.title} ${item.subject} ${item.topics}`.toLowerCase().includes(query);
      const matchesSubject = subject === 'all' || item.subject === subject;
      const matchesExam = exam === 'all' || item.exam === exam || item.exam === 'All exams';
      return matchesQuery && matchesSubject && matchesExam;
    });
    const bookmarks = PrepApp.getProgress().materials || [];
    grid.innerHTML = filtered.length ? filtered.map(item => `
      <article class="material-card"><span class="material-icon">${escape(item.icon)}</span><div><h3>${escape(item.title)}</h3><p>${escape(item.topics)}</p><button data-material-preview="${escape(item.id)}">Preview notes</button><button class="material-bookmark ${bookmarks.includes(item.id) ? 'is-saved' : ''}" data-material-bookmark="${escape(item.id)}" aria-label="${bookmarks.includes(item.id) ? 'Remove bookmark' : 'Bookmark'} ${escape(item.title)}">${bookmarks.includes(item.id) ? '♥ Saved' : '♡ Save'}</button></div></article>
    `).join('') : '<div class="empty-state">No materials match those filters. Try another subject or exam.</div>';
  };

  const pdfSafe = text => text.replace(/[^\x20-\x7E]/g, '?').replace(/[\\()]/g, char => `\\${char}`);

  const makePdf = item => {
    const noteLines = [
      'TNPSC_TAMILQUIZ - SAMPLE STUDY NOTES',
      '',
      item.title,
      `Topics: ${item.topics}`,
      `Exam track: ${item.exam}`,
      '',
      'This is a placeholder study resource for the frontend demonstration.',
      'Replace with reviewed, exam-aligned content before production use.',
      '',
      'Suggested revision prompts:',
      `1. Write down three key ideas from ${item.subject}.`,
      '2. Connect each idea to one previous-year question.',
      '3. Revisit this topic in your weekly revision plan.'
    ];
    let stream = 'BT\n/F1 15 Tf\n48 790 Td\n';
    noteLines.forEach((line, index) => {
      if (index > 0) stream += '0 -23 Td\n';
      stream += `(${pdfSafe(line)}) Tj\n`;
      if (index === 0) stream += '/F1 10 Tf\n';
    });
    stream += 'ET';
    const objects = [
      '<< /Type /Catalog /Pages 2 0 R >>',
      '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
      '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
      '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
      `<< /Length ${new TextEncoder().encode(stream).length} >>\nstream\n${stream}\nendstream`
    ];
    let pdf = '%PDF-1.4\n';
    const offsets = [0];
    objects.forEach((object, index) => {
      offsets.push(new TextEncoder().encode(pdf).length);
      pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
    });
    const xrefOffset = new TextEncoder().encode(pdf).length;
    pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
    offsets.slice(1).forEach(offset => { pdf += `${String(offset).padStart(10, '0')} 00000 n \n`; });
    pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
    return new Blob([pdf], { type: 'application/pdf' });
  };

  const preview = id => {
    const item = PrepData.materials.find(material => material.id === id);
    if (!item) return;
    PrepApp.setDialog(`
      <span class="eyebrow">SAMPLE RESOURCE · ${escape(item.exam)}</span><h2>${escape(item.title)}</h2>
      <p>${escape(item.topics)} · A starter outline to help you organize your revision.</p>
      <div class="resource-preview"><div><strong>${escape(item.title)}</strong><span>Revision outline</span><p>Key concepts · exam connections · spaced revision</p><small>Demonstration content. Replace with reviewed materials before production.</small></div></div>
      <div class="dialog-footer"><button class="text-button" data-material-bookmark="${escape(item.id)}">♡ Save resource</button><button class="button button-primary" data-material-download="${escape(item.id)}">Download sample PDF ↓</button></div>
    `);
  };

  document.querySelector('#material-search')?.addEventListener('input', render);
  document.querySelector('#material-subject')?.addEventListener('change', render);
  document.querySelector('#material-exam')?.addEventListener('change', render);
  document.addEventListener('click', event => {
    const previewButton = event.target.closest('[data-material-preview]');
    const bookmarkButton = event.target.closest('[data-material-bookmark]');
    const downloadButton = event.target.closest('[data-material-download]');
    if (previewButton) preview(previewButton.dataset.materialPreview);
    if (bookmarkButton) {
      const progress = PrepApp.getProgress();
      const saved = new Set(progress.materials || []);
      saved.has(bookmarkButton.dataset.materialBookmark) ? saved.delete(bookmarkButton.dataset.materialBookmark) : saved.add(bookmarkButton.dataset.materialBookmark);
      progress.materials = [...saved];
      PrepApp.saveProgress(progress);
      render();
      window.dispatchEvent(new CustomEvent('northstar:bookmarks'));
      PrepApp.notify(saved.has(bookmarkButton.dataset.materialBookmark) ? 'Study material saved to your bookmarks.' : 'Study material removed from bookmarks.');
    }
    if (downloadButton) {
      const item = PrepData.materials.find(material => material.id === downloadButton.dataset.materialDownload);
      if (!item) return;
      const url = URL.createObjectURL(makePdf(item));
      const link = document.createElement('a');
      link.href = url;
      link.download = `${item.id}-sample-notes.pdf`;
      document.body.append(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      PrepApp.notify('Sample PDF downloaded. Replace this placeholder with reviewed study content.');
    }
  });

  window.PrepMaterials = { render, preview };
})();