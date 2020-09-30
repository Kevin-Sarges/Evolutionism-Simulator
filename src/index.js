let button = document.getElementById('simulate');

let numberOfSimulatedDaysInput = document.getElementById('number-of-simulated-days');
let populationBaseEnergyInput = document.getElementById('population-base-energy');
let initialIndividualNumberInput = document.getElementById('initial-individual-number');
let amountOfFoodInput = document.getElementById('amount-of-food');
let speedInput = document.getElementById('speed');

button.addEventListener('click', simulate);

function simulate(e){
    e.preventDefault();

    let numberOfSimulatedDays = numberOfSimulatedDaysInput.value;
    let populationBaseEnergy = populationBaseEnergyInput.value;
    let initialIndividualNumber = initialIndividualNumberInput.value;
    let amountOfFood = amountOfFoodInput.value;

    let speed = speedInput.value; 

    let delayTimeInMilisec = 10 / speed

    let simulation = new Simulation(numberOfSimulatedDays, populationBaseEnergy, initialIndividualNumber, amountOfFood, delayTimeInMilisec);

    button.disabled = true;

    simulation.simulate().then(()=>{
        button.disabled = false;
    });
}
