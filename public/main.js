// login page
 if(window.location.pathname === '/login' || window.location.pathname === '/'){



//function to make data readalble which is passed in handlesubmit 
function stringifyFormData(fd)  //fd stands for form data
{const data = {}; // build object
for (let key of fd.keys()) { // iterate over all the keys in the object
    data[key] = fd.get(key); // iterate over all the keys in the object
}
return JSON.stringify(data, null, 4);
}



const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default to stop page from resfresh
    const data = new FormData(e.target); // creating our data & this is the data that we want to send to the server. This formates our data in a way that makes it possible to send it to the server.
    //we need to make the data readiable so we use stringufy
    const stringified = stringifyFormData(data) // firing function stringify 
    const response = await doLogin(stringified);
    location.href = response.redirectTo; // clent is redirecting not the server
    console.log(`The user is logged in: ${response.isAuthenticated}`);
};

const form = document.getElementById('form'); // initliazing form to be element from DOM (in index it's grabbing elementbyID 'form)
const credsContainer=form.querySelector('#credentials-container');
renderForm()// load function
form.addEventListener('submit', handleSubmit); // handeling submit eventon form capturing data

function renderForm() {
        const html = `
        <div class="">
    <div class="container-login-input">
        <div class="top">
            <span>Have an account?</span>
        </div>
        <div class="input-field">
            <input type="text" class="input" placeholder="Email" id="">
            <i class='bx bx-user' ></i>
        </div>
        <div class="input-field">
            <input type="Password" class="input" placeholder="Password" id="">
            <i class='bx bx-lock-alt'></i>
        </div>
        <div class="input-field">
            <input type="submit" class="btn btn-primary btn-wide" class="submit" value="Login" id="">
        </div>
        <p> Don't have an account yet? <a href="/register"> Register</a></p>
        <div class="two-col">
            <div class="one">
               <input type="checkbox" name="" id="check">
               <label for="check"> Remember Me</label>
            </div>
            <div class="two">
                <label><a href="#">Forgot password?</a></label>
            </div>
        </div>
    </div>
</div>  
</body>
</html>
        `;
   
        credsContainer.innerHTML = html;
}

// <div class="input-field"> 
        //     <input type="text" name="username" id="username" placeholder="Enter Username">
        //     <i class='bx bx-user' ></i>
        // </div>
        // <div class="input-field">
        //     <input type="password" name="password" id="password" placeholder="Enter Password">
        //   
        // </div>  
        //     <input type="submit" value="LogIn">

async function doLogin(body) {
    const data = await fetch('/login', {
        body,
        headers: {
            'Content-Type' : 'application/json'
        }, 
        method: 'POST'
    });
    const response = await data.json();
    return response;
}


}

if (window.location.pathname === '/register') {


  const regform = document.getElementById('form');
  const regcredsContainer = form.querySelector('#regcredentials-container');
  renderRegisterForm()
  form.addEventListener('submit', handleSubmit); // handeling submit eventon form capturing data

  //registertion function 
  function renderRegisterForm() {
    console.log('testing')
    const html = `
    <div class="reginput-field">
  

    
    <div class="inputBox">
    <label for="First Name">First Name</label>
    <input type='text' id="firstName" required />
 
    </div>
    <div class="inputBox">
    <label for="Last Name">Last Name</label>
    <input type='text'  id="lastName" required />
    </div>
    <div class="inputBox">
    <label for="Email Address">Email Address</label> 
    <input type='text'  id="emailAddress" required />
    </div>
    <div class="inputBox">
    <label for="Password">Password</label> 
    <input type='text'  id="password" required />
    <i class='bx bx-lock-alt'></i>
    </div>
    

        <input type="submit" class="btn btn-primary" value="Register" id=regsubmitbtn>
        </div>
    `;
    regcredsContainer.innerHTML = html;


    // event listener for register button 
    const regsubmitbtn = document.getElementById('regsubmitbtn');
    regsubmitbtn.addEventListener('click', function (event) {
      event.preventDefault();
      window.location.href = 'landing';
    })
 
  }




  // POST TEMPLATE construct user object
  const user = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    email: document.querySelector("#emailAddress").value,
    password: document.querySelector("#password").value,
  }

  // post to server with user object:
  fetch("/register",    // format 
    {
      method: "POST", // format
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }
 
).then((res)=> res.json())
.then(data=>{
    console.log ("RES", data);
    document.location.replace("/landing"); // redirect to landing page
});



}

if(window.location.pathname === '/landing'){

const searchContainer = document.querySelector('#search-container');


// //retrieve user info from login
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const firstName = urlParams.get('firstName');

// display user's first name in greeting
const greeting = document.getElementById("user-greeting");
greeting.innerHTML = `Hello, ${req.session.userId}!`;

function userSearchForm() {
    
    const html = `
    <div class="input-group mb-3">
      <input type="text" class="form-control" id="formAdd" name="address" placeholder="Search by city" id="inputaddress">
      <span id="submitBtn" class="input-group-text"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg></span>
    </div>

    `;
    searchContainer.innerHTML = html;

}

userSearchForm(); // calling fumction 

    document.querySelector("#submitBtn").addEventListener("click", (e)=>{
        console.log("click")
        
        getProperty(document.querySelector("#formAdd").value) // multiple fields 
      document.querySelector("#carouselExampleInterval").style.display = "none"; // i want to hide carousel
    })
   
   document.querySelector("#form").addEventListener("submit",(e)=>{
    e.preventDefault();
        getProperty(e.target.address.value) // multiple fields 
        console.log('look here',  e.target.address.value)
   })


    async function getProperty(city){ // 
      console.log('getProperty function called');
        let urlstring = encodeURIComponent(city)
        console.log(urlstring)
        let query = `https://airdna1.p.rapidapi.com/properties?location=${urlstring}`
        fetch(query,{
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '073e8d9172mshdb82d5e4353d0c8p10487bjsnc51b2de1e97b',
                'X-RapidAPI-Host': 'airdna1.p.rapidapi.com'
            }
        })
        .then(response => response.json())
        .then(data => {

      

            


        console.log("data",data.properties)
        for(let i = 0; i<10; i++){
         let property = data.properties[i]
         console.log(property.bedrooms, property.id, property.img_cover,property.bathrooms,property.title)
          const newdiv = document.createElement("div")

       
        
        let html = "";
        let output = document.querySelector("#output");

            let price = Math.floor(Math.random() * (200 - 150 + 1) + 150) // generate price for listings 
            
            
            //add to the dom
            
            newdiv.innerHTML = `<div class="box">
            <div class="boxImg animate__animated animate__pulse" style="background-image: url(${property.img_cover})"></div>
    
            <h4> Enjoy your stay at ${property.title}</h4>
           <p>Bedrooms:${property.bedrooms}</p>
            <p>Bathrooms: ${property.bathrooms}</p>
            <p>Price:$ ${price} </p>
            <a href="booking?id=${property.id}" class="btn btn-primary rent-now-link"}">Rent Now</a>
            </div>`;
   
            // Add an event listener to the "Rent Now" link inside the new div
              newdiv.querySelector('.rent-now-link').addEventListener('click', (event) => {
                event.preventDefault(); // prevent the default link behavior

                 // Save clicked information in local storage
                      const clickedInfo = {
                      title: property.title,
                      bedrooms: property.bedrooms,
                      bathrooms: property.bathrooms,
                      price: price,
                      id: property.id,
                      rating: property.rating,
                      acc: property.accommodates,
                      img: property.img_cover
                    };
                    console.log("did i save?",  clickedInfo)
                    localStorage.setItem('clickedInfo', JSON.stringify(clickedInfo)); // save it in local storage
                    console.log( localStorage.getItem('clickedInfo') );

                    window.location.href = `booking?id=${property.id}`; // navigate to the booking page changing url but server is not doing anything that is why i dont see any data 
               
              });

              // Add the new div to the output container
              output.appendChild(newdiv);
                      
      
      }
    })
}



} //end if if inside landing page




if(window.location.pathname.includes("/booking")) {
    console.log("catch",window.location.pathname)
    const urlParams = new URLSearchParams(window.location.search); // // create a new url using URLSearchParams object using querystring portion of the URL (that part after the ?)  
    const propertyId = urlParams.get('id');  // get the value of 'id' 
    const myInfoData = JSON.parse( localStorage.getItem('clickedInfo') );// get  JSON-formatted string from local storage using the key "clickedInfo" and parse it into a JavaScript object using JSON.parse()
    console.log("i got info data", myInfoData)



    const propertyIdDiv = document.getElementById('property-id'); // set  the innerHTML property of an HTML element with the ID 'property-id"
    const {bedrooms, bathrooms,title, price, acc, rating, img} = myInfoData; //retrieves the myInfoData object that was previously parsed from JSON in the previous code block. It uses destructuring to extract the values of the bedrooms, bathrooms, title, price, and acc properties from myInfoData
    
    //sets the content of the propertyIdDiv element to this HTML string
    //  p tags containing information about the property, including its title, number of bedrooms and bathrooms, price, and the number of people it accommodates. It also includes an h4 tag containing the property's title.

    propertyIdDiv.innerHTML = ` 
    <div class="bookingSet"> <div>
    <h1 class="blue">Details</h1>
    <h4>${title}</h4>
    <p>Rating: ${rating}</p>
    <p>Bedrooms: ${bedrooms}</p>
    <p>Bathrooms: ${bathrooms}</p>
    <p>Price:${price}</p>
    <p>Accommodates: ${acc}</p>
    </div><div class="bookingImg" style="background-image: url('${img}')"></div>
   </div>
    
    `;
    
    
    document.querySelector("#price").textContent = "$" + price + " per night"
    document.querySelector("#inputPrice").value = price


    // document.querySelector("#bookingForm2").addEventListener("submit", (e)=>{
    //     e.preventDefault();
    //     console.log("hello from form")
    // })
    /**
     * The function calculates the total number of days stayed and the corresponding price based on the
     * start and end dates selected by the user.
     * 
     * @return If either `startdate` or `enddate` is empty, the function `calcTotal()` will return
     * `false`. Otherwise, it will calculate the total number of days stayed and log the result to the
     * console along with the total cost of the stay.
     */
    let startdate = enddate =  ""

    document.querySelector("#startdate").addEventListener("change",(e)=> {
        console.log("startdate",e.target.value)
        startdate = e.target.value;
        calcTotal();
    })

    document.querySelector("#enddate").addEventListener("change",(e)=> {
        console.log("enddate",e.target.value)
        enddate = e.target.value
        calcTotal();
    })
    

 
    
}


if(window.location.pathname.includes("/payment")) {
    const urlParams = new URLSearchParams(window.location.search); // // create a new url using URLSearchParams object using querystring portion of the URL (that part after the ?)  
    const people = urlParams.get('people');  // get the value of 'id' 
    const price = parseInt( urlParams.get('price') );  // get the value of 'id' 
    const startdate = urlParams.get('startdate');  // get the value of 'id' 
    const enddate = urlParams.get('enddate');  // get the value of 'id' 
    let totalDaysStayed = 0;

    function calcTotal(){
        if(startdate === "" || enddate === ""){
            //i need both dates to be valid
            return false
        }
        let s = parseInt( dayjs(startdate).format("D") );
        let sMonth = dayjs(startdate).daysInMonth()
        let e = parseInt( dayjs(enddate).format("D") );
        let eMonth = dayjs(enddate).daysInMonth()
        let totalDaysStayed = 0;

        console.log("??",s, e, enddate)
        if(s < e){
          
           totalDaysStayed = e - s
           //may 1 and may 20
        } else {
            totalDaysStayed = (s - sMonth) + e
             //may 20 and june 5
        }
        console.log(totalDaysStayed);
        console.log("$" + totalDaysStayed * price)
        return totalDaysStayed


    }
    totalDaysStayed = calcTotal();
    let finalPrice = totalDaysStayed * price;
    console.log("??", totalDaysStayed, price)
    document.querySelector("#finalPrice").textContent = "$" + finalPrice;


}

// cach
const paynowButton = document.getElementById('paynow');

// Add an event listener for the click event
paynowButton.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default action

    // Redirect the user to the home page
    window.location.href = '/';
});
