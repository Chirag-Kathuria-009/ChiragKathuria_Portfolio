(function () {
  'use strict';

  var ACCENT = '#7C5CFC';

  var projects = [
    {
      title: 'DORA ICT Incident Intelligence Pipeline',
      desc: "Real-time pipeline classifying financial ICT incidents against Germany's DORA regulation (BaFin Article 18): 100+ events/min, a rules-based classifier with 8 BaFin rules and 100% unit test coverage, and 3 dbt mart models on Apache Iceberg with Great Expectations quality gates, orchestrated with Airflow and a Superset dashboard.",
      tags: ['Kafka', 'PySpark', 'Iceberg', 'dbt', 'Airflow', 'Superset'],
      link: 'https://github.com/Chirag-Kathuria-009/DORA-Pipeline',
    },
    {
      title: 'Self-Healing Data Pipeline Agent',
      desc: 'A 4-agent LangGraph system (Triage, Investigate, Remediate, Approval) that diagnoses Airflow task failures and returns an evidence-backed root cause. Deterministic guardrails route safe fixes to auto-retry and data-changing ones to human approval through a FastAPI UI, verified end to end against injected failures with PostgresSaver checkpointing and a least-privilege read-only SQL role.',
      tags: ['LangGraph', 'LangChain', 'Gemini', 'FastAPI', 'Airflow', 'PostgreSQL'],
      link: 'https://github.com/Chirag-Kathuria-009/MultiAgent_Debugging_Pipeline',
    },
    {
      title: 'DORA Regulatory RAG System',
      desc: 'Hybrid BM25 and vector retrieval (pgvector, BGE embeddings) with cross-encoder reranking over the EU DORA regulation, scored against a 56-question golden dataset. Traced a retrieval failure to PDF extraction corrupting 38.7% of key terms; switching to PyMuPDF cut corruption to 0%. bge-reranker-large found the right article for 50 of 56 questions versus 45 of 56 for the base retriever.',
      tags: ['LangChain', 'pgvector', 'BGE Embeddings', 'RAGAS', 'FastAPI'],
      link: 'https://github.com/Chirag-Kathuria-009/DORA_RAG_Project',
    },
    {
      title: 'Fraud Transaction Detection Pipeline',
      desc: 'End-to-end fraud detection on 6M+ real-time transactions. A LightGBM model on a 0.3% fraud-rate dataset reaches 93% ROC-AUC with SHAP explainability, served through a FastAPI microservice (under 200ms) on AWS AppRunner.',
      tags: ['Polars', 'LightGBM', 'SHAP', 'FastAPI', 'AWS AppRunner'],
      link: 'https://github.com/Chirag-Kathuria-009/FraudTransactionsClassifier',
    },
    {
      title: 'Wikipedia Fact Verification — NLP',
      desc: 'BERT-based natural language inference on 185K+ FEVER claims. A hybrid TF-IDF and dense-embedding retriever improved evidence extraction by 23%, reaching 87% accuracy across Supports, Refutes and Not Enough Info.',
      tags: ['HuggingFace', 'BERT', 'TensorFlow', 'TF-IDF'],
      link: 'https://github.com/Chirag-Kathuria-009/FEVER_FACT_CHECKER',
    },
    {
      title: 'Battery Detector — Computer Vision',
      desc: 'A YOLOv8 prototype that identifies whether an image contains a battery, built for an EV battery disassembly use case.',
      tags: ['YOLOv8', 'Python', 'OpenCV'],
      link: 'https://github.com/Chirag-Kathuria-009/Battery_Detector',
    },
  ];

  var roles = ['Data Engineer', 'ML Engineer', 'AI & Agent Builder'];

  document.addEventListener('DOMContentLoaded', function () {

    /* ---------- Typewriter ---------- */
    var typedEl = document.getElementById('typedRole');
    var roleIndex = 0, charIndex = 0, deleting = false, pause = 0;
    function tick() {
      if (pause > 0) { pause -= 1; return; }
      var word = roles[roleIndex];
      if (!deleting) {
        if (charIndex < word.length) { charIndex += 1; }
        else { deleting = true; pause = 22; }
      } else {
        if (charIndex > 0) { charIndex -= 1; }
        else { deleting = false; roleIndex = (roleIndex + 1) % roles.length; }
      }
      typedEl.textContent = roles[roleIndex].slice(0, charIndex);
    }
    setInterval(tick, 65);

    /* ---------- Animated stat counters (run once) ---------- */
    var countTx = document.getElementById('countTx');
    var countAuc = document.getElementById('countAuc');
    var countRec = document.getElementById('countRec');
    var countRep = document.getElementById('countRep');
    var progress = 0;
    var countTimer = setInterval(function () {
      progress = Math.min(1, progress + 0.04);
      var ease = 1 - Math.pow(1 - progress, 3);
      countTx.textContent = Math.round(6 * ease);
      countAuc.textContent = Math.round(93 * ease);
      countRec.textContent = Math.round(1 * ease);
      countRep.textContent = Math.round(70 * ease);
      if (progress >= 1) { clearInterval(countTimer); }
    }, 24);

    /* ---------- Hero cursor glow ---------- */
    var hero = document.getElementById('hero');
    var heroGlow = document.getElementById('heroGlow');
    if (hero && heroGlow) {
      hero.addEventListener('mousemove', function (e) {
        var rect = hero.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        heroGlow.style.left = x + 'px';
        heroGlow.style.top = y + 'px';
        heroGlow.style.opacity = '1';
      });
      hero.addEventListener('mouseleave', function () {
        heroGlow.style.opacity = '0';
      });
    }

    /* ---------- Projects carousel ---------- */
    var activeProject = 0;
    var paused = false;
    var projTitle = document.getElementById('projTitle');
    var projDesc = document.getElementById('projDesc');
    var projTags = document.getElementById('projTags');
    var projLink = document.getElementById('projLink');
    var indexLabel = document.getElementById('indexLabel');
    var dotsWrap = document.getElementById('dots');
    var projectCard = document.getElementById('projectCard');

    function num(n) { return n < 10 ? '0' + n : '' + n; }

    function renderDots() {
      dotsWrap.innerHTML = '';
      projects.forEach(function (proj, i) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'carousel-dot';
        dot.setAttribute('aria-label', 'Go to project ' + (i + 1));
        dot.style.borderRadius = '999px';
        dot.style.border = 'none';
        dot.style.cursor = 'pointer';
        dot.style.padding = '0';
        dot.style.height = '8px';
        if (i === activeProject) {
          dot.style.background = ACCENT;
          dot.style.width = '24px';
        } else {
          dot.style.background = '#333c56';
          dot.style.width = '8px';
        }
        dot.addEventListener('click', function () { goTo(i); });
        dotsWrap.appendChild(dot);
      });
    }

    function renderProject() {
      var current = projects[activeProject];
      projTitle.textContent = current.title;
      projDesc.textContent = current.desc;
      projTags.innerHTML = '';
      current.tags.forEach(function (tag) {
        var span = document.createElement('span');
        span.textContent = tag;
        span.style.background = 'rgba(255,255,255,0.04)';
        span.style.border = '1px solid #232A3D';
        span.style.borderRadius = '999px';
        span.style.padding = '5px 12px';
        span.style.fontSize = '12px';
        span.style.color = '#6C7690';
        projTags.appendChild(span);
      });
      projLink.href = current.link;
      indexLabel.textContent = num(activeProject + 1) + ' / ' + num(projects.length);
      renderDots();
    }

    function goPrev() { activeProject = (activeProject + projects.length - 1) % projects.length; renderProject(); }
    function goNext() { activeProject = (activeProject + 1) % projects.length; renderProject(); }
    function goTo(i) { activeProject = i; renderProject(); }

    document.getElementById('prevBtn').addEventListener('click', goPrev);
    document.getElementById('nextBtn').addEventListener('click', goNext);

    var carouselTimer = setInterval(function () {
      if (!paused) { goNext(); }
    }, 6000);

    projectCard.addEventListener('mouseenter', function () { paused = true; });
    projectCard.addEventListener('mouseleave', function () {
      paused = false;
      projectCard.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
    });
    projectCard.addEventListener('mousemove', function (e) {
      var rect = projectCard.getBoundingClientRect();
      var px = (e.clientX - rect.left) / rect.width;
      var py = (e.clientY - rect.top) / rect.height;
      var tiltY = (px - 0.5) * 12;
      var tiltX = (0.5 - py) * 12;
      projectCard.style.transform = 'perspective(900px) rotateX(' + tiltX + 'deg) rotateY(' + tiltY + 'deg)';
    });

    renderProject();

    /* ---------- Scroll-reveal via IntersectionObserver ---------- */
    var revealEls = document.querySelectorAll('.scroll-reveal');
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
      revealEls.forEach(function (el) { observer.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('in-view'); });
    }
  });
})();
