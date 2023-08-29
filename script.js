const formE1 = document.querySelector(".form");
const nameE1 = document.querySelector(".input-name");
const emailE1 = document.querySelector(".input-email");
const pancardE1 = document.querySelector(".input-pancard");
const captchaE1 = document.getElementById("newCaptcha");
const captchaInputE1 = document.querySelector(".input-captcha");
const nextPageE1 = document.querySelector(".linkToNextPage");
const thnakyouNameE1 = document.querySelector(".fetch-name");
const thankyouEmailE1 = document.querySelector(".fetch-email");
const enterOTPE1 = document.querySelector(".enter-OTP");
const verifiedOTP = document.querySelector(".verifiedOTP");
const inputAmmountE1 = document.querySelector(".input-ammount");


// function to check for alphabets
function onlyAlphabets() {
    let code = window.event.keyCode;
    if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122) || (code == 32)) { return true; }
    else { return false; }
}

// Add listner to the form
formE1?.addEventListener("submit", (e) => {
    e.preventDefault();
    let a = nameLength();
    let b = panCardValidation();
    let c = checkCaptcah();
    convertNumberToWord();
    if (a == 1 && b == 1 && c == 1) {
        let val1 = nameE1.value;
        localStorage.setItem("cust-name", val1);
        let val2 = emailE1.value;
        localStorage.setItem("cust-email", val2);
        submitForm();
    }

});

function submitForm() {
    window.location.href = "thankyou.html";
}



// function for Error
function setError(id, msg) {
    id.textContent = `${msg}`;
    return;
}

//  function for name input to count whitespace and input charater
function nameLength() {
    let nameVal = nameE1.value;
    let whiteSpaceCounter = 0;
    let charCounter = 0;
    let id = document.querySelector(".span-name");

    if (nameVal == '') {
        setError(id, "* Name Should not be blank");
        return false;
    }

    else {
        for (let i = 0; i <= nameVal.length; i++) {
            let charname = nameVal.charAt(i);
            charCounter++;
            if (charname === " ") {
                whiteSpaceCounter++;
                if (charCounter < 4) {
                    setError(id, "* Atleast 4 chracter should be enter");
                    return false;
                }
                charCounter = 0;
            }
        }

        if (whiteSpaceCounter < 1) {
            setError(id, "* Atleast 2 words should be enter");
            return false;
        }

    }
    return true;
}

// // Function for email validation
// function emailValidation(){
//     let ch = emailE1.value;
//     if(ch.indexOf('@') <= 0){
//         alert("emial not allowd");
//     }
// }

// Function to convert Number to word 
function convertNumberToWord() {

    let num = inputAmmountE1.value;
    let id = document.querySelector(".span-number");
    console.log(num);
    let word = '';
    let strnum = num.toString();
    if (strnum.length > 9) {
        setError(id, "* Number Must be less than 100000000");
    }
    else if (strnum.length == '') {

        setError(id, "* Number Should not be blank");

    }
    else {

        const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
        const twos = ['', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
        const tens = ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

        if (num >= 10000000) {
            let n1 = Math.floor(num / 10000000);
            toBreak(n1);
            word += ' crore ';
            num %= 10000000;
        }

        if (num >= 100000) {
            let n1 = Math.floor(num / 100000);
            toBreak(n1);
            word += ' lakh ';
            num %= 100000;
        }

        if (num >= 1000) {
            let n1 = Math.floor(num / 1000);
            toBreak(n1);
            word += ' thousand ';
            num %= 1000;
        }

        if (num >= 100) {
            word += ones[Math.floor(num / 100)] + ' hundred ';
            num %= 100;
        }

        if (num >= 20) {
            word += tens[Math.floor(num / 10)] + ' ';
            num %= 10;
        }

        if (num >= 10 && num < 20) {
            word += twos[num - 10] + ' ';
        } else {
            word += ones[num] + ' ';
        }

        word.trim();
        document.querySelector(".span-number").textContent = word;

        // function required for convert Number to word
        function toBreak(n1) {

            let n2 = Math.floor(n1 / 10);
            let n3 = n1 % 10;

            if (n1 > 10 && n1 < 20) {
                word += twos[n3];
            }
            else {
                word += tens[n2] + ' ' + ones[n3];
            }

        }
    }

}


// Function to check pancard validation
function panCardValidation() {
    let pancardVal = pancardE1.value;
    let regex = new RegExp(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/);
    let id = document.querySelector(".span-pancard");
    if (pancardVal == '') {

        setError(id, "* Pancard Number Should not be blank");
    }
    else {
        if (regex.test(pancardVal) == false) {
            setError(id, "* Invalid PAN CARD Number");
        }
    }
    return true;
}

//function for new Captcha
function createNewCaptcha() {
    const allChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
    const length = 6;
    let captchaval = "";

    while (length > captchaval.length) {
        captchaval += allChar[Math.floor(Math.random() * allChar.length)];
    }

    captchaE1.innerHTML = captchaval;
    return true;
}

// function to check Captcha is same or not
function checkCaptcah() {
    let id = document.querySelector(".span-captcha");
    let captcha1 = captchaE1.innerHTML;
    let captcha2 = captchaInputE1.value;

    if (captcha1 === captcha2) {
        return true;
    }
    else {
        setError(id, "Invalid Captcha");
        return false;
    }
}

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// Thank You Page Script

// Function to generate OTP and send value to nextpage

let OTP = '';

function generateOTP() {

    // get value from local storage
    let n1 = localStorage.getItem("cust-name");
    let str1 = n1.slice(0, n1.indexOf(' '));
    thnakyouNameE1.textContent = str1;
    thankyouEmailE1.textContent = localStorage.getItem("cust-email");

    // Generate OTP
    let digit = '0123456789';
    for (let i = 0; i < 4; i++) {
        OTP += digit[Math.floor(Math.random() * 10)];
    }
    console.log(OTP);
}

// function to verified OTP

let counter = 0;

function isVerifiedOTP() {
    console.log(enterOTPE1.value);
    let num1 = enterOTPE1.value;

    if (num1 != '') {
        if (OTP == num1) {
            verifiedOTP.textContent = "Your OTP Verified Successfilly!!";
            console.log("Your OTP Verified Successfilly!!");
            window.location.href = "https://pixel6.co/";
        }
        else {
            verifiedOTP.textContent = "Please Enter Valid OTP";
            counter++;
            console.log(counter);
            OTP = '';
        }
        if (counter >= 3) {
            window.location.href = "https://pixel6.co/";
        }
    }
}
