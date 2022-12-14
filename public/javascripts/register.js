var avatarPicker = document.getElementById("avatar-picker");
var avatarChoose = document.getElementById("avatarChoose");
var pressed = false;

avatarPicker.addEventListener("click", function () {
  document.getElementById("wrapper-selector").style.display = "flex";
  pressed = true;

  //CHOSE AVATAR

  if (pressed == true) {
    var avatar1 = document.getElementById("item-1");
    avatar1.addEventListener("click", function () {
      avatarChoose.src = avatar1.src;
    });

    var avatar2 = document.getElementById("item-2");
    avatar2.addEventListener("click", function () {
      avatarChoose.src = avatar2.src;
    });

    var avatar3 = document.getElementById("item-3");
    avatar3.addEventListener("click", function () {
      avatarChoose.src = avatar3.src;
    });

    var avatar4 = document.getElementById("item-4");
    avatar4.addEventListener("click", function () {
      avatarChoose.src = avatar4.src;
    });

    var avatar5 = document.getElementById("item-5");
    avatar5.addEventListener("click", function () {
      avatarChoose.src = avatar5.src;
    });

    var avatar6 = document.getElementById("item-6");
    avatar6.addEventListener("click", function () {
      avatarChoose.src = avatar6.src;
    });

    var avatar7 = document.getElementById("item-7");
    avatar7.addEventListener("click", function () {
      avatarChoose.src = avatar7.src;
    });

    var avatar8 = document.getElementById("item-8");
    avatar8.addEventListener("click", function () {
      avatarChoose.src = avatar8.src;
    });
  }
});

var input = document.getElementsByClassName("form-control");
for (var i = 0; i < input.length; i++) {
  input[i].addEventListener("click", function () {
    document.getElementById("wrapper-selector").style.display = "none";
  });
}

//SUBMIT REGISTER
function handleSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const value = Object.fromEntries(data.entries());
  var username = document.getElementById("email").value;
  var name = document.getElementById("name").value;
  $.ajax({
    url: "/api/player/",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(value, null, "  "),
    success: (data) => {
      if (data.message == "saved") {
        var newObject = {
          name: name,
          username: username,
          avatar: avatarChoose.src.replace("http://localhost:3000", ""),
          isLogged: false,
          room1: false,
          room2: false,
          room3: false,
        };
        localStorage.setItem("User", JSON.stringify(newObject));
        window.location.assign("/");
      }
    },
    error: () => {
      document.getElementById("helper").style.visibility = "visible";
    },
  });
}
const form = document.getElementById("registerform");
form.addEventListener("submit", handleSubmit);
