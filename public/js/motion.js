/**
 * Motion & Interactivity Script
 * Implements scroll reveals, custom cursor, and magnetic buttons
 * NOTE: Smooth scroll is handled by CSS (scroll-behavior: smooth)
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================
  // 3. INTERSECTION OBSERVER (Reveal Animations)
  // =========================================
  const revealElements = document.querySelectorAll(
    '.pill, .journey-section, .poster-layout, .project-card, .stat-counter, .press-item-enhanced'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target); // Only animate once
      }
    });
  }, { 
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before fully in view
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // =========================================
  // 4. CUSTOM CURSOR (Performance Optimized)
  // =========================================
  const cursor = document.querySelector('.custom-cursor');
  
  if (cursor && window.matchMedia('(pointer: fine)').matches) {
    let cursorX = 0, cursorY = 0;
    let rafId = null;
    
    // Use RAF to batch cursor updates
    function updateCursor() {
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      rafId = null;
    }
    
    document.addEventListener('mousemove', (e) => {
      cursorX = e.clientX - 10; // Offset for center
      cursorY = e.clientY - 10;
      if (!rafId) {
        rafId = requestAnimationFrame(updateCursor);
      }
    }, { passive: true });

    // Hover effects on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .project-card, .nav-card, .tech-badge, .filter-label');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  } else if (cursor) {
    cursor.style.display = 'none'; // Hide on touch devices
  }

  // =========================================
  // 5. MAGNETIC BUTTONS
  // =========================================
  const magneticButtons = document.querySelectorAll('.project-button, .footer-cta, .nav-card');
  
  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Subtle pull towards cursor (20% of distance)
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // =========================================
  // 6. STAT COUNTER ANIMATION
  // =========================================
  const statCounters = document.querySelectorAll('.stat-counter');
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const valueEl = entry.target.querySelector('.stat-value');
        if (valueEl && valueEl.dataset.target) {
          animateCounter(valueEl, parseFloat(valueEl.dataset.target));
        }
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statCounters.forEach(el => counterObserver.observe(el));

  function animateCounter(el, target) {
    const duration = 1500; // ms
    const startTime = performance.now();
    const suffix = el.textContent.replace(/[\d.]/g, ''); // Extract suffix like '%'
    
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = target * easeProgress;
      
      if (Number.isInteger(target)) {
        el.textContent = Math.round(current) + suffix;
      } else {
        el.textContent = current.toFixed(1) + suffix;
      }
      
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target + suffix;
      }
    }
    requestAnimationFrame(update);
  }

});
