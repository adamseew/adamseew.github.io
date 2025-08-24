document.addEventListener('DOMContentLoaded', function() {
    const plane = document.getElementById('plane');
    if (!plane) return;

    const items = plane.getElementsByClassName('item');
    if (!items.length) return;

    const inner = document.querySelector('#left-home-article .inner');
    if (!inner) return;

    let scrollProgress = 0;
    let distance = 0;
    const touchSpeed = 1.5;

    function getInnerContentWidth(el) {
        const style = getComputedStyle(el);
        const paddingLeft = parseFloat(style.paddingLeft) || 0;
        const paddingRight = parseFloat(style.paddingRight) || 0;
        return el.clientWidth - paddingLeft - paddingRight;
    }

    function adjustPlaneBeforeImageLoad() {
        const contentWidth = getInnerContentWidth(inner);

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const img = item.querySelector('img');
            const legend = item.querySelector('.img-info');

            item.style.width = contentWidth + 'px';
            if (img) {
                img.style.width = contentWidth + 'px';
                img.style.height = 'auto';
                img.style.maxHeight = '500px';
            }
            if (legend) legend.style.width = contentWidth + 'px';
        }

        plane.style.width = contentWidth * items.length + 'px';
        if (items.length > 1) {
            distance = items[1].offsetLeft - items[0].offsetLeft;
        }
        plane.style.left = -distance * scrollProgress + 'px';

        const section = document.querySelector('.section');
        if (section) {
            let maxHeight = 0;
            for (let i = 0; i < items.length; i++) {
                const img = items[i].querySelector('img');
                if (img) maxHeight = Math.max(maxHeight, Math.min(img.naturalHeight * (contentWidth / img.naturalWidth), 500));
            }
            section.style.height = (maxHeight + 60) + 'px';
        }
    }

    function adjustPlane() {
        const contentWidth = getInnerContentWidth(inner);

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const img = item.querySelector('img');
            const legend = item.querySelector('.img-info');

            item.style.width = contentWidth + 'px';
            if (img) img.style.width = contentWidth + 'px';
            if (legend) legend.style.width = contentWidth + 'px';
        }

        plane.style.width = contentWidth * items.length + 'px';
        if (items.length > 1) {
            distance = items[1].offsetLeft - items[0].offsetLeft;
        }
        plane.style.left = -distance * scrollProgress + 'px';
    }

    function adjustSectionHeight() {
        const section = document.querySelector('.section');
        if (!section) return;

        const imgDiv = section.querySelector('#img1');
        if (!imgDiv) return;

        section.style.height = (imgDiv.offsetHeight + 60) + 'px';
    }

    function initParallax() {
        adjustPlaneBeforeImageLoad();
        adjustPlane();
        adjustSectionHeight();
    }

    if (document.readyState === 'complete') {
        initParallax();
    } else {
        window.addEventListener('load', initParallax);
    }

    window.addEventListener('resize', function() {
        adjustPlane();
        adjustSectionHeight();
    });

    new ResizeObserver(adjustPlane).observe(inner);
    new ResizeObserver(adjustSectionHeight).observe(document.querySelector('.section'));

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

    window.addEventListener('touchstart', function(e) {
        lastTouchY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchmove', function(e) {
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