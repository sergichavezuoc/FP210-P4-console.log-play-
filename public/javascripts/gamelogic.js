localStorage.removeItem("mycolor");
var user = JSON.parse(localStorage.getItem('User'));
if (user == null) { window.alert("This page requires validation"); window.location.href = "http://localhost:3000/"; }
if (user.isLogged == false) { window.alert("This page requires validation"); window.location.href = "http://localhost:3000/"; }
if (user.room1 == false && user.room2 == false & user.room3 == false) { window.alert("A Room has to be chosen"); window.location.href = "http://localhost:3000/game-app"; }
let room = "";
if (user.room1 == true) { room = "room1" };
if (user.room2 == true) { room = "room2" };
if (user.room3 == true) { room = "room3" };
let allowMovement= false;


$(function () {
    document.getElementById("head").innerHTML = "Welcome " + user.name + " to " + room;
    $('#my-avatar').attr('src', user.avatar);
    $(".canvas").on("click", makeMove);
});

/**
 * Left the game if the page is reload
 */
const pageAccessedByReload = (
    (window.performance.navigation && window.performance.navigation.type === 1) ||
    window.performance
        .getEntriesByType('navigation')
        .map((nav) => nav.type)
        .includes('reload')
);

if (pageAccessedByReload === true) {
    window.location.assign('/game-app');
    throw "Se para por recarga"
}

$(".canvas").css("cursor", "not-allowed");
$(".canvas").css("pointer-events", "none");
const webSocket = new WebSocket('ws://localhost:443/ws/?room=' + room + '&username=' + user.username);
let el;
function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1) {
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 100);
}
function unfade(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1) {
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 100);
}
webSocket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type == 'message') {
        console.log(data)
        if (data.message === "Start the game") {
            $(".canvas").css("cursor", "allowed");
            $(".canvas").css("pointer-events", "all");
            allowMovement=true;
        }

        el = document.getElementById('time');
        el.innerHTML = data.message;
        if (typeof data.yourcolor !== 'undefined') {
            $("#team1").css('background-color', 'hsl(' + data.yourcolor + ',50%,50%)');
            if (localStorage.getItem("mycolor") == null) {
                localStorage.setItem("mycolor", data.yourcolor);
            }
        }
        if (typeof data.opponentcolor !== 'undefined') {
            $("#team2").css('background-color', 'hsl(' + data.opponentcolor + ',50%,50%)');
            localStorage.setItem("opponentcolor", data.opponentcolor);
        }
    }
    if (data.type == 'movement') {
        $("#" + data.position).css('background-color', 'hsl(+' + data.color + ',50%,50%)');
        $("#" + data.position).addClass('' + data.color + '');
        $("#" + data.position).css("cursor", "not-allowed");
        $("#" + data.position).css("pointer-events", "none");
        var pTotal = Math.round(($('.' + localStorage.getItem("mycolor")).length + $('.' + localStorage.getItem("opponentcolor")).length) / 25 * 100);
        var pYou = Math.round($('.' + localStorage.getItem("mycolor")).length / 25 * 100);
        var pOpponent = Math.round($('.' + localStorage.getItem("opponentcolor")).length / 25 * 100);
        document.getElementById("myBar").style.width = pTotal + "%";
        document.getElementById("myBarY").style.width = pYou + "%";
        document.getElementById("myBarO").style.width = pOpponent + "%";
        $("#pTotal").html("Total " + pTotal + "%");
        $("#pYou").html("You " + pYou + "%");
        $("#pOpponent").html("Opponent " + pOpponent + "%");

        if (data.color == localStorage.getItem("mycolor")) {
            if ($('.' + data.color).length + $('.' + localStorage.getItem("opponentcolor")).length === 25) {
                if ($('.' + data.color).length > 12) {

                    $(".canvas").css("cursor", "not-allowed");
                    $(".canvas").css("pointer-events", "none");
                    window.alert("You Won");
                    const messageBody = { type: 'result', winner: user.username, result: $('.' + data.color).length };
                    webSocket.send(JSON.stringify(messageBody));
                    localStorage.removeItem('mycolor');
                    localStorage.removeItem('opponentcolor');
                }
            }
            document.getElementById("team1").innerHTML = $('.' + data.color).length;
        }
        else {
            if ($('.' + data.color).length + $('.' + localStorage.getItem("mycolor")).length === 25) {
                if ($('.' + data.color).length > 12) {
                    $(".canvas").css("cursor", "not-allowed");
                    $(".canvas").css("pointer-events", "none");
                    window.alert("Your Opponent Won");
                    localStorage.removeItem('mycolor');
                    localStorage.removeItem('opponentcolor');
                }
            }
            document.getElementById("team2").innerHTML = $('.' + data.color).length;
        }
    }
    if (data.type == 'close') {
        $(".canvas").css("cursor", "not-allowed");
        $(".canvas").css("pointer-events", "none");
        alert("Your opponent left the game, you won!. In 5 seconds you will be redirected");
        var delay = 5000;
        setTimeout(function () {
            window.location.href = "/game-app";
        }, delay);
    }
};

function makeMove(e) {
    if ($('.' + localStorage.getItem("mycolor")).length == 0) {
        $(".canvas").css("cursor", "not-allowed");
        $(".canvas").css("pointer-events", "none");
    }

    if(allowMovement==true){
    casilla = Number($(this).attr('id')) + 10;
    if (document.getElementById(casilla)) {
        document.getElementById(casilla).style.cursor = "allowed";
        document.getElementById(casilla).style.pointerEvents = "all";
    }
    casilla = Number($(this).attr('id')) + 11;
    if (document.getElementById(casilla)) {
        document.getElementById(casilla).style.cursor = "allowed";
        document.getElementById(casilla).style.pointerEvents = "all";
    }
    casilla = Number($(this).attr('id')) + 9;
    if (document.getElementById(casilla)) {
        document.getElementById(casilla).style.cursor = "allowed";
        document.getElementById(casilla).style.pointerEvents = "all";
    }
    casilla = Number($(this).attr('id')) + 1;
    if (document.getElementById(casilla)) {
        document.getElementById(casilla).style.cursor = "allowed";
        document.getElementById(casilla).style.pointerEvents = "all";
    }
    casilla = Number($(this).attr('id')) - 1;
    if (document.getElementById(casilla)) {
        document.getElementById(casilla).style.cursor = "allowed";
        document.getElementById(casilla).style.pointerEvents = "all";
    }
    casilla = Number($(this).attr('id')) - 10;
    if (document.getElementById(casilla)) {
        document.getElementById(casilla).style.cursor = "allowed";
        document.getElementById(casilla).style.pointerEvents = "all";
    }
    casilla = Number($(this).attr('id')) - 11;
    if (document.getElementById(casilla)) {
        document.getElementById(casilla).style.cursor = "allowed";
        document.getElementById(casilla).style.pointerEvents = "all";
    }
    casilla = Number($(this).attr('id')) - 9;
    if (document.getElementById(casilla)) {
        document.getElementById(casilla).style.cursor = "allowed";
        document.getElementById(casilla).style.pointerEvents = "all";
    }
    const arr = [11, 12, 13, 14, 15, 21, 22, 23, 24, 25, 31, 32, 33, 34, 35, 41, 42, 43, 44, 45, 51, 52, 53, 54, 55];

    for (let i of arr) {
        if ($('#' + i.toString()).hasClass(localStorage.getItem("mycolor")) || $('#' + i.toString()).hasClass(localStorage.getItem("opponentcolor"))||allowMovement==false) {
         // if($('.' + localStorage.getItem("opponentcolor")).length == 0) { 
            document.getElementById(i).style.cursor = "not-allowed";
            document.getElementById(i).style.pointerEvents = "none";
        }
    }

    /*console.log("opponentColor: "+$('.' + localStorage.getItem("opponentcolor")).length)

    if($('.' + localStorage.getItem("opponentcolor")).length == 0) { 
    for (let i of arr) {
          
            document.getElementById(i).style.cursor = "not-allowed";
            document.getElementById(i).style.pointerEvents = "none";
          }

    }*/


    const messageBody = { type: 'movement', position: $(this).attr('id'), "room": room };
    webSocket.send(JSON.stringify(messageBody));
}
};

