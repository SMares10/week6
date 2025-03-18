//user data
const users=
{username:'admin', password: 'password123'};  //database

//cart data
const cart=[];


//store logged in user
let loggedInUser = null;

function handleLogin(event) {
    event.preventDefault(); // Prevents the default form submission behavior

    const userNameElement = document.getElementById('username'); // Retrieves the username input field element
    console.log('userNameElement', userNameElement); // Logs the username input field element to the console

    const username = userNameElement.value; // Extracts the value entered in the username field
    console.log('username', username); // Logs the extracted username to the console

    const passwordElement = document.getElementById('password'); // Retrieves the password input field element
    console.log('passwordElement', passwordElement); // Logs the password input field element to the console

    const password = passwordElement.value; // Extracts the value entered in the password field
    console.log('password', password); // Logs the extracted password to the console

    console.log('users.username', users.username)

if (users.username !== username || users.password !== password){
    alert(`${username} is not found`)
    return
}

else{
    loggedInUser=users;
    console.log('loggedInUser', loggedInUser)
}

let welcomeMessageElement = document.getElementById('welcome-message');
welcomeMessageElement.innerText=`Welcome ${loggedInUser.username}`
}

function addToCart(item, price){
    console.log('item', item);
    console.log('price',price);

const objectToInsert= {
    drink: item,
    cost: price
}
console.log('objectToInsert',objectToInsert)
cart.push(objectToInsert)
console.log('cart pushed', cart);

let ulElement = document.getElementById("cart-items"); 
let liElement = document.createElement('li'); 
console.log('liElement', liElement); 


for (let index = 0; index < cart.length; index++) {
 console.log('index', index)
 console.log('cart[index]', cart[index])
}


liElement.innerText = `Item: ${cart[index].drink}, Price: $${cart[index].cost.toFixed(2)}`; 
console.log('liElement again', liElement); 
ulElement.appendChild(liElement);


}

//console.log('totalCost',totalCost)
