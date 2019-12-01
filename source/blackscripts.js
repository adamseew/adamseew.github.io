
var timeleft = 19;
var downloadTimer = setInterval(function(){
    document.getElementById("countdown").innerHTML = timeleft + "";
    timeleft -= 1;
    if(timeleft <= 0){
        clearInterval(downloadTimer);
        document.getElementById("countdown").innerHTML = "1"
    }
}, 1000);

function resize(){
    var body = document.body,
    html = document.documentElement;
    var height = Math.max( body.scrollHeight, body.offsetHeight, 
        html.clientHeight, html.scrollHeight, html.offsetHeight );
    
    if (height > document.getElementById("bb").offsetHeight) {
        document.getElementById("bb").style.marginTop = height/2 - document.getElementById("bb").offsetHeight/2 + "px";
    } else {
        document.getElementById("bb").style.marginTop = "0";
    }
}