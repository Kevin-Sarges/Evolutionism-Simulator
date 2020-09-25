class Individual{

    constructor(maxEnergy, speed, rayOfVision, position, mutationChance, color){

        this.color = color;

        this.maxEnergy = maxEnergy;
        this.speed = speed;
        this.rayOfVision = rayOfVision;

        this.position = position;

        this.mutationChance = mutationChance;

        this.atualEnergy = this.maxEnergy;

        this.hasSearchPath = false;
        this.foundFood = false;

        this.searchDirection = { x: 0, y: 0 };

        this.seekFood = null;

        this.consumedFood = 0;
    }

    getPosition(){
        return this.position;
    }

    getConsumedFood(){
        return this.consumedFood;
    }

    hunt(foodList){

        if(this.atualEnergy > 0 && this.consumedFood < 2){

            if(!this.seekFood || !this.seekFood.isAvalibe()){
                this.foundFood = false;
                this.seekFood = null;
            }
        
            if(this.foundFood === true){
                this.followFood(this.seekFood);
            } else {
                this.searchFood(foodList);
                if(this.hasSearchPath){
                    this.followSearchDirection()
                } else {
                    this.setSearchDirection();
                }
            }
        }
    }

    setSearchDirection(){
        this.searchDirection ={
            x: Math.floor(Math.random() * 500),
            y: Math.floor(Math.random() * 500)
        }

        this.hasSearchPath = true;

        this.followSearchDirection();
    }

    followSearchDirection(){
        let direction = {
            i: 0,
            j: 0
        }

        let position = {
            x: this.searchDirection.x - this.position.x,
            y: this.searchDirection.y - this.position.y
        }
        
        if(position.x > 0){
            direction.i = 1;
        } else if(position.x < 0) {
            direction.i = -1;
        } else {
            direction.i = 0;
        }

        if(position.y > 0){
            direction.j = 1;
        } else if(position.y < 0) {
            direction.j = -1;
        } else {
            direction.j = 0;
        }
        
        this.move(direction);

        if(this.getDistancia(position) < this.rayOfVision){
            this.hasSearchPath = false;
        }
    }

    searchFood(foodList){
        foodList.forEach(food => {
            let position = {
                x: 0,
                y: 0
            }

            position.x = food.getPosition().x - this.position.x;
            position.y = food.getPosition().y - this.position.y;

            let foodDistance = this.getDistancia(position);

            if(food.isAvalibe()){     
                if(foodDistance < this.rayOfVision &&
                    this.consumedFood < 2 &&
                    this.foundFood === false){
                        if(!this.seekFood){
                            this.seekFood = food;
                            this.foundFood = true;
                            return;
                        }
                }
            }
        });
    }

    followFood(seekFood ){
        let direction = {
            i: 0,
            j: 0
        }

        let xPosition = seekFood.getPosition().x - this.position.x;
        let yPosition = seekFood.getPosition().y - this.position.y;
        
        if(xPosition > 0){
            direction.i = 1;
        } else if(xPosition < 0) {
            direction.i = -1;
        } else {
            direction.i = 0;
        }

        if(yPosition > 0){
            direction.j = 1;
        } else if(yPosition < 0) {
            direction.j = -1;
        } else {
            direction.j = 0;
        }
        
        this.eat(seekFood);
        this.move(direction);
    }

    move(direction){
        if(this.atualEnergy > 0){
            if(this.position.x + direction.i * this.speed >= 0 && 
                this.position.y + direction.j * this.speed >= 0){
                    this.position = {
                        x: this.position.x + direction.i * this.speed,
                        y: this.position.y + direction.j * this.speed
                    }
                }
            this.lossEnergy();
        }
    }

    eat(food){
        let xPosition = food.getPosition().x - this.position.x;
        let yPosition = food.getPosition().y - this.position.y;

        if(this.getDistancia({x:xPosition, y: yPosition}) <= (this.speed) 
            && this.consumedFood < 2 
            && food.isAvalibe()){
                this.consumedFood++;
                food.consume();
                this.hasSearchPath = false;
                this.foundFood = false;
                this.searchDirection = { x: 0, y: 0 };
                this.seekFood = null;
        }
    }

    lossEnergy(){
        this.atualEnergy = this.atualEnergy - this.speed * 2;
    }

    generateMutation(){
        function addHexColor(c1, c2) {
            var hexStr = (parseInt(c1, 16) + parseInt(c2, 16)).toString(16);
            while (hexStr.length < 6) { hexStr = '0' + hexStr; } // Zero pad.
            return hexStr;
        }
          
        let fatorDeMutacao = Math.random() * 100;

        if(fatorDeMutacao < (this.mutationChance - 1)){
            this.color = addHexColor(this.color, '0f05aa');
            return this.speed + 0.2;
        } 
        // else if(fatorDeMutacao < (this.mutationChance * 2 - 1)){
        //     if(this.speed - 1 > 0){
        //         this.color = 'yellow';
        //         return this.speed - 10;
        //     }
        // }  
            
        return this.speed;
    }
    
    getDistancia(position){
        return Math.sqrt(Math.pow(position.x, 2) + Math.pow(position.y, 2));
    }

    reproduce(individualList){
        if(this.consumedFood >= 2){
            individualList.push(new Individual(this.maxEnergy, this.speed, this.rayOfVision, this.position, this.mutationChance, this.color));
        }
    }

    sleep(individualList){
        this.speed = this.generateMutation();
        this.reproduce(individualList);
        this.atualEnergy = this.maxEnergy;
        this.hasSearchPath = false;
        this.foundFood = false;
        this.searchDirection = { x: 0, y: 0 };
        this.seekFood = null;
        this.consumedFood = 0;
    }
}