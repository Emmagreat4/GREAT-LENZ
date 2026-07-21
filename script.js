/*==================================================
        GREAT LENZ v3.0
==================================================*/

/*==============================
        ELEMENTS
==============================*/

const chatButton = document.getElementById("chatButton");
const chatBox = document.getElementById("chatBox");
const closeChat = document.getElementById("closeChat");

const chatBody = document.getElementById("chatBody");

const userInput = document.getElementById("userInput");
const sendMessage = document.getElementById("sendMessage");

const startChat = document.getElementById("startChat");

const serviceButtons = document.getElementById("serviceButtons");
const serviceBtn = document.querySelectorAll("#serviceButtons button");

/*==============================
        BOOKING DATA
==============================*/

let booking = {

    name: "",

    service: "",

    date: "",

    phone: ""

};

let currentStep = "welcome";

/*==============================
        OPEN CHAT
==============================*/

chatButton.addEventListener("click", () => {

    chatBox.style.display = "flex";

});

/*==============================
        CLOSE CHAT
==============================*/

closeChat.addEventListener("click", () => {

    chatBox.style.display = "none";

});

/*==============================
        SCROLL
==============================*/

function scrollChat(){

    chatBody.scrollTop = chatBody.scrollHeight;

}

/*==============================
        BOT MESSAGE
==============================*/

function bot(text){

    chatBody.innerHTML += `

    <div class="message bot">

        ${text}

    </div>

    `;

    scrollChat();

}

/*==============================
        USER MESSAGE
==============================*/

function user(text){

    chatBody.innerHTML += `

    <div class="message user">

        ${text}

    </div>

    `;

    scrollChat();

}

/*==============================
        START BOOKING
==============================*/

startChat.addEventListener("click",()=>{

    booking={

        name:"",
        service:"",
        date:"",
        phone:""

    };

    currentStep="name";

    chatBody.innerHTML="";

    bot("👋 Hello! What is your name?");

});

/*==================================================
        PROCESS USER MESSAGE
==================================================*/

function processMessage(){

    const text = userInput.value.trim();

    if(text==="") return;

    user(text);

    userInput.value="";

    switch(currentStep){

        case "name":

            booking.name = text;

            currentStep = "service";

            bot("Awesome! 🎉 Now choose the type of photography session.");

            serviceButtons.style.display = "grid";

        break;

        case "date":

            booking.date = text;

            currentStep = "phone";

            bot("📱 Please enter your WhatsApp number.");

        break;

        case "phone":

            booking.phone = text;

            currentStep = "summary";

            showSummary();

        break;

    }

}

/*==================================================
        SEND BUTTON
==================================================*/

sendMessage.addEventListener("click",processMessage);

/*==================================================
        ENTER KEY
==================================================*/

userInput.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        processMessage();

    }

});

/*==================================================
        SERVICE BUTTONS
==================================================*/

serviceBtn.forEach(button=>{

    button.addEventListener("click",()=>{

        booking.service = button.dataset.service;

        user(booking.service);

        serviceButtons.style.display="none";

        currentStep="date";

        bot("📅 What date would you like to book your session?");

    });

});

service
/*==================================================
        BOOKING SUMMARY
==================================================*/

function showSummary(){

    bot(`
        <h3>📋 Booking Summary</h3>

        <p><strong>Name:</strong> ${booking.name}</p>

        <p><strong>Service:</strong> ${booking.service}</p>

        <p><strong>Date:</strong> ${booking.date}</p>

        <p><strong>WhatsApp:</strong> ${booking.phone}</p>

        <br>

        <button class="send-whatsapp" id="sendWhatsapp">
            📲 Send to WhatsApp
        </button>
    `);

    document
        .getElementById("sendWhatsapp")
        .addEventListener("click", sendWhatsapp);

}

/*==================================================
        SEND TO WHATSAPP
==================================================*/

function sendWhatsapp(){

    const ownerNumber = "2348164657053";

    const message =

`📸 *GREAT LENZ Booking*

👤 Name: ${booking.name}

📷 Service: ${booking.service}

📅 Date: ${booking.date}

📱 Customer: ${booking.phone}`;

    const url =
`https://wa.me/${ownerNumber}?text=${encodeURIComponent(message)}`;

    window.open(url,"_blank");

    bot("✅ Thank you! Your booking has been prepared and WhatsApp has been opened.");

}

/*==================================================
        RESET BUTTON
==================================================*/

const resetButton = document.createElement("button");

resetButton.textContent = "🔄 New Booking";

resetButton.className = "send-whatsapp";

resetButton.style.marginTop = "10px";

resetButton.addEventListener("click",()=>{

    booking = {

        name:"",
        service:"",
        date:"",
        phone:""

    };

    currentStep = "name";

    serviceButtons.style.display = "none";

    chatBody.innerHTML = "";

    bot("👋 Welcome back to GREAT LENZ!");

    bot("What is your name?");

});

document.querySelector(".chat-footer").appendChild(resetButton);

/*==================================================
        END OF SCRIPT
==================================================*/

