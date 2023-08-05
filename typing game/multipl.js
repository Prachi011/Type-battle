// Players array to store the players' names and scores
const players = [];

// Sample sentences for the game
const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "A journey of a thousand miles begins with a single step.",
  "To be or not to be, that is the question.",
  "All that glitters is not gold.",
];

let currentSentenceIndex = 0;
let isGameRunning = false;

function startGame() {
  isGameRunning = true;
  document.getElementById('start').disabled = true;
  document.getElementById('input').disabled = false;
  document.getElementById('input').value = '';
  document.getElementById('sentence').textContent = sentences[currentSentenceIndex];
  document.getElementById('status').textContent = '';
  document.getElementById('input').focus();
}

function endGame() {
  isGameRunning = false;
  document.getElementById('start').disabled = false;
  document.getElementById('input').disabled = true;
  document.getElementById('status').textContent = 'Game Over!';
}

function checkInput() {
  if (!isGameRunning) return;

  const sentenceElement = document.getElementById('sentence');
  const inputElement = document.getElementById('input');
  const statusElement = document.getElementById('status');

  const expectedSentence = sentenceElement.textContent.trim();
  const playerInput = inputElement.value.trim();

  if (playerInput === expectedSentence) {
    // Player typed the sentence correctly
    const playerName = prompt('Congratulations! Enter your name:');
    if (playerName) {
      const playerScore = expectedSentence.length;
      players.push({ name: playerName, score: playerScore });
      updateScoreboard();
    }
    currentSentenceIndex = (currentSentenceIndex + 1) % sentences.length;
    startGame();
  } else if (expectedSentence.startsWith(playerInput)) {
    // Player's input is partially correct
    statusElement.textContent = 'Keep typing...';
  } else {
    // Player made a mistake
    statusElement.textContent = 'Wrong! Keep trying...';
  }
}

function updateScoreboard() {
  const scoreboard = document.createElement('ol');
  scoreboard.innerHTML = players.map((player) => `<li>${player.name}: ${player.score}</li>`).join('');
  document.body.appendChild(scoreboard);
}

document.getElementById('start').addEventListener('click', startGame);
document.getElementById('input').addEventListener('input', checkInput);