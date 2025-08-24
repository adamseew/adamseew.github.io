document.addEventListener('DOMContentLoaded', function() {
    var plane = document.getElementById('plane');
    if (!plane) return;

    var items = plane.getElementsByClassName('item');
    if (!items.length) return;

    var inner = document.querySelector('#left-home-article .inner');
    if (!inner) return;

    var scrollProgress = 0;
    var offsetStart = 0;

    function getInnerContentWidth(el) {
        var style = getComputedStyle(el);
        var paddingLeft = parseFloat(style.paddingLeft) || 0;
        var paddingRight = parseFloat(style.paddingRight) || 0;
        return el.clientWidth - paddingLeft - paddingRight;
    }

    function adjustPlane() {
        var contentWidth = getInnerContentWidth(inner);

        plane.style.width = contentWidth * items.length + 'px';

        var distance = 0;
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.style.width = contentWidth + 'px';
            var img = item.querySelector('img');
            var legend = item.querySelector('.img-info');
            if (img) img.style.width = contentWidth + 'px';
            if (legend) legend.style.width = contentWidth + 'px';
            distance = distance + item.offsetLeft;
        }
        plane.style.left = -distance * scrollProgress + 'px';
    }

    function adjustSectionHeight() {
        var section = document.querySelector('.section');
        if (!section) return;

        var imgDiv = section.querySelector('#img1');
        if (!imgDiv) return;

        var totalHeight = imgDiv.offsetHeight + 60;

        section.style.height = totalHeight + 'px';
    }

    adjustPlane();
    adjustSectionHeight();

    window.addEventListener('resize', function() {
        adjustPlane();
        adjustSectionHeight();
    });

    new ResizeObserver(adjustPlane).observe(inner);
    new ResizeObserver(adjustSectionHeight).observe(document.querySelector('.section'));

    window.addEventListener('wheel', function(e) {
        var delta = e.deltaY;
        var scrollY = window.scrollY || document.documentElement.scrollTop;
        var distance = items[1].offsetLeft - items[0].offsetLeft;

        if (delta > 0 && scrollY >= offsetStart && scrollProgress < 1) {
            scrollProgress += delta / distance;
            scrollProgress = Math.min(1, scrollProgress);
            plane.style.left = -distance * scrollProgress + 'px';
            e.preventDefault();
        } else if (delta < 0 && scrollProgress > 0 && scrollY <= offsetStart) {
            scrollProgress += delta / distance;
            scrollProgress = Math.max(0, scrollProgress);
            plane.style.left = -distance * scrollProgress + 'px';
            e.preventDefault();
        }
    }, { passive: false });
});
