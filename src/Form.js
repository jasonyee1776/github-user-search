import axios from 'axios';

// set variable outside of JS class
// good practice to use ALL CAPS with const
const API_URL = 'https://api.github.com/users'

// create a JavaScript Class using ES6
class Form {
    // constructor() is a method that you can call on ES6 classes
    constructor(addCard) {
        this.addCard = addCard;
        this.API_URL = '';
        this.searchTerm = '';
        // constructor() is where one declares variables
        // to create a variable...
        // one does NOT use const, let, var, etc
        // must put variables on the "this" value
        this.searchInput = document.querySelector("input[name='search']");
        // add an event listener to the newly established variable
        this.searchInput.addEventListener('keyup', () => {this.handleKeyup(event)});
        this.submitButton = document.querySelector("button[type='submit']");
    // Prevent user from submitting an empty input ---> 2 WAYS
    // 1st - use an if statment when input value is an empty string and disable button
        // if (this.searchInput === '') {
        //     this.submitButton.disabled = true;
        // } 

    // 2nd way - disable button wiht the boolean value of an empty string
    // In JS - an empty string is coerced to FALSE
    // use ! to set the opposite value
        this.submitButton.disabled = !this.searchTerm;
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
        // PROMISE = guarentee a value will be retunred
        axios
            .get(this.API_URL) 
            // callback function
            // .then(res => console.log(res.data));
            .then(({ data }) => this.addCard(data))
            // catches users that are invalid and returns an error 
            .catch(err => console.error('Promise rejected', err))
        console.log(event);
        // removes text from input when user hits submt button
        this.form.reset();
    }
}

export default Form; 