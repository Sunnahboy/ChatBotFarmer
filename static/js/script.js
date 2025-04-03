// JavaScript for Farm Assistant
$(document).ready(function () {
    // Button click handlers
    $('#buttonInput').click(function () {
        sendMessage();
    });

    $('#voiceButton').click(function () {
        startVoiceInput();
    });

    $('#imageInput').change(function () {
        handleImageUpload(this);
    });

    $('#deleteButton').click(function () {
        deleteLastMessage();
    });

    $('#uploadImageButton').click(function () {
        $('#imageInput').click();
    });

    $('#weatherButton').click(function () {
        getWeather();
    });

    // Enter key handler for text input
    $('#textInput').keypress(function(e) {
        if(e.which == 13) { // Enter key
            sendMessage();
            return false;
        }
    });
});

/**
 * Sends user message to the server and displays the response
 */
function sendMessage() {
    var userText = $('#textInput').val().trim();
    if (userText === "") return; // Don't send empty messages

    var userHTML = "<p class='userText'>User:<span>" + userText + "</span></p>";
    $('#textInput').val("");
    $('#mainChat').append(userHTML);
    scrollToBottom();

    $.ajax({
        url: "/get",
        type: "GET",
        data: { userMessage: userText },
        success: function (data) {
            displayBotResponse(data);
        },
        error: function (error) {
            console.error('Error getting response:', error);
            displayErrorMessage("Sorry, there was an error processing your request.");
        }
    });
}

/**
 * Processes voice input from the user
 */
function startVoiceInput() {
    responsiveVoice.speak("Speak now.", "US English Female", {
        onend: function () {
            if (!('webkitSpeechRecognition' in window)) {
                alert("Your browser doesn't support speech recognition. Please try a different browser.");
                return;
            }

            var recognition = new webkitSpeechRecognition();
            recognition.lang = 'en-US';
            recognition.start();

            recognition.onresult = function(event) {
                var userVoiceInput = event.results[0][0].transcript;
                responsiveVoice.speak("Thank you. Processing your message.", "US English Female", {
                    onend: function () {
                        processInput(userVoiceInput);
                    }
                });
            };

            recognition.onerror = function(event) {
                console.error('Speech recognition error:', event.error);
                alert("There was an error with the speech recognition. Please try again.");
            };
        }
    });
}

/**
 * Processes user input text and sends it to the server
 * @param {string} userInput - The text input from the user
 */
function processInput(userInput) {
    var userText = userInput;
    var userHTML = "<p class='userText'>User:<span>" + userText + "</span></p>";
    $('#mainChat').append(userHTML);
    scrollToBottom();

    $('#textInput').val(userText);
    $('#buttonInput').click();
}

/**
 * Handles image upload and sends to server
 * @param {HTMLInputElement} inputElement - The file input element
 */
function handleImageUpload(inputElement) {
    var formData = new FormData();
    formData.append('image', inputElement.files[0]);

    var fileName = inputElement.files[0].name;
    var userHTML = "<p class='userText'>User:<span>Uploaded image: " + fileName + "</span></p>";
    $('#mainChat').append(userHTML);
    scrollToBottom();

    uploadImage(formData);
}

/**
 * Uploads an image to the server
 * @param {FormData} formData - The form data containing the image
 */
function uploadImage(formData) {
    $.ajax({
        url: '/upload_image',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (data) {
            displayBotResponse(data);
        },
        error: function (error) {
            console.error('Error uploading image:', error);
            displayErrorMessage("Sorry, there was an error uploading your image.");
        }
    });
}

/**
 * Deletes the last message in the chat
 */
function deleteLastMessage() {
    $('#mainChat').children().last().remove();
}

/**
 * Gets weather information for the city entered in the text input
 */
function getWeather() {
    var city = $('#textInput').val().trim();
    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    var userHTML = "<p class='userText'>User:<span>Getting weather for: " + city + "</span></p>";
    $('#mainChat').append(userHTML);
    scrollToBottom();

    $.ajax({
        url: "/weather",
        type: "GET",
        data: { city: city },
        success: function (data) {
            displayWeatherInfo(data);
        },
        error: function (xhr, status, error) {
            console.error('Error getting weather:', error);
            var errorMessage = xhr.responseJSON ? xhr.responseJSON.error : "Error fetching weather data";
            displayErrorMessage(errorMessage);
        }
    });
}

/**
 * Displays bot response in the chat
 * @param {Object} data - The response data from the server
 */
function displayBotResponse(data) {
    var botHTML = "<p class='botText'>Farm Assistant:<span>" + data.response + "</span></p>";
    $('#mainChat').append(botHTML);

    if (data.follow_up) {
        $('#followUpChat').show();
        var followUpHTML = "<p class='botText'><span>" + data.follow_up + "</span></p>";
        $('#followUpChat').html(followUpHTML);
    } else {
        $('#followUpChat').hide();
    }

    scrollToBottom();
}

/**
 * Displays weather information in the chat
 * @param {Object} data - The weather data from the server
 */
function displayWeatherInfo(data) {
    var weatherInfo = data.weather_info;
    var weatherHTML = "<div class='weather-container'>";
    weatherHTML += "<h2 class='section-title'>Weather Information</h2>";
    weatherHTML += "<div class='weather-info'>";
    weatherHTML += "<p><span class='info-label'>City:</span> " + weatherInfo.city + "</p>";
    weatherHTML += "<p><span class='info-label'>Temperature:</span> " + weatherInfo.temperature + "</p>";
    weatherHTML += "<p><span class='info-label'>Humidity:</span> " + weatherInfo.humidity + "</p>";
    weatherHTML += "<p><span class='info-label'>Wind Speed:</span> " + weatherInfo.wind_speed + "</p>";
    weatherHTML += "<p><span class='info-label'>Cloudiness:</span> " + weatherInfo.cloudiness + "</p>";
    weatherHTML += "<p><span class='info-label'>Precipitation:</span> " + weatherInfo.precipitation + "</p>";
    weatherHTML += "</div>"; // Close weather-info
    weatherHTML += "</div>"; // Close weather-container
    $('#mainChat').append(weatherHTML);

    var suggestions = data.suggestions;
    if (suggestions && suggestions.length > 0) {
        var suggestionsHTML = "<div class='suggestions-container'>";
        suggestionsHTML += "<h2 class='section-title'>Suggestions</h2>";
        suggestionsHTML += "<ul class='suggestions-list'>";
        suggestions.forEach(function (suggestion) {
            suggestionsHTML += "<li>" + suggestion + "</li>";
        });
        suggestionsHTML += "</ul>"; // Close suggestions-list
        suggestionsHTML += "</div>"; // Close suggestions-container
        $('#mainChat').append(suggestionsHTML);
    }

    scrollToBottom();
}

/**
 * Displays an error message in the chat
 * @param {string} message - The error message to display
 */
function displayErrorMessage(message) {
    var errorHTML = "<p class='botText error'>Farm Assistant:<span>" + message + "</span></p>";
    $('#mainChat').append(errorHTML);
    scrollToBottom();
}

/**
 * Scrolls the chat window to the bottom
 */
function scrollToBottom() {
    document.getElementById("userInput").scrollIntoView({ block: 'start', behavior: 'smooth' });
}