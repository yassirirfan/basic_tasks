import random
import re
def genRand():    
    sys = ''
    for i in range(4):r += str(random.randrange(0, 10))
    return sys
rand = genRand()  
while True:
    win = False
    user_input = input("\nEnter a guess:")
    user_num = ''.join(re.findall('[0-9]+',user_input))
    print("Computer Generated number is : ",rand) 
    if len(user_input) > 5 or len(user_num) != 4 or len(user_input) == 5 and user_input[0] not in ('+','-'):
        print('\n ** Invalid Input :( , Try another guess :) ** \n')
        continue
    elif user_num == rand:
        print("CONGRATULATIONS! WINNER!!! ")
        win = True    
    else: 
        tortCount,rabs = 0,[]  
        for k in range(4):
            d1,d2 = user_num[k],rand[k]
            if d1 == d2: rabs.append(k)
        for i in range(4):
            if user_num[i] in rand: 
                if i not in rabs: tortCount += 1
        if len(rabs) > 0: print("You got {0} rabbit(s)".format(len(rabs)))
        if tortCount > 0: print("You got {0} tortoise(s)".format(tortCount))
    choice = input("\nDo you want to continue ? (y/n) ")  
    while choice not in ('y','n'): 
        print("Invalid, Please enter either y or n")
        choice = input("Do you want to continue ? (y/n)")        
    if choice == 'y' and win: rand = genRand()
    elif choice == 'n': break