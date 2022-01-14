# Household - A Full Stack Django/React Web App 

### Deployed on Heroku [here](https://household-app-project.herokuapp.com/)


## Overview
Household was developed in fulfilment of General Assembly's Software Engineering Immersive Bootcamp. Household is a financial management app in which a user can track their income, expenses, and savings. The user is also able to create a household with other users. Once created, the app will handle the distribution of household expenses among members proportionately, all the user has to do is mark the expense as 'shared' and the app will take care of the rest. Both individual user and household data are represented with charts and key insights are available on demand such as largest monthly expense and total monthly income. The app is fully mobile responsive.      

## Guest Login
In order to use household you must create an account, if you just want to look around without signing up,
feel free to use these credentials: 

email: guest1@email.com
password: welcome1*3

## Technical Brief
* Build a full stack application complete with your own back end and front end
* Use Python and Django to build the back end, serving data from a PostgreSQL database
* Implement a fully functional RESTful API with all CRUD routes (POST, GET, PUT, DELETE)
* Use React to build the front end that consumes your API
* Include at least one OneToMany or ManyToMany relationship between the tables in your database
* Deploy the project online so it is accessible to the public
* Timeframe: 8 days


## User Stories

The user stories around which they project was planned and built are as follows: 

* Users can add expenses, edit the details of those expenses, and delete expenses
* Users can add a savings pot, add and withdraw from the pot, and delete the pot
* Users can receive key stats about their spending in the form of data visualisation
* Users can create, or join, households with other users
* Users have access to a household dashboard which tracks expenses and displays key stats about the household's expenses  
* Users can create 'shared expenses'
* Shared expenses will be divided amongst household members equally, added to each users' personal expenses, and the household expenses dashboard without user input being required
* User's can 'resolved' a shared expense, meaning the bill has been settled among household members. 



## Tech Stack 

* Python
* Javascript 
* Django 
* Django REST Framework
* PostgreSQL
* React.js
* Axios
* React Query
* Tailwind CSS 
* Chart.js
* Figma


## App Snapshot 
Users are required to register in order to use the app. Once registered or signed in they are taken to the landing page; navigation is achieved via a side-bar which slides in & out:

![Landing Page](./readme_assets/landing_nav.png)

The household management page allows a user to create a new household, join an existing one, or leave their existing household.

![manage household](./readme_assets/manage_household.png)

The income and expenses pages show a user's income & expenses, displaying their current status (shared, resolved etc.)

![expenses](./readme_assets/expenses.png)

Clicking the downward arrow scrolls the page down to reveal data visualization and key stats 

![data](./readme_assets/data.png)

The household expenses page keeps track of shared expenses

![household](./readme_assets/household.png)

Users can create up to 3 savings pots, adding or withdrawing as required

![savings](./readme_assets/savings.png)

## Planning
An entity relationship diagram was constructed to represent the structure of the database:

![ERD](./readme_assets/ERD.png)

Basic wireframes were built for key pages using Figma, some examples include:

Landing Page 

![Landing Page Wire Frame](./readme_assets/WF_landing.png)

Dashboard

![Dashboard Wire Frame](./readme_assets/WF_dashboard.png)

Personal Expenses

![Expenses Wire Frame](./readme_assets/WF_expenses.png)


## Featured Code Snippet
The biggest development challenge for this project centered around the following user story: 

* Shared expenses will be divided amongst household members equally, added to each users' personal expenses, and the household expenses dashboard without user input being required 

My main MVP for the app was a platform that allowed a user to manage household, shared expenses with no additional work than simply managing their own personal expenses. In this featured code snippet I'll walk through the key stages of acheiving that MVP.

The first step (from the front end perspective) was to create seperate API calls, hitting seperate API endpoints, that were triggered depending on whether the user had marked the expense as 'shared'. Here's the shared expense function: 

```python
export const postSharedExpenses = async (x) => {
  const { data } = await axios.post('/api/shared-expenses/', x, {
    headers: {
      common,
    },
  });
  return data;
};
```

On the back end, a view handles the incoming request. This view has to do several things: 

1. Just like a non-shared expenses, a new row has to be added to the personal expenses table, however, the AMOUNT must be divided by the number of people in the household, 
i.e., if a bill is £100, and the household has four members, then an expense for only £25 should be added for each member of the household
2. The household expenses table needs to be updated with the original amount of the expense 


In the first part of the view, the database is queried to find the other members of the household (the other users who also have the same household ID as a foreign key)
The returned query was then put into a list for two reasons: 

1. To get the length of the list and thereby know how many people are splitting the bill. 
2. To loop through later in the view so that the expense can be added to each household member's personal expenses regardless of how many there are. 

```python 

class SEIndexView(APIView):
  
    def post(self, request):
        house_members = User.objects.filter(household=request.data['household']).exclude(id=request.data['creator']) 
        # grab the other members of the household from the User model, 
        # exclude the current user from the list
        serialized_house_members = UserSerializer(house_members, many=True)
        h_list = list(serialized_house_members.data) 
        # return the query as a list, will use for looping through later 
        shared_amount = (request.data['amount'] / (len(h_list) + 1)) 
        #calc the correct splitting of the expense including the user who shared it


  ```

  The next step was to build seperate dictionaries of data to send to the database as follows: 

  1. one for the user who created the expenses (`pe`)
  2. one for the other members of the household (`pse`)
  3. one for the household 
  
Why did they have to be seperated? Mainly because the `owner` and `creator` of the expense are going to be different. These properties were created so that users can keep track of who created the expense. This is also why the user needs to be excluded from the query results stored in `house_members`.

 My intial plan was to give extra permissions to the creator of the expense (for example, only the creator can mark the expense as resolved), unfortunately I ran out of time to implement this. However it is still useful for household members to know who created the expense. The household expenses dictionary contains different data and so has to be seperated. 


```python

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
        try:
          personal_expense = PESerializer(data=pe)
          if  personal_expense.is_valid():
              personal_expense.save()
          household_expense = HESerializer(data=he)
          if  household_expense.is_valid():
              household_expense.save()
        except: 
          return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)

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
            if  shared_personal_expense.is_valid():
                shared_personal_expense.save()
            else:
                return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        return Response(status=status.HTTP_201_CREATED)
      
```


This pattern is then repeatable for other aspects of shared expenses. For example, when a user confirms that an expense has been resolved, this is updated on the household dashboard as well as for each member of the household. The view that handles this follows a very similar pattern but is able to make use of the `.update()` method to straightforwardly resolve the `resolved` property.  

```python
class SEResolveView(APIView):
     def put(self, request, pk):
        house_members = User.objects.filter(household=request.data['household']).exclude(id=request.data['creator']) # grab the other members of the household from the User model, exlude the current user from the list
        serialized_house_members = UserSerializer(house_members, many=True)
        h_list = list(serialized_house_members.data) #return the query as a list, will use for looping through later 

        owners_personal_expense = Personal_Expenses.objects.get(id=pk)
        owners_personal_expense_to_update = Personal_Expenses.objects.filter(id=pk).update(resolved=True)

        household_expense = Household_Expenses.objects.filter(
            creator=owners_personal_expense.creator,
            name=owners_personal_expense.name,
            category=owners_personal_expense.category, 
            date=owners_personal_expense.date,
            ).update(resolved=True)
#use the query list to send a post request to the personal_expenses table for each user in it 
        for index, person in enumerate(h_list):
            
            shared_personal_expense = Personal_Expenses.objects.filter(
            creator=owners_personal_expense.creator,
            owner=h_list[index]['id'],
            name=owners_personal_expense.name,
            category=owners_personal_expense.category, 
            date=owners_personal_expense.date
            ).update(resolved=True)

        return Response(status=status.HTTP_201_CREATED)

  ```


There are a few actions for which I elected not to implement the same pattern for shared expenses: editing and deleting shared expenses. Once an expense lands in a user's table, I felt they should have control over it - so it could not be simply deleted by other household members or the numbers changed. With more development I think implementing the 'creator' permissions I mentioned above would probably be a good balance: if the user has creeated the expense, then they can edit or delete it both for themselves and for the other members of the household. For now I simply disabled that option with a conditional render. 

If the expense is shared then the option to resolve it is shown, along with an explanation that it cannot be edited otherwise a save button is displayed to the user:

```javascript

{expense.share === true ?
              <div
                onClick={() => resolveExpense(resolve)}
                className="md:border-2 md:border-green-400 text-green-400 px-4 py-2 text-center rounded-md transform hover:-translate-x-1 hover:-translate-y-1 duration-300 ease-in-out"
              >
                Resolve This Expense
              </div>
           :  
            <button className="transaction-btn w-1/4 text-center">Save</button>
                      
            }
            <div
              className="transaction-btn w-1/4 text-center"
              onClick={() => setEditing(false)}
            >
              Go Back
            </div>
          </div>
        </form>
      </div>
      {expense.share === true && (
        <p className="text-xs sm:text-sm p-2 text-center">
          {' '}
          shared expenses cannot be edited, only be resolved or deleted
        </p>
      )}

```


## Known Bugs

* On creating a new household, the user will be shown an updated household ID immediately, however the name of the new household will only show after the user has navigated away from the homepage and back again. This issue was fixed elsewhere by using React Query to optimistically update the UI, but has not yet been successfully implemented on this one particular update.
* Usernames cannot have spaces.

## Development Challenges & Wins

For my final project on General Assembly's Software Engineering Immersive Bootcamp I wanted to move away from building apps primarily focused on serving data to the user and towards something oriented around providing a service with a core functionality, something I would be keen to use myself; I landed on a personal finance app. Several of the main technologies used in this project (Django, Python, SQL) were new to me at the outset. Of the three, working with SQL was the most challenging conceptually, having only used MongoDB previously. I am sure that the relationships between tables could be streamlined and, in turn, the views that handle the HTTP requests from the front end similarly simplified. I attempted to embrace the 'single page app' aspect of React as much as possible, cutting down on routing and employing conditionally rendered UI components wherever possible. This lead to both UI (particularly with absolutely positioned elements) and data fetching challenges. On that note, I opted to use React Query to handle the cached data in the app. This again was definitely a challenge, whilst I still have more requests firing than I would like, I really enjoyed using React Query as a way to learn more about global state management, app structure, and data caching. 

Overall, I thoroughly enjoyed building the app. It was definitely a sprint to complete within the time-frame, but I enjoy this immersive style of working. The project gave me a much clearer understanding of the tradeoffs between database types; as well as between a 'batteries included' framework like Django and a lighter server-side framework such as Express. Getting the main 'shared expenses' functionality working correctly was extremely satisfying. I also designed the app 'mobile first', which was a great learning experience and an approach I will use more frequently in the future. I was able to dive deeper into Tailwind CSS and was much happier with the styling and responsiveness of this app in comparison to others I had built on the course.  


## Future Development

New features for the app are Household into a more rounded household planning solution by adding features such as: 

* Shared household savings pots 
* Household chores - customizable household chores that are distributed evenly among household members
* advanced data analysis - for example, data visualizations are currently restricted to the current month, adding quarterly or YTD analytics for personal and household expenses     

