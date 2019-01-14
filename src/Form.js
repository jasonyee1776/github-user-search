import axios from 'axios';

// set variable outside of JS class
// good practice to use ALL CAPS with const
const API_URL = 'https://api.github.com/users'

// create a JavaScript Class using ES6
class Form {
    // constructor() is a method that you can call on ES6 classes
    // Passing App class methods - addCard() and clearCards() - as parameter of the Form class constructor() method
    constructor(addCard, clearCards) {
        this.addCard = addCard;
        this.clearCards = clearCards;
        this.API_URL = '';
        this.searchTerm = '';
        // to create a variable...
        // one does NOT use const, let, var, etc
        // must put variables on the "this" value
        this.searchInput = document.querySelector("input[name='search']");
        // add an event listener to the newly established variable
        this.searchInput.addEventListener('keyup', () => {this.handleKeyup(event)});
        this.submitButton = document.querySelector("button[type='submit']");

/* 
PREVENT USER FROM SUBMITTING AN EMPTY INPUT ---> 

2 METHODS:

   1st method - use an if statment when input value is an empty string... disable button
        -if (this.searchTerm === '') {
            this.submitButton.disabled = true;
        }
    2nd method - disable submit button when the value of user input is empty using STRING COERCION
        -In JS - an empty string is coerced to FALSE
        -Use '!' to set the opposite value
        -SEE BELOW...
*/
        this.submitButton.disabled = !this.searchTerm;

        // Add event listener when user clicks the 'clear' button
        // Calls the clearCards() method when users clciks on the clear button
        this.clearButton = document.querySelector("button[type='button']");
        this.clearButton.addEventListener('click', () => this.clearCards());

        // Add event listener when user submits the form 
        this.form = document.querySelector('form');
        this.form.addEventListener('submit', () => this.handleSubmit(event));
    }

    handleKeyup(event) {
        // getting value of input typed by user
        this.searchTerm = event.target.value.trim();
        console.log(this.searchTerm)
        // "interpolating" a variable below
        this.API_URL = `${API_URL}/${this.searchTerm}`;
        console.log(this.API_URL);
        this.submitButton.disabled = !this.searchTerm;
    }

    handleSubmit(event) {
        event.preventDefault();
        // Axios will make a GET for a specific URL
        // Will return a PROMISE 
        // PROMISE = guarentee a value will be retunred at some point
        axios
            .get(this.API_URL) 
            // callback function
            // 'res' is the results from API call SEE LINE BELOW
            // .then(res => console.log(res.data));
            // What if we only want a specific 'data' from our 'res'?
            // Can achieve this using DESTRUCTURING (SEE BELOW)
            // wrap 'data' object in curly brackets
            .then(({ data }) => this.addCard(data))
            // catches users that are invalid and returns an error 
            // lets developers customize error message to user
            .catch(err => this.formatError('Promise rejected!', err));
            // Need to remove user input once user submits the form
            // this.
            this.form.reset();
        console.log(event);
        // removes text from input when user hits submt button
        // can use... this.searchTerm = '';
        // or below...
        // add the reset() method to the form, this will remove any text from the input
        this.form.reset();
    }

    formatError(err) {
        console.error(err);
        const errorText = document.createElement('p');
        errorText.style.color = 'red';
        errorText.style.fontWeight = 'bold';
        errorText.style.fontSize = '1.5em';
        errorText.innerText = 'No user found';
        this.form.appendChild(errorText);
        // to remove error text from DOM
        setTimeout(() => this.form.removeChild(errorText), 5000);
    }
}

export default Form; 