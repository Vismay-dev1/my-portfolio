document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle icon (optional: switch between menu and x)
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.setAttribute('data-lucide', 'x');
                } else {
                    icon.setAttribute('data-lucide', 'menu');
                }
                lucide.createIcons();
            }
        });

        // Close menu when a link is clicked
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            });
        });
    }

    // 2. Navbar Scroll Effect & Active Link Highlight
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Navbar background
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link highlight
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });

    // 3. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 4. Parallax Effect for Background Blobs
    const blob1 = document.querySelector('.blob-1');
    const blob2 = document.querySelector('.blob-2');

    window.addEventListener('mousemove', (e) => {
        if (window.matchMedia("(hover: hover)").matches) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            if(blob1 && blob2) {
                blob1.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
                blob2.style.transform = `translate(-${x * 40}px, -${y * 40}px)`;
            }
        }
    });

    // 5. Improved Visitor Counter with Multiple Fallbacks
    const counterElement = document.getElementById('counter-value');
    if (counterElement) {
        // Function to update counter display
        function updateCounterDisplay(count) {
            counterElement.innerText = count.toLocaleString();
        }

        // Function to get visitor count from localStorage
        function getLocalVisitorCount() {
            let count = localStorage.getItem('visitorCount') || '100';
            return parseInt(count);
        }

        // Function to increment and save visitor count
        function incrementVisitorCount() {
            let count = getLocalVisitorCount();
            count++;
            localStorage.setItem('visitorCount', count.toString());
            return count;
        }

        // Primary: Try using CountAPI
        fetch('https://api.countapi.xyz/hit/vismay-portfolio-unique/visits')
            .then(res => res.json())
            .then(data => {
                if (data && data.value) {
                    updateCounterDisplay(data.value);
                } else {
                    throw new Error('Invalid CountAPI response');
                }
            })
            .catch(err => {
                console.warn('CountAPI failed, using localStorage fallback:', err);
                // Fallback: Use localStorage and increment
                const count = incrementVisitorCount();
                updateCounterDisplay(count);
            });
    }

    // 6. Resume Generation
    const generateBtn = document.getElementById('generate-resume');
    const resumeContent = document.getElementById('resume-content');
    
    if (generateBtn && resumeContent) {
        generateBtn.addEventListener('click', () => {
            const opt = {
                margin: 0.5,
                filename: 'Vismay_Resume.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };
            
            // Temporary background to ensure PDF renders the dark theme clearly
            const originalBg = resumeContent.style.backgroundColor;
            resumeContent.style.backgroundColor = '#0a0a0f';
            
            html2pdf().set(opt).from(resumeContent).save().then(() => {
                resumeContent.style.backgroundColor = originalBg; 
            });
        });
    }

    // 7. Typing Animation
    const typeElements = document.querySelectorAll('.typing-text');
    
    const typeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('typed')) {
                const el = entry.target;
                const text = el.getAttribute('data-text');
                el.classList.add('typed');
                
                let i = 0;
                el.innerHTML = '';
                
                const typeInterval = setInterval(() => {
                    if (i < text.length) {
                        el.innerHTML += text.charAt(i);
                        i++;
                    } else {
                        clearInterval(typeInterval);
                    }
                }, 100);
            }
        });
    }, { threshold: 0.5 });
    
    typeElements.forEach(el => typeObserver.observe(el));
});
