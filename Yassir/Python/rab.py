import random
import re

def genRand():    
    r = ''
    for i in range(4):r += str(random.randrange(0, 10))
    return r
rand = genRand()  
while True:
    win = False
    user_input = input("Enter a guess: ")
    user_num = ''.join(re.findall('[0-9]+',user_input))
    print("Computer Generated number is : ",rand) 

    if len(user_input) > 5 or len(user_num) != 4 or len(user_input) == 5 and user_input[0] not in ('+','-'):
        print('Invalid Input')
        continue
    elif user_num == rand:
        print("WINNER !")
        win = True    
    else: 
        tortCount,rabs = 0,[]  
        for k in range(4):
            d1,d2 = user_num[k],rand[k]
            if d1 == d2: rabs.append(k)
        if len(rabs) >  0: print("You got rabbit {0} time(s) !".format(len(rabs)))
        for i in range(4):
            if user_num[i] in rand: 
                if i not in rabs: tortCount += 1
        if tortCount > 0: print("You have got tortoise {0} times ".format(tortCount))

    if tortCount == 0 and len(rabs) == 0: print("Sorry You got Nothing")
    ch = input("Do you want to continue ? (y/n) ")
    while ch not in ('y','n'): 
        print("Invalid, Please enter either y or n")
        ch = input("Do you want to continue ? (y/n)")        
    if ch == 'y' and win: rand = genRand()
    elif ch == 'n': break