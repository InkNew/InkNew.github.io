document.addEventListener('DOMContentLoaded', function() {
    // 移动菜单切换
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const menu = document.querySelector('.menu');
    
    menuBtn.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        menu.classList.toggle('active');
    });
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // 更新URL哈希
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // 预加载关键图片
    const preloadImages = () => {
        const images = [
            'assets/img/logo.png',
            'assets/img/logo-white.png',
            'assets/img/banner.jpg'
        ];
        
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    };
    
    // 延迟加载非关键资源
    const lazyLoad = () => {
        if ('IntersectionObserver' in window) {
            const lazyImages = document.querySelectorAll('img[loading="lazy"]');
            
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.removeAttribute('loading');
                        observer.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    };
    
    // 客户Logo动画
    const animateClientLogos = () => {
        const clientLogos = document.querySelectorAll('.client-logo');
        
        clientLogos.forEach(logo => {
            logo.addEventListener('mouseenter', () => {
                logo.style.transform = 'scale(1.05)';
            });
            
            logo.addEventListener('mouseleave', () => {
                logo.style.transform = 'scale(1)';
            });
        });
    };
    
    // 初始化函数
    const init = () => {
        preloadImages();
        lazyLoad();
        animateClientLogos();
    };
    
    init();
});