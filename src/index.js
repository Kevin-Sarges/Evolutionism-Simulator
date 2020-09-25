let button = document.getElementById('simulate');

let numberOfSimulatedDaysInput = document.getElementById('number-of-simulated-days');
let populationBaseEnergyInput = document.getElementById('population-base-energy');
let initialIndividualNumberInput = document.getElementById('initial-individual-number');
let amountOfFoodInput = document.getElementById('amount-of-food');

button.addEventListener('click', simulate);

function simulate(e){
    e.preventDefault();

    let numberOfSimulatedDays = numberOfSimulatedDaysInput.value;
    let populationBaseEnergy = populationBaseEnergyInput.value;
    let initialIndividualNumber = initialIndividualNumberInput.value;
    let amountOfFood = amountOfFoodInput.value;

    let simulation = new Simulation(numberOfSimulatedDays, populationBaseEnergy, initialIndividualNumber, amountOfFood);

    button.disabled = true;

    simulation.simulate().then(()=>{
        button.disabled = false;
    });
}
