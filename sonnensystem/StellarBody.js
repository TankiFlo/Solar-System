class StellarBody {
    constructor(name, posX, posY, size, color, speed, orbits=undefined){
        this.name = name;
        this.posX = posX;
        this.posY = posY;
        this.size = size;
        this.color = color;
        this.speed = speed;
        this.orbitLine = new Array()
        this.maxOrbitLength = 500
        this.orbits = orbits
    }

    drawBody(ctx){
        ctx.beginPath();
        ctx.fillStyle = this.color.colorToString()
        ctx.arc(this.posX, this.posY, this.size, 0, 2*Math.PI);
        ctx.fill();
        ctx.closePath();
    }

    orbit(sb, r, angle){
        if (sb instanceof StellarBody){
            this.orbits = sb
            let dx = Math.cos(angle) * r
            this.posX = sb.posX + dx
            let dy = Math.sin(angle) * r
            this.posY = sb.posY + dy
        }
    }

    drawOrbit(ctx){
        var pos = [this.posX, this.posY]

        this.orbitLine.push(pos)

        if(this.orbitLine.length >= this.maxOrbitLength){
            this.orbitLine.shift()
        }

        for (var i = 0; i < this.orbitLine.length; i++){
            ctx.fillStyle = new Color(this.color.r,this.color.g,this.color.b,i/this.orbitLine.length).colorToString() //Maybe push to back?
            // ctx.fillRect(this.orbitLine[i][0] - this.size/4, this.orbitLine[i][1] - this.size/4, this.size/2, this.size/2)
            ctx.beginPath()
            ctx.arc(this.orbitLine[i][0], this.orbitLine[i][1], this.size/4, 0, 2 * Math.PI)
            ctx.fill()
            ctx.closePath()
        }

    }
}