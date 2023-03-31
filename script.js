var timer;
function calc(q1, q2, q3, q4, q5){
    var score = 0
    var qs = [q1,q2,q3,q4,q5];
    var death = 80 + getRandomInt(0,6);
    console.log(qs);

    for(i = 0; i < qs.length; i++){
        if(qs[i] == "" || qs[i] == undefined){
            alert("Not all questions have been answered!")
            return
        }
    }

    if(q2 == 'male'){
        death -= 5;
    }
    if(q2 == 'female'){
        death += 5
    }

    if(q3 == 'a'){
        death += 2
    }

    if(q3 == 'b'){
        death -= 1
    }

    if(q3 == 'c'){
        death -= 2
    }

    if(q3 == 'd'){
        death -= 3
    }

    if(q4 == 'a'){
        death -= 2
    }

    if(q4 == 'b'){
        death -= 5
    }

    if(q4 == 'c'){
        death -= 2
    }

    if(q4 == 'd'){
        death += 2
    }

    if(isNaN(q5)){
        death -= 7
    }
    else{
        if(q5 != 0){
            death -= parseInt((q5 * 3)/4)
        }
    }

    dob = q1.split('-');
    deathDate = [];
    deathDate.push(parseInt(dob[0]) + death);
    deathDate.push(getRandomInt(1, 13));
    deathDate.push(getRandomInt(1, 28));
    if(dob[1] < deathDate[1] | (dob[1] == deathDate[1] & dob[2] <= deathDate[2])){
        age = death
    }
    else{
        age = death - 1
    }
    window.location.replace('./clock.html?d='+deathDate+'&a='+age)
}

function fillDeath(d, a){
    date = d[1] +'/'+ d[2]+'/'+d[0];
    today = new Date();
    dd = String(today.getDate()).padStart(2, '0');
    mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    yyyy = today.getFullYear();
    past = d[0] - 2050;
    if (past > 0){
        document.getElementById('past').innerHTML =  
        "<h4 style='color:red; font-size: 2.5vh;'>That's " +past+ " years too long...<span style='color:black; font-size: 5vh;'>&#9785;</span></h4>";
    }
    else{
        document.getElementById('past').innerHTML = "<h4 style='color:green; font-size: 2.5vh;'>That's a good time to die! <span style='color:black; font-size: 5vh;'>&#9786;</span></h4>";
    }
    document.getElementById('date').innerHTML = date;
    document.getElementById('age').innerHTML = a;
    newTimer((date + ' 0:1 AM'), 'countdown');
}


function newTimer(date, name){
    var end = new Date(date);

    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;

    function showRemaining() {
        var now = new Date();
        var distance = end - now;
        if (distance < 0) {

            clearInterval(timer);
            document.getElementById(name).innerHTML = 'EXPIRED!';

            return;
        }
        var days = Math.floor(distance / _day);
        var hours = Math.floor((distance % _day) / _hour);
        var minutes = Math.floor((distance % _hour) / _minute);
        var seconds = Math.floor((distance % _minute) / _second);

        document.getElementById(name).innerHTML = '<span>'+days+'</span>' + 'days ';
        document.getElementById(name).innerHTML += '<span>'+hours+'</span>' + 'hrs ';
        document.getElementById(name).innerHTML += '<span>'+minutes+'</span>' + 'mins ';
        document.getElementById(name).innerHTML += '<span>'+seconds+'</span>' + 'secs';
    }
    clearInterval(timer);
    timer = setInterval(showRemaining, 1000);
}

function neg(n){
    date = document.getElementById('date').innerHTML;
    age = parseInt(document.getElementById('age').innerHTML);
    if(n == -1){
       beer =  parseInt(document.getElementById('beer').innerHTML)
       beer += 6
       document.getElementById('beer').innerHTML = beer
    }
    if(n == -3){
        cigs =  parseInt(document.getElementById('cigs').innerHTML)
        cigs += 1
        document.getElementById('cigs').innerHTML = cigs
     }
     if(n == -5){
        sugar =  parseInt(document.getElementById('sugar').innerHTML)
        sugar += 252
        document.getElementById('sugar').innerHTML = sugar
     }
     dl = date.split('/')
     dl[2] = (parseInt(dl[2]) + n)
     age += n
     dlOrdered = [dl[2], dl[0], dl[1]];
     clearInterval(timer);
     fillDeath(dlOrdered, age);
     newTimer('01/01/2050 12:30 PM', 'collapse');
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }