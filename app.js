/**
 * Criterias 
 * Full name is not empty 
 * Email is a valid email address format
 * Order-no is a sequence of ten numbers starting with 2024
 * X represents either a lowercase or an Uppercase letter and 
 * # represents a number
 * Quantity is a positive integer 
 * at Least one checkbox from #complaints-group is checked
 * #complaint-description contains at least twenty (20) characters if the other checkbox is checked. 
 * a radio button from #solutions-group is selected
 * #soltion-description contains at least twenty (20) characters if the other radio button is selected 
 */

const emailRegEx = /^[a-zA-Z0-9]+@domain\.com$/i;

const orderRegEx = /^2024[a-zA-Z0-9]+/i;

const productCodeRegEx = /[A-Z]{2}\d{2}-[A-Z]{1}\d{3}-[A-Z]{2}\d{1}/i;

const quantityRegEx = /^\d+$/;


const nameInput = document.getElementById('full-name');
const emailInput = document.getElementById('email');
const orderInput = document.getElementById('order-no');
const productCodeInput = document.getElementById('product-code');
const quantityInput = document.getElementById('quantity');
const formReasonsInput = document.querySelectorAll('input[type="checkbox"]');
const descriptionComplaints = document.getElementById('complaint-description');
const solutionInput = document.querySelectorAll('input[type="radio"]');
const descriptionSolution = document.getElementById('solution-description');


formReasonsInput.forEach((option)=>{
    option.addEventListener('click', (e)=>{
        let id = e.target.id;
        let customId = id.slice(0,5)
        if(customId == "other"){
        let complainContainer = document.querySelector('#complaint-description-container').classList.toggle('hide');
        }
    })
});

solutionInput.forEach((option)=>{
    option.addEventListener('change', (e)=>{
        let solutionContainer = document.querySelector('#solution-description-container')
        let id = e.target.id;
        let customId = id.slice(0,5);
        if(customId === "other"){
        solutionContainer.hidden = false;
        }else{
            solutionContainer.hidden = true;
        }
    });
})


function validateForm(){
    // Get all checked complaints 
    let checkedComplaints = document.querySelectorAll('input[type="checkbox"]:checked');
    const complaints = Array.from(checkedComplaints).map((input)=>{
        let label = document.querySelector(`label[for="${input.id}"]`);
        return label ? label.textContent.trim() : input.value; 
    })

    // Get checked solution (radio = only 1)
    let checkedSolution = document.querySelector('input[type="radio"]:checked');
    let solutionLabel = checkedSolution ? document.querySelector(`label[for="${checkedSolution.id}"]`)?.textContent.trim() : false;

    let data = {
        name: nameInput.value.trim() || false,
        email: emailInput.value.trim(),
        orderNo: orderInput.value.trim(), // keep same name as before
        productCode: productCodeInput.value.trim(),
        quantity: quantityInput.value.trim(),
        complaint: complaints, // ["Damaged Product", "Nonconforming Product"]
        complaintDescription: descriptionComplaints.value.trim() || false,
        solution: solutionLabel, // "Replacement" etc. (single value, not array)
        solutionDescription: descriptionSolution.value.trim() || false,
    }


}

let validData = {
    name: "John",
    email: "enuomarichard01@gmail.com",
    orderNo: "2024222234",
    productCode: "aB23-a334-cc4",
    quantity: "20",
    complaint: [
        "Damaged Product"
    ],
    complaintDescription: false,
    solution: "Refund",
    solutionDescription: false
}

function isValid(){
 let data = validateForm();
 let element = {
    name: nameInput,
    email: emailInput,
    orderNo: orderInput,
    productCode: productCodeInput,
    quantity: quantityInput,
 }

 for(const key in data){
    let value = data[key];
    let el = element[key]; 
    let hasValue = Array.isArray(value) ? value.length > 0 : Boolean(value);

    if(hasValue){
        el.classList.add('approved');
        el.classList.remove('disapproved');
    }
 }
}

nameInput.addEventListener('input', isValid);

 
 
const submitBtn = document.getElementById('submit-btn')
submitBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    validateForm();
})
