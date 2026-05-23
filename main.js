/* Premium Animations and Interactions for SVCC */

document.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initial Loading Animation
    const t1 = gsap.timeline();

    t1.to('.hero-reveal', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 0.5
    })
        .to('.stat-item', {
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: 'power2.out'
        }, '-=0.8');


    // Reveal Animations on Scroll
    const revealUps = document.querySelectorAll('.reveal-up');
    revealUps.forEach(el => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Section reveal logic
    gsap.utils.toArray('.reveal-left').forEach(el => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 80%',
            },
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: 'power4.out'
        });
    });

    gsap.utils.toArray('.reveal-right').forEach(el => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 80%',
            },
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: 'power4.out',
            stagger: 0.2
        });
    });

    // Bento Cards Entrance
    gsap.from('.bento-card', {
        scrollTrigger: {
            trigger: '#services',
            start: 'top 60%',
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power4.out'
    });

    // Counter Animation for Stats
    const stats = [
        { el: '.stat-item:nth-child(1) .font-extrabold', val: 5 },
        { el: '.stat-item:nth-child(2) .font-extrabold', val: 1200 },
        { el: '.stat-item:nth-child(4) .font-extrabold', val: 99 }
    ];

    stats.forEach(stat => {
        const element = document.querySelector(stat.el);
        if (element) {
            ScrollTrigger.create({
                trigger: element,
                start: 'top 90%',
                onEnter: () => {
                    gsap.to(element, {
                        innerText: stat.val,
                        duration: 2,
                        snap: { innerText: 1 },
                        ease: 'power2.out',
                        onUpdate: function () {
                            if (stat.el.includes('1')) element.innerHTML = Math.ceil(this.targets()[0].innerText) + '+ <span class="text-white/20 text-xl">Yrs</span>';
                            else if (stat.el.includes('2')) element.innerHTML = Math.ceil(this.targets()[0].innerText) + '+';
                            else element.innerHTML = Math.ceil(this.targets()[0].innerText) + '%';
                        }
                    });
                }
            });
        }
    });

    // Workflow Steps Animation
    if (document.querySelector('.step-card')) {
        gsap.to('.step-card', {
            scrollTrigger: {
                trigger: '.step-card',
                start: 'top 80%',
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out'
        });
    }

    // Progress Line Animation
    if (document.getElementById('progress-line')) {
        gsap.to('#progress-line', {
            scrollTrigger: {
                trigger: '.step-card',
                start: 'top 80%',
                end: 'bottom 20%',
                scrub: true
            },
            width: '100%'
        });
    }

    // Testimonial Cards Animation
    if (document.querySelector('.testimonial-card')) {
        gsap.to('.testimonial-card, .bg-surface.rounded-\\[3\\.5rem\\]', {
            scrollTrigger: {
                trigger: '.max-w-7xl',
                start: 'top 70%',
            },
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out'
        });
    }


    // Sticky Header Evolution
    ScrollTrigger.create({
        start: 'top top',
        onUpdate: (self) => {
            const header = document.getElementById('main-header');
            if (self.scroll() > 100) {
                header.classList.add('py-3', 'bg-background/90');
                header.classList.remove('py-5', 'bg-background/50');
            } else {
                header.classList.remove('py-3', 'bg-background/90');
                header.classList.add('py-5', 'bg-background/50');
            }
        }
    });

    // Footer Logo Evolution
    gsap.from('footer span.italic', {
        scrollTrigger: {
            trigger: 'footer',
            start: 'top 90%',
        },
        letterSpacing: '1em',
        opacity: 0,
        duration: 2,
        ease: 'power4.out'
    });

    // Premium Interaction: Mouse Tilt for Bento Cards
    document.querySelectorAll('.bento-card, .testimonial-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const tiltX = (y - centerY) / 20;
            const tiltY = (centerX - x) / 20;

            gsap.to(card, {
                rotateX: tiltX,
                rotateY: tiltY,
                duration: 0.5,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });
});
