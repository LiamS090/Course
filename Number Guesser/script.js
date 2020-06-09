let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

const generateTarget = () => {
    return Math.floor(Math.random() * 10);
  }
  
const compareGuesses = (userG, computerG, target) => {
    const humanDifference = Math.abs(target - userG)
    const computerDifference = Math.abs(target - computerG)
    return humanDifference <= computerDifference;
  }
  
const updateScore = winner => {
    if (winner === 'human') {
      humanScore++;
    } else if (winner === 'computer') {
      computerScore++;
    }
  }
  
const advanceRound = () => currentRoundNumber++;

