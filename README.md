# Household. A Full Stack Django/React Web App 

### App deployed on Heroku [here]('https://household-app-project.herokuapp.com/')


## Overview
Household was developed in fulfillment of General Assembly's SEI Bootcamp. The brief was to create a full stack web application using an SQL database, Django backend, and React frontend. Household is a financial management app in which a user can track their income, expenses, and savings. The user is also able to create a household with other users. Once created, the app will handle the distribution of household expenses among members proportionately, all the user has to do is mark the expense as 'shared' and the app will take care of the rest. Both individual user and household data are represented with charts and key insight are available on demand such as largest monthly expense and total monthly income. The app is fully mobile responsive.      

## Tech Stack 

* Django 
* Django REST Framework
* PostgreSQL
* React.js
* Axios
* React Query
* Tailwind CSS 
* Chart.js


## App Snapshot 


## Planning


## Featured Code Snippet
The ability to mark an expense as 'shared' and have that expense split evenly amongst members of the household and included 
in a separate household table was my main MVP goal for the project. The following code snippet is the view that handles this 
functionality:  

```python 

class SEIndexView(APIView):
  
    def post(self, request):
        house_members = User.objects.filter(household=request.data['household']).exclude(id=request.data['creator']) 
        # grab the other members of the household from the User model, exclude the current user from the list
        serialized_house_members = UserSerializer(house_members, many=True)
        h_list = list(serialized_house_members.data) # return the query as a list, will use for looping through later 
        shared_amount = (request.data['amount'] / (len(h_list) + 1)) #calc the correct splitting of the expense including the user who shared it

#build out the correct structure for each post request 
# (1) the user's personal expenses, (2) the other members of the household's personal expenses, (3) the household expenses table 
        pe = {
        "name": request.data['name'],
        "category":request.data['category'],
        "amount": shared_amount,
        "date": request.data['date'],
        "share": request.data['share'],
        "resolved": request.data['resolved'],
        "owner": request.data['owner'],
        "creator": request.data['creator']
        }

        he = {
            "name": request.data['name'],
            "category":request.data['category'],
            "amount": request.data['amount'],
            "date": request.data['date'],
            "resolved": request.data['resolved'],
            "household": request.data['household'],
            "creator": request.data['creator']
        }
        personal_expense = PESerializer(data=pe)
        if personal_expense.is_valid():
            personal_expense.save()
        household_expense = HESerializer(data=he)
        if household_expense.is_valid():
            household_expense.save()

# use the query list to send a post request to the personal_expenses table for each user in it 
        for index, person in enumerate(h_list):
            pse = {
                "name": request.data['name'],
                "category":request.data['category'],
                "amount": shared_amount,
                "date": request.data['date'],
                "share": request.data['share'],
                "resolved": request.data['resolved'],
                "owner": h_list[index]['id'],
                "creator": request.data['creator'],
            } 
            shared_personal_expense = PESerializer(data=pse)
            if shared_personal_expense.is_valid():
                shared_personal_expense.save()

        return Response(status=status.HTTP_201_CREATED)


```


## Known Bugs

* On creating a new household, the user will be shown an updated household ID immediately, however the name of the new household will only show after the user has navigated away from the homepage and back again. This issue was fixed elsewhere by using React Query to optimistically update the UI, but has not yet been successfully implemented on this one particular update.  


## Future Development

My aim for future development is to development Household into a more rounded household planning solution by adding features such as: 

* Shared household savings pots 
* Household chores - customizable household chores that are distributed evenly among household members
* advanced data analysis - for example, data visualizations are currently restricted to the current month, adding quarterly or YTD analytics for personal and household expenses     

