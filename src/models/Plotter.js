class Plotter{
    constructor(numberOfSimulatedDays){
        this.canvas = document.getElementById('graphic');
        this.context = this.canvas.getContext("2d"); 
        
        this.numberOfSimulatedDays = numberOfSimulatedDays;
    }

    plot(x, y, yScale, color){
        this.context.beginPath(); 
        this.context.fillStyle = color;
        this.context.arc((this.canvas.width/this.numberOfSimulatedDays) * x, this.canvas.width - (this.canvas.height/(yScale * 2)) * y, 2, 0, 2 * Math.PI);
        this.context.fill();
    }
}
