document.addEventListener("DOMContentLoaded", function () {

  function loadPartial(targetId, filePath, callback) {
    const target = document.getElementById(targetId);
    if (!target) return;

    fetch(filePath)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to load " + filePath);
        }
        return response.text();
      })
      .then(html => {
        target.innerHTML = html;
        if (typeof callback === "function") callback();
      })
      .catch(error => {
        console.error(error.message);
      });
  }

  loadPartial("header", "assets/partials/header.html", () => {
  initHamburger();
  initMobileHeaderAdSwap();
});
  loadPartial("footer", "assets/partials/footer.html");

  

  function initHamburger() {
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".site-nav");

    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
    // Close menu when a nav link is clicked (mobile)
nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
  });
});
    
// Close on outside tap
document.addEventListener("click", (e) => {
  if (!nav.classList.contains("active")) return;

  const clickedInsideNav = nav.contains(e.target);
  const clickedToggle = toggle.contains(e.target);

  if (!clickedInsideNav && !clickedToggle) {
    nav.classList.remove("active");
  }
});
    
  }
});




function initMobileHeaderAdSwap() {
  if (window.innerWidth > 768) return;

  const header = document.querySelector(".site-header");
  const mobileAd = document.getElementById("mobileAd");

  if (!header || !mobileAd) return;

  let lastScrollY = window.scrollY;
  let accumulatedDownScroll = 0;
  const TRIGGER_DISTANCE = 120; // px required to trigger ad

  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;
    const delta = currentScroll - lastScrollY;

    // SCROLLING DOWN
    if (delta > 0 && currentScroll > 80) {
      accumulatedDownScroll += delta;

      if (accumulatedDownScroll >= TRIGGER_DISTANCE) {
        header.classList.remove("header-visible");
        header.classList.add("header-hidden");
        mobileAd.classList.add("visible");
      }
    }

    // SCROLLING UP
    if (delta < 0) {
      accumulatedDownScroll = 0;
      header.classList.remove("header-hidden");
      header.classList.add("header-visible");
      mobileAd.classList.remove("visible");
    }

    lastScrollY = currentScroll;
  });
}



  document.querySelectorAll('.pattern-card').forEach(card => {
    card.addEventListener('click', () => {
      const url = card.dataset.href;
      if (!url) return;

      card.classList.add('exiting');

      setTimeout(() => {
        window.location.href = url;
      }, 300);
    });
  });

// clean re-entry
window.addEventListener('pageshow', () => {
  document.querySelectorAll('.pattern-card.exiting')
    .forEach(card => card.classList.remove('exiting'));
});


