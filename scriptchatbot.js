// JavaScript for Floating Chatbot

// DOM Elements
const chatbotIcon = document.querySelector('.chatbot-icon');
const chatContainer = document.querySelector('.chat-container');
const messageArea = document.getElementById('message-area');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const clearButton = document.getElementById('clear-button');
const adminInput = document.getElementById('admin-input');
const adminReplyButton = document.getElementById('admin-reply-button');

// Predefined questions and answers
const predefinedQuestions = [
    {
        question: 'What is the location of the event?',
        answer: 'The event will be held at [Location Name], located at [Location Address].',
    },
    {
        question: 'What time does the event start?',
        answer: 'The event will start at [Event Time].',
    },
    {
        question: 'Tell me more about the event.',
        answer: 'The event is a [Brief Event Description]. It will feature [Event Features].',

    },
    {
        question: 'Who will be the speaker for this event.',
        answer: 'The speaker would be[Speaker Name]. ',
    },
];

// Predefined admin messages and responses
const adminMessages = [
    {
        sender: 'Admin',
        message: 'Hello! How can I assist you today?',
    },
    {
        sender: 'Admin',
        message: 'Feel free to ask any questions about the event.',
    },
];


// Random chatbot responses
const randomResponses = [
    'I\'m here to help!',
    'Ask me anything about the event.',
    'How can I assist you today?',
];

// Function to add a message to the chat area
function addMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    messageArea.appendChild(messageElement);
    messageArea.scrollTop = messageArea.scrollHeight;
}


// Function for chatbot's random responses
function getRandomResponse() {
    const randomIndex = Math.floor(Math.random() * randomResponses.length);
    return randomResponses[randomIndex];
}

// Toggle chatbot container
let chatOpen = false;

chatbotIcon.addEventListener('click', () => {
    chatOpen = !chatOpen;
    if (chatOpen) {
        chatContainer.style.display = 'block';
    } else {
        chatContainer.style.display = 'none';
    }
});

// Make chatbot draggable
let isDragging = false;
let offsetX, offsetY;

chatbotIcon.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - chatContainer.getBoundingClientRect().left;
    offsetY = e.clientY - chatContainer.getBoundingClientRect().top;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        chatContainer.style.left = e.clientX - offsetX + 'px';
        chatContainer.style.top = e.clientY - offsetY + 'px';
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

// Handle sending messages
sendButton.addEventListener('click', () => {
    const messageText = messageInput.value.trim();
    if (messageText !== '') {
        addMessage('You', messageText);
        if (messageText.startsWith('Ask:')) {
            const question = messageText.replace('Ask:', '').trim();
            handlePredefinedQuestion(question);
        } else {
            addMessage('Chatbot', getRandomResponse());
        }
        messageInput.value = '';
    }
});

// Clear chat history
clearButton.addEventListener('click', () => {
    messageArea.innerHTML = '';
});

// Create predefined message buttons
predefinedQuestions.forEach((item, index) => {
    const button = document.createElement('button');
    button.textContent = `Ask: ${item.question}`;
    button.addEventListener('click', () => {
        handlePredefinedQuestion(item.question);
    });
    chatContainer.appendChild(button);
});

// Function to handle predefined questions
function handlePredefinedQuestion(question) {
    const matchingQuestion = predefinedQuestions.find(
        (item) => item.question.toLowerCase() === question.toLowerCase()
    );

    if (matchingQuestion) {
        addMessage('You', question);
        addMessage('Chatbot', matchingQuestion.answer);
    } else {
        addMessage('You', question);
        addMessage('Chatbot', 'I don\'t have an answer for that question.');
    }
}




// Handle sending messages when pressing Enter or clicking the Send button
function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText !== '') {
        addMessage('You', messageText);

        // Check if the user's message matches any predefined question
        const matchingQuestion = predefinedQuestions.find((item) =>
            messageText.toLowerCase().includes(item.question.toLowerCase())
        );

        if (matchingQuestion) {
            // User asked a predefined question, provide the answer
            addMessage('Chatbot', matchingQuestion.answer);
        } else {
            // User's message is not recognized
            addMessage('Chatbot', 'I don\'t understand. Please ask a question related to the event.');
        }

        messageInput.value = ''; // Clear the input field
    }
}

// Remove one of the event listeners (either the Enter key press or Send button click)
messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault(); // Prevent the default Enter key behavior (e.g., submitting forms)
        sendMessage();
    }
});

// Keep the Send button click event listener
sendButton.addEventListener('click', sendMessage);

