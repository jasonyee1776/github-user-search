// import test.js files to this (index.js) file
import text from './test'
// import numbers.js file
import numbers from './numbers'

import Form from './Form';

document.querySelector('#root').innerHTML = `${text} <br> ${numbers}`;
// need to 'instantiate' our class

class App {
    constructor() {
        // store all github users into an array
        this.cards = [];
        // allows the user to DYNAMICALLY set the value of THIS
        // pseudo-code = anytime we use tha addCard() function, we are always binding it to the App Class (not the Form class)
        this.addCard = this.addCard.bind(this);
    }

    addCard(data) {
        // console.log(data);
        // Two ways to add users data to array
            // 1) Using .push method to add users to array
        // this.cards.push(data);
            // 2) ES6 feature 'spread operator'
            // Creating a new array and copying all the values of this.cards and then adding the data as the last value
            // ALSO a great way to order entires in an array
        this.cards = [...this.cards, data];
        console.log(this);
    }
}
const app = new App()
const form = new Form(app.addCard);

