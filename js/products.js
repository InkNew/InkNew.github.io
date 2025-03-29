document.addEventListener('DOMContentLoaded', function() {
    // 产品分类导航平滑滚动
    const categoryLinks = document.querySelectorAll('.product-categories a');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有active类
            categoryLinks.forEach(item => item.classList.remove('active'));
            
            // 添加当前active类
            this.classList.add('active');
            
            // 获取目标区块
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if(targetSection) {
                // 计算偏移量（考虑固定导航栏高度）
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const categoryNavHeight = document.querySelector('.product-categories').offsetHeight;
                const offset = navbarHeight + categoryNavHeight + 20;
                
                // 平滑滚动
                window.scrollTo({
                    top: targetSection.offsetTop - offset,
                    behavior: 'smooth'
                });
                
                // 更新URL
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // 滚动时高亮当前可见的产品分类
    const sections = document.querySelectorAll('.product-section');
    const observerOptions = {
        root: null,
        rootMargin: '-80px 0px -50% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const id = '#' + entry.target.id;
                categoryLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === id);
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // 产品卡片点击效果
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // 如果点击的是链接则不处理
            if(e.target.tagName === 'A' || e.target.parentElement.tagName === 'A') {
                return;
            }
            
            // 否则跳转到详情页
            const link = this.querySelector('a.product-btn');
            if(link) {
                window.location.href = link.href;
            }
        });
    });
});