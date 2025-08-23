function ready(callback) {
    if (document.readyState !== 'loading') callback();
    else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
    else document.attachEvent('onreadystatechange', function () {
        if (document.readyState === 'complete') callback();
    });
}
var imageURLs = { src: ["img3127.jpg","dsc06822.jpg"],
                  desc:["Me at IROS'22. Kyoto, Japan, 2022","Me in front of the Technical Faculty building. Odense, Denmark, 2020"],
                  alt: ["Adam Seewald's photo from IROS'22", "Adam Seewald's photo from Odense, Denmark"]};
function getImageTag() {
    var img = '<div id="index-img-div"><img class="pure-img" src="';
    var randomIndex = Math.floor(Math.random() * imageURLs.src.length);
    img += imageURLs.src[randomIndex];
    img += '" alt="'
    img += imageURLs.alt[randomIndex];
    img += '"></div><div class="img-info"><i class="fa fa-circle-info"></i> ';
    img += imageURLs.desc[randomIndex];
    img += '</div>';
    return img;
}
function toggleEntries(type, display) {
    var divs = document.getElementsByClassName(type + "-entry");
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.display = display;
    }
}
function filter() {
    toggleEntries("journal", document.getElementById('journal').checked ? "flex" : "none");
    toggleEntries("conference", document.getElementById('conference').checked ? "flex" : "none");
    toggleEntries("others", document.getElementById('others').checked ? "flex" : "none");
    if (document.getElementById('details').checked) {
        toggleEntries("authors", "block");
        toggleEntries("details", "block");
    } else {
        toggleEntries("authors", "none");
        toggleEntries("details", "none");
    }
}
ready(function () {
    var menuLinks = document.getElementsByClassName("pure-menu-link");
    for (var i = 0; i < menuLinks.length; i++) {
        menuLinks[i].setAttribute('alt', menuLinks[i].innerHTML);
    }
    var autoHide = true;
    var menuWidth = '20%';
    var articleWidth = '80%';
    var isExpanded = false;
    function expandMenu() {
        document.getElementsByClassName("pure-u-md-1-5")[0].style.width = menuWidth;
        document.getElementsByClassName("pure-u-md-4-5")[0].style.width = articleWidth;
        var menuLink = document.getElementsByClassName("pure-menu-link");
        for (var i = 0; i < menuLink.length; i++) {
            menuLink[i].innerHTML = menuLink[i].getAttribute('alt');
        }
        isExpanded = true;
    }
    var isInMenu;
    var isInHeader;
    document.getElementById("menu-div1").addEventListener("mouseover", function () {
        isInMenu = true;
    });
    document.getElementById("menu-header").addEventListener("mouseover", function () {
        isInHeader = true;
    });
    document.getElementById("menu-div1").addEventListener("mouseout", function () {
        isInMenu = false;
    });
    document.getElementById("menu-header").addEventListener("mouseout", function () {
        isInHeader = false;
    });
    function shrinkMenu() {
        if (isInHeader || isInMenu) return;
        document.getElementsByClassName("pure-u-md-1-5")[0].style.transition = 'all 300ms ease';
        document.getElementsByClassName("pure-u-md-4-5")[0].style.transition = 'all 300ms ease';
        document.getElementsByClassName("pure-u-md-1-5")[0].style.width = "4.6em";
        document.getElementsByClassName("pure-u-md-4-5")[0].style.width = 'calc(100% - 4.6em)';
        var menuLink = document.getElementsByClassName("pure-menu-link");
        for (var i = 0; i < menuLink.length; i++) {
            menuLink[i].innerHTML = '[ ' + menuLink[i].innerHTML[2] + ' ]';
        }
        isExpanded = false;
    }
    document.getScroll = function () {
        if (window.pageYOffset !== undefined) {
            return [pageXOffset, pageYOffset];
        } else {
            var sx, sy, d = document, r = d.documentElement, b = d.body;
            sx = r.scrollLeft || b.scrollLeft || 0;
            sy = r.scrollTop || b.scrollTop || 0;
            return [sx, sy];
        }
    }
    function viewport() {
        var windowObject = window, dimension = 'inner';
        if (!('innerWidth' in windowObject)) {
            dimension = 'client';
            windowObject = document.documentElement || document.body;
        }
        return {
            width: windowObject[dimension + 'Width'],
            height: windowObject[dimension + 'Height']
        };
    }
    var viewportWidth = viewport().width;
    function fixViewport() {
        if (viewport().width > 768) {
            autoHide = true;
            document.getElementById('menu-header').classList.remove('header-shadow');
            document.getElementById('menu-header').classList.add('header-fixed');
            document.getElementsByClassName("pure-u-md-4-5")[0].style.width = articleWidth;
            document.getElementById('menu-div2').classList.remove('pure-menu-horizontal');
            document.getElementById('menu-div2').classList.remove('pure-menu-scrollable');
            document.getElementById('menu-div1').classList.remove('top-menu');
            document.getElementsByTagName('body')[0].style.paddingTop = 0;
            document.getElementById('menu-div2').classList.add('custom-restricted-width');
        } else {
            autoHide = false;
            if (window.pageYOffset <= 0)
                document.getElementById('menu-header').classList.remove('header-shadow');
            else
                document.getElementById('menu-header').classList.add('header-shadow');
            document.getElementById('menu-header').classList.remove('header-fixed');
            document.getElementsByClassName("pure-u-md-1-5")[0].style.transition = 'none';
            document.getElementsByClassName("pure-u-md-4-5")[0].style.transition = 'none';
            document.getElementsByClassName("pure-u-md-1-5")[0].removeEventListener('mouseover', expandMenu);
            document.getElementsByClassName("pure-u-md-4-5")[0].removeEventListener('mouseover', shrinkMenu);
            expandMenu();
            document.getElementsByClassName("pure-u-md-4-5")[0].style.width = '100%';
            document.getElementById('menu-div2').classList.add('pure-menu-horizontal');
            document.getElementById('menu-div2').classList.add('pure-menu-scrollable');
            document.getElementById('menu-div1').classList.add('top-menu');
            document.getElementsByTagName('body')[0].style.paddingTop = '48px';
            document.getElementById('menu-div2').classList.remove('custom-restricted-width');
        }
    }
    function fixScroll() {
        if (!autoHide) {
            document.getElementById('menu-header').classList.remove('header-fixed');
            if (window.pageYOffset <= 0)
                document.getElementById('menu-header').classList.remove('header-shadow');
            else
                document.getElementById('menu-header').classList.add('header-shadow');
            return;
        }
        document.getElementById('menu-header').classList.remove('header-shadow');
        document.getElementById('menu-header').classList.add('header-fixed');
        if (window.pageYOffset <= 0) {
            document.getElementsByClassName("pure-u-md-1-5")[0].removeEventListener('mouseover', expandMenu);
            document.getElementsByClassName("pure-u-md-4-5")[0].removeEventListener('mouseover', shrinkMenu);
            expandMenu();
        } else {
            document.getElementsByClassName("pure-u-md-1-5")[0].addEventListener('mouseover', expandMenu);
            document.getElementsByClassName("pure-u-md-4-5")[0].addEventListener('mouseover', shrinkMenu);
            shrinkMenu();
        }
    }
    window.onresize = function () {
        fixViewport();
        if (autoHide) {
            if (viewportWidth < viewport().width)
                expandMenu();
            else if (viewportWidth > viewport().width)
                shrinkMenu();
            else {
                if (isExpanded) expandMenu();
                else shrinkMenu();
            }
        }
        viewportWidth = viewport().width;
    };
    fixViewport();
    var mediaMatch = window.matchMedia('(min-width: 768px)');
    mediaMatch.addListener(fixViewport);
    window.onscroll = function () {
        fixScroll();
    };
});