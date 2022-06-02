import random
import re

def genRand(): #Function to generate a random number within range [0000 - 9999]
    r = ''
    for i in range(4):
        r += str(random.randrange(0, 10))
    return r

rand = genRand() #Global Variable

while True:
    win = 0
    user_input = input("Enter a guess: ")
    user_num = ''.join(re.findall('[0-9]+',user_input))

    if len(user_input) > 5 or len(user_num) != 4:
        print('Invalid Input')
        continue
    elif len(user_input) == 5 and user_input[0] not in ('+','-'):
        print('invalid Input')
        continue
    elif user_num == rand:
        print("WINNER !")
        win = 1    

    if len(user_num) == 4 and win != 1: #Rabbit Section  --> [Same Number in Same Position] [23 - 36]
        temp1 = rand
        temp2 = user_num
        pos_count = 0
        i = -1
        l1 = 4
        while l1 != 0 and win != 1:
            d1 = temp1[i]
            d2 = temp2[i]
            if(d1 == d2): pos_count += 1
            l1 -= 1
            i -= 1
        if(pos_count >  0): print("You got rabbit {0} time(s) !".format(pos_count))

        t_temp = user_num #Tortoise section --> [Guessed Number has a number same somewhere in Random Num] [39 - 47]
        j = -1
        l2 = 4
        count = 0
        while l2 != 0 :
            if(t_temp[j]  in rand):count += 1
            l2 -= 1
            j -= 1
        if count > 0 : print("You have got tortoise {0} times".format(count))

    print("Computer Generated number was : ",rand) #Test section inorder to track program efficiency --> [Not Necessary] [49]

    ch = input("Do you want to continue ? (y/n) ")
    while ch not in ('y','n'): 
        print("Invalid, Please enter either y or n")
        ch = input("Do you want to continue ? (y/n) ")
        
    if ch == 'n' : break
    if ch == 'y' and win == 1:rand = genRand()