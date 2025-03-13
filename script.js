// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 导航菜单切换
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // 导航链接点击关闭菜单
    navLinksItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });
    
    // 滚动时导航栏样式变化
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const scrollTop = document.querySelector('.scroll-top');
        
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            if (scrollTop) scrollTop.classList.add('active');
        } else {
            navbar.classList.remove('scrolled');
            if (scrollTop) scrollTop.classList.remove('active');
        }
        
        // 激活当前导航链接
        activateNavOnScroll();
    });
    
    // 返回顶部按钮
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // 平滑滚动到锚点
    const navbarLinks = document.querySelectorAll('.nav-link');
    
    navbarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 激活当前导航链接
    function activateNavOnScroll() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            
            if (window.scrollY >= (sectionTop - navbarHeight - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // 技能进度条动画
    const skillsSection = document.querySelector('.skills');
    const progressBars = document.querySelectorAll('.skill-progress');
    
    function showProgress() {
        progressBars.forEach(progress => {
            const value = progress.getAttribute('data-progress');
            progress.style.width = `${value}%`;
        });
    }
    
    function hideProgress() {
        progressBars.forEach(progress => {
            progress.style.width = 0;
        });
    }
    
    // 初始隐藏进度条
    hideProgress();
    
    // 监听滚动，当技能部分可见
    window.addEventListener('scroll', function() {
        const skillsPosition = skillsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (skillsPosition < screenPosition) {
            showProgress();
        } else {
            hideProgress();
        }
    });
    
    // 作品筛选功能
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有按钮的active类
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // 为当前点击的按钮添加active类
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filter === 'all') {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = 1;
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    if (item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = 1;
                            item.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        item.style.opacity = 0;
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
    
    // 为作品项添加初始样式
    portfolioItems.forEach(item => {
        item.style.transition = 'all 0.3s ease';
        item.style.opacity = 1;
        item.style.transform = 'scale(1)';
    });
    
    // 表单提交处理
    const contactForm = document.querySelector('#contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 简单表单验证
            let isValid = true;
            const inputs = this.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.style.boxShadow = '0 0 0 2px #f50057';
                } else {
                    input.style.boxShadow = 'none';
                }
                
                // 邮箱验证
                if (input.type === 'email' && input.value.trim()) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(input.value.trim())) {
                        isValid = false;
                        input.style.boxShadow = '0 0 0 2px #f50057';
                    }
                }
            });
            
            if (isValid) {
                // 这里可以添加表单提交逻辑，如AJAX请求等
                alert('感谢您的留言！我会尽快回复您。');
                this.reset();
            } else {
                alert('请正确填写所有必填字段！');
            }
        });
        
        // 输入时移除错误样式
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                this.style.boxShadow = 'none';
            });
        });
    }
    
    // 添加页面加载动画
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // 添加滚动动画
    const animateElements = document.querySelectorAll('.about-content, .skills-content, .portfolio-item, .contact-content');
    
    function checkScroll() {
        animateElements.forEach(el => {
            const elementPosition = el.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                el.classList.add('animate');
            }
        });
    }
    
    // 初始检查
    checkScroll();
    
    // 滚动时检查
    window.addEventListener('scroll', checkScroll);
});