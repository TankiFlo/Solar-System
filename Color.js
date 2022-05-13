class Color{
    constructor(r,g,b,a=1){
        this.r = r
        this.g = g
        this.b = b
        this.a = a
    }

    colorToString(){
        return `rgba(${this.r},${this.g},${this.b},${this.a})`
    }
}