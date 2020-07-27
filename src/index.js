import "./components/est-data.js";
import "./components/est-faq.js";
import "./components/est-footer.js";
import "./components/est-nav.js";
import "./components/est-scrolljack.js";
import "./components/est-section.js";
import "./components/est-select.js";
import "./components/est-register-btn.js";

import lax from "lax.js";
import smoothscroll from "smoothscroll-polyfill";

// styled console log
const c =
    "font-size: 4rem; color: #11cfff; text-shadow: 5px 5px blue; font-weight: bold;";
console.log("%c🌊 konnichiwa!", c);

// add lax preset
lax.addPreset("coolappear", () => {
    return {
        "data-lax-translate-y_large": "(0.1*vh) 0, (0.5*vh) 200",
        "data-lax-opacity_large": "100 1, (0.5*vh) 0",
        "data-lax-anchor": "self"
    };
});

// use smooth scroll polyfill
smoothscroll.polyfill();

// setup laxx
window.onload = function() {
    lax.setup({
        breakpoints: { large: 900 }
    });

    const updateLax = () => {
        lax.update(window.scrollY);
        window.requestAnimationFrame(updateLax);
    };

    window.requestAnimationFrame(updateLax);
};

window.addEventListener("resize", function() {
    lax.updateElements();
});

// https://stackoverflow.com/questions/7717527/smooth-scrolling-when-clicking-an-anchor-link
// Used for smooth scrolling
// CSS scroll-behavior not yet fully supported
// https://caniuse.com/#search=scroll-behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const dest = document.querySelector(this.getAttribute("href"));
        let amt = dest.offsetTop;
        if (dest.hasAttribute("breakpoint")) {
            const vw = Math.max(
                document.documentElement.clientWidth || 0,
                window.innerWidth || 0
            );
            const vh = Math.max(
                document.documentElement.clientHeight || 0,
                window.innerHeight || 0
            );
            const breakpoint = parseInt(dest.getAttribute("breakpoint"));
            if (vw >= breakpoint) {
                const extra = dest.getAttribute("extra-scroll");
                const type = extra.slice(-2);
                let multiplier = 1;
                if (type === "vw") {
                    multiplier = vw;
                } else if (type === "vh") {
                    multiplier = vh;
                }
                amt += parseInt(dest.getAttribute("extra-scroll")) * multiplier;
            }
        }
        window.scroll({
            top: amt,
            behavior: "smooth"
        });
    });
});

const letterIcon = document.getElementById("letter-icon");
const letterLink = document.querySelector("[href='#letter']");
letterLink.innerHTML = "";
letterLink.appendChild(letterIcon);
