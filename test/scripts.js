
window.onload = function () {
    function adjust_menu(x) {
        if (x.matches) {
            document.getElementById('menu-div2').classList.remove('pure-menu-horizontal');
            document.getElementById('menu-div1').classList.remove('top-menu');
            document.getElementsByTagName('body')[0].style.paddingTop = 0;
            document.getElementById('menu-div2').classList.add('custom-restricted-width');
        } else {
            document.getElementById('menu-div2').classList.add('pure-menu-horizontal');
            document.getElementById('menu-div1').classList.add('top-menu');
            document.getElementsByTagName('body')[0].style.paddingTop = '48px';
            document.getElementById('menu-div2').classList.remove('custom-restricted-width');
        }
    }

    var x = window.matchMedia('(min-width: 48em)')
    adjust_menu(x)
    x.addListener(adjust_menu)
}
