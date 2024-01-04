import json
import random
import time
from datetime import datetime
from datetime import date

jsonfile = open("data/dogs.json")

existingdogdict = json.load(jsonfile)

ReservationDict = {
}

startdate = datetime(2024, 1, 7)
enddate = datetime(2024, 1, 31)

DniTygodnia = [ "Poniedzialek", "Wtorek", "Sroda", "Czwartek", "Piatek", "Sobota", "Niedziela" ]

def RandomizeDate():
    return date.fromtimestamp(random.randint(int(startdate.timestamp()), int(enddate.timestamp())))

for dog in existingdogdict:

    if random.randint(0,2): #67% szans ze pies bedzie mial jakies rezerwacje
        IloscRezerwacji = 0
        temp = random.randint(0,2)
        if temp==0:
            IloscRezerwacji = random.randint(1,3)
        elif temp==1:
            IloscRezerwacji = random.randint(4,8)
        else:
            IloscRezerwacji = random.randint(9,16)


        ReservationDict[dog] = [None] * IloscRezerwacji
        for i in range(IloscRezerwacji):
            ReservationDict[dog][i] = { }
            Rezerwacja = ReservationDict[dog][i]
            
            wylosowanadata = RandomizeDate()
            Rezerwacja["date"] = f"{wylosowanadata.year}.{wylosowanadata.month}.{wylosowanadata.day}"

            randomstarthour = random.randint(7,16)
            randomoffset = random.randint(2,3)
            Rezerwacja["start"] = f"{randomstarthour}:00"
            Rezerwacja["end"] = f"{randomstarthour}:00"
            Rezerwacja["day"] = f"{DniTygodnia[wylosowanadata.weekday()]}"
            
            

print(json.dumps(ReservationDict, indent='\t'))
