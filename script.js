 const msgEl = document.getElementById('msg');

 //Generate a random number
 function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
 }

 const randomNum = generateRandomNumber();
 console.log(randomNum);

 window.SpeechRecognition = 
    window.SpeechRecognition || window.webkitSpeechRecognition 

 const recognition = new window.SpeechRecognition();

 // Start recognition and game
 recognition.start();
 
 // Capture user speech
 function onSpeak(event) {
    const msg = event.results[0][0].transcript;
    writeMessage(msg);
    checkNumber(msg);
 }

 // Listen to and handle the speech event
 recognition.addEventListener('result', onSpeak);

 // See in the DOM what the user has spoken
 function writeMessage(msg) {
    const div = document.createElement('div');
    div.textContent = 'You said:'
    const span = document.createElement ('span');
    span.classList.add('box')
    span.textContent = msg;
    msgEl.append(div, span);
 }

// Check msg against the secret number
function checkNumber(msg) {
    const num = Number (msg); // msg = "hello world" 
// Edge cases
    if (msg === 'one') {
        console.log('adjusting one to 1');
        msg = '1';
    } else if (msg === 'two') {
        console.log('adjusting two to 2');
        msg = '2';
    }    
    console.log(msg);
    // Check if the spoken content is a valid number
    if (Number.isNaN(num)) {
        const div = document.createElement('div');
        div.textContent = 'That is not a valid number'
        msgEl.append(div);
        return;
    }
    
    // Check if it's in range
    if (num < 1 || num > 100) {
        const div = document.createElement('div');
        div.textContent = 'Number must be between 1 and 100';
        msgEl.append(div);
        return;
    }

    // Check the number and provide feedback
    if (num === randomNum) {
        const h2 = document.createElement('h2');
        h2.textContent = `Congrats! You have guessed the number! It was ${num}`;

        const button = document.createElement('button');
        button.classList.add('play-again');
        button.id = 'play-again' 
        button.textContent = 'Play Again'
        // Add listener and handler to button
        button.addEventListener('click', () => window.location.reload());
       
        // Clear out innerHTML of msgEl
        msg.innerHTML = '';
        msgEl.append(h2, button);
     } else if (num > randomNum) {
        const div = document.createElement('div');
        div.textContent = 'GO LOWER';
        
        msgEl.append(div);
    } else {
        // if (num < randomNum)
        const div = document.createElement('div');
        div.textContent = 'GO HIGHER'

        msg.innerHtml = '';
        msgEl.append(div);
    }
}

// At the end of the SpeechRecognition service, start it again
recognition.addEventListener('end', () => recognition.start ());
