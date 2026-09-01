// ===== Scroll Progress Ring =====
const progressCircle = document.getElementById('progressCircle');
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    // Get scroll position and calculate progress percentage
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (scrollTop / scrollHeight) * 157;

    // Fill circular progress ring based on scroll amount
    progressCircle.style.strokeDashoffset = 157 - scrolled;

    // Show or hide the scroll-to-top button
    if (scrollTop > 100) {
        scrollProgress.style.opacity = '1';
        scrollProgress.style.pointerEvents = 'auto';
    } else {
        scrollProgress.style.opacity = '0';
        scrollProgress.style.pointerEvents = 'none';
    }
});

// Scroll to top smoothly when the progress ring is clicked
scrollProgress.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ===== Header Background on Scroll =====
window.addEventListener('scroll', function () {
    const header = document.getElementById('main-header');
    // Add or remove 'scrolled' class depending on scroll position
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


// ===== Highlight Active Nav Link Based on Scroll Position =====
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

// Observer for tracking visible section and updating nav link
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href").substring(1) === entry.target.id) {
                        link.classList.add("active");
                    }
                });
            }
        });
    },
    {
        threshold: 0.5 // Trigger when 50% of section is visible
    }
);

// Apply observer to each section
sections.forEach(section => {
    observer.observe(section);
});


// ===== Reveal Sections with Animation on Scroll (except home) =====
const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible"); // Reveal section
            observer.unobserve(entry.target); // Stop observing once revealed
        }
    });
}, {
    threshold: 0.1
});

// Hide and observe all sections except #home
document.querySelectorAll("section").forEach(section => {
    if (section.id !== "home") {
        section.classList.add("hidden"); // Start hidden
        sectionObserver.observe(section); // Observe for reveal
    }
});


// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            const targetY = target.offsetTop;
            smoothScrollTo(targetY, 1500); // 1500ms animation
        }
    });
});

// Smooth scroll animation function
function smoothScrollTo(target, duration) {
    const start = window.scrollY;
    const distance = target - start;
    let startTime = null;

    function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutQuad(progress); // easing function
        window.scrollTo(0, start + distance * ease);
        if (progress < 1) requestAnimationFrame(animation);
    }

    // Easing function for smooth acceleration/deceleration
    function easeInOutQuad(t) {
        return t < 0.5
            ? 2 * t * t
            : -1 + (4 - 2 * t) * t;
    }

    requestAnimationFrame(animation);
}


// ===== Remove Curtain Animation After Load =====
setTimeout(() => {
    document.getElementById("circleCurtain")?.remove();
}, 3000); // Remove overlay after 3 seconds


// ===== Custom Cursor with Dot and Outline =====
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');
const body = document.body;

let mouseX = 0, mouseY = 0;
let dotX = 0, dotY = 0;

// Update cursor position on mouse move
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Move outline immediately
    outline.style.left = `${mouseX}px`;
    outline.style.top = `${mouseY}px`;
});

// Animate center dot with a slight delay for a 'loose' effect
function animateDot() {
    dotX += (mouseX - dotX) * 0.1;
    dotY += (mouseY - dotY) * 0.1;

    dot.style.left = `${dotX}px`;
    dot.style.top = `${dotY}px`;

    requestAnimationFrame(animateDot);
}
animateDot();

// Enlarge cursor when hovering over links
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('mouseenter', () => {
        body.classList.add('cursor-hover');
    });

    link.addEventListener('mouseleave', () => {
        body.classList.remove('cursor-hover');
    });
});


// ===== Sidebar Navigation Toggle =====
const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const closeBtn = document.getElementById("close-btn");

// Open sidebar on hamburger click
hamburger.addEventListener("click", () => {
    sidebar.style.left = "0";
});

// Close sidebar on close button click
closeBtn.addEventListener("click", () => {
    sidebar.style.left = "-270px";
});

// Close sidebar when any link is clicked
document.querySelectorAll("#sidebar a").forEach(link => {
    link.addEventListener("click", () => {
        sidebar.style.left = "-270px";
    });
});
