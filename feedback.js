// ===============================
// VanLink Feedback System
// ===============================

// Your Google Apps Script URL
const API_URL =
"https://script.google.com/macros/s/AKfycbwgDax8CdDtT5qCczemQoYs4FuFx56GAREdwRkxgGtj8qOLuahLqoxMHxrxGR-nsBZo/exec";

let selectedRole = "";
let rating = 0;

// ===============================
// Role Selection
// ===============================

const roles = document.querySelectorAll(".role");

roles.forEach(role => {

    role.onclick = () => {

        roles.forEach(r => r.classList.remove("active"));

        role.classList.add("active");

        selectedRole = role.dataset.role;

        loadQuestions(selectedRole);

    };

});

// ===============================
// Star Rating
// ===============================

const stars = document.querySelectorAll(".star");

stars.forEach((star,index)=>{

    star.onclick=()=>{

        rating=index+1;

        stars.forEach((s,i)=>{

            s.classList.toggle("active",i<=index);

        });

    };

});

// ===============================
// Dynamic Questions
// ===============================

function loadQuestions(role){

const container=document.getElementById("dynamicQuestions");

if(role==="Parent"){

container.innerHTML=`

<div class="question">

<h3>How accurate is Live Tracking?</h3>

<label><input type="radio" name="tracking" value="Excellent"> Excellent</label>

<label><input type="radio" name="tracking" value="Good"> Good</label>

<label><input type="radio" name="tracking" value="Average"> Average</label>

<label><input type="radio" name="tracking" value="Poor"> Poor</label>

</div>

<div class="question">

<h3>Is the app easy to use?</h3>

<label><input type="radio" name="ease" value="Very Easy"> Very Easy</label>

<label><input type="radio" name="ease" value="Easy"> Easy</label>

<label><input type="radio" name="ease" value="Average"> Average</label>

<label><input type="radio" name="ease" value="Difficult"> Difficult</label>

</div>

`;

}

else if(role==="Driver"){

container.innerHTML=`

<div class="question">

<h3>GPS Accuracy</h3>

<label><input type="radio" name="tracking" value="Excellent"> Excellent</label>

<label><input type="radio" name="tracking" value="Good"> Good</label>

<label><input type="radio" name="tracking" value="Average"> Average</label>

<label><input type="radio" name="tracking" value="Poor"> Poor</label>

</div>

<div class="question">

<h3>How easy is Trip Start / End?</h3>

<label><input type="radio" name="ease" value="Very Easy"> Very Easy</label>

<label><input type="radio" name="ease" value="Easy"> Easy</label>

<label><input type="radio" name="ease" value="Average"> Average</label>

<label><input type="radio" name="ease" value="Difficult"> Difficult</label>

</div>

`;

}

else{

container.innerHTML=`

<div class="question">

<h3>Student Management</h3>

<label><input type="radio" name="tracking" value="Excellent"> Excellent</label>

<label><input type="radio" name="tracking" value="Good"> Good</label>

<label><input type="radio" name="tracking" value="Average"> Average</label>

<label><input type="radio" name="tracking" value="Poor"> Poor</label>

</div>

<div class="question">

<h3>Overall Dashboard Experience</h3>

<label><input type="radio" name="ease" value="Very Easy"> Very Easy</label>

<label><input type="radio" name="ease" value="Easy"> Easy</label>

<label><input type="radio" name="ease" value="Average"> Average</label>

<label><input type="radio" name="ease" value="Difficult"> Difficult</label>

</div>

`;

}

}

// ===============================
// Submit Feedback
// ===============================

document
.getElementById("submitBtn")
.onclick=async()=>{

if(selectedRole===""){

alert("Please select your role.");

return;

}

if(rating===0){

alert("Please give a rating.");

return;

}

const tracking=document.querySelector('input[name="tracking"]:checked');

const ease=document.querySelector('input[name="ease"]:checked');

const data={

role:selectedRole,

rating:rating,

easeOfUse:ease?ease.value:"",

trackingAccuracy:tracking?tracking.value:"",

favoriteFeature:document.getElementById("favoriteFeature").value,

requestedFeature:document.getElementById("requestedFeature").value,

suggestions:document.getElementById("suggestions").value,

websiteVersion:"1.0"

};

document.getElementById("loading").style.display="block";

document.getElementById("submitBtn").disabled=true;

try{

const response=await fetch(API_URL,{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(data)

});

const result=await response.json();

if(result.success){

document.getElementById("formCard").style.display="none";

document.getElementById("success").style.display="block";

}else{

alert(result.error);

}

}catch(e){

alert("Unable to send feedback. Check your internet connection.");

}

document.getElementById("loading").style.display="none";

document.getElementById("submitBtn").disabled=false;

};
