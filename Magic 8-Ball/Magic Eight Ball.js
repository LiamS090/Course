let userName = '';
userName ? console.log(`Hello, ${userName}`):
console.log("Hello!");

const userQuestion = 'will i become rich';
console.log(`${userName} asked: ${userQuestion}`);

const randomNumber = Math.floor(Math.random() * 8);

let eightBall = '';

switch (randomNumber) {
  case 0: eightBall = 'It is certin';
    break;
  case 1 : eightBall = 'it is decidedly so';
    break;
  case 2 : eightBall = 'reply hazy try again';
    break;
  case 3 : eightBall = 'cannot predict now';
    break;
  case 4 : eightBall = 'do not count on it';
    break;
  case 5: eightBall = 'my sources say no';
    break;
  case 6 : eightBall = 'Outlook not so good';
    break;
  case 7 : eightBall = 'signs point to yes';
    break;
  case 8 : eightBall = 'not in a million years';
    break;
  default: console.log('who knows');
    break;
}

console.log(`the eight ball answered: ${eightBall}`);