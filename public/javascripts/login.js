
function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries());
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    $j.ajax({
        url: '/api/player/login/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(value, null, '  '),
        success: (data) => {
            if (data.username){
                var user =JSON.parse(localStorage.getItem("User"));
                //window.alert(user)
                if (user===null){
                    var user = {
                        'name': data.name,
                        'username': username,
                        'avatar': "http://localhost:3000/images/guerrera.png",
                        'isLogged': true,
                        'room1': false,
                        'room2': false,
                        'room3': false
                    }
                } else {
                    user.username=username;
                    user.name=data.name;
                    user.isLogged= true;
                }
 
                localStorage.setItem('User', JSON.stringify(user))
            window.location.assign("/game-app")
            }
            },
            error: () => {
            document.getElementById('helper').style.visibility = "visible"
            }    
});
};
const form = document.getElementById("formlogin");
form.addEventListener('submit', handleSubmit);
$j('#myModal').on('click', 'button.close', function (eventObject) {
    $j('#myModal').modal('hide');
});