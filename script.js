// User data
const user = { username: 'steve', password: 'p123' };

// Cart data
const cart = [];

// Store logged in user
let loggedInUser = null;

//making it global
let totalCost = 0;

// Function to handle login
function handleLogin(event) {
    event.preventDefault(); // Prevent page reload
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const user = users.find(user => user.username === username && user.password === password);
    
    if (user) {
        loggedInUser = user;
        document.getElementById('welcome-message').textContent = `Welcome, ${user.username}!`;
        alert('Login successful');
    } else {
        alert('Invalid username or password');
    }
}


function handleLogin2(event){
    event.preventDefault()
    const usernameElement = document.getElementById('username');
    console.log('usernameElement', usernameElement)
    const username = usernameElement.value
    console.log('username', username)
    const passwordElement = document.getElementById('password');
    console.log('passwordElement', passwordElement);
    const password = passwordElement.value;
    console.log('password', password)


    console.log('user.username', user.username)

    if(user.username !== username || user.password !== password){
        alert(` is not found`)
        return
    }
    else{
       loggedInUser = user;
       console.log('loggedInUser', loggedInUser)
    }

    let welcomeMessageElement = document.getElementById('welcome-message');
    welcomeMessageElement.innerText = `Welcome ${loggedInUser.username}`

}

function addToCart(item, price){

    // If the cart is empty, add the first item directly
    if(cart.length === 0){
        const objectToInsert = {
            drink: item,
            cost: price,
            quantity: 1
        }
        cart.push(objectToInsert)
    }
    // if cart is not empty, we need to check if the passed in item exists
    else{

        // you will see booleans created like this pretty often. it's typically called a flag.  
        let itemExists = false;

        // check if item already exists in cart. if it is then increase the quantity and set the flag to true
        // you will notice 'break'.  this is a keyword in javascript.  it breaks out of the loop.  it is used here to break out as soon if the item is found since there is no need to keep going. unlike return, which would exit the entire function, break just exits the loop
        for (let index = 0; index < cart.length; index++) {
            if(cart[index].drink === item){
                cart[index].quantity++
                itemExists = true
                break
            }
        }

        // if there are items in the cart, but this item does not exist, add it to the cart
        if(!itemExists){
            const objectToInsert = {
                drink: item,
                cost: price,
                quantity: 1
            }
            cart.push(objectToInsert)
        }
    }
    
    // call (invoke) the updateCart() function.  we orginally had the updateCart() code in the addToCart() function, but it is more readable to separate it out. 
    updateCart()

}

// Function to update cart display. 
// in this function we will reset the cart and the total each time. this is a pretty common approach when displaying elements on a page.
function updateCart() {

    // reset totalCost
    totalCost = 0;

    // get the element that we will be appending to
    let ulElement = document.getElementById("cart-items");


     // Clear the current list before updating to prevent duplicates
     // notice here we use innerHTML instead of inner text.  this will clear all the <li>s 
    ulElement.innerHTML = '';

    // loop through the cart to create the <li>s and append them. also we will calculate total cost.
    for (let index = 0; index < cart.length; index++) {

        // calculate total cost based on cost and quantity of each item
        totalCost += cart[index].cost * cart[index].quantity;

        // create <li> and fill it's innerHTML for each index of the cart array.  
        // we are also adding a button so we can remove items.
        const liElement = document.createElement('li')
        liElement.innerHTML = `
           Item: ${cart[index].drink}, Price: $${cart[index].cost.toFixed(2)}, Quantity: ${cart[index].quantity}
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        
        //append the li element
        ulElement.appendChild(liElement);
        
    }

    // get the element for the total and change it's innerText to the totalCost to 2 decimal places
    let totalElement = document.getElementById('total');
    totalElement.innerText = totalCost.toFixed(2);


}

// Function to remove item from the cart
// notice that this function takes in the index.  it then will remove everything in that the cart array at that index.  so even if the quantity of an item is greater than one, it will remove the whole item.
// Challenge: if quantity of an item is greater than 1, have it only decrease the quantity, but not completely remove the item
function removeFromCart(index) {
    cart.splice(index, 1);
    // just like in the addToCart() we need to update the cart to display the latest correct information. 
    // notice that we are called updateCart() under where it's function definition...hoisting!!
    updateCart();
}

// Function to handle checkout
// this function just empties the cart.  this is where you would add a payment system. 
// i did add a ternary operator on the alert.  



// ${loggedInUser && loggedInUser.username ? loggedInUser.username : 'Human'} - this bit is saying 'if loggedInUser is exists AND loggedInUser.username exists then display the value of loggedInUser.username.  if loggedInUser doesnt exist OR loggedInUser.username doesnt exist the display Human.  so you can think of the ? as an if and the : as an else.  you can have very long and confusing ternary operators so in most cases an if/else block might be a better way to go...for now :)
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

     // Get the total cost from the DOM
   // let totalCost = parseFloat(document.getElementById('total').innerText);   // this was used before making variable totalCost Global

    // Prompt the user to pay the total amount
    let payment = prompt(`Please pay $${totalCost.toFixed(2)}`);  // Directly use totalCost
    
    
    while (parseFloat(payment).toFixed(2) !== totalCost.toFixed(2)) {
        // If payment doesn't match, show an error and ask again
        alert("Incorrect payment. Please enter the correct amount.");
        payment = prompt(`Please pay $${totalCost.toFixed(2)}`);
        
    }
    
    alert(`Thank you for your purchase, ${loggedInUser && loggedInUser.username ? loggedInUser.username : 'Human'}!`);
    cart.length = 0;
    updateCart();


}
