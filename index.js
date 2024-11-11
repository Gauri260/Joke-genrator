const jokeButton = document.getElementById("joke-button");
const jokeText = document.getElementById("joke-text");
const shareButton = document.getElementById("share-button");
const darkModeToggle = document.getElementById("dark-mode-toggle");
const textSizeInput = document.getElementById("text-size");

const API_KEY = 'y3dbBRSJf8OqVfs8EGlx7w==SjeBnqUaLYdGg8sS';  // Replace 'YOUR_API_KEY' with your actual API key

// Event listener for the 'Tell Me A Joke' button
jokeButton.addEventListener("click", fetchJoke);

// Event listener for the 'Share This Joke' button
shareButton.addEventListener("click", shareJoke);

// Event listener for the dark mode toggle
darkModeToggle.addEventListener("click", toggleDarkMode);

// Event listener for changing text size
textSizeInput.addEventListener("input", (e) => {
  jokeText.style.fontSize = `${e.target.value}px`;
});

// Function to fetch jokes from the API
async function fetchJoke() {
  jokeText.textContent = "Loading joke...";
  try {
    const response = await fetch("https://api.api-ninjas.com/v1/dadjokes?limit=1", {
      headers: { 'X-Api-Key': API_KEY }
    });
    const data = await response.json();
    jokeText.textContent = data[0].joke;
  } catch (error) {
    jokeText.textContent = "Oops! Couldn't fetch a joke.";
  }
}

// Function to share the joke
function shareJoke() {
  if (navigator.share) {
    navigator.share({
      title: 'Dad Joke',
      text: jokeText.textContent
    }).then(() => {
      console.log('Joke shared successfully');
    }).catch((error) => {
      console.log('Error sharing joke', error);
    });
  } else {
    alert("Sharing is not supported in this browser.");
  }
}

// Function to toggle dark mode
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}
