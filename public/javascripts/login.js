
var boton = document.querySelector("#login");

boton.addEventListener('click', function () {
    var username = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    fetch('/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            username: username,
            password: password
        })
    }).then(response => {
        if (response.ok) {
            var user =JSON.parse(localStorage.getItem("User"));
            user.isLogged= true;
            localStorage.setItem('User', JSON.stringify(user))
            
            fetch('/game-app').then(response => {
                window.location.assign(response.url)
            })
            
        } else {
            document.getElementById('helper').style.visibility = "visible"
        }
    })
});
$(document).ready(() => {
        console.log('Button clicked! Running ajax...');
        $.ajax({
            url: '/getResultsAjax',
            type: 'GET',
            contentType: 'application/json',
            success: (data) => {
                console.log(data);
                var table = document.createElement("table"), row, cellA, cellB, cellC;
                table.style.padding='5px';
                table.style.border='2px solid';
                row = table.insertRow();
                cellA = row.insertCell();
                cellB = row.insertCell();
                cellC = row.insertCell();
                cellA.innerHTML = "Room";
                cellB.innerHTML = "Result";
                cellC.innerHTML = "Winner";
                cellA.style.border='2px solid';
                cellB.style.border='2px solid';
                cellC.style.border='2px solid';
                document.getElementById("results").appendChild(table);
                for (let key in data) {
                  // (C2) ROWS & CELLS
                  row = table.insertRow();
                  cellA = row.insertCell();
                  cellB = row.insertCell();
                  cellC = row.insertCell();
                  cellA.style.border='2px solid';
                  cellB.style.border='2px solid';
                  cellC.style.border='2px solid';
                  // (C3) KEY & VALUE
                  cellA.innerHTML = data[key].room;
                  cellB.innerHTML = data[key].result+'/25';
                  cellC.innerHTML = data[key].winner;
            }
        }
        
    });
});

