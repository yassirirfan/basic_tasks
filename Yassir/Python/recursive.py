input("Name of the task: ")
input_date = input("Input Enter the date(DD/MM/YYYY): ").replace("/", " ")
day,month,year = int(input_date[:2]),int(input_date[3:5]),int(input_date[6:10])

date = input_date(year,month,day)

choice = print("m - Months, w - Weeks, d- Days")

input("Please Choose day/week/month")
