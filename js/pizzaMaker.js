// Selecting elements
const pizzaNameInput = document.querySelector('#pizzaInput');
const pizzaSizeRadios = document.querySelectorAll('input[name="pizza_Size"]');
const sauceRadios = document.querySelectorAll('input[name="sauces"]');
const vegetableCheckboxes = document.querySelectorAll('.vegi');
const meatCheckboxes = document.querySelectorAll('.meat');
const cheeseCheckboxes = document.querySelectorAll('.cheese');
const cutRadios = document.querySelectorAll('input[name="cut"]');
const bakeRadios = document.querySelectorAll('input[name="bake"]');
const crustRadios = document.querySelectorAll('input[name="crust"]');
const orderButton = document.querySelector('button');

const errorText = document.querySelector("#errorText");

const pizzaOutput = document.querySelector("#pizzaOutput");

const pizzaNameContainer = document.querySelector("#pizzaName");
const pizzaSizeContainer = document.querySelector("#sizeContainer");
const pizzaSaucesContainer = document.querySelector("#saucesContainer");
const instructionsContainer = document.querySelector("#instructions");

const studentText = document.querySelector("#studentInfo");

// Function to get the value of the checked radio button
function getCheckedFromRadio(radioButtons) {
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            return radioButton.value;
        }
    }
    // If no radio button is checked, return null or handle the situation accordingly
    return null;
}

function getCheckedValuesFromCheckboxes(checkboxes) {
    const values = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            values.push(checkbox.name);
        }
    });
    return values;
}


function appendErrorMessage(message) {
    const errorMessage = document.createElement('div');
    errorMessage.textContent = message;
    errorText.appendChild(errorMessage);
}

function appendPizzaDetails(message,identity) {
    const pizzaMessage = document.createElement('div');
    pizzaMessage.textContent = message;
    pizzaMessage.id = identity;
    pizzaOutput.appendChild(pizzaMessage);
}

function changeBorderColor(control, color) {
    control.style.border = `3px solid ${color}`;
}

function makeSentenceFromArray(ArrayName,array) {
    // Check if the array is empty
    if (array.length === 0) {
        return `No ${ArrayName}s`;
    }

    // Join the elements of the array into a sentence
    let sentence = `${ArrayName}: `
    sentence+= array.join(', ');

    return sentence;
}

class Pizza {
    constructor(name, size, sauce, vegetables, meats, cheeses, cut, bake, crust) {
        this.name = name;
        this.size = size;
        this.sauce = sauce;
        this.vegetables = vegetables;
        this.meats = meats;
        this.cheeses = cheeses;
        this.cut = cut;
        this.bake = bake;
        this.crust = crust;
    }

    // Method to display the pizza details
    displayDetails() {
        appendPizzaDetails("Pizza Name: " + this.name,"pizzaName");
        appendPizzaDetails("Pizza Size: "+ this.size,"pizzaSize");
        appendPizzaDetails("Pizza Sauce: "+this.sauce,"pizzaSauce");
        appendPizzaDetails("Pizza Cut: "+this.cut,"pizzaCut");
        appendPizzaDetails("How you want it cooked: "+this.bake,"pizzaBake");
        appendPizzaDetails("Type of Crust: "+this.crust,"pizzaCrust");
        appendPizzaDetails(makeSentenceFromArray("Cheese",this.cheeses),"pizzaCheeses");
        appendPizzaDetails(makeSentenceFromArray("Vegetable",this.vegetables),"pizzaVegis");
        appendPizzaDetails(makeSentenceFromArray("Meat",this.meats),"pizzaMeats");
        appendPizzaDetails("Price: $"+String(this.calculatePrice().toFixed(2)),"Price")


    }

    // Method to calculate the total price of the pizza
    calculatePrice() {

        let totalPrice = 12; // the price of a small pizza with 0 toppings
        if(this.size == "Medium")
        {
            totalPrice+=3;
        }
        else if(this.size == "Large")
        {
            totalPrice+=6;
        }

        if(this.cheeses.length > 1) //one cheese is free 2$ after
        {
            totalPrice+= (cheeses.length-1)*2;
        }
        let toppingCount = this.vegetables.length + this.meats.length;
        if( toppingCount>1) //one topping other than cheese is free, other toppings $1.5 more each
        {
            totalPrice+= (toppingCount-1)*1.5;
        }

        // Calculate price based on size, toppings, etc.
        return totalPrice;
    }
}




function buildPizza(e)
{
    e.preventDefault();
    canCreatePizza = 1;
    errorText.textContent= "";
    pizzaOutput.textContent= "";
    changeBorderColor(pizzaNameContainer,"Black");
    changeBorderColor(pizzaSizeContainer,"Black");
    changeBorderColor(pizzaSaucesContainer,"Black");
    changeBorderColor(instructionsContainer,"Black");
    // Get values from radio buttons
    let pizzaName = pizzaNameInput.value;
    const pizzaSize = getCheckedFromRadio(pizzaSizeRadios);
    const sauce = getCheckedFromRadio(sauceRadios);
    const cut = getCheckedFromRadio(cutRadios);
    const bake = getCheckedFromRadio(bakeRadios);
    const crust = getCheckedFromRadio(crustRadios);
    const studentDetails = document.createElement("div");
    studentDetails.innerHTML = `Student Name - Number<br>Constantine Grigoriadis - 1234197`;
    
    studentText.appendChild(studentDetails);
  

    // Get values from checkboxes
    const vegetables = getCheckedValuesFromCheckboxes(vegetableCheckboxes);
    const meats = getCheckedValuesFromCheckboxes(meatCheckboxes);
    const cheeses = getCheckedValuesFromCheckboxes(cheeseCheckboxes);
    console.log("PizzaName:", pizzaName);

    console.log("Vegetables:", vegetables);
    console.log("Meats:", meats);
    console.log("Cheeses:", cheeses);
    console.log("Pizza Size:", pizzaSize);
    console.log("Sauce:", sauce);
    console.log("Cut:", cut);
    console.log("Bake:", bake);
    console.log("Crust:", crust);

    breakElement = document.createElement("br");
    if(pizzaName == "")
    {
        appendErrorMessage("Pizza must have a name");
        changeBorderColor(pizzaNameContainer,"Red");
        canCreatePizza = 0;
    }
    if(pizzaSize == null)
    {
        appendErrorMessage("Pizza Size must be selected");
        changeBorderColor(pizzaSizeContainer,"Red");
        canCreatePizza = 0;
    }
    if(sauce == null)
    {
        appendErrorMessage("Sauce must be filled out");
        changeBorderColor(pizzaSaucesContainer,"Red");
        canCreatePizza = 0;
    }
    if(cut==null)
    {
        appendErrorMessage("Cut of pizza must be selected");
        changeBorderColor(instructionsContainer,"Red");
        canCreatePizza = 0;
    }
    if(bake==null)
    {
        appendErrorMessage("Select the level of doneness");
        changeBorderColor(instructionsContainer,"Red");
        canCreatePizza = 0;
    }
    if(crust == null)
    {
        appendErrorMessage("Select a crust");
        changeBorderColor(instructionsContainer,"Red");
        canCreatePizza = 0;
    }
    
    if(canCreatePizza)
    {
        changeBorderColor(pizzaOutput,"Black");
        changeBorderColor(pizzaNameContainer,"Black");
        changeBorderColor(pizzaSizeContainer,"Black");
        changeBorderColor(pizzaSaucesContainer,"Black");
        changeBorderColor(instructionsContainer,"Black");
        myPizza = new Pizza(pizzaName,pizzaSize,sauce,vegetables,meats,cheeses,cut,bake,crust);
        myPizza.displayDetails();
    }
    else
    {
        changeBorderColor(pizzaOutput,"Red");
    }
}

orderButton.addEventListener("click",buildPizza)