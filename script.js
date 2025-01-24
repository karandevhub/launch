// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Initial animations
const tl = gsap.timeline();

tl.from(".logo-container", {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: "power4.out"
})
.to(".tagline", {
    opacity: 1,
    duration: 1,
    ease: "power2.out"
})
.to(".sub-tagline", {
    opacity: 0.8,
    duration: 1,
    ease: "power2.out"
}, "-=0.5")
.from(".countdown-box", {
    scale: 0,
    opacity: 0,
    duration: 0.5,
    stagger: 0.2,
    ease: "back.out(1.7)"
});

// Animate feature cards
const featureCards = gsap.utils.toArray('.feature-card');
featureCards.forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.2,
        ease: "power3.out"
    });

    // Animate icon container
    gsap.from(card.querySelector('.icon-container'), {
        scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
        },
        scale: 0,
        rotation: -45,
        duration: 1,
        delay: i * 0.2 + 0.3,
        ease: "back.out(1.7)"
    });

    // Animate list items
    const listItems = card.querySelectorAll('.feature-list li');
    listItems.forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: card,
                start: "top bottom-=100",
            },
            x: -20,
            opacity: 0,
            duration: 0.5,
            delay: i * 0.2 + 0.5 + (index * 0.1),
            ease: "power2.out"
        });
    });
});

// Animate newsletter section
gsap.from(".newsletter", {
    scrollTrigger: {
        trigger: ".newsletter",
        start: "top center+=100",
        toggleActions: "play none none reverse"
    },
    y: 50,
    opacity: 0,
    duration: 1
});

// Animate floating circles
const circles = document.querySelectorAll('.circle');
circles.forEach((circle, index) => {
    const size = Math.random() * 300 + 100;
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    
    gsap.to(circle, {
        x: "random(-50, 50)",
        y: "random(-50, 50)",
        duration: "random(15, 25)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 2
    });
});

// Countdown Timer
function updateCountdown() {
    const launchDate = new Date("February 7, 2025 00:00:00").getTime();
    const now = new Date().getTime();
    const distance = launchDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Remove leading zeros for days if it's less than 100
    document.getElementById("days").innerHTML = days < 100 ? days : days.toString().padStart(3, '0');
    document.getElementById("hours").innerHTML = hours.toString().padStart(2, '0');
    document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, '0');
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Newsletter form submission with validation
document.getElementById("notify-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const email = this.querySelector("input").value;
    
    if (validateEmail(email)) {
        // Add your email collection logic here
        gsap.to(this.querySelector("button"), {
            scale: 1.1,
            duration: 0.2,
            yoyo: true,
            repeat: 1
        });
        alert("Thank you! You'll be the first to know when we launch!");
        this.reset();
    } else {
        alert("Please enter a valid email address");
    }
});

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
} 