from datetime import timedelta, date

print(" \n ** Please follow the input Date fromat DD/MM/YYYY ** \n")
input_date1 = input("Enter date start: ").replace("/", " ")
input_date2 = input("Enter date end: ").replace("/", " ")

calendar = {'January':[], 'February': [], 'March':[], 'April':[],
 'May':[],'June':[], 'July':[], 'August':[], 'September':[],'October':[],'November':[],'December':[]}

try:
    day1,month1,year1 = int(input_date1[:2]),int(input_date1[3:5]),int(input_date1[6:10])
    day2,month2,year2 = int(input_date2[:2]),int(input_date2[3:5]),int(input_date2[6:10])
    start_dt = date(year1,month1,day1)
    end_dt = date(year2,month2,day2)
except:
    print("Invalid Date :( ")
else:
    order = []
    
    def daterange(date1, date2):
        for n in range(1,int((date2 - date1).days)):
            yield date1 + timedelta(n) 

    for dt in daterange(start_dt, end_dt):
        month = dt.strftime("%B")
        day = dt.strftime("%d")
        if month not in order: order.append(month)
        calendar[month].append(int(day))

    for month in order: print(month,calendar[month])