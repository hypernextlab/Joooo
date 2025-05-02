const flashcards = {
    animals: [
        { image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP.7jK7hJ1jVQR43DKYWEsYKAHaHa%3Fpid%3DApi&f=1&ipt=ef27765ef341154796075caa50ff0c0f391afe43af0f90912a483d3aafab5867&ipo=images", word: "Wallet", sound: "sounds/Wallet.mp3" },
        { image: "https://example.com/cat.jpg", word: "Cathay", sound: "sounds/cat.mp3" },
        { image: "https://example.com/elephant.jpg", word: "Elephant", sound: "sounds/elephant.mp3" }
    ],
    fruits: [
        { image: "https://example.com/apple.jpg", word: "Apple", sound: "sounds/apple.mp3" },
        { image: "https://example.com/banana.jpg", word: "Banana", sound: "sounds/banana.mp3" },
        { image: "https://example.com/orange.jpg", word: "Orange", sound: "sounds/orange.mp3" }
    ],
    vehicles: [
        { image: "https://example.com/car.jpg", word: "Car", sound: "sounds/car.mp3" },
        { image: "https://example.com/bicycle.jpg", word: "Bicycle", sound: "sounds/bicycle.mp3" },
        { image: "https://example.com/bus.jpg", word: "Bus", sound: "sounds/bus.mp3" }
    ]
};

let currentFlashcardIndex = 0;
let currentCategory = 'animals';

function selectCategory(category) {
    currentCategory = category;
    currentFlashcardIndex = 0; // Reset index
    updateFlashcard();
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
    currentFlashcardIndex = (currentFlashcardIndex + 1) % flashcards[currentCategory].length;
    updateFlashcard();
}

function updateFlashcard() {
    document.getElementById("flashcardImage").src = flashcards[currentCategory][currentFlashcardIndex].image;
    document.getElementById("wordContainer").textContent = flashcards[currentCategory][currentFlashcardIndex].word;
}

// Initialize the first flashcard
updateFlashcard();
