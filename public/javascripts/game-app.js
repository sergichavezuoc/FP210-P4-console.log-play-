

var mymodal = $j('myModal');
//MODAL POPUP
$j('#myModal').on('click', 'button.close', function (eventObject) {
    $j('#myModal').modal('hide');
});
$j('#myModalform').on('click', 'button.close', function (eventObject) {
    $j('#myModalform').modal('hide');
});

//DATA LOCALSTORAGE
var user = JSON.parse(localStorage.getItem('User'));
if (user.isLogged == false) { window.alert("No se puede acceder directamente"); window.location.href = "http://localhost:3000/"; }

user.room1=false;
user.room2=false;
user.room3=false;
localStorage.removeItem('mycolor');
localStorage.removeItem('opponentcolor');
localStorage.setItem('User', JSON.stringify(user));
var name = user.name;
var avatar = document.getElementById("avatarChoose");
var userName = document.getElementById("user-name");
userName.innerHTML = "Hi" + ' ' + user.name.toLowerCase();
avatar.src = user.avatar;
document.getElementById("username").value=user.username;
document.getElementById("name").value=user.name;
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

//DRAG AND DROP

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
function entrar(id) {
    console.log(id)
    document.getElementById(id + "f").innerHTML = "";
    document.getElementById(id).innerHTML = "";
    window.location.assign("/game");
    document.getElementById(id).style.backgroundColor = "rgb(58, 140, 255)";
    document.getElementById("avatarChoose").setAttribute('draggable', true);
}
var boton = document.querySelector("#profileshow");

boton.addEventListener('click', function () {
    $j("#myModalform").modal("show");
})
function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries());
    console.log(JSON.stringify(value, null, '  '));
    var request = $j.ajax({
        url: '/api/player/'+user.username,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(value, null, '  '),
        success: (data) => {
            console.log(data);
                $j("#myModalformcontent").html("Profile Updated!");
 
        }   
});
request.fail(function() {
    alert( "Update profile failed");
  });
  }
  const form = document.getElementById("updateProfile");
  form.addEventListener('submit', handleSubmit);

  function deleteProfile() {
    if (window.confirm("Do you really want to delete your profile?")){
    $j.ajax({
        url: '/api/player/'+user.username,
        type: 'DELETE',
        success: (data) => {
            console.log(data);
            window.alert("Profile deleted");
            window.location.assign("/")
        },  
        error: () => {
        window.alert("Error deleting profile");
        } 
});
}
  };
  const deleteprofile = document.getElementById("deleteprofile");
  deleteprofile.addEventListener('click', deleteProfile);
/**
* Manage the actions triggered by dropping the avatar into a room. First checks if the room is full and alert the user, if the room has space then the room is selected.
* @param  {Event} ev event that trigger the function
*/
function drop(ev) {
    var data2 = ev.dataTransfer.getData("text");
    if (ev.target.id != "user-name") {
        
        
            var request = $j.ajax({
                url: '/api/room/'+ev.target.id+'/player/'+user.username,
                type: 'PUT',
                contentType: 'application/json',
                success: (data) => {
                    console.log(data);
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
                    console.log(ev.target.id)
                    document.getElementById(ev.target.id).innerHTML = document.getElementById(ev.target.id).innerHTML + '<input class="btn btn-primary" type="button" value="Get out" onClick=getOutRoom("' + ev.target.id + '","' + user.username + '") />';
                    document.getElementById(ev.target.id + "f").innerHTML = '<a href="javascript:entrar(\'' + ev.target.id + '\')">Entrar</a>';
                    document.getElementById("avatarChoose").setAttribute('draggable', false);            
                }   
        });
        request.fail(function() {
            alert( "Seleccion of room failed");
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

//CHOSE AVAVATAR

var avatarPicker = document.getElementById("avatarChange");
avatarPicker.addEventListener("click", function (event) {
    document.getElementById('wrapper-selector').style.display = 'flex';
    document.getElementById('wrapper-selector').style.visibility = 'visible';

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







$j(document).ready(function () {
    $j("#containerRooms").hide().fadeIn(3000);
    $j("#wrapper-main").hide().fadeIn(1000);
});

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
