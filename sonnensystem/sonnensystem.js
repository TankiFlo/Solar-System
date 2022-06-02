var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

c.width = document.documentElement.clientWidth - 10
c.height = document.documentElement.clientHeight

planets = new Array()
planets.push(new StellarBody("Sun", c.width/2, 300, 50, new Color(255,255,0), 0))
planets.push(new StellarBody("Earth", 100, 10, 20, new Color(0,255,0), 3))

var starDensityModifier = 2

maxStars = Math.max(c.width, c.height) * starDensityModifier
stars = new Array();

for (var i = 0; i < maxStars; i++) {
    stars.push(new StellarBody(`Star${i}`, Math.random() * c.width, Math.random() * c.height, Math.random() * 2, new Color(255,255,255, Math.random() * 0.75)));
}

cssSetup()

setup()

var baseAngle = 0
var baseSpeed = 1000
var drawOrbits = document.getElementById("OrbitCB").checked

function animate() {
    requestAnimationFrame(animate);

    c.width = document.documentElement.clientWidth - 10
    c.height = document.documentElement.clientHeight

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    baseAngle += Math.PI/baseSpeed
    if (baseAngle >= Math.PI*2){ baseAngle = 0 }

    stars.forEach(star => {
        star.drawBody(ctx);
    });

    if(drawOrbits){
        planets.forEach(body => {
            body.drawOrbit(ctx)
        });
    }

    for (let i = 0; i < planets.length; i++) {
        const body = planets[i];

        body.drawBody(ctx)
        if(document.getElementsByClassName("PlanetOrbitSelect").length > 0){
            body.orbit(planets[document.getElementsByClassName("PlanetOrbitSelect")[i].value], 100, baseAngle * body.speed)
        }
    }

    updateColorLabel()

    correctOrbitSelect()
}
animate();

function cssSetup(){
    var optionsParent = document.getElementById("options-parent")
    var optionsParentStyle = getComputedStyle(optionsParent)

    optionsParent.style.maxHeight = c.height - parseInt(optionsParentStyle.borderRadius) + "px"
}