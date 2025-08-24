document.addEventListener('DOMContentLoaded', function() {
    const plane = document.getElementById('plane');
    if (!plane) return;

    const items = plane.getElementsByClassName('item');
    if (!items.length) return;

    const inner = document.querySelector('#left-home-article .inner');
    if (!inner) return;

    let scrollProgress = 0;
    let distance = 0;
    const touchSpeed = 2.0;
    const ASPECT_RATIO = 2092 / 1395;
    const MAX_WIDTH = 500;
    const imageObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const dataSrc = img.getAttribute('data-src');
                if (dataSrc) {
                    img.src = dataSrc;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    function getInnerContentWidth(el) {
        const style = getComputedStyle(el);
        const paddingLeft = parseFloat(style.paddingLeft) || 0;
        const paddingRight = parseFloat(style.paddingRight) || 0;
        return el.clientWidth - paddingLeft - paddingRight;
    }

    function calculateImageSize(contentWidth) {
        let width = contentWidth;
        if (width > MAX_WIDTH) width = MAX_WIDTH;
        const height = width / ASPECT_RATIO;
        return { width, height };
    }

    function adjustPlaneBeforeImageLoad() {
        const contentWidth = getInnerContentWidth(inner);
        const { width: imgWidth, height: imgHeight } = calculateImageSize(contentWidth);
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const img = item.querySelector('img');
            const legend = item.querySelector('.img-info');
            item.style.width = contentWidth + 'px';
            if (img) {
                img.style.width = imgWidth + 'px';
                img.style.height = imgHeight + 'px';

                const dataSrc = img.getAttribute('data-src');
                if (dataSrc) {
                    if (i === 0) {
                        img.src = dataSrc;
                        img.removeAttribute('data-src');
                    } else
                        imageObserver.observe(img);
                }
            }
            if (legend) legend.style.width = contentWidth + 'px';
        }
        plane.style.width = contentWidth * items.length + 'px';
        if (items.length > 1) distance = items[1].offsetLeft - items[0].offsetLeft;
        plane.style.left = -distance * scrollProgress + 'px';

        const section = document.querySelector('.section');
        if (section) section.style.height = (imgHeight + 40) + 'px';
    }

    function adjustPlane() {
        const contentWidth = getInnerContentWidth(inner);
        const { width: imgWidth, height: imgHeight } = calculateImageSize(contentWidth);
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const img = item.querySelector('img');
            const legend = item.querySelector('.img-info');
            item.style.width = contentWidth + 'px';
            if (img) {
                img.style.width = imgWidth + 'px';
                img.style.height = imgHeight + 'px';
            }
            if (legend) legend.style.width = contentWidth + 'px';
        }
        plane.style.width = contentWidth * items.length + 'px';
        if (items.length > 1) distance = items[1].offsetLeft - items[0].offsetLeft;
        plane.style.left = -distance * scrollProgress + 'px';
        const section = document.querySelector('.section');
        if (section) section.style.height = (imgHeight + 40) + 'px';
    }

    function initParallax() {
        adjustPlaneBeforeImageLoad();
        adjustPlane();
    }

    if (document.readyState === 'complete') {
        initParallax();
    } else {
        window.addEventListener('load', initParallax);
    }

    window.addEventListener('resize', adjustPlane);
    new ResizeObserver(adjustPlane).observe(inner);
    new ResizeObserver(adjustPlane).observe(document.querySelector('.section'));

    window.addEventListener('wheel', function(e) {
        const delta = e.deltaY;
        let handled = false;
        if (delta > 0 && scrollProgress < 1) {
            scrollProgress += delta / distance;
            scrollProgress = Math.min(1, scrollProgress);
            handled = true;
        } else if (delta < 0 && scrollProgress > 0 && window.scrollY === 0) {
            scrollProgress += delta / distance;
            scrollProgress = Math.max(0, scrollProgress);
            handled = true;
        }
        if (handled) {
            plane.style.left = -distance * scrollProgress + 'px';
            e.preventDefault();
        }
    }, { passive: false });

    let lastTouchY = 0;
    window.addEventListener('touchstart', e => { lastTouchY = e.touches[0].clientY; }, { passive: true });
    window.addEventListener('touchmove', e => {
        const touchY = e.touches[0].clientY;
        const delta = lastTouchY - touchY;
        lastTouchY = touchY;
        let handled = false;
        if (delta > 0 && scrollProgress < 1) {
            scrollProgress += (delta / distance) * touchSpeed;
            scrollProgress = Math.min(1, scrollProgress);
            handled = true;
        } else if (delta < 0 && scrollProgress > 0 && window.scrollY === 0) {
            scrollProgress += (delta / distance) * touchSpeed;
            scrollProgress = Math.max(0, scrollProgress);
            handled = true;
        }
        if (handled) {
            plane.style.left = -distance * scrollProgress + 'px';
            e.preventDefault();
        }
    }, { passive: false });
});