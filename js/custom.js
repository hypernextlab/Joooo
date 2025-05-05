const flashcards = {
  animals: [
    {
      image:
        "https://cdn-icons-png.flaticon.com/128/12734/12734110.png",
      word: "Wallet",
      sound: "sounds/Wallet.mp3"
    },
    {
      image: "https://cdn-icons-png.flaticon.com/128/14237/14237280.png",
      word: "Cat",
      sound: "sounds/cat.mp3"
    },
    {
      image: "https://cdn-icons-png.flaticon.com/128/13156/13156239.png",
      word: "Elephant",
      sound: "sounds/elephant.mp3"
    }
  ],
  fruits: [
    {
      image: "https://cdn-icons-png.flaticon.com/128/4354/4354030.png",
      word: "Apple",
      sound: "sounds/apple.mp3"
    },
    {
      image: "https://example.com/banana.jpg",
      word: "Banana",
      sound: "sounds/banana.mp3"
    },
    {
      image: "https://example.com/orange.jpg",
      word: "Orange",
      sound: "sounds/orange.mp3"
    }
  ],
  vehicles: [
    {
      image: "https://cdn-icons-png.flaticon.com/128/12724/12724160.png",
      word: "Car",
      sound: "sounds/car.mp3"
    },
    {
      image: "https://example.com/bicycle.jpg",
      word: "Bicycle",
      sound: "sounds/bicycle.mp3"
    },
    {
      image: "https://example.com/bus.jpg",
      word: "Bus",
      sound: "sounds/bus.mp3"
    }
  ]
};

let currentFlashcardIndex = 0;
let currentCategory = "animals";
let learnedWords = []; // Array to hold learned words

function selectCategory(category) {
  currentCategory = category;
  currentFlashcardIndex = 0; // Reset index
  learnedWords = []; // Reset learned words for new category
  updateFlashcard();
  updateRemainingFlashcards();
  updateButtonStates();
}

function playSoundAndSpeak() {
  const sound = document.getElementById("wordSound");
  sound.src = flashcards[currentCategory][currentFlashcardIndex].sound;
  sound.play();
  const wordToSpeak = flashcards[currentCategory][currentFlashcardIndex].word;
  speakWord(wordToSpeak);
}

function speakWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  speechSynthesis.speak(utterance);
}

function nextFlashcard() {
  // Store the learned word if it's not already included
  if (
    !learnedWords.includes(
      flashcards[currentCategory][currentFlashcardIndex].word
    )
  ) {
    learnedWords.push(flashcards[currentCategory][currentFlashcardIndex].word);
  }

  // Move to the next flashcard
  currentFlashcardIndex += 1;

  // Check if we reached the end of the flashcards
  if (currentFlashcardIndex >= flashcards[currentCategory].length) {
    displayLearnedWords();
  } else {
    updateFlashcard();
    updateRemainingFlashcards();
    updateButtonStates();
  }
}

function previousFlashcard() {
  // Move to the previous flashcard
  if (currentFlashcardIndex > 0) {
    currentFlashcardIndex -= 1;
    updateFlashcard();
    updateRemainingFlashcards();
    updateButtonStates();
  }
}

function resetGame() {
  currentFlashcardIndex = 0; // Reset index
  learnedWords = []; // Reset learned words
  document.getElementById("learnedWordsSection").style.display = "none"; // Hide learned words section
  document.getElementById("flashcard").style.display = "block"; // Show flashcards
  updateFlashcard();
  updateRemainingFlashcards();
  updateButtonStates();
}

function updateFlashcard() {
  const currentIndexDisplay = document.getElementById("currentFlashcardIndex");
  currentIndexDisplay.textContent = `${currentFlashcardIndex + 1} / ${
    flashcards[currentCategory].length
  }`; // Update the index display

  document.getElementById("flashcardImage").src =
    flashcards[currentCategory][currentFlashcardIndex].image;
  document.getElementById("wordContainer").textContent =
    flashcards[currentCategory][currentFlashcardIndex].word;
}

function updateRemainingFlashcards() {
  const remainingCount =
    flashcards[currentCategory].length - currentFlashcardIndex - 1;
  document.getElementById(
    "remainingFlashcards"
  ).textContent = `Remaining Flashcards: ${remainingCount}`;
}

function displayLearnedWords() {
  document.getElementById("flashcard").style.display = "none"; // Hide flashcards
  const learnedWordsList = document.getElementById("learnedWordsList");
  learnedWordsList.innerHTML = ""; // Clear the existing list

  learnedWords.forEach((word) => {
    const li = document.createElement("li");
    li.textContent = word; // Set the learned word
    learnedWordsList.appendChild(li); // Add it to the list
  });

  document.getElementById("learnedWordsSection").style.display = "block"; // Show learned words section
}

// Update button states based on the current index
function updateButtonStates() {
  const previousButton = document.getElementById("previousFlashcardButton");
  previousButton.disabled = currentFlashcardIndex === 0; // Disable if on the first card
}

// Initialize the first flashcard and the remaining count
updateFlashcard();
updateRemainingFlashcards();
updateButtonStates();
