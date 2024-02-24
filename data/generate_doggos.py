import json
import random

DogNames = [ "Luna", "Lola", "Daisy", "Bella", "Max", "Charlie", "Rocky" , "Toffik", "Taffy", "Leo", "Pikus", "Reks", "Aga", "Anika", "Ami", "Aurora", "Bajka", "Becky", "Betty", "Cece", "Cherry", "Chrupka", "Ciapka", "Daisy", "Diana", "Dora", "Duffy", "Edzia", "Emi", "Emma", "Fabia", "Fela", "Fiona", "Fluffy", "Giga", "Gracja", "Gratka", "Gwiazdka", "Hajdi", "Hana", "Heidi", "Hermiona", "Ines", "Inga", "Iskierka", "Izzy", "Jenny", "Jessica", "Jolly", "Jura", "Karmen", "Kika", "Kira", "Koko", "Kreska", "Lady", "Lara", "Lilu", "Łatka", "Łuska", "Mela", "Melisa", "Minnie", "Molly", "Nastka", "Nejka", "Nora", "Oda", "Oktawa", "Owieczka", "Paloma", "Pchełka", "Pinky", "Polly", "Roxi", "Raksa", "Rasta", "Rosa", "Rumba", "Saba", "Sara", "Scarlet", "Schira", "Sunia", "Tajga", "Tara", "Trufla", "Ufi", "Uma", "Warta", "Wega", "Wendy", "Wika", "Yaris", "Yumi", "Zafira", "Zeila", "Zira", "Znajda", "Luna", "Figa", "Tosia", "Bunia", "Pola", "Zula", "Mela", "Nela", "Saba", "Kiara", "Rocky", "Nero", "Maks", "Karmel", "Tobi", "Afro", "Albin", "Amor", "Azor", "Biszkopt", "Bobik", "Borys", "Brutus", "Cezar", "Charlie", "Chester", "Corso", "Daktyl", "Diego", "Dolar", "Drops", "Edek", "Eddy", "Egon", "Elvis", "Fafi", "Fafik", "Figiel", "Flapi", "Gaston", "Gospel", "Grafit", "Gucio", "Hamlet", "Happy", "Harry", "Hektor", "Imbir", "Irokez", "Irys", "Iwo", "Jawor", "Jerry", "Jumbo", "Junior", "Kajtek", "Karmel", "Karmin", "Kieł", "Koral", "Laser", "Lazur", "Levis", "Lucky", "Łapek", "Łatek", "Łobuz", "Marley", "Messi", "Miętus", "Napi", "Neo", "Neo", "Olivier", "Okruszek", "Oskar", "Ozzie", "Nicky", "Papi", "Pimpek", "Pluto", "Puszek", "Rasti", "Reks", "Rocky", "Rudolf", "Samuraj", "Szarik", "Szafran", "Scooby", "Tiger", "Timon", "Tobiś", "Tofik", "Uno", "Uszatek", "Urwis", "Uzi", "Wafel", "Wally", "Whinston", "Yoda", "Yogi", "Yoko", "York", "Zibi", "Zorro", "Zyzio" ]



amount = 25

jsonfile = open("dogs.json")

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
    Dogdict[name+id]["age"] = f"{random.randint(1,10)}"
    if random.randint(0,1):
        Dogdict[name+id]["readyToAdopt"] = "True"
    else:
        Dogdict[name+id]["readyToAdopt"] = "False"
   
    
    

existingdogdict.update(Dogdict)

print(json.dumps(existingdogdict, indent=4))
