// Parallax Effect for Blobs
document.addEventListener("mousemove", (e) => {
    const blobs = document.querySelectorAll(".gradient-blob");
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    blobs.forEach((blob, index) => {
        const speed = (index + 1) * 20;
        const xOffset = (x - 0.5) * speed;
        const yOffset = (y - 0.5) * speed;
        blob.style.transform = `translate(${xOffset}px, ${yOffset}px) scale(1)`;
    });
});

// Navbar Scroll Effect (Enhanced)
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");

    // Prevent body scroll when menu is open
    if (navLinks.classList.contains("active")) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
    }
});

// Close menu when clicking a link
links.forEach((link) => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
        document.body.style.overflow = "auto";
    });
});

// Scroll Reveal Animation
const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

document.querySelectorAll(".scroll-reveal").forEach((element) => {
    observer.observe(element);
});

// Add staggered animation delay to team cards dynamically if needed
// (Already handled by CSS classes .delay-1, .delay-2, etc., but we can enhance here if dynamic)

// Typing Animation
const typingElement = document.getElementById("typing-text");
const words = ["Masa Depan", "Inovatif", "Modern", "Efisien", "Berdampak"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isWaiting = false;

function type() {
    const currentWord = words[wordIndex];

    if (isWaiting) {
        return;
    }

    if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            isWaiting = true;
            setTimeout(() => {
                isWaiting = false;
                type();
            }, 500); // Wait bit before typing next word
            return;
        }
    } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentWord.length) {
            isDeleting = true;
            isWaiting = true;
            setTimeout(() => {
                isWaiting = false;
                type();
            }, 2000); // Wait at end of word
            return;
        }
    }

    const speed = isDeleting ? 100 : 200;
    setTimeout(type, speed);
}

// Start typing animation on load
document.addEventListener("DOMContentLoaded", () => {
    if (typingElement) {
        setTimeout(type, 1000); // Initial delay
    }
});
