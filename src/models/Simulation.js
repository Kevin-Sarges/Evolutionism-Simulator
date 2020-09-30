class Simulation {
  
    constructor(numberOfSimulatedDays, populationBaseEnergy, initialIndividualNumber, amountOfFood, delayTimeInMilisec) {
        this.numberOfSimulatedDays = numberOfSimulatedDays;
        this.populationBaseEnergy = populationBaseEnergy;
        this.initialIndividualNumber = initialIndividualNumber;
        this.amountOfFood = amountOfFood;
        this.delayTimeInMilisec = delayTimeInMilisec;

        this.individualList = [];
        this.foodList = [];

        this.averageSpeedPerGeneration = [];

        this.totalIndividualsPerGeneration = [];

        this.render = new Render();

    }

    getAverageSpeedPerGeneration(){
        return this.averageSpeedPerGeneration;
    }

    getTotalIndividualsPerGeneration(){
        return this.totalIndividualsPerGeneration;
    }

    async simulate(){
        this.individualList = this.generatePopulation(this.initialIndividualNumber);
        this.foodList = this.generateFood(this.amountOfFood);

        for(let i = 0; i < this.numberOfSimulatedDays; i++){
            await this.populationSeekFood(this.individualList, this.foodList);
            this.individualList = this.endOfTheDay(this.individualList, this.foodList, i);
            await this.delay(500);
        }
    }
    
    generateFood(amount){
        let foodList = [];
        for (let i = 0; i < amount; i++) {
            let foodPosition = {
                x: Math.floor(Math.random() * 500),
                y: Math.floor(Math.random() * 500)
            }
        
            foodList.push(new Food(foodPosition, this.context));
        }

        this.render.drawFoodsList(foodList);
        return foodList;
    }

    generatePopulation(amount){
        let individualList = [];
        
        for (let i = 0; i < amount; i++){
            let individualPosition = {
                x: Math.floor(Math.random() * 500),
                y: Math.floor(Math.random() * 500)
            }
        
            individualList.push(new Individual(this.populationBaseEnergy, 1, 50, individualPosition, 5, '000000'));
        }
        this.render.drawIndividualsList(individualList);
        return individualList;
    }
    
    async populationSeekFood(individualList, foodList){

        for(let i = 0; i < this.populationBaseEnergy; i++){
            this.render.clear();
            this.render.drawIndividualsList(individualList);
            this.render.drawFoodsList(foodList);

            for(let j = 0; j < individualList.length; j++){
                individualList[j].hunt(foodList); 
            }            
            await this.delay(this.delayTimeInMilisec);
        }
    }

    endOfTheDay(individualList, foodList){
        individualList = this.populationFilter(individualList);
        this.populationSleep(individualList)
        this.resetFood(foodList);
            
        return individualList;
    }

    populationFilter(individualList){

        let newIndividualList = individualList.filter(individual => {
            return individual.getConsumedFood() > 0;
        });
    
        return newIndividualList;
    }

    resetFood(foodList){
        foodList.forEach(comida => {
            comida.reset();
        });
    }
    
    populationSleep(individualList){
        individualList.forEach(individual => {
            individual.sleep(individualList);
        });
    }

    delay(ms) {
        return new Promise(
            resolve => setTimeout(resolve, ms)
        );
    }
}