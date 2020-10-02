class Plotter{
    constructor(numberOfSimulatedDays){
        this.canvas = document.getElementById('graphic');
        this.context = this.canvas.getContext("2d"); 
        
        this.numberOfSimulatedDays = numberOfSimulatedDays;
    }

    plot(listOfFood, listOfIndividuals, day){
        let foodQtd = listOfFood.length;
        let individualsQtd = listOfIndividuals.length;

        this.context.beginPath(); 
        this.context.fillStyle = 'black';
        this.context.arc((this.canvas.width/this.numberOfSimulatedDays) * day, this.canvas.width - (this.canvas.height/(foodQtd * 2)) * individualsQtd, 2, 0, 2 * Math.PI);
        this.context.fill();

        this.context.beginPath(); 
        this.context.fillStyle = 'green';
        this.context.arc((this.canvas.width/this.numberOfSimulatedDays) * day, this.canvas.width - (this.canvas.height/(foodQtd * 2)) * foodQtd, 2, 0, 2 * Math.PI);
        this.context.fill();
    }
}
