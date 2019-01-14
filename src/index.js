// import test.js files to this (index.js) file
import Form from './Form';
import CardList from './CardList';

// need to 'instantiate' our class

class App {
    constructor() {
        // store all github users into an array
        // this.cards = [];

        // this.cards will get a method call getCards()
        this.cards = this.getCards();


        // allows the user to DYNAMICALLY set the value of THIS
        // pseudo-code = anytime we use tha addCard() function, we are always binding it to the App Class (not the Form class)
        // Currently, when you call 'this' on the addCard method, it refers to the Form class
        // we want to force 'this' to refer to the App class
        // using method below will force 'this' to refer to the App class
        
        // WILL USE bind() method often to set th value of 'this'
        this.addCard = this.addCard.bind(this);
        //
        this.clearCards = this.clearCards.bind(this);
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
        CardList(this.cards);

        // Use localStorage to store user data when brower refreshes
        // stringify() is a method on JSON that converts JSON data into JS strings
        localStorage.setItem('users', JSON.stringify(this.cards));

    }
    // create a method that will clear cards
    // creating clearCards() method on the App class to access the this.cards
    clearCards() {
        // set cards array to an empty array
        this.cards = [];
        CardList(this.cards);
        // also want to clear items out of localStorage
        localStorage.setItem('users', '');
    }
    // the getCards() method below will check if any values are present in localStorage
    // else it will return an empty array 
    getCards() {
        if(localStorage.getItem('users')) {
            // the parse() method on JSON will convert the JS strings in localStorage in JSON data
            return JSON.parse(localStorage.getItem('users'));
        } else {
            return [];
        }
    }
}
const app = new App()
// LINE BELOW - allows us to pass the addCard() and clearCards() method (that was only available on the App class) to the Form class
// Passing both methods as arguments of the Form class
const form = new Form(app.addCard, app.clearCards);

// create render() method that can render the 'data' from CardList.js file and append it to the DOM
// 'node' in this case refers to the DOM element 'root'
export const render = (html, node) => (node.innerHTML = html);

// Due to the render() method above, we will need to call CardList() again in order to append items stored in localStorage to the DOM
CardList(app.cards);