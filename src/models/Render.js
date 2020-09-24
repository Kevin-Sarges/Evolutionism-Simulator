class Render{
    constructor(){
        this.canvas = document.getElementById('myCanvas');
        this.context = this.canvas.getContext("2d");   
    }

    clear(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawFoodsList(foodList){
        foodList.forEach(food => {
            this.context.beginPath(); 

            if(food.isAvalibe()){
                this.context.fillStyle = 'green';
            } else {
                this.context.fillStyle = 'rgb(0,0,0,0)';
            }
            this.context.arc(food.position.x, food.position.y, 5, 0, 2 * Math.PI);
            this.context.fill();
        });
    } 

    drawIndividualsList(list){
        list.forEach(element => {
            this.context.beginPath(); 
            this.context.fillStyle = '#' + element.color;
            this.context.arc(element.position.x, element.position.y, 5, 0, 2 * Math.PI);
            this.context.fill();

            // this.context.beginPath(); 
            // this.context.fillStyle = element.color;
            // this.context.arc(element.position.x, element.position.y, element.rayOfVision, 0, 2 * Math.PI);
            // this.context.stroke();
        });
        
    }  
}
