from datetime import date
from dateutil.relativedelta import *

task = input('Enter a task name: ')
try:
    input_date = input("Input Enter the date(DD/MM/YYYY): ").replace("/", " ")
    day,month,year = int(input_date[:2]),int(input_date[3:5]),int(input_date[6:10])
    date1 = date(year,month,day)
    print("m - Months, w - Weeks, d- Days")
    choice = input("Please Choose day/week/month: ")

except: print("Invalid Input")
else:
    def display(dt): print(dt.strftime("%d-%m-%Y"),[dt.strftime("%A-%B-%Y")])

    if choice == 'm':
        for i in range(1,10): display(date1 + relativedelta(months=+i))

    elif choice == 'w':
        for i in range(1,10): display(date1 + relativedelta( days=+ (7 * i) ))

    elif choice == 'd':
        for i in range(1,10): display(date1 + relativedelta( days=+i ))

    else: print("Invalid Input")