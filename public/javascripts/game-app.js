//INITIALIZATIONS
$j(document).ready(function () {
    $j("#containerRooms").hide().fadeIn(3000);
    $j("#wrapper-main").hide().fadeIn(1000);
});

/**
 * Does not allow entry to the application if the user is not logged in
 */
var user = JSON.parse(localStorage.getItem('User'));
if (user?.isLogged == false || user === null) { window.alert("This page requires validation"); window.location.href = "http://localhost:3000/"; }
user.room1 = false;
user.room2 = false;
user.room3 = false;
localStorage.removeItem('mycolor');
localStorage.removeItem('opponentcolor');
localStorage.setItem('User', JSON.stringify(user));

/**
 * Prevent persistence of data in localstorage when you leave the game room, reloading the page
 */
window.addEventListener("pageshow", function (event) {
    var historyTraversal = event.persisted ||
        (typeof window.performance != "undefined" &&
            window.performance.navigation.type === 2);
    if (historyTraversal) {
        // Handle page restore.
        window.location.reload();
    }
});

//DATA LOCALSTORAGE
var name = user.name;
var avatar = document.getElementById("avatarChoose");
var userName = document.getElementById("user-name");
userName.innerHTML = "Hi" + ' ' + user.name.toLowerCase();
avatar.src = user.avatar;
document.getElementById("username").value = user.username;
document.getElementById("name").value = user.name;

//MODAL POPUP
var mymodal = $j('myModal');

$j('#myModal').on('click', 'button.close', function (eventObject) {
    $j('#myModal').modal('hide');
});
$j('#profileshow').on('click', function(eventObject){
    $j('#myModalform').modal('show');
})
$j('#myModalform').on('click', 'button.close', function (eventObject) {
    $j('#myModalform').modal('hide');
});
$j('#get-tutorials').on('click', function (eventObject) {
    $j('#ModalTutorials').modal('show');
});
$j('#ModalTutorials').on('click', 'button.close', function (eventObject) {
    $j('#ModalTutorials').modal('hide');
});
$j('#ModalDelete').on('click', 'button.close', function (eventObject) {
    $j('#ModalDelete').modal('hide');
});


//LOG OUT
var logOut = document.getElementById("log-out");
logOut.addEventListener("click", function () {
    fetch("/logOut?user=" + user.username).then(response => {
        if (response.ok) {
            var userLogOut = {
                'name': user.name,
                'username': user.username,
                'isLogged': false,
                'avatar': user.avatar,
                'room1': false,
                'room2': false,
                'room3': false
            }
            localStorage.setItem('User', JSON.stringify(userLogOut))
            window.location.assign("/")
        }
    })
})

//DRAG AND DROP FUNCIONALITY
function allowDrop(ev) {
    ev.preventDefault();
}
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
function entrar(id) {
    document.getElementById(id + "f").innerHTML = "";
    document.getElementById(id).innerHTML = "";
    window.location.assign("/game");
    document.getElementById(id).style.backgroundColor = "rgb(58, 140, 255)";
    document.getElementById("avatarChoose").setAttribute('draggable', true);
}
var botonout = document.querySelector("#get-out-all");
botonout.addEventListener('click', function () {
    $j.ajax({
        url: '/api/rooms/all-disconect',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ username: user.username }),
        success: (data) => {
            var rooms = ["room1", "room2", "room3"];
            rooms.forEach(item => {
                user[item] = false;
                localStorage.setItem('User', JSON.stringify(user));
                document.getElementById(item).innerHTML = '<i id="o' + item + '"></i>';
                document.getElementById(item + "f").innerHTML = '<i id="' + item + 'f"></i>';
                document.getElementById(item).style.backgroundColor = 'rgb(58, 140, 255)';
                document.getElementById("avatarChoose").setAttribute('draggable', true);
            })
        }
    })
})

/**
* Manage the actions triggered by dropping the avatar into a room. First checks if the room is full and alert the user, if the room has space then the room is selected.
* @param  {Event} ev event that trigger the function
*/
function drop(ev) {
    var data2 = ev.dataTransfer.getData("text");
    if (ev.target.id != "user-name") {


        var request = $j.ajax({
            url: '/api/room/' + ev.target.id + '/player/' + user.username,
            type: 'PUT',
            contentType: 'application/json',
            success: (data) => {
                document.getElementById("alert-text").innerHTML = 'Welcome to the room';
                $j("#myModal").modal("show");
                var onRoom = ev.target.id;
                user[onRoom] = true;
                localStorage.setItem('User', JSON.stringify(user));
                ev.preventDefault();
                var nodeCopy = document.getElementById(data2).cloneNode(true);
                nodeCopy.id = "newId"
                ev.target.appendChild(nodeCopy);
                roomSelected(ev.target.id);
                document.getElementById(ev.target.id).innerHTML = document.getElementById(ev.target.id).innerHTML + '<input class="btn btn-primary" type="button" value="Get out" onClick=getOutRoom("' + ev.target.id + '","' + user.username + '") />';
                document.getElementById(ev.target.id + "f").innerHTML = '<a href="javascript:entrar(\'' + ev.target.id + '\')">Access</a>';
                document.getElementById("avatarChoose").setAttribute('draggable', false);
                document.getElementById("newId").setAttribute('draggable', false);
            }
        });
        request.fail(function (data) {
            document.getElementById("alert-text").innerHTML = "Seleccion of room failed: " + data.responseJSON.message;
            $j("#myModal").modal("show");
        });
    }
    else {
        var nodeCopy = document.getElementById(data).cloneNode(true);
        nodeCopy.id = "newId"
        ev.target.appendChild(nodeCopy);
    }
}

/**
* Manage the manages the exit of the user's game room . Delete the room selected by the user.
* @param  {Room} room room selected by the user
* @param  {User} user user logged in
*/
function getOutRoom(room, userName) {
    fetch('/disconnect?room=' + room + '&user=' + userName).then(response => {
        if (response.ok) {
            document.getElementById("alert-text").innerHTML = 'Correctly disconnected';
            $j("#myModal").modal("show");
            user[room] = false;
            localStorage.setItem('User', JSON.stringify(user));
            document.getElementById(room).innerHTML = '<i id="o' + room + '"></i>';
            document.getElementById(room + "f").innerHTML = '<i id="' + room + 'f"></i>';
            document.getElementById(room).style.backgroundColor = 'rgb(58, 140, 255)';
            document.getElementById("avatarChoose").setAttribute('draggable', true);
        }
        else {
            document.getElementById("alert-text").innerHTML = 'Error leaving the room';
            $j("#myModal").modal("show");
        }
    })
}
/**
* Change the color of a selected room from blue to red, the unselected ones will be painted again in blue.
* @param  {Number} roomNumber Number of the selected room.
*/
function roomSelected(roomNumber) {

    $j("#room1").css("background-color", "rgb(58, 140, 255)")
    $j("#room2").css("background-color", "rgb(58, 140, 255)")
    $j("#room3").css("background-color", "rgb(58, 140, 255)")

    switch (roomNumber) {

        case "room1":

            $j("#room1").css("background-color", "red")

            break;
        case "room2":

            $j("#room2").css("background-color", "red")

            break;
        case "room3":

            $j("#room3").css("background-color", "red")

            break;
        default:
        // code block
    }
}

//UPDATE PROFILE
/**
 * Update the profile by calling the api sending the form data
 * @param {event} event with the form information. Gets the values ​​of the inputs to send them in the ajax call
 */
const form = document.getElementById("updateProfile");
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries());
    var request = $j.ajax({
        url: '/api/player/' + user.username,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(value, null, '  '),
        success: (data) => {
            user.name = data.name;
            localStorage.setItem('User', JSON.stringify(user));
            $j("#myModalform").modal("hide");
            alert("Profile Updated!");
        }
    });
    request.fail(function () {
        alert("Update profile failed");
    });
}

//DELETE PROFILE
/**
 * Function to delete the profile. Send the username as a parameter in the ajax call. 
 * If the call is successful, it returns to the initial screen.
 */
const deleteprofile = document.getElementById("deleteprofile");
deleteprofile.addEventListener('click', deleteProfile);

function deleteProfile() {
    $j('#ModalDelete').modal('show');
    var buttonNo = document.querySelector('#no');
    var buttonYes = document.querySelector('#yes');
    buttonNo.addEventListener('click', function(){
        $j('#ModalDelete').modal('hide');
    })
    buttonYes.addEventListener('click', function(){
        $j.ajax({
            url: '/api/player/' + user.username,
            type: 'DELETE',
            success: (data) => {
                localStorage.removeItem('User');
                window.alert("Profile deleted");
                window.location.assign("/")
            },
            error: () => {
                
                window.alert("Error deleting profile");
            }
        });
    })
};

//CHOSE AVATAR
var click = 0;
var avatarPicker = document.getElementById("avatarChange");
avatarPicker.addEventListener("click", function (event) {
    click = click + 1;
    if ((click % 2) === 0) {
        document.getElementById('wrapper-selector').style.display = 'none';
        document.getElementById('wrapper-selector').style.visibility = 'none';
    } else {
        document.getElementById('wrapper-selector').style.display = 'flex';
        document.getElementById('wrapper-selector').style.visibility = 'visible';
    }


    var avatar1 = document.getElementById("item-1");
    avatar1.addEventListener("click", function () {
        avatarChoose.src = avatar1.src;
        document.getElementById('wrapper-selector').style.display = 'none';
        user.avatar = avatarChoose.src
        localStorage.setItem('User', JSON.stringify(user))
        document.getElementById('wrapper-selector').style.visibility = 'hidden';
    })

    var avatar2 = document.getElementById("item-2");
    avatar2.addEventListener("click", function () {
        avatarChoose.src = avatar2.src;
        document.getElementById('wrapper-selector').style.display = 'none';
        user.avatar = avatarChoose.src
        localStorage.setItem('User', JSON.stringify(user))
        document.getElementById('wrapper-selector').style.visibility = 'hidden';
    })

    var avatar3 = document.getElementById("item-3");
    avatar3.addEventListener("click", function () {
        avatarChoose.src = avatar3.src;
        document.getElementById('wrapper-selector').style.display = 'none';
        user.avatar = avatarChoose.src
        localStorage.setItem('User', JSON.stringify(user));
        document.getElementById('wrapper-selector').style.visibility = 'hidden';
    })

    var avatar4 = document.getElementById("item-4");
    avatar4.addEventListener("click", function () {
        avatarChoose.src = avatar4.src;
        document.getElementById('wrapper-selector').style.display = 'none';
        user.avatar = avatarChoose.src
        localStorage.setItem('User', JSON.stringify(user));
        document.getElementById('wrapper-selector').style.visibility = 'hidden';
    })

    var avatar5 = document.getElementById("item-5");
    avatar5.addEventListener("click", function () {
        avatarChoose.src = avatar5.src;
        document.getElementById('wrapper-selector').style.display = 'none';
        user.avatar = avatarChoose.src
        localStorage.setItem('User', JSON.stringify(user));
        document.getElementById('wrapper-selector').style.visibility = 'hidden';
    })

    var avatar6 = document.getElementById("item-6");
    avatar6.addEventListener("click", function () {
        avatarChoose.src = avatar6.src;
        document.getElementById('wrapper-selector').style.display = 'none';
        user.avatar = avatarChoose.src
        localStorage.setItem('User', JSON.stringify(user));
        document.getElementById('wrapper-selector').style.visibility = 'hidden';
    })

    var avatar7 = document.getElementById("item-7");
    avatar7.addEventListener("click", function () {
        avatarChoose.src = avatar7.src;
        document.getElementById('wrapper-selector').style.display = 'none';
        user.avatar = avatarChoose.src
        localStorage.setItem('User', JSON.stringify(user));
        document.getElementById('wrapper-selector').style.visibility = 'hidden';
    })

    var avatar8 = document.getElementById("item-8");
    avatar8.addEventListener("click", function () {
        avatarChoose.src = avatar8.src;
        document.getElementById('wrapper-selector').style.display = 'none';
        user.avatar = avatarChoose.src
        localStorage.setItem('User', JSON.stringify(user));
        document.getElementById('wrapper-selector').style.visibility = 'hidden';
    })
})

//CHECK OCUPATION ROOMS

new Ajax.PeriodicalUpdater('oroom1', '/api/ocupationroom/room1', {
    method: 'get',
    frequency: 1,
    decay: 0
});
new Ajax.PeriodicalUpdater('oroom2', '/api/ocupationroom/room2', {
    method: 'get',
    frequency: 1,
    decay: 0
});
new Ajax.PeriodicalUpdater('oroom3', '/api/ocupationroom/room3', {
    method: 'get',
    frequency: 1,
    decay: 0
});
new Ajax.PeriodicalUpdater('room1p', '/api/roomhtml/room1', {
    method: 'get',
    frequency: 1,
    decay: 0
});
new Ajax.PeriodicalUpdater('room2p', '/api/roomhtml/room2', {
    method: 'get',
    frequency: 1,
    decay: 0
});
new Ajax.PeriodicalUpdater('room3p', '/api/roomhtml/room3', {
    method: 'get',
    frequency: 1,
    decay: 0
});