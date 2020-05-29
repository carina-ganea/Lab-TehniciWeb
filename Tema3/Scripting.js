// JavaScript source code


function paginacurenta() {
    //localStorage.clear();
    console.log(window.location);
    var x = document.getElementsByTagName("a");
    var i = 0;
    for (i = 0; i < x.length; i++) {
        if (x[i].href == window.location)
            x[i].className = "current";
    }
    if( localStorage.length !== 0 ){
        var x = document.getElementById("login");
        document.getElementById("hotbar").removeChild(x);
        x = document.getElementById("signin");
        document.getElementById("hotbar").removeChild(x);
        if( localStorage.length === 1){
            x = document.getElementById("message");
            document.getElementById("body").removeChild(x);
        }
        $.ajax({
            url: 'http://localhost:3000/Users/' + localStorage['userid'],
            type: 'GET',
            dataType: 'json',
            complete: (data) =>{
                console.log(data);
                var x = document.getElementById("name");
                x.innerHTML = "Logged in as " + data.responseJSON['username'];
                if(data.responseJSON['username'] !== "Admin"){
                    x = document.getElementById("administer");
                    document.getElementById("hotbar").removeChild(x);
                }
            }
        })
        if( localStorage.length === 2){
            var mess = localStorage["message"];
            localStorage.removeItem("message");
            $.ajax({
                url: 'http://localhost:3000/Users/' + localStorage['userid'],
                type: 'GET',
                dataType: 'json',
                complete: function(data){
                    var user = data.responseJSON;
                    if( mess === "new"){
                        document.getElementById("message").innerHTML = "Congratulations on joining!";
                    }
                    else{
                        console.log(data);
                        var d = new Date(user['lastloggedin']);
                        document.getElementById("message").innerHTML = 'You have last logged in on '
                        + d + ' from the IP address ' +
                        user['lastip'] + '. You have logged in ' + (Number(user['nbvisits'])+ 1) + ' times.';
                        var date = new Date();
                        date = JSON.stringify(date);
                        $.getJSON('https://api.ipify.org?format=jsonp&callback=?', (data) => {
                            user['lastip'] = data["ip"];
                        });
                        user['lastloggedin'] = date.substring(1, date.length-1);
                        user['nbvisits'] = Number(user['nbvisits']) + 1;
                        $.ajax({
                            url: 'http://localhost:3000/Users/' + localStorage['userid'],
                            type: 'PUT',
                            data: user,
                            succes: (data) =>{
                                console.log('success');
                            }
                        })
                    }
                }
            })
        }
    } else{
        var x = document.getElementById("notebook");
        document.getElementById("hotbar").removeChild(x);
        var x = document.getElementById("logout");
        document.getElementById("hotbar").removeChild(x);
        x = document.getElementById("name");
        document.getElementById("hotbar").removeChild(x);
        x = document.getElementById("message");
        document.getElementById("body").removeChild(x);
        x = document.getElementById("administer");
        document.getElementById("hotbar").removeChild(x);
    }
}

function logout(){
    localStorage.clear();
}

function showpasswrd() {
    var x = document.getElementById("passwrd");
    if (x.type == 'password')
        x.type = 'text';
    else
        x.type = 'password';
}

function wrdcount() {
    var x = document.getElementById('notes');
    var y = x.value;
    y = y.split(" ");
    var c = 0;
    for (cuv in y) {
        if (cuv != '') {
            c++;
        }
    }
    x = document.getElementById('nr').innerHTML = 'Word count : ' + String(c);
}


function insert(usrname, passwrd, date, ip, nbvis) {
    $.ajax({
        url: 'http://localhost:3000/Users',
        type: 'POST',
        data: {
            username: usrname,
            password: passwrd,
            signedup: date.substring(1, date.length - 1),
            lastloggedin: date.substring(1, date.length - 1),
            lastip: ip,
            nbvisits: nbvis,
            written: ""
        },
        success: function (data) {
            console.log(data)
        },
        complete: (data)=>{
            localStorage.setItem("userid", data.responseJSON["id"]);
            localStorage.setItem("message", "new");
            location.replace("file:///C:/Users/carin/Desktop/TW/Articles.html");
        },
        error: function (error) {
            console.log(error);
        }
    })
}

function addUser() {
    var usrname = document.getElementById("usrname").value;
    var passwrd = document.getElementById("passwrd").value;
    var date = new Date();
    date = JSON.stringify(date);
    console.log(date);
    var ip = 0;
    $.getJSON('https://api.ipify.org?format=jsonp&callback=?', (data) => {
        ip = data["ip"];
        insert(usrname, passwrd, date, ip, 1);
    });

}


function getUser(x){
    var id = -1;
    $.ajax({
        url: 'http://localhost:3000/Users',
        type: 'GET',
        dataType: 'json',
        complete: function(data){
            var Users = data.responseJSON;
            console.log(data);
            if( x === "Login"){
                var usrname = document.getElementById("usrname").value;
                var passwrd = document.getElementById("passwrd").value;
                for( let i = 0; i < Users.length; i++){
                    if( Users[i].username === usrname && Users[i].password === passwrd){
                        id = Users[i].id;
                        localStorage.setItem("userid", id);
                        localStorage.setItem("message", "false");
                    }
                }
                if(id === -1){
                    document.getElementById("eroare").innerHTML = "Incorrect username/password. Try again.";
                } else{
                    location.replace("file:///C:/Users/carin/Desktop/TW/Articles.html");
                }
            }
            if( x === "Search" ){
                var found = 'false';
                var u = document.getElementById('exusr').value;
                var del = document.getElementById('admin').children;
                console.log(del);
                var i = del.length - 1;
                while( i >= 4){
                    document.getElementById('admin').removeChild(del[i]);
                    i--;
                }
                for( let i = 0; i < Users.length; i++){
                    if( Users[i].username === u){
                        found = 'true';
                        var y = document.createElement("p");
                        y.innerHTML = "Username: " + Users[i]["username"];
                        document.getElementById("admin").appendChild(y);
                        y = document.createElement("p");
                        var d = new Date(Users[i]["signedup"]);
                        y.innerHTML = "Signed-up: " + d;
                        document.getElementById("admin").appendChild(y);
                        y = document.createElement("p");
                        d = new Date(Users[i]["lastloggedin"]);
                        y.innerHTML = "Last logged-in: " + d;
                        document.getElementById("admin").appendChild(y);
                        y = document.createElement("p");
                        y.innerHTML = "Number of visits: " + Users[i]["nbvisits"];
                        document.getElementById("admin").appendChild(y);
                        y = document.createElement("p");
                        y.innerHTML = "Last IP address used: " + Users[i]["lastip"];
                        document.getElementById("admin").appendChild(y);
                    }
                }
                if( found === 'false'){
                    var y = document.createElement("p");
                    y.innerHTML = "User not found.";
                    document.getElementById("admin").appendChild(y);
                }
            }
        },
        error: function(data){
            alert("eroare");
        }
    })
}


/*function addquestion(){
    var x = document.createElement("p");
    x.innerHTML = "What would you like to examine?";
    var y = document.createElement("button");
    y.innerHTML = "User";
    y.id = "descusr";
    y.addEventListener("click", descusr);
    x.appendChild(y);
    var z = document.createElement("button");
    z.innerHTML = "Article";
    z.id = "descart";
    z.addEventListener("click", descart);
    x.appendChild(z);
    x.id = "question";
    document.getElementById("admin").appendChild(x);
}

function descusr(){
    var z = document.getElementById("question");
    document.getElementById("admin").removeChild(z);
    var x = document.createElement("form");
    x.action = "/action_page.php";
    var y = document.createElement("label");
    y.innerHTML = "Username: ";
    x.appendChild(y);
    var b = document.createElement("input");
    b.type = "text";
    b.id = "exusr";
    x.appendChild(b);
    var a = document.createElement("button");
    a.innerHTML = "Details";
    x.appendChild(a);
    var c = document.createElement("button");
    c.innerHTML = "Delete";
    x.appendChild(c);
    document.getElementById("admin").appendChild(x);
}

function descart(){
    var z = document.getElementById("question");
    console.log(document.getElementById("admin").childNodes);
    document.getElementById("admin").removeChild(z);
    var x = document.createElement("form");
    x.action = "/action_page.php";
    var y = document.createElement("label");
    y.innerHTML = "Article: ";
    x.appendChild(y);
    y = document.createElement("input");
    y.type="text";
    y.id="exart";
    x.appendChild(y);
    y = document.createElement("button");
    y.innerHTML = "Details";
    y.addEventListener("click", getArticle);
    x.appendChild(y);
    y = document.createElement("button");
    y.innerHTML = "Delete";
    x.appendChild(y);
    document.getElementById("admin").appendChild(x);
}*/

function deleteUser(x){
    var x = document.getElementById('exusr').value;
    $.ajax({
        url: 'http://localhost:3000/Users',
        type: 'GET',
        dataType: 'json',
        complete: function(data){
            var Users = data.responseJSON;
            for( let i = 0; i < Users.length; i++){
                if( Users[i].username === x){
                    $.ajax({
                        url: 'http://localhost:3000/Users/' + Users[i]["id"],
                        type: 'DELETE',
                        data: Users[i],
                        complete: function(){
                            alert("User " + x + " has been successfully deleted.");
                        }
                    })
                }
            }
        }
    })
}

function save(){
    var text = document.getElementById("notes").value;
    $.ajax({
        url: 'http://localhost:3000/Users/' + localStorage["userid"],
        type: 'GET',
        dataType: 'json',
        complete: function(data){
            console.log(data);
            var user = data.responseJSON;
            user["written"] = text;
            console.log(text);
            $.ajax({
            url: 'http://localhost:3000/Users/' + localStorage["userid"],
            type: 'PUT',
            data: user,
            complete: function(data){
                    alert("Saved.");
                }
            })
        }
    })
    
}

function lastsaved(){
    $.ajax({
        url: 'http://localhost:3000/Users/' + localStorage["userid"],
        type: 'GET',
        dataType: 'json',
        complete: function(data){
            console.log(data);
            var user = data.responseJSON;
            document.getElementById("notes").value = user["written"];
        }
    })
}