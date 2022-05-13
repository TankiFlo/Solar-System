var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var optionsDiv = document.getElementById("options-parent")

function setup(){//ADD Customization Options for each Planet
    optionsDiv.innerHTML = ""

    optionsDiv.innerHTML = `
    <input type="button" id="PlanetButt" onclick="addPlanet()" value="Add Planet">
    <br><br>

    <label for="OrbitCB">Draw Orbits:</label>
    <input type="checkbox" id="OrbitCB" onchange="  drawOrbits = !drawOrbits;         
                                                    planets.forEach(body => {
                                                        body.orbitLine = [];
                                                    });">`

    for (var i = 0; i < planets.length; i++){
        optionsDiv.innerHTML += `
        <div id="${planets[i].name}">
            <h2>${planets[i].name}</h2>
            <h3>Position</h3>
            <label for="${planets[i].name}-xSlider">x</label>
            <input type="range" min="0" max="100" value="50" id="${planets[i].name}-xSlider" class="PlanetPositionSlider" oninput="planets[${i}].posX = parseInt(event.target.value)">
            <br>
            <label for="${planets[i].name}-ySlider">y</label>
            <input type="range" min="0" max="100" value="50" id="${planets[i].name}-ySlider" class="PlanetPositionSlider" oninput="planets[${i}].posY = parseInt(event.target.value)">
            <br>
            <label for="${planets[i].name}-ySlider">Size</label>
            <input type="range" min="5" max="100" value="50" id="${planets[i].name}-SizeSlider" class="PlanetSizeSlider" oninput="planets[${i}].size = parseInt(event.target.value)">
            <br>
            <label for="${planets[i].name}-ySlider">Color</label>
            <br>
            <label for="${planets[i].name}-ySlider">Speed</label>
            <input type="range" min="0" max="10" value="50" id="${planets[i].name}-SpeedSlider" class="PlanetSpeedSlider" oninput="planets[${i}].speed = parseInt(event.target.value)">
    
            <label for="${planets[i].name}-orbit">Orbits:</label>
            <select id="${planets[i].name}-orbit" class="PlanetOrbitSelect">
                <option value="None">None</option>
            </select>
        </div>
        `
    }

    var planetOrbitSelectors = document.getElementsByClassName("PlanetOrbitSelect");

    for (let i = 0; i < planetOrbitSelectors.length; i++) {
        for (var k = 0; k < planets.length; k++){
            planetOrbitSelectors[i].innerHTML += `
            <option value="${k}">${planets[k].name}</option>
            `
            planetOrbitSelectors[i].innerHTML = planetOrbitSelectors[i].innerHTML.replace(`
            <option value="${i}">${planets[i].name}</option>
            `, "")
        }
    }
    
    //ADDED Customization Options for each Planet
    
    //START Slider Setup
    var planetPosSliders = document.getElementsByClassName("PlanetPositionSlider");
    
    for (var i = 0; i < planetPosSliders.length; i++){
        if(i%2 == 0){ //X Slider
            planetPosSliders[i].max = c.width
            planetPosSliders[i].value = planets[Math.floor(i/2)].posX
        } else { //Y Slider
            planetPosSliders[i].max = c.height
            planetPosSliders[i].value = planets[Math.floor(i/2)].posY
        }
    }
    
    var planetSizeSlider = document.getElementsByClassName("PlanetSizeSlider")
    
    for (let i = 0; i < planetSizeSlider.length; i++) {
        planetSizeSlider[i].value = planets[i].size
    }
    
    var planetSpeedSlider = document.getElementsByClassName("PlanetSpeedSlider")
    
    for (let i = 0; i < planetSpeedSlider.length; i++) {
        planetSpeedSlider[i].value = planets[i].speed
    }
    //END Slider Setup
}

function addPlanet(){
    var rdmString = (Math.random() + 1).toString(36).substring(7)
    planets.push(new StellarBody(rdmString.toUpperCase() + rdmString.slice(1),
    Math.round(Math.random() * c.width), 
    Math.round(Math.random() * c.height), 
    Math.round(Math.random() * 50), 
    new Color(Math.round(Math.random() * 255),Math.round(Math.random() * 255),Math.round(Math.random() * 255)), 
    Math.round(Math.random() * 10)));

    setup()
}