function showResults() {
    $j("#alert-text").html("");
$j(document).ready(() => {
    console.log('Button clicked! Running ajax...');
    $j.ajax({
        url: '/getResultsAjax',
        type: 'GET',
        contentType: 'application/json',
        success: (data) => {
            console.log(data);
            var table = document.createElement("table"), row, cellA, cellB, cellC;
            table.style.padding='5px';
            table.style.border='2px solid';
            row = table.insertRow();
            cellA = row.insertCell(0).outerHTML= "<th style='border:2px solid'>Room</th>";
            cellB = row.insertCell(1).outerHTML= "<th style='border:2px solid'>Result</th>";
            cellC = row.insertCell(2).outerHTML = "<th style='border:2px solid'>Winner</th>";


            for (let key in data) {
              // (C2) ROWS & CELLS
              if(typeof data[key].room != "undefined"){
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
        console.log(table);
        $j("#alert-text").append(table);
        $j("#myModal").modal("show");
    }
    
});
});
}
const link = document.getElementById("showresults");
  link.addEventListener('click', showResults);