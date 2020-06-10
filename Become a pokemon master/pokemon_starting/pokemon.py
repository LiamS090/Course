class Pokemon:

  def __init__(self, name, type, level = 5):
    self.name = name
    self.level = level
    self.health = level * 5
    self.max_health = level * 5
    self.type = type
    self.is_knocked_out = False

    #print info
  def __repr__(self):
    return "This level {level} {name} has {health} hit points remaining. They are a {type} type Pokemon".format(level = self.level, name = self.name, health= self.health, type = self.type)
    
    #lose hp
  def lose_health(self, amount):
    self.health -= amount
    if self.health <= 0:
      self.health = 0
      self.knock_out()
    else:
      print("{name} now has {health} health.".format(name = self.name, health = self.health))

    #gain hp
  def gain_health(self, amount):
    if self.health == 0:
      self.revive()
      self.health += amount
    if self.health >= self.max_health:
      self.health = self.max_health
    print("{name} now has {health} health.".format(name = self.name, health = self.health))

    #knocked out
  def knock_out(self):
    self.is_knocked_out = True
    if self.health != 0:
      self.health = 0
    print("{name} was knocked out!".format(name = self.name))

    #revive
  def revive(self):
    self.is_knocked_out = False
    if self.health == 0:
      self.health = 1
      print("{name} was revived!".format(name = self.name))

    #attack
  def attack(self, other_pokemon):
    if self.is_knocked_out:
      print("{name} can't attack because it is knocked out!".format(name = self.name))
      return

      #supereffective
    if (self.type == "Fire" and other_pokemon.type == "Grass") or (self.type == "Water" and other_pokemon.type == "Fire") or (self.type == "Grass" and other_pokemon.type == "Water"):
      print("{my_name} attacked {other_name} for {damage} damage.".format(my_name = self.name, other_name = other_pokemon.name, damage = self.level * 2))
      print("It's super effective")
      other_pokemon.lose_health(self.level * 2)

     #not very effective
    if (self.type == "Water" and other_pokemon.type == "Grass") or (self.type == "Grass" and other_pokemon.type == "Fire") or (self.type == "Fire" and other_pokemon.type == "Water"):
      print("{my_name} attacked {other_name} for {damage} damage.".format(my_name = self.name, other_name = other_pokemon.name, damage = self.level * 0.5))
      print("It's not very effective")
      other_pokemon.lose_health(self.level * 0.5)

      #self type attack
    if (self.type == other_pokemon.type):
     print("{my_name} attacked {other_name} for {damage} damage.".format(my_name = self.name, other_name = other_pokemon.name, damage = self.level))
    other_pokemon.lose_health(self.level)

      #trainer class
class Trainer:
  def __init__(self, pokemon_list, num_potions, name):
    self.pokemons = pokemon_list
    self.potions = num_potions
    self.current_pokemon = 0
    self.name = name

  #print info about trainer
  def __repr__(self):
    print("The trainer {name} has the following pokemon".format(name = self.name))
    for pokemon in self.pokemons:
      print(pokemon)
      return "The current active pokemon is {name}".format(name = self.pokemons[self.current_pokemon].name)

        #switch pokemon
  def switch_active_pokemon(self, new_active):
    if new_active < len(self.pokemons) and new_active >= 0:
      if self.pokemons[new_active].is_knocked_out:
        print("{name} is knocked out.".format(name = self.pokemons[new_active].name))
    elif new_active == self.current_pokemon:
        print("{name} is already your active pokemon".format(name = self.pokemons[new_active].name)) 
    else:
      self.current_pokemon = new_active
      print("Go {name}, it's your turn!".format(name = self.pokemons[self.current_pokemon].name)) 

    #using potion
  def use_potion(self):
    if self.potions > 0:
      print("You used a potion on {name}.".format(name = self.pokemons[self.current_pokemon].name))
      self.pokemons[self.current_pokemon].gain_health(30)
      self.potions -= 1
    else:
      print("You don't have any more potions")

   #attack other trainer
  def attack_other_trainer(self, other_trainer):
    my_pokemon = self.pokemons[self.current_pokemon]
    their_pokemon = other_trainer.pokemons[other_trainer.current_pokemon]
    my_pokemon.attack(their_pokemon)

  #subclass pokemon
class Charmander(Pokemon):
  def __init__(self, level = 5):
    super().__init__("Charmander", "Fire", level)

class Squirtle(Pokemon):
  def __init__(self, level = 5):
    super().__init__("Squirtle", "Water", level)

class Bulbasaur(Pokemon):
  def __init__(self, level = 5):
    super().__init__("Bulbasaur", "Grass", level)

#creating pokemon
a = Charmander(17)
b = Squirtle(29)
c = Squirtle(13)
d = Bulbasaur(20)
e = Charmander(14)
f = Squirtle(21)

#creating trainers
trainer_one = Trainer([a,b,c], 3, "Ash")
trainer_two = Trainer([d,e,f], 5, "Prof Oak")

print(trainer_one)
print(trainer_two)

#trainer_one.attack_other_trainer(trainer_two)
#trainer_two.attack_other_trainer(trainer_one)
#trainer_two.use_potion()
#trainer_one.attack_other_trainer(trainer_two)
#trainer_two.switch_active_pokemon(0)
#trainer_two.switch_active_pokemon(1)