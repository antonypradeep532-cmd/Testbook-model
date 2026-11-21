window.PrepData = {
  exams: [
    { id: 'tnpsc', name: 'TNPSC', icon: 'த', subtitle: 'Tamil Nadu Public Service Commission', description: 'Build your state-service preparation with focused practice and Tamil-first resources.', exams: ['Group 1', 'Group 2', 'Group 2A', 'Group 4', 'VAO'], href: 'pages/tnpsc.html', theme: 'tnpsc' },
    { id: 'ssc', name: 'SSC', icon: '▤', subtitle: 'Staff Selection Commission', description: 'Structured practice for central government recruitment examinations.', exams: ['SSC CGL', 'SSC CHSL', 'SSC MTS', 'SSC GD', 'SSC CPO'], href: 'pages/ssc.html', theme: 'ssc' },
    { id: 'railway', name: 'Railway', icon: '↗', subtitle: 'Railway Recruitment Boards', description: 'Prepare for technical and non-technical railway opportunities.', exams: ['RRB NTPC', 'RRB Group D', 'RRB ALP', 'RRB JE', 'RRB Technician'], href: 'pages/railway.html', theme: 'railway' },
    { id: 'banking', name: 'Banking', icon: '⌂', subtitle: 'Public Sector Banking', description: 'Sharpen aptitude and awareness for a career in banking.', exams: ['IBPS PO', 'IBPS Clerk', 'SBI PO', 'SBI Clerk', 'RRB PO', 'RBI Grade B'], href: 'pages/banking.html', theme: 'banking' }
  ],
  tests: [
    { id: 'tnpsc-full-01', title: 'TNPSC Group II · Full Mock 01', exam: 'TNPSC', type: 'Full length', questions: 5, duration: 10, level: 'Exam pattern', free: true },
    { id: 'ssc-quant-04', title: 'SSC CGL · Quantitative Aptitude', exam: 'SSC', type: 'Subject-wise', questions: 5, duration: 8, level: 'Intermediate', free: true },
    { id: 'rrb-py-2024', title: 'RRB NTPC · Previous Year Set', exam: 'Railway', type: 'Previous year', questions: 5, duration: 10, level: '2024 pattern', free: false },
    { id: 'banking-reason-02', title: 'IBPS PO · Reasoning Practice', exam: 'Banking', type: 'Subject-wise', questions: 5, duration: 8, level: 'Intermediate', free: true },
    { id: 'tnpsc-free-02', title: 'TNPSC Group IV · Quick Practice', exam: 'TNPSC', type: 'Free', questions: 5, duration: 7, level: 'Foundation', free: true },
    { id: 'ssc-full-02', title: 'SSC CHSL · Full Mock 02', exam: 'SSC', type: 'Full length', questions: 5, duration: 10, level: 'Exam pattern', free: false },
    { id: 'tnpsc-history-01', title: 'TNPSC · Modern History Quick Set', exam: 'TNPSC', type: 'Topic-wise', questions: 5, duration: 6, level: 'Modern Indian History', free: true, recent: true }
  ],
  materials: [
    { id: 'polity', title: 'Indian Polity', subject: 'Indian Polity', exam: 'TNPSC', topics: 'Constitution · Governance', icon: '§' },
    { id: 'history', title: 'Modern Indian History', subject: 'History', exam: 'SSC', topics: '1757–1947 · Movements', icon: '◷' },
    { id: 'geography', title: 'Indian Geography', subject: 'Geography', exam: 'TNPSC', topics: 'Physical · Economic', icon: '⌖' },
    { id: 'economics', title: 'Economy Essentials', subject: 'Economics', exam: 'Banking', topics: 'Budget · RBI · Basics', icon: '↗' },
    { id: 'science', title: 'General Science', subject: 'General Science', exam: 'SSC', topics: 'Physics · Biology', icon: '✳' },
    { id: 'maths', title: 'Quantitative Aptitude', subject: 'Mathematics', exam: 'Railway', topics: 'Arithmetic · Algebra', icon: '∑' },
    { id: 'reasoning', title: 'Logical Reasoning', subject: 'Reasoning', exam: 'Banking', topics: 'Series · Puzzles', icon: '◇' },
    { id: 'tamil', title: 'Tamil Language', subject: 'Tamil', exam: 'TNPSC', topics: 'இலக்கணம் · இலக்கியம்', icon: 'அ' },
    { id: 'english', title: 'English Language', subject: 'English', exam: 'SSC', topics: 'Grammar · Vocabulary', icon: 'Aa' },
    { id: 'gk', title: 'General Knowledge', subject: 'General Knowledge', exam: 'TNPSC', topics: 'Static GK · Culture', icon: '✦' },
    { id: 'bank-awareness', title: 'Banking Awareness', subject: 'Banking Awareness', exam: 'Banking', topics: 'RBI · Financial news', icon: '₹' },
    { id: 'affairs', title: 'Current Affairs Digest', subject: 'Current Affairs', exam: 'All exams', topics: 'Daily · Weekly review', icon: '◉' }
  ],
  affairs: [
    { category: 'NATIONAL AFFAIRS', title: 'Reading a policy announcement beyond the headline', taTitle: 'தலைப்புச் செய்தியைத் தாண்டி கொள்கை அறிவிப்பைப் புரிந்துகொள்வது', summary: 'Identify the ministry, intended beneficiaries and implementation pathway.', taSummary: 'அமைச்சகம், பயனாளிகள் மற்றும் செயல்படுத்தும் முறையை அடையாளம் காணுங்கள்.', date: '31 OCT' },
    { category: 'INTERNATIONAL AFFAIRS', title: 'How multilateral forums shape cooperation', taTitle: 'பலதரப்பு அமைப்புகள் ஒத்துழைப்பை எவ்வாறு வடிவமைக்கின்றன', summary: 'A quick framework for remembering member states, purpose and outcomes.', taSummary: 'உறுப்பு நாடுகள், நோக்கம் மற்றும் முடிவுகளை நினைவில் கொள்ள ஒரு எளிய வழி.', date: '30 OCT' },
    { category: 'TAMIL NADU AFFAIRS', title: 'Connect state initiatives to their departments', taTitle: 'தமிழ்நாடு திட்டங்களை தொடர்புடைய துறைகளுடன் இணைத்துப் பாருங்கள்', summary: 'Link a state programme to its department, objective and target group.', taSummary: 'ஒரு மாநிலத் திட்டத்தை அதன் துறை, நோக்கம் மற்றும் இலக்கு குழுவுடன் இணைக்கவும்.', date: '29 OCT' },
    { category: 'ECONOMY', title: 'A quick guide to reading the Union Budget', taTitle: 'மத்திய பட்ஜெட்டை வாசிப்பதற்கான விரைவான வழிகாட்டி', summary: 'Key terms and indicators that frequently appear in competitive examinations.', taSummary: 'போட்டித் தேர்வுகளில் அடிக்கடி கேட்கப்படும் முக்கிய சொற்கள் மற்றும் குறியீடுகள்.', date: '28 OCT' },
    { category: 'SCIENCE & TECHNOLOGY', title: 'Why satellite navigation systems matter', taTitle: 'செயற்கைக்கோள் வழிகாட்டி அமைப்புகள் ஏன் முக்கியம்', summary: 'A short explainer on positioning, timing and India’s navigation capability.', taSummary: 'இருப்பிடம், நேரம் மற்றும் இந்தியாவின் வழிகாட்டித் திறன் குறித்த சிறு விளக்கம்.', date: '27 OCT' },
    { category: 'SPORTS', title: 'Use major tournaments as a revision map', taTitle: 'முக்கிய விளையாட்டுப் போட்டிகளை மீள்பார்வை வரைபடமாகப் பயன்படுத்துங்கள்', summary: 'Organize teams, venues, records and awards into compact revision notes.', taSummary: 'அணிகள், இடங்கள், சாதனைகள் மற்றும் விருதுகளைச் சுருக்கமான குறிப்புகளாக அமைக்கவும்.', date: '26 OCT' },
    { category: 'AWARDS', title: 'A simple way to remember national awards', taTitle: 'தேசிய விருதுகளை நினைவில் கொள்ள எளிய வழி', summary: 'Group awards by field and note the selection body and purpose.', taSummary: 'விருதுகளைத் துறைகளின்படி பிரித்து தேர்வுக் குழு மற்றும் நோக்கத்தைக் குறிக்கவும்.', date: '25 OCT' },
    { category: 'IMPORTANT DAYS', title: 'Turn important days into connected facts', taTitle: 'முக்கிய தினங்களை தொடர்புடைய தகவல்களுடன் நினைவில் கொள்ளுங்கள்', summary: 'Pair each date with its theme, organizing body and relevant global goal.', taSummary: 'ஒவ்வொரு தேதியையும் அதன் கருப்பொருள், ஏற்பாட்டாளர் மற்றும் உலக இலக்குடன் இணைக்கவும்.', date: '24 OCT' },
    { category: 'GOVERNMENT SCHEMES', title: 'How to revise a government scheme effectively', taTitle: 'அரசுத் திட்டங்களைச் சிறப்பாக மீள்பார்வை செய்வது எப்படி', summary: 'Connect the ministry, objective and beneficiary instead of memorising isolated facts.', taSummary: 'தனித்தனி தகவல்களை மனப்பாடம் செய்வதற்குப் பதிலாக அமைச்சகம், நோக்கம், பயனாளியை இணைக்கவும்.', date: '23 OCT' }
  ],
  pyq: [
    { id: 'pyq-01', exam: 'TNPSC Group II', year: '2024', subject: 'Indian Polity', topic: 'Fundamental Rights', difficulty: 'Easy', question: 'Which Article of the Indian Constitution guarantees equality before the law?', options: ['Article 12', 'Article 14', 'Article 19', 'Article 21'], answer: 1, explanation: 'Article 14 guarantees equality before the law and equal protection of the laws within the territory of India.' },
    { id: 'pyq-02', exam: 'SSC CGL', year: '2023', subject: 'History', topic: 'Indian National Movement', difficulty: 'Medium', question: 'The Indian National Congress was founded in which year?', options: ['1875', '1885', '1895', '1905'], answer: 1, explanation: 'The Indian National Congress was founded in 1885. Its first session was held in Bombay.' },
    { id: 'pyq-03', exam: 'RRB NTPC', year: '2022', subject: 'General Science', topic: 'Physics', difficulty: 'Easy', question: 'What is the SI unit of electric current?', options: ['Volt', 'Ohm', 'Ampere', 'Watt'], answer: 2, explanation: 'The ampere (A) is the SI base unit of electric current.' },
    { id: 'pyq-04', exam: 'IBPS PO', year: '2024', subject: 'Economics', topic: 'Banking', difficulty: 'Medium', question: 'Which institution is responsible for monetary policy in India?', options: ['SEBI', 'RBI', 'NABARD', 'SIDBI'], answer: 1, explanation: 'The Reserve Bank of India is responsible for formulating and implementing monetary policy in India.' },
    { id: 'pyq-05', exam: 'TNPSC Group IV', year: '2023', subject: 'Geography', topic: 'Indian Rivers', difficulty: 'Hard', question: 'Which river is often called the Dakshin Ganga?', options: ['Krishna', 'Kaveri', 'Godavari', 'Tungabhadra'], answer: 2, explanation: 'The Godavari is often called the Dakshin Ganga because of its length and importance in peninsular India.' }
  ],
  jobs: [
    { id: 'job-tnpsc', exam: 'TNPSC', title: 'Combined Civil Services · Sample listing', organization: 'Tamil Nadu Public Service Commission', vacancies: 'Sample: 120 posts', qualification: 'Graduate degree', deadline: 'Sample date: 30 Nov 2026', url: 'https://www.tnpsc.gov.in/' },
    { id: 'job-ssc', exam: 'SSC', title: 'Combined Graduate Level · Sample listing', organization: 'Staff Selection Commission', vacancies: 'Sample: 250 posts', qualification: 'Graduate degree', deadline: 'Sample date: 12 Dec 2026', url: 'https://ssc.gov.in/' },
    { id: 'job-railway', exam: 'Railway', title: 'Non-Technical Posts · Sample listing', organization: 'Railway Recruitment Boards', vacancies: 'Sample: 340 posts', qualification: '12th pass / Graduate', deadline: 'Sample date: 20 Dec 2026', url: 'https://indianrailways.gov.in/' },
    { id: 'job-bank', exam: 'Banking', title: 'Probationary Officer · Sample listing', organization: 'Institute of Banking Personnel Selection', vacancies: 'Sample: 180 posts', qualification: 'Graduate degree', deadline: 'Sample date: 05 Jan 2027', url: 'https://www.ibps.in/' }
  ],
  videos: [
    { title: 'Constitution basics: the framework', subject: 'INDIAN POLITY', length: '18:42', teacher: 'TNPSC_TAMILQUIZ classroom', videoId: 'M7lc1UVf-VE' },
    { title: 'Number series: spot the pattern', subject: 'REASONING', length: '24:16', teacher: 'TNPSC_TAMILQUIZ classroom', videoId: 'M7lc1UVf-VE' },
    { title: 'Current affairs: weekly revision', subject: 'WEEKLY RECAP', length: '12:08', teacher: 'TNPSC_TAMILQUIZ classroom', videoId: 'M7lc1UVf-VE' }
  ],
  quizQuestions: [
    { question: 'Which Article guarantees equality before the law?', ta: 'சட்டத்தின் முன் சமத்துவத்தை உறுதி செய்யும் அரசியலமைப்புச் சட்டப்பிரிவு எது?', options: ['Article 12', 'Article 14', 'Article 19', 'Article 21'], taOptions: ['சட்டப்பிரிவு 12', 'சட்டப்பிரிவு 14', 'சட்டப்பிரிவு 19', 'சட்டப்பிரிவு 21'], answer: 1, explanation: 'Article 14 provides equality before the law and equal protection of the laws.', taExplanation: 'சட்டப்பிரிவு 14 சட்டத்தின் முன் சமத்துவத்தையும் சட்டங்களின் சமமான பாதுகாப்பையும் வழங்குகிறது.', subject: 'Indian Polity', exam: 'TNPSC' },
    { question: 'What is the SI unit of electric current?', ta: 'மின்சாரத்தின் SI அலகு எது?', options: ['Volt', 'Ohm', 'Ampere', 'Watt'], taOptions: ['வோல்ட்', 'ஓம்', 'ஆம்பியர்', 'வாட்'], answer: 2, explanation: 'The ampere is the SI base unit of electric current.', taExplanation: 'ஆம்பியர் என்பது மின்சாரத்தின் SI அடிப்படை அலகு.', subject: 'General Science', exam: 'SSC' },
    { question: 'In which year was the Indian National Congress founded?', ta: 'இந்திய தேசிய காங்கிரஸ் எந்த ஆண்டில் தொடங்கப்பட்டது?', options: ['1875', '1885', '1895', '1905'], taOptions: ['1875', '1885', '1895', '1905'], answer: 1, explanation: 'The Indian National Congress was founded in 1885.', taExplanation: 'இந்திய தேசிய காங்கிரஸ் 1885 ஆம் ஆண்டு தொடங்கப்பட்டது.', subject: 'History', exam: 'SSC' },
    { question: 'Which institution is India’s central bank?', ta: 'இந்தியாவின் மத்திய வங்கி எது?', options: ['SEBI', 'RBI', 'NABARD', 'SBI'], taOptions: ['SEBI', 'RBI', 'NABARD', 'SBI'], answer: 1, explanation: 'The Reserve Bank of India is India’s central bank.', taExplanation: 'இந்திய ரிசர்வ் வங்கி இந்தியாவின் மத்திய வங்கியாகும்.', subject: 'Banking Awareness', exam: 'Banking' },
    { question: 'Which is the largest planet in our solar system?', ta: 'நமது சூரியக் குடும்பத்தில் மிகப்பெரிய கோள் எது?', options: ['Earth', 'Saturn', 'Jupiter', 'Neptune'], taOptions: ['பூமி', 'சனி', 'வியாழன்', 'நெப்டியூன்'], answer: 2, explanation: 'Jupiter is the largest planet in the solar system.', taExplanation: 'வியாழன் சூரியக் குடும்பத்தின் மிகப்பெரிய கோளாகும்.', subject: 'General Science', exam: 'Railway' },
    { question: 'The Godavari is also known by which name?', ta: 'கோதாவரி ஆறு வேறு எந்தப் பெயரால் அழைக்கப்படுகிறது?', options: ['Uttar Ganga', 'Dakshin Ganga', 'Saptakoshi', 'Vriddha Ganga'], taOptions: ['உத்தர கங்கை', 'தட்சிண கங்கை', 'சப்தகோசி', 'விருத்த கங்கை'], answer: 1, explanation: 'The Godavari is often called Dakshin Ganga, or the Ganga of the South.', taExplanation: 'கோதாவரி தட்சிண கங்கை அல்லது தெற்கின் கங்கை என்று அழைக்கப்படுகிறது.', subject: 'Geography', exam: 'TNPSC' },
    { question: 'What does GDP measure?', ta: 'GDP எதை அளவிடுகிறது?', options: ['Government debt', 'Total exports', 'Value of final goods and services', 'Foreign reserves'], taOptions: ['அரசுக் கடன்', 'மொத்த ஏற்றுமதி', 'இறுதிப் பொருட்கள் மற்றும் சேவைகளின் மதிப்பு', 'அந்நியச் செலாவணி கையிருப்பு'], answer: 2, explanation: 'GDP measures the monetary value of final goods and services produced within a country over a period.', taExplanation: 'ஒரு காலகட்டத்தில் நாட்டிற்குள் உற்பத்தி செய்யப்படும் இறுதிப் பொருட்கள் மற்றும் சேவைகளின் பண மதிப்பை GDP அளவிடுகிறது.', subject: 'Economics', exam: 'Banking' },
    { question: 'Which number comes next: 3, 6, 12, 24, ...?', ta: 'தொடரின் அடுத்த எண் எது: 3, 6, 12, 24, ...?', options: ['30', '36', '42', '48'], taOptions: ['30', '36', '42', '48'], answer: 3, explanation: 'Each term doubles, so the next number is 24 × 2 = 48.', taExplanation: 'ஒவ்வொரு எண்ணும் இரட்டிப்பாகிறது; அடுத்த எண் 24 × 2 = 48.', subject: 'Reasoning', exam: 'Banking' },
    { question: 'Which gas do plants primarily absorb during photosynthesis?', ta: 'ஒளிச்சேர்க்கையின் போது தாவரங்கள் முதன்மையாக எந்த வாயுவை உறிஞ்சுகின்றன?', options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'], taOptions: ['ஆக்சிஜன்', 'நைட்ரஜன்', 'கார்பன் டைஆக்சைடு', 'ஹைட்ரஜன்'], answer: 2, explanation: 'Plants absorb carbon dioxide and use it with water and light to produce sugars.', taExplanation: 'தாவரங்கள் கார்பன் டைஆக்சைடை உறிஞ்சி, நீர் மற்றும் ஒளியுடன் சேர்த்து சர்க்கரைகளை உருவாக்குகின்றன.', subject: 'General Science', exam: 'Railway' },
    { question: 'What is the capital of Tamil Nadu?', ta: 'தமிழ்நாட்டின் தலைநகரம் எது?', options: ['Madurai', 'Coimbatore', 'Chennai', 'Tiruchirappalli'], taOptions: ['மதுரை', 'கோயம்புத்தூர்', 'சென்னை', 'திருச்சிராப்பள்ளி'], answer: 2, explanation: 'Chennai is the capital of Tamil Nadu.', taExplanation: 'சென்னை தமிழ்நாட்டின் தலைநகரம்.', subject: 'General Knowledge', exam: 'TNPSC' }
  ],
  leaders: {
    week: [
      { initials: 'AK', name: 'A. Kavitha', points: 2480, badge: '7-day streak' },
      { initials: 'RV', name: 'R. Vivek', points: 2315, badge: 'Accuracy ace' },
      { initials: 'SM', name: 'S. Meena', points: 2190, badge: 'Quick learner' },
      { initials: 'PK', name: 'P. Karthik', points: 2065, badge: 'Focused' },
      { initials: 'AN', name: 'A. Nisha', points: 1980, badge: 'Consistent' }
    ],
    today: [
      { initials: 'RV', name: 'R. Vivek', points: 620, badge: 'Accuracy ace' },
      { initials: 'AN', name: 'A. Nisha', points: 580, badge: 'Quick learner' },
      { initials: 'AK', name: 'A. Kavitha', points: 545, badge: '7-day streak' },
      { initials: 'PK', name: 'P. Karthik', points: 510, badge: 'Focused' },
      { initials: 'SM', name: 'S. Meena', points: 475, badge: 'Consistent' }
    ]
  },
  plannerTasks: [
    { id: 'polity-review', title: 'Revise Fundamental Rights', time: '45 min', done: false },
    { id: 'quant-practice', title: 'Practice 20 aptitude questions', time: '30 min', done: false },
    { id: 'daily-brief', title: 'Read today’s current affairs', time: '15 min', done: false },
    { id: 'mock-review', title: 'Review yesterday’s mock test', time: '25 min', done: false }
  ]
};