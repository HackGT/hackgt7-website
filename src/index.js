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

window.onload = function() {
  lax.setup(); // init

  const updateLax = () => {
    lax.update(window.scrollY);
    window.requestAnimationFrame(updateLax);
  };

  window.requestAnimationFrame(updateLax);
};

window.addEventListener('resize', function() {
  lax.updateElements();
});
