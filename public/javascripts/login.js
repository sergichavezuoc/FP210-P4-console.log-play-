
var boton = document.querySelector("#login");

boton.addEventListener('click', function () {
    var username = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    $j.ajax({
        url: '/api/player/'+username,
        type: 'GET',
        contentType: 'application/json',
        success: (data) => {
            console.log(data);
            if (data.password===password){
                var user =JSON.parse(localStorage.getItem("User"));
                user.username=username;
                user.name=data.name;
                user.isLogged= true;
                localStorage.setItem('User', JSON.stringify(user))
            window.location.assign("/game-app")
            } else {
            document.getElementById('helper').style.visibility = "visible"
            }
    }
    
});


});
$j('#myModal').on('click', 'button.close', function (eventObject) {
    $j('#myModal').modal('hide');
});