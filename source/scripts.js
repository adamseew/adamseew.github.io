
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
            divsToHide[i].style.display = "block";
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
            divsToHide[i].style.display = "block";
        }
    } else {
        var divsToHide = document.getElementsByClassName("conference-entry");
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

    function adjust_menu(x) {

        if (x.matches) {

            document.getElementById('menu-div2').classList.remove('pure-menu-horizontal');
            document.getElementById('menu-div2').classList.remove('pure-menu-scrollable');
            document.getElementById('menu-div1').classList.remove('top-menu');
            document.getElementsByTagName('body')[0].style.paddingTop = 0;
            document.getElementById('menu-div2').classList.add('custom-restricted-width');
            document.getElementsByTagName('nav')[0].style.padding = '16px';

        } else {

            document.getElementById('menu-div2').classList.add('pure-menu-horizontal');
            document.getElementById('menu-div2').classList.add('pure-menu-scrollable');
            document.getElementById('menu-div1').classList.add('top-menu');
            document.getElementsByTagName('body')[0].style.paddingTop = '48px';
            document.getElementById('menu-div2').classList.remove('custom-restricted-width');
            document.getElementsByTagName('nav')[0].style.padding = '6px 16px';

        }
    }

    var x = window.matchMedia('(min-width: 48em)')
    adjust_menu(x)
    x.addListener(adjust_menu)
});

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-148887878-1');
