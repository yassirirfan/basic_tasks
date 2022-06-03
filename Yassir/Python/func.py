import random
import re

rab = 0
rabs = '' 
tort = 0
win = False

def genRand():      #Function to generate a random number within range [0000 - 9999]
    r = ''
    for i in range(4):
        r += str(random.randrange(0, 10))
    return r   

def valid(usr_in,usr_num):
    if len(usr_in) > 5 or len(usr_num) != 4:
        return False
    elif len(usr_in) == 5 and usr_in[0] not in ('+','-'):
        return False
    return True

def winner(user,system):
    if user != system: return False
    return True

def rabbit(user,system,i,l1): 
    while l1 != 0 :
        d1 = user[i]
        d2 = system[i]
        if(d1 == d2): 
            rab += 1
            rabs += d1
        l1 -= 1
        i -= 1
    if rab == 0 : return False
    else: return True
def tortoise(user,system,j,l2):
    while l2 != 0 :
        if(user[j]  in system ):
            if user[j] not in rabs:
                tortCount += 1
        l2 -= 1
        j -= 1
    if tort > 0 : return True
    return False   
def play():
    choice = input("Do you want to continue ? (y/n) ")
    if  choice not in ('y','n'): 
        print("Invalid, Please enter either y or n")
        play()
    elif choice == 'y' : return True
    return False

rand = genRand()

while True:
    user_input = input("Enter a guess: ")
    user_num = ''.join(re.findall('[0-9]+',user_input))

    if not valid(user_input,user_num):
        print('Invalid Input')
        continue
    
    elif winner(user_num,rand) : 
        print("WINNER !")
        win = True

    if rabbit(user_num,rand,-1,4) and not win: print("You got rabbit {0} time(s) !".format(rab))
    if tortoise(user_num,rand,-1,4) and not win:print("You have got tortoise {0} times ".format(tort))
    if rab == 0 and tort == 0 and not win : print("Nothing Found")
    print("Computer Generated number was : ",rand) #Test section inorder to track program efficiency --> [Not Necessary] [49]

    if play() and win: 
        rand = genRand() 
        continue
    elif play() : continue
    else: break