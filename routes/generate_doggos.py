import json
import random

DogNames = [ "Luna", "Lola", "Daisy", "Bella", "Max", "Charlie", "Rocky" , "Toffik", "Taffy", "Leo", "Pikus", "Reks" ]



amount = 25

jsonfile = open("data/dogs.json")

print(jsonfile)


existingdogdict = json.load(jsonfile)

Dogdict = {
}

for i in range(amount):
    name = random.choice(DogNames)

    id = str(i)
    Dogdict[name+id] = { }
    Dogdict[name+id]["id"] = id
    Dogdict[name+id]["image"] = "images/dog-icon.png"
    Dogdict[name+id]["name"] = name
    Dogdict[name+id]["desc"] = f"{name} jest super pieskiem. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    Dogdict[name+id]["date"] = "01/01/2023"
    if random.randint(0,1):
        Dogdict[name+id]["readyToAdopt"] = "True"
    else:
        Dogdict[name+id]["readyToAdopt"] = "False"
   
    
    

existingdogdict.update(Dogdict)

print(json.dumps(existingdogdict, indent=4))
