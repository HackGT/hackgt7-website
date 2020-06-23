import './components/est-data.js';
import './components/est-faq.js';
import './components/est-footer.js';
import './components/est-logo.js';
import './components/est-nav.js';
import './components/est-schedule.js';
import './components/est-scrolljack.js';
import './components/est-section.js';
import './components/est-select.js';
import './components/est-sponsors.js';
import './components/est-register-btn.js';

import lax from 'lax.js';
import smoothscroll from 'smoothscroll-polyfill';

// use smooth scroll polyfill
smoothscroll.polyfill();

// setup laxx
window.onload = function() {
  lax.setup({
    breakpoints: {large: 900},
  });

  const updateLax = () => {
    lax.update(window.scrollY);
    window.requestAnimationFrame(updateLax);
  };

  window.requestAnimationFrame(updateLax);
};

window.addEventListener('resize', function() {
  lax.updateElements();
});

// https://stackoverflow.com/questions/7717527/smooth-scrolling-when-clicking-an-anchor-link
// Used for smooth scrolling
// CSS scroll-behavior not yet fully supported
// https://caniuse.com/#search=scroll-behavior
const scrollCue = document.querySelector('.scroll-cue');
let isSeenTracks = false;
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        
        if (!isSeenTracks && e.target.getAttribute('href') == "#tracks") {
            isSeenTracks = true;
            scrollCue.classList.add('scroll-cue-anim');
        }
    });
});
