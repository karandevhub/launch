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
}, "-=0.5");

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
    opacity: 1,
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

// Add this function for smooth number animation
function animateValue(element, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (range * progress));
        if (element.id === 'days') {
            element.textContent = current < 100 ? current : current.toString().padStart(3, '0');
        } else {
            element.textContent = current.toString().padStart(2, '0');
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Update the countdown function
function updateCountdown() {
    const launchDate = new Date("February 7, 2025 00:00:00").getTime();
    const now = new Date().getTime();
    const distance = launchDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Get current values
    const currentDays = parseInt(document.getElementById("days").textContent) || 0;
    const currentHours = parseInt(document.getElementById("hours").textContent) || 0;
    const currentMinutes = parseInt(document.getElementById("minutes").textContent) || 0;
    const currentSeconds = parseInt(document.getElementById("seconds").textContent) || 0;

    // Animate each value if it's different
    if (currentDays !== days) {
        animateValue(document.getElementById("days"), currentDays, days, 500);
    }
    if (currentHours !== hours) {
        animateValue(document.getElementById("hours"), currentHours, hours, 500);
    }
    if (currentMinutes !== minutes) {
        animateValue(document.getElementById("minutes"), currentMinutes, minutes, 500);
    }
    if (currentSeconds !== seconds) {
        animateValue(document.getElementById("seconds"), currentSeconds, seconds, 500);
    }
}

// Add this after the countdown box animation
// Start the countdown
updateCountdown(); // Initial call
setInterval(updateCountdown, 1000); // Update every second

// Add a subtle pulse animation to countdown boxes
gsap.to(".countdown-box", {
    scale: 1.05,
    duration: 0.5,
    ease: "power2.inOut",
    yoyo: true,
    repeat: -1,
    stagger: {
        each: 0.2,
        repeat: -1
    }
});

// Newsletter form submission with validation
document.getElementById("notify-form").addEventListener("submit", async function(e) {
    e.preventDefault();
    const email = this.querySelector("input").value;
    
    if (validateEmail(email)) {
        try {
            // Call the API to submit the email
            const response = await fetch("https://snugerapi-930311461514.us-central1.run.app/api/userCount/increment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email }) // Send email in the request body
            });

            if (response.ok) {
                const data = await response.json();
                // Perform success animations or actions
                gsap.to(this.querySelector("button"), {
                    scale: 1.1,
                    duration: 0.2,
                    yoyo: true,
                    repeat: 1
                });
                alert("Thank you! You'll be the first to know when we launch!");
                this.reset();
            } else {
                // Handle server-side errors
                const errorData = await response.json();
                alert(`Error: ${errorData.message || "Something went wrong"}`);
            }
        } catch (error) {
            console.error("Error submitting the email:", error);
            alert("Failed to submit. Please try again later.");
        }
    } else {
        alert("Please enter a valid email address");
    }
});

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
} 