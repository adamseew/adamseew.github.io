
function ready(callback){
    // in case the document is already rendered
    if (document.readyState!='loading') 
        callback();

    // modern browsers
    else if (document.addEventListener) 
        document.addEventListener('DOMContentLoaded', callback);

    // IE <= 8
    else document.attachEvent('onreadystatechange', function(){
        if (document.readyState=='complete') callback();
    });
}

function filter(){
    if (document.getElementById('journal').checked) { 
        var divsToHide = document.getElementsByClassName("journal-entry");
        for(var i = 0; i < divsToHide.length; i++){
            divsToHide[i].style.display = "flex";
        }
    } else {
        var divsToHide = document.getElementsByClassName("journal-entry");
        for(var i = 0; i < divsToHide.length; i++){
            divsToHide[i].style.display = "none";
        }
    }
    if (document.getElementById('conference').checked) { 
        var divsToHide = document.getElementsByClassName("conference-entry");
        for(var i = 0; i < divsToHide.length; i++){
            divsToHide[i].style.display = "flex";
        }
    } else {
        var divsToHide = document.getElementsByClassName("conference-entry");
        for(var i = 0; i < divsToHide.length; i++){
            divsToHide[i].style.display = "none";
        }
    }
    if (document.getElementById('others').checked) { 
        var divsToHide = document.getElementsByClassName("others-entry");
        for(var i = 0; i < divsToHide.length; i++){
            divsToHide[i].style.display = "flex";
        }
    } else {
        var divsToHide = document.getElementsByClassName("others-entry");
        for(var i = 0; i < divsToHide.length; i++){
            divsToHide[i].style.display = "none";
        }
    }
    if (document.getElementById('details').checked) { 
        var divsToHide = document.getElementsByClassName("authors-entry");
        var divsToHide2 = document.getElementsByClassName("details-entry");
        for(var i = 0; i < divsToHide.length; i++){
            divsToHide[i].style.display = "block";
            divsToHide2[i].style.display = "block";
        }
    } else {
        var divsToHide = document.getElementsByClassName("authors-entry");
        var divsToHide2 = document.getElementsByClassName("details-entry");
        for(var i = 0; i < divsToHide.length; i++){
            divsToHide[i].style.display = "none";
            divsToHide2[i].style.display = "none";
        }
    }
}

ready(function(){

    var _menu_link = document.getElementsByClassName("pure-menu-link");
    for(var i = 0; i < _menu_link.length; i++){
        _menu_link[i].setAttribute('alt', _menu_link[i].innerHTML);
    }

    var auto_hide = true;

    var menu_width = '20%'; //pure-u-md-1-5
    var article_width = '80%'; //pure-u-md-4-5

    function expand_menu() {
        document.getElementsByClassName("pure-u-md-1-5")[0].style.width = menu_width;
        document.getElementsByClassName("pure-u-md-4-5")[0].style.width = article_width;
        var menu_link = document.getElementsByClassName("pure-menu-link");
        for(var i = 0; i < menu_link.length; i++){
            menu_link[i].innerHTML = menu_link[i].getAttribute('alt');
        }
    }

    var is_in_menu;
    var is_in_header;
    document.getElementById("menu-div1").addEventListener("mouseover", function() { is_in_menu = true; });
    document.getElementById("menu-header").addEventListener("mouseover", function() { is_in_header = true; });
    document.getElementById("menu-div1").addEventListener("mouseout", function() { is_in_menu = false; });
    document.getElementById("menu-header").addEventListener("mouseout", function() { is_in_header = false; });

    function shrink_menu() {
        if (is_in_header || is_in_menu) 
            return;

        document.getElementsByClassName("pure-u-md-1-5")[0].style.transition = 'all 300ms ease';
        document.getElementsByClassName("pure-u-md-4-5")[0].style.transition = 'all 300ms ease';
        document.getElementsByClassName("pure-u-md-1-5")[0].style.width = "4.6em";
        document.getElementsByClassName("pure-u-md-4-5")[0].style.width = 'calc(100% - 4.6em)';
        var menu_link = document.getElementsByClassName("pure-menu-link");
        for(var i = 0; i < menu_link.length; i++){
            menu_link[i].innerHTML = '[ ' + menu_link[i].innerHTML[2] + ' ]';
        }
    }

    document.getScroll = function() {
        if (window.pageYOffset != undefined) {
            return [pageXOffset, pageYOffset];
        } else {
            var sx, sy, d = document,
                r = d.documentElement,
                b = d.body;
            sx = r.scrollLeft || b.scrollLeft || 0;
            sy = r.scrollTop || b.scrollTop || 0;
            return [sx, sy];
        }
    }

    function adjust_menu(x) {
        if (x.matches) {
            auto_hide = true;
            document.getElementsByClassName("pure-u-md-4-5")[0].style.width = article_width;

            document.getElementById('menu-div2').classList.remove('pure-menu-horizontal');
            document.getElementById('menu-div2').classList.remove('pure-menu-scrollable');
            document.getElementById('menu-div1').classList.remove('top-menu');
            document.getElementsByTagName('body')[0].style.paddingTop = 0;
            document.getElementById('menu-div2').classList.add('custom-restricted-width');
            document.getElementsByTagName('nav')[0].style.padding = '16px 0 16px 0';
        } else {
            auto_hide = false;
            document.getElementsByClassName("pure-u-md-1-5")[0].style.transition = 'none';
            document.getElementsByClassName("pure-u-md-4-5")[0].style.transition = 'none';
            document.getElementsByClassName("pure-u-md-1-5")[0].removeEventListener('mouseover', expand_menu);
            document.getElementsByClassName("pure-u-md-4-5")[0].removeEventListener('mouseover', shrink_menu);
            expand_menu();
            document.getElementsByClassName("pure-u-md-4-5")[0].style.width = '100%';
            document.getElementById('menu-div2').classList.add('pure-menu-horizontal');
            document.getElementById('menu-div2').classList.add('pure-menu-scrollable');
            document.getElementById('menu-div1').classList.add('top-menu');
            document.getElementsByTagName('body')[0].style.paddingTop = '48px';
            document.getElementById('menu-div2').classList.remove('custom-restricted-width');
            document.getElementsByTagName('nav')[0].style.padding = '2.6px 16px';
        }
    }

    var x = window.matchMedia('(min-width: 48em)');
    adjust_menu(x);
    x.addListener(adjust_menu);

    window.onscroll = function(){ 
        // check if the 'mobile menu' is on
        if (!auto_hide)
            return;
        if (window.pageYOffset <= 0) {
            document.getElementsByClassName("pure-u-md-1-5")[0].removeEventListener('mouseover', expand_menu);
            document.getElementsByClassName("pure-u-md-4-5")[0].removeEventListener('mouseover', shrink_menu);
            expand_menu();
        } else if (window.pageYOffset > 0) {
            document.getElementsByClassName("pure-u-md-1-5")[0].addEventListener('mouseover', expand_menu);
            document.getElementsByClassName("pure-u-md-4-5")[0].addEventListener('mouseover', shrink_menu);
            shrink_menu();
        }
    };
});
