/* ===================================================
   RHODA'S BIRTHDAY — MAIN JS
   =================================================== */

/* ── DOM READY ── */
document.addEventListener('DOMContentLoaded', () => {

  /* ── LOADING SCREEN ── */
  const loadScreen = document.getElementById('loading-screen');
  const loadHearts = document.getElementById('loading-hearts');

  for (let i = 0; i < 15; i++) spawnLoadHeart(loadHearts);

  function spawnLoadHeart(parent) {
    const h = document.createElement('div');
    h.textContent = ['💜','✨','🌸','💫'][Math.floor(Math.random()*4)];
    h.style.cssText = `
      position:absolute; font-size:${Math.random()*1.5+0.8}rem;
      left:${Math.random()*100}%; bottom:-2rem;
      animation: floatHeart ${Math.random()*4+4}s linear ${Math.random()*3}s infinite;
      pointer-events:none;
    `;
    parent.appendChild(h);
  }

  setTimeout(() => {
    loadScreen.style.transition = 'opacity 1s ease, transform 1s ease';
    loadScreen.style.opacity = '0';
    loadScreen.style.transform = 'scale(1.1)';
    setTimeout(() => {
      loadScreen.style.display = 'none';
      initSite();
    }, 1000);
  }, 2800);

  /* ── PARTICLE CANVAS ── */
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resizeCanvas() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H + H;
      this.size = Math.random() * 2 + 0.5;
      this.speed = Math.random() * 0.5 + 0.2;
      this.opacity = Math.random() * 0.6 + 0.1;
      this.hue = Math.floor(Math.random() * 60 + 270); // purple range
      this.drift = (Math.random() - 0.5) * 0.3;
    }
    update() {
      this.y -= this.speed;
      this.x += this.drift;
      if (this.y < -10) this.reset();
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = `hsl(${this.hue}, 80%, 75%)`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < 120; i++) {
    const p = new Particle();
    p.y = Math.random() * H; // start spread
    particles.push(p);
  }

  // Stars
  class Star {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.size = Math.random() * 1.5 + 0.3;
      this.opacity = Math.random() * 0.7 + 0.1;
      this.twinkleSpeed = Math.random() * 0.02 + 0.005;
      this.twinkleOffset = Math.random() * Math.PI * 2;
      this.t = 0;
    }
    update() {
      this.t += this.twinkleSpeed;
      this.currentOpacity = this.opacity * (0.5 + 0.5 * Math.sin(this.t + this.twinkleOffset));
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.currentOpacity;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
      ctx.fill();
      ctx.restore();
    }
  }

  const stars = Array.from({ length: 200 }, () => new Star());

  // Orbs
  const orbs = [
    { x: 0.2, y: 0.3, r: 300, color: 'rgba(123,44,191,0.08)', speed: 0.0003 },
    { x: 0.8, y: 0.7, r: 250, color: 'rgba(199,125,255,0.06)', speed: 0.0005 },
    { x: 0.5, y: 0.1, r: 200, color: 'rgba(157,78,221,0.07)', speed: 0.0004 },
  ];

  let animT = 0;
  function drawOrbs() {
    orbs.forEach(o => {
      const x = (o.x + 0.05 * Math.sin(animT * o.speed * 1000)) * W;
      const y = (o.y + 0.05 * Math.cos(animT * o.speed * 800)) * H;
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, o.r);
      gradient.addColorStop(0, o.color);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, o.r, 0, Math.PI*2);
      ctx.fill();
    });
  }

  function animate(ts) {
    ctx.clearRect(0, 0, W, H);
    animT = ts || 0;
    drawOrbs();
    stars.forEach(s => { s.update(); s.draw(); });
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);

  function initSite() {

    /* ── NAV SCROLL ── */
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    });

    /* ── CUSTOM CURSOR ── */
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    let mx = 0, my = 0, fx = 0, fy = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    });

    function animateCursor() {
      fx += (mx - fx) * 0.12;
      fy += (my - fy) *.12;
      follower.style.left = fx + 'px';
      follower.style.top  = fy + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    /* ── HEART TRAIL ── */
    let lastHeart = 0;
    document.addEventListener('mousemove', e => {
      if (Date.now() - lastHeart < 80) return;
      lastHeart = Date.now();
      if (Math.random() > 0.35) return;
      const h = document.createElement('div');
      h.className = 'heart-trail';
      h.textContent = ['💜','✨','🌸','💫','⭐'][Math.floor(Math.random()*5)];
      h.style.left = e.clientX + 'px';
      h.style.top  = e.clientY + 'px';
      document.body.appendChild(h);
      setTimeout(() => h.remove(), 1500);
    });

    /* ── HERO ANIMATIONS ── */
    const heroEls = [
      { el: '.hero-eyebrow',  delay: 0 },
      { el: '.hero-name',     delay: 200 },
      { el: '.hero-subtitle', delay: 400 },
      { el: '.hero-divider',  delay: 550 },
      { el: '.hero-desc',     delay: 700 },
      { el: '.hero-btn',      delay: 900 },
    ];
    heroEls.forEach(({ el, delay }) => {
      const node = document.querySelector(el);
      if (!node) return;
      setTimeout(() => {
        node.style.transition = `opacity 1s ease, transform 1s ease`;
        node.style.opacity = '1';
        node.style.transform = 'translateY(0)';
      }, 300 + delay);
    });

    // Stats stagger
    document.querySelectorAll('.stat-card').forEach((c, i) => {
      setTimeout(() => {
        c.style.transition = `opacity 0.8s ease, transform 0.8s ease`;
        c.style.opacity = '1';
        c.style.transform = 'translateY(0)';
      }, 1400 + i * 150);
    });

    // Floating hearts hero
    const heroHearts = document.querySelector('.floating-hearts-hero');
    if (heroHearts) {
      for (let i = 0; i < 12; i++) {
        const h = document.createElement('div');
        h.className = 'fheart';
        h.textContent = ['💜','🌸','✨'][Math.floor(Math.random()*3)];
        h.style.left = (Math.random() * 100) + '%';
        h.style.animationDuration = (Math.random() * 10 + 8) + 's';
        h.style.animationDelay = (Math.random() * 8) + 's';
        h.style.fontSize = (Math.random() * 1.2 + 0.8) + 'rem';
        heroHearts.appendChild(h);
      }
    }

    /* ── RELATIONSHIP COUNTER ── */
    function updateCounters() {
      // Replace this date with the actual start date
      const start = new Date('2024-11-01'); // ← CHANGE THIS
      const now = new Date();
      const diff = now - start;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const months = Math.floor(days / 30.44);
      const el = document.getElementById('days-count');
      const mel = document.getElementById('months-count');
      if (el) el.textContent = days.toLocaleString();
      if (mel) mel.textContent = months;
    }
    updateCounters();

    /* ── SCROLL REVEALS ── */
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          revealObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll(
      '.reveal, .timeline-item, .reason-card, .msg-card, .gallery-item'
    ).forEach(el => revealObserver.observe(el));

    /* ── LOVE LETTER TYPEWRITER ── */
    const letterSection = document.querySelector('#letter-section');
    const typewriterEl  = document.getElementById('typewriter-text');
    const envelope      = document.querySelector('.envelope');

    const letterText = `My Dearest Future Wife,

    Happy Birthday, my love.
    
    Even though today may arrive before we've shared all of our memories together, I already know one thing: meeting you will be one of the greatest gifts of my life.
    
    When I think about the future, I don't just imagine the big moments—the wedding day, the celebrations, the milestones. I think about the quiet moments too. The late-night conversations, the laughter over things no one else would understand, the way a simple glance from you could make an ordinary day feel extraordinary.
    
    You have a way of making love feel both exciting and peaceful at the same time. Loving you isn't something I imagine as a grand performance; it's a choice I would gladly make every day. Through every season, every challenge, every victory, I want to be the person standing beside you.
    
    On your birthday, I hope you know how deeply you are cherished. I hope you never doubt your worth, your beauty, or the impact you have on the people around you. The world is brighter because you're in it, and my future is more beautiful because it includes you.
    
    Thank you for being the person who inspires me to dream bigger, love deeper, and become a better man. No matter where life takes us, I promise to keep choosing you, supporting you, and loving you with all that I am.
    
    May this year bring you joy, peace, growth, and countless reasons to smile. And when we look back years from now, I hope this is just one of many birthdays we've celebrated together.
    
    Happy Birthday, my forever love.
    
    Yours always,
    Your Future Husband ❤️🌸`;

    let typed = false;
    const letterObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !typed) {
          typed = true;
          envelope.classList.add('revealed');
          setTimeout(() => typeWriter(typewriterEl, letterText, 28), 800);
        }
      });
    }, { threshold: 0.3 });

    if (letterSection) letterObserver.observe(letterSection);

    function typeWriter(el, text, speed) {
      let i = 0;
      el.textContent = '';
      function type() {
        if (i < text.length) {
          el.textContent += text[i++];
          el.parentElement.scrollTop = el.parentElement.scrollHeight;
          setTimeout(type, speed + Math.random() * 20);
        }
      }
      type();
    }

    /* ── GALLERY ── */
    buildGallery();

    function buildGallery() {
      const grid = document.getElementById('gallery-grid');
      if (!grid) return;

      // Demo placeholders — user replaces with real files
      const demoItems = [
        { type: 'placeholder', label: 'Add your photos to /photos/' },
        { type: 'placeholder', label: 'Beautiful memories go here' },
        { type: 'placeholder', label: 'Your favorite moments' },
        { type: 'placeholder', label: 'Cherished photos' },
        { type: 'placeholder', label: 'Our story in pictures' },
        { type: 'placeholder', label: 'Add more memories here' },
        { type: 'placeholder', label: 'Videos from /videos/' },
        { type: 'placeholder', label: 'Your special moments' },
      ];

      // Check for real photos (config-driven)
      const photos = window.PHOTOS || [];
      const videos = window.VIDEOS || [];
      const items = [...photos, ...videos, ...demoItems];

      items.forEach((item, idx) => {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        div.style.transitionDelay = (idx * 60) + 'ms';

        if (item.type === 'photo' || (item.src && item.src.match(/\.(jpg|jpeg|png|gif|webp)/i))) {
          const img = document.createElement('img');
          img.src = item.src;
          img.alt = item.label || 'Memory';
          img.loading = 'lazy';
          const overlay = document.createElement('div');
          overlay.className = 'gallery-item-overlay';
          div.appendChild(img);
          div.appendChild(overlay);
          div.addEventListener('click', () => openLightbox('img', item.src));
        } else if (item.type === 'video' || (item.src && item.src.match(/\.(mp4|webm|mov)/i))) {
          const video = document.createElement('video');
          video.src = item.src;
          video.muted = true;
          video.loop = true;
          video.playsInline = true;
          const playIcon = document.createElement('div');
          playIcon.className = 'gallery-play-icon';
          playIcon.textContent = '▶';
          div.appendChild(video);
          div.appendChild(playIcon);
          div.addEventListener('click', () => openLightbox('video', item.src));
        } else {
          div.innerHTML = `
            <div class="gallery-placeholder">
              <div class="gp-icon">📸</div>
              <div class="gp-text">${item.label}</div>
            </div>`;
        }

        grid.appendChild(div);
        revealObserver.observe(div);
      });
    }

    /* ── LIGHTBOX ── */
    function openLightbox(type, src) {
      const lb = document.getElementById('lightbox');
      const lbContent = document.getElementById('lightbox-content');
      lbContent.innerHTML = '';
      if (type === 'img') {
        const img = document.createElement('img');
        img.src = src;
        lbContent.appendChild(img);
      } else {
        const video = document.createElement('video');
        video.src = src;
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true;
        lbContent.appendChild(video);
      }
      lb.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    document.getElementById('lightbox-close')?.addEventListener('click', closeLightbox);
    document.getElementById('lightbox')?.addEventListener('click', e => {
      if (e.target.id === 'lightbox') closeLightbox();
    });

    function closeLightbox() {
      const lb = document.getElementById('lightbox');
      lb.classList.remove('active');
      document.body.style.overflow = '';
      const video = lb.querySelector('video');
      if (video) video.pause();
    }

    /* ── VIDEO SECTION ── */
    buildVideoSection();

    function buildVideoSection() {
      const videos = window.VIDEOS || [];
      const featured = document.getElementById('featured-video');
      const carousel = document.getElementById('video-carousel');
      if (!featured || !carousel) return;

      if (videos.length === 0) {
        // placeholder state already in HTML
        return;
      }

      // Build featured
      const fv = document.createElement('video');
      fv.src = videos[0].src;
      fv.controls = true;
      fv.playsInline = true;
      featured.innerHTML = '';
      featured.appendChild(fv);

      // Thumbnails
      carousel.innerHTML = '';
      videos.forEach((v, i) => {
        const thumb = document.createElement('div');
        thumb.className = 'video-thumb' + (i===0?' active-thumb':'');
        const tv = document.createElement('video');
        tv.src = v.src;
        tv.muted = true;
        tv.playsInline = true;
        thumb.appendChild(tv);
        thumb.addEventListener('click', () => {
          fv.src = v.src;
          fv.play();
          carousel.querySelectorAll('.video-thumb').forEach(t => t.classList.remove('active-thumb'));
          thumb.classList.add('active-thumb');
        });
        carousel.appendChild(thumb);
      });
    }

    /* ── SURPRISE BUTTON ── */
    const surpriseBtn = document.getElementById('surprise-btn');
    const surpriseMsg = document.getElementById('surprise-message');
    let surprised = false;

    surpriseBtn?.addEventListener('click', () => {
      if (surprised) return;
      surprised = true;
      spawnFireworks();
      spawnConfetti();
      spawnHeartExplosion();
      surpriseMsg.style.display = 'block';
      surpriseBtn.textContent = '🎉';
    });

    function spawnFireworks() {
      for (let f = 0; f < 8; f++) {
        setTimeout(() => {
          const cx = Math.random() * window.innerWidth;
          const cy = Math.random() * window.innerHeight * 0.6;
          for (let i = 0; i < 24; i++) {
            const fw = document.createElement('div');
            fw.className = 'firework';
            const angle = (i / 24) * 360;
            const dist = Math.random() * 150 + 80;
            const dx = Math.cos(angle * Math.PI / 180) * dist;
            const dy = Math.sin(angle * Math.PI / 180) * dist;
            fw.style.cssText = `
              left:${cx}px; top:${cy}px;
              --dx:${dx}px; --dy:${dy}px;
              background: hsl(${Math.random()*60+270}, 90%, 70%);
              animation-duration: ${Math.random()*0.5+0.8}s;
            `;
            document.body.appendChild(fw);
            setTimeout(() => fw.remove(), 1400);
          }
        }, f * 300);
      }
    }

    function spawnConfetti() {
      const colors = ['#7B2CBF','#C77DFF','#FFD6FF','#E0AAFF','#ffffff','#ff69b4'];
      for (let i = 0; i < 120; i++) {
        const c = document.createElement('div');
        c.className = 'confetti-piece';
        c.style.cssText = `
          left:${Math.random()*100}vw; top:${Math.random()*-20}vh;
          background:${colors[Math.floor(Math.random()*colors.length)]};
          transform:rotate(${Math.random()*360}deg);
          animation-duration:${Math.random()*2+2}s;
          animation-delay:${Math.random()*1}s;
          width:${Math.random()*8+4}px; height:${Math.random()*8+4}px;
          border-radius:${Math.random()>0.5?'50%':'2px'};
        `;
        document.body.appendChild(c);
        setTimeout(() => c.remove(), 4000);
      }
    }

    function spawnHeartExplosion() {
      for (let i = 0; i < 40; i++) {
        setTimeout(() => {
          const h = document.createElement('div');
          h.style.cssText = `
            position:fixed; pointer-events:none; z-index:9500;
            font-size:${Math.random()*2+1}rem;
            left:${Math.random()*100}vw;
            top:${Math.random()*100}vh;
            animation: heartFloat ${Math.random()*2+1.5}s ease-out forwards;
          `;
          h.textContent = '💜';
          document.body.appendChild(h);
          setTimeout(() => h.remove(), 3000);
        }, Math.random() * 1500);
      }
    }

    /* ── MUSIC TOGGLE ── */
    const musicBtn = document.getElementById('music-toggle');
    const audio = document.getElementById('bg-music');
    let musicPlaying = false;

    musicBtn?.addEventListener('click', () => {
      if (!audio) return;
      if (musicPlaying) {
        audio.pause();
        musicBtn.textContent = '🎵';
        musicPlaying = false;
      } else {
        audio.play().catch(() => {});
        musicBtn.textContent = '🔇';
        musicPlaying = true;
      }
    });

    /* ── FINAL SECTION ANIMATIONS ── */
    const finalObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const section = e.target;
        const els = section.querySelectorAll('.final-main, .final-sub, .final-name, .final-hearts');
        els.forEach((el, i) => {
          setTimeout(() => {
            el.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
            el.style.opacity = '1';
            el.style.transform = el.classList.contains('final-name') ? 'scale(1)' : 'translateY(0)';
          }, i * 400);
        });
        finalObserver.unobserve(section);
      });
    }, { threshold: 0.3 });

    const finalSection = document.getElementById('final-section');
    if (finalSection) finalObserver.observe(finalSection);

    /* ── SCROLL-TRIGGERED REASON CARDS ── */
    // Already handled by revealObserver above

    /* ── PARALLAX ── */
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      document.querySelectorAll('.hero-bg-orb-1').forEach(el => {
        el.style.transform = `translateY(${scrollY * 0.3}px)`;
      });
    });

  } // end initSite
}); // end DOMContentLoaded
