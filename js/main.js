/**
 * ==========================================================================
 * MUSKAN A. — PORTFOLIO MAIN JAVASCRIPT
 * Zero-framework, lightweight, highly performant Vanilla JS
 * Features: Lenis Smooth Scroll, IntersectionObserver Reveal,
 * Counter Animation, Accordion, Native <dialog> Modal, Contact Handler
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initLenis();
  initHeaderScroll();
  initMobileMenu();
  initScrollReveal();
  initStatCounters();
  initExperienceAccordion();
  initResumeModal();
  initContactForm();
  initBackToTop();
  updateCurrentYear();
});

/* --------------------------------------------------------------------------
   1. Lenis Smooth Scroll Integration (via CDN with fallback)
   -------------------------------------------------------------------------- */
let lenisInstance = null;

function initLenis() {
  if (typeof Lenis !== 'undefined') {
    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Integrate internal anchor clicks with Lenis
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            lenisInstance.scrollTo(targetEl, {
              offset: -80,
              duration: 1.2,
            });
            // Close mobile menu if open
            closeMobileMenu();
          }
        }
      });
    });
  } else {
    // Graceful fallback: Native smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
  }
}

/* --------------------------------------------------------------------------
   2. Sticky Header Elevation on Scroll
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --------------------------------------------------------------------------
   3. Mobile Navigation Menu
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (!toggleBtn || !mobileMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (
      mobileMenu.classList.contains('open') &&
      !mobileMenu.contains(e.target) &&
      !toggleBtn.contains(e.target)
    ) {
      closeMobileMenu();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMobileMenu();
    }
  });
}

function openMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (toggleBtn && mobileMenu) {
    toggleBtn.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('open');
  }
}

function closeMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (toggleBtn && mobileMenu) {
    toggleBtn.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
  }
}

/* --------------------------------------------------------------------------
   4. IntersectionObserver: Reveal Animations
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach((el) => el.classList.add('revealed'));
  }
}

/* --------------------------------------------------------------------------
   5. Stat Numbers Counter Animation
   -------------------------------------------------------------------------- */
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  if (!statNumbers.length) return;

  let hasAnimated = false;

  const animateCounters = () => {
    statNumbers.forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const duration = 1800; // ms
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out exponential curve
        const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentVal = Math.floor(easeOut * target);

        counter.textContent = currentVal.toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          counter.textContent = target.toLocaleString();
        }
      };

      requestAnimationFrame(updateCount);
    });
  };

  const statsSection = document.querySelector('.stats-section');
  if (statsSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            animateCounters();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(statsSection);
  } else {
    animateCounters();
  }
}

/* --------------------------------------------------------------------------
   6. Interactive Experience Timeline Accordion
   -------------------------------------------------------------------------- */
function initExperienceAccordion() {
  const items = document.querySelectorAll('.accordion-item');
  if (!items.length) return;

  items.forEach((item) => {
    const header = item.querySelector('.accordion-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items for clean accordion UX
      items.forEach((other) => {
        if (other !== item && other.classList.contains('active')) {
          other.classList.remove('active');
          const otherHeader = other.querySelector('.accordion-header');
          if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        header.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   7. Hidden Resume Modal (<dialog>) & Actions
   -------------------------------------------------------------------------- */
function initResumeModal() {
  const dialog = document.getElementById('resumeModal');
  const openButtons = document.querySelectorAll('[data-open-resume]');
  const closeBtn = document.getElementById('closeResumeModal');
  const printBtn = document.getElementById('printResumeBtn');
  const copyBtn = document.getElementById('copyResumeBtn');

  if (!dialog) return;

  // Open modal
  openButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      dialog.showModal();
      document.body.style.overflow = 'hidden';
      if (lenisInstance) lenisInstance.stop();
    });
  });

  // Close modal function
  const closeModal = () => {
    dialog.close();
    document.body.style.overflow = '';
    if (lenisInstance) lenisInstance.start();
  };

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Backdrop click to close
  dialog.addEventListener('click', (e) => {
    const dialogDimensions = dialog.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      closeModal();
    }
  });

  // Native cancel event (Escape key)
  dialog.addEventListener('cancel', () => {
    document.body.style.overflow = '';
    if (lenisInstance) lenisInstance.start();
  });

  // Print button
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Copy plain text resume
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const resumeDoc = document.querySelector('.resume-document');
      if (resumeDoc) {
        const textContent = resumeDoc.innerText;
        navigator.clipboard.writeText(textContent)
          .then(() => {
            showToast('Resume copied to clipboard!');
          })
          .catch(() => {
            showToast('Unable to copy resume text.');
          });
      }
    });
  }
}

/* --------------------------------------------------------------------------
   8. Toast Notification Utility
   -------------------------------------------------------------------------- */
function showToast(message) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('visible');

  setTimeout(() => {
    toast.classList.remove('visible');
  }, 3200);
}

/* --------------------------------------------------------------------------
   9. Contact Form Interactive Feedback
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('userName');
    const emailInput = document.getElementById('userEmail');
    const messageInput = document.getElementById('userMessage');
    const feedbackBox = document.getElementById('formFeedback');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const message = messageInput ? messageInput.value.trim() : '';

    if (!name || !email || !message) {
      if (feedbackBox) {
        feedbackBox.textContent = 'Please fill out all fields before sending.';
        feedbackBox.style.display = 'block';
        feedbackBox.style.backgroundColor = '#FDE8E8';
        feedbackBox.style.color = '#9B1C1C';
        feedbackBox.style.borderColor = '#F8B4B4';
      }
      return;
    }

    // Compose mailto link as instant fallback and open email client
    const subject = encodeURIComponent(`Hiring Inquiry from ${name} via Portfolio`);
    const body = encodeURIComponent(`Hi Muskan,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nBest regards,\n${name}`);
    
    // Provide visual feedback
    if (feedbackBox) {
      feedbackBox.className = 'form-feedback success';
      feedbackBox.textContent = 'Opening your email client to send your message to Muskan...';
      feedbackBox.style.display = 'block';
    }

    setTimeout(() => {
      window.location.href = `mailto:muskan.hirehub8@gmail.com?subject=${subject}&body=${body}`;
      form.reset();
    }, 600);
  });
}

/* --------------------------------------------------------------------------
   10. Back to Top Button
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', () => {
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

/* --------------------------------------------------------------------------
   11. Dynamic Year Update
   -------------------------------------------------------------------------- */
function updateCurrentYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
