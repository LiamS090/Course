import random

money = 100

#Write your game of chance functions here
def coin_toss(bet, guess):
  print("Lets play a game of heads or tails")
  #validation
  if bet <= 0:
    print("Your bet needs to exceed 0 to play.")
    return 0
  
  #Flip the coin
  print("Okay, let's flip! You guessed " + str(guess))
  coin_result = random.randint(0,1)
  
  
  if coin_result == 0:
    print("Heads!")
  elif coin_result == 1:
    print("Tails!")
    
    #result
  if (coin_result == 0 and guess == "Heads") or (coin_result == 1 and guess == "Tails"):
      print("You win $" + str(bet) + ", well done!")
      return bet
  else:
      print("Better luck next time! You lost $" + str(bet) + ".")
      return -bet
 
      #Cho-Han
def cho_han(bet, guess):
  print("\nLets play a game of Cho-Han")
    #validation
  if bet <= 0:
    print("Your bet needs to exceed 0 to play.")
    return 0
  
    #setup
  num1 = random.randint(1,6)
  num2 = random.randint(1,6)
  total = num1 + num2
  print("the sum of the to dice is " +str(total))
  if total % 2 !=0:
      result = 'Odd'
  else:
      result = "Even"
    #Game
  if guess == "Even" and total % 2 == 0:
        print("You win $" + str(bet) + ", well done!")
        return bet
  elif guess == "Odd" and total % 2 == 1:
        print("You win $" + str(bet) + ", well done!")
        return bet
  else:
        print("You lost $" + str(bet) + ", Unlucky")
        return -bet

    #High card
def high_card(bet):
  print("\nLets play a game of high card")
  # Validation
  if bet <= 0:
    print("Your bet needs to exceed 0 to play.")
    return 0
  
  #setup

  your_card = random.randint(1,13)
  dealer_card = random.randint(1,13)
  print("your card was " + str(your_card))
  print("dealers card was " + str(dealer_card))

  #game

  if your_card == dealer_card:
     print("It looks like a tie")
     return 0
  elif your_card > dealer_card:
    print("You win $" + str(bet) + ", well done!")
    return bet
  elif dealer_card > your_card:
    print("You lost $" + str(bet) + ", Unlucky")
    return -bet

  #Roulette
def roulette(bet,guess):
  print("\nlets play a game of roulette")
  # Validation
  if bet <= 0:
    print("Your bet needs to exceed 0 to play.")
    return 0
  
    #Game

  result = random.randint(0, 37)
  if result == 37:
     print("The wheel landed on 00")
  else:
     print("The wheel landed on " + str(result))

   #results

  if guess == "Even" and result % 2 == 0 and result != 0:
    print(str(result) + " is an even number. You win! $" +str(bet))
    return bet
 
  elif guess == "Odd" and result % 2 == 1 and result != 37:
    print(str(result) + " is an Odd number. You win! $" +str(bet))
    return bet

  elif guess == result:
    print("You guessed " + str(guess) + " and the result was " + str(result))
    print("You won $" + str(bet * 35))
    return bet * 35

  else:
    print("You lost $" + str(bet))
    return -bet

#function calls

money += coin_toss(30, "Heads")
money += cho_han(20, "Even")
money += high_card(20)
print("\nAfter 3 games you currently have $" + str(money))
money += roulette(money/2, "Even")
money += roulette(10, 23)
money += roulette(money, "Odd")
print("Your total amount of money is $" + str(money))