// JavaScript source code



function incerc() {
    var buton = document.getElementById("first_func").innerHTML;
    if (buton == "Apasa-ma!") {
        var text = document.createElement("p");
        text.className = 'stil';
        var p2 = document.createTextNode("Acesta este un paragraf nou!");
        text.appendChild(p2);
        var aux = document.getElementsByTagName("body")[0];
        aux.appendChild(text);
        document.getElementById("first_func").innerHTML = "Mai apasa-ma o data!";
    } else {
        document.getElementById("first_func").innerHTML = "Apasa-ma!";
        var x = document.getElementsByTagName("p")[5];
        x.remove();
    }
}

function stilizeaza() {
    var x = document.getElementById("buton2");
    x.style.textAlign = "center";
    x.style.fontFamily = "Verdana";
    x.style.backgroundColor = "indianred";
    x.style.color = "aliceblue";
    x.style.borderColor = "darkgrey"
    x.innerHTML = "Arata bine, nu?";

}


function myfunction() {
    document.getElementById("p3").innerHTML = document.getElementById("first_func").innerHTML; 
}

function myOtherFunction() {
    document.getElementById("p3").setAttribute("style","background-color:pink;");
}

function dispari() {
    document.getElementsByTagName("button")[1].style.display = "none";
}

function apari() {
    document.getElementsByTagName("button")[1].style.backgroundColor = "pink";
    document.getElementsByTagName("button")[1].style.display = "block";
    document.getElementsByTagName("button")[1].innerHTML = "E mai bine asa?";
}

function mesaj() {
    alert("Nu ti-a placut culoarea?");
}

function Animatie() {
    var elem = document.getElementById("animatie");
    var pos1 = 0, pos2 = 0;
    var m = 1;
    var id = setInterval(frame, 1);
    function frame() {
        switch (m) {
            case 1:
                if (pos1 == 150) {
                    m = 2;
                } else {
                    pos1++;
                    elem.style.top = pos1 + "px";
                }
                break;
            case 2:
                if (pos2 == 150) {
                    m = 3;
                } else {
                    pos2++;
                    elem.style.left = pos2 + "px";
                }
                break;
            case 3:
                if (pos1 == 0) {
                    m = 4;
                } else {
                    pos1--;
                    elem.style.top = pos1 + "px";
                }
                break;
            default:
                {
                    pos2--;
                    elem.style.left = pos2 + "px";
                    if (pos2 == 0) {
                        clearInterval(id);
                    }
                }
        }
    }
}


function GET() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var x = this.response;
            console.log( (this.response));
            document.getElementById("place").innerHTML = x;
        }
    }
    xhttp.open("GET", "http://localhost:3000/dogs", true);
    xhttp.send();
}



function PUT() {
    $.ajax({
        url: 'http://localhost:3000/dogs/' + localStorage.getItem("id"),
        type: 'PUT',
        data: {
            id: localStorage.getItem("id"),
            name: localStorage.getItem("rasa"),
            img: localStorage.getItem("img")
        },
    succes: function () {
        alert("Caine modificat cu succes");
        }
    })
}

function POST() {
    var id;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            id = this.responseText.length;
        }
    };
    xhttp.open("GET", "http://localhost:3000/dogs", true);
    xhttp.send();
    $.ajax({
        url: 'http://localhost:3000/dogs',
        type: 'POST',
        data: {
            id: id,
            name: localStorage.getItem("rasa"),
            img: localStorage.getItem("img")
        },
        succes: function () {
            alert("Caine adaugat cu succes");
        }
    })
}

function DELETE() {
    var id = 5;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            id = this.response.split('}').length - 1;
            console.log(this.response.split('}').length - 1);
            $.ajax({
                url: "http://localhost:3000/dogs/" + id,
                type: 'DELETE',
                succes: function () {
                    alert("Cainele a fost sters cu succes");
                }
            })
        }
    };
    xhttp.open("GET", "http://localhost:3000/dogs", true);
    xhttp.send();
}

function hello(id) {
    var x = event.data;
    console.log(x);
    localStorage.setItem(id, localStorage.getItem(id) + x );
    console.log(localStorage.getItem(id));
    //alert("Am vazut ca vrei sa scrii ceva, dar eu nu stiu sa citesc :)");
}

function identif(event) {
    var x = event.data;
    console.log(x);
    localStorage.setItem("id", Number(x));
}

function string() {
    localStorage.setItem("x","");
}

function rasa() {
    localStorage.setItem("rasa", "");
}

function imagine() {
    localStorage.setItem("img", "");
}


function imaginenoua() {
    var x = document.createElement("p");
    var p = document.createTextNode("Keyboard event! \\(>0<)/");
    x.appendChild(p);
    var b = document.getElementById("corp");
    b.appendChild(x);
    var t = setTimeout(function (){ b.removeChild(b.childNodes[b.childNodes.length-1]); }, 2000);
   
}