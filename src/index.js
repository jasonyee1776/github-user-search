// import test.js files to this (index.js) file
import Form from './Form';
import CardList from './CardList';

// need to 'instantiate' our class

class App {
    constructor() {
        // store all github users into an array
        this.cards = [];
        // allows the user to DYNAMICALLY set the value of THIS
        // pseudo-code = anytime we use tha addCard() function, we are always binding it to the App Class (not the Form class)
        // Currently, when you call 'this' on the addCard method, it refers to the Form class
        // we want to force 'this' to refer to the App class
        // using method below will force 'this' to refer to the App class
        
        // WILL USE bind() method often to set th value of 'this'
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
        this.cards = [data, ...this.cards];
        console.log(this.cards);

        // Need to output user data to the DOM somehow
        CardList(this.cards)
    }
}
const app = new App()
const form = new Form(app.addCard);

// create render() method that can render the 'data' from CardList.js file and append it to the DOM
// 'node' in this case refers to the DOM element 'root'
export const render = (html, node) => (node.innerHTML = html);