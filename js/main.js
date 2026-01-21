// ================= HERO SLIDER =================
const slides = document.querySelectorAll(".hero-slide");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let current = 0;
let sliderInterval;

function showSlide(i) {
  slides.forEach(slide => {
    slide.classList.remove("active");

    const text = slide.querySelector(".fade-up");
    if (text) {
      text.style.opacity = "0";
      text.style.transform = "translateY(40px)";
    }
  });

  slides[i].classList.add("active");

  const activeText = slides[i].querySelector(".fade-up");
  if (activeText) {
    activeText.offsetHeight; // restart animation
    activeText.style.opacity = "";
    activeText.style.transform = "";
  }
}

function nextSlide() {
  current = (current + 1) % slides.length;
  showSlide(current);
}

function prevSlide() {
  current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
}

if (nextBtn && prevBtn) {
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);
}

function startSlider() {
  sliderInterval = setInterval(nextSlide, 5000);
}

function stopSlider() {
  clearInterval(sliderInterval);
}

document.addEventListener("visibilitychange", () => {
  document.hidden ? stopSlider() : startSlider();
});

showSlide(0);
startSlider();


// ================= HAMBURGER MENU =================
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// close menu when clicking link
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});


// ================= FADE ON SCROLL (SYSTEM B) =================
const faders = document.querySelectorAll(".fade-on-scroll");

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("show");
      }, i * 120); // stagger
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

faders.forEach(el => observer.observe(el));


// ================= ABOUT VIDEO PLAY =================
const videoBox = document.getElementById("videoBox");

if (videoBox) {
  videoBox.addEventListener("click", () => {
    videoBox.innerHTML = `
      <iframe
        src="https://www.youtube.com/embed/VIDEO_ID_HERE?autoplay=1"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
        style="width:100%; height:100%; border-radius:12px;">
      </iframe>
    `;
  });
}


// ================= SCROLL TO TOP =================
const topBtn = document.getElementById("topBtn");

if (topBtn) {
  window.addEventListener("scroll", () => {
    topBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}


// ================= NEWSLETTER (FAKE SUBMIT) =================
const newsletter = document.querySelector(".newsletter");

if (newsletter) {
  newsletter.addEventListener("submit", e => {
    e.preventDefault();
    alert("Merci pour votre abonnement !");
    newsletter.reset();
  });
}


// ================= MODAL =================
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const closeModal = document.querySelector(".close-modal");

document.querySelectorAll(".open-modal").forEach(btn => {
  btn.addEventListener("click", () => {
    modalTitle.textContent = btn.dataset.title;
    modalText.textContent = btn.dataset.text;
    modal.classList.add("show");
  });
});

if (closeModal) {
  closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
  });
}

if (modal) {
  modal.addEventListener("click", e => {
    if (e.target === modal) modal.classList.remove("show");
  });
}
