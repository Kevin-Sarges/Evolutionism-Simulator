let button = document.getElementById('simulate');

let numberOfSimulatedDaysInput = document.getElementById('number-of-simulated-days');
let populationBaseEnergyInput = document.getElementById('population-base-energy');
let initialIndividualNumberInput = document.getElementById('initial-individual-number');
let amountOfFoodInput = document.getElementById('amount-of-food');
let mutationChanceInput = document.getElementById('mutation-chance');
let speedInput = document.getElementById('speed');

let canvas = document.querySelectorAll('canvas');

button.addEventListener('click', simulate);

function simulate(e){
    e.preventDefault();

    canvas.forEach(item => item.classList.toggle('escondido'));
    
    let numberOfSimulatedDays = numberOfSimulatedDaysInput.value;
    let populationBaseEnergy = populationBaseEnergyInput.value;
    let initialIndividualNumber = initialIndividualNumberInput.value;
    let amountOfFood = amountOfFoodInput.value;
    let mutationChance = mutationChanceInput.value; 
    let speed = speedInput.value; 

    let delayTimeInMilisec = 10 / speed

    let simulation = new Simulation(numberOfSimulatedDays, populationBaseEnergy, initialIndividualNumber, amountOfFood, delayTimeInMilisec, mutationChance);

    button.classList.toggle('escondido');

    simulation.simulate().then(()=>{
        // button.classList.toggle('escondido');
    });
}
