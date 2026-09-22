document.getElementById('year').textContent = new Date().getFullYear();

const nav = document.getElementById('nav');
window.addEventListener('scroll', function() {
    nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !reduceMotion) {
    document.documentElement.classList.add('reveal-anim');

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(function(el) { observer.observe(el); });
}

var heroH1 = document.querySelector('.hero-content h1');
var heroSub = document.querySelector('.hero-content .hero-sub');
var ticking = false;

if (!reduceMotion) {
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                var y = window.scrollY;
                if (y < 700) {
                    var fade = Math.max(0, 1 - y / 550);
                    var shift = y * 0.06;
                    heroH1.style.transform = 'translateY(' + shift + 'px)';
                    heroH1.style.opacity = fade;
                    heroSub.style.transform = 'translateY(' + (shift * 0.4) + 'px)';
                    heroSub.style.opacity = fade;
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}
