from django.http.response import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 

from auth_jwt.models import User
from auth_jwt.serializers import UserSerializer
from personal_expenses.models import Personal_Expenses
from personal_expenses.serializers import PESerializer
from household_expenses.serializers import HESerializer
from household_expenses.models import Household_Expenses


class SEIndexView(APIView):

    def post(self, request):
        house_members = User.objects.filter(household=request.data['household']).exclude(id=request.data['creator']) # grab the other members of the household from the User model, exlude the current user from the list
        serialized_house_members = UserSerializer(house_members, many=True)
        h_list = list(serialized_house_members.data) #return the query as a list, will use for looping through later 
        shared_amount = (request.data['amount'] / (len(h_list) + 1)) #calc the correct splitting of the expense including the user who shared it

#build out the correct structure for each post request - (1) the user's personal expenses, (2) the other members of the household's personal expenses, (3) the household expenses table 
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

#use the query list to send a post request to the personal_expenses table for each user in it 
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



class SEDetailView(APIView):

    def delete(self, request, pk):
        try:
        #    house_members = User.objects.filter(household=request.data['household']).exclude(id=request.data['creator']) # grab the other members of the household from the User model, exlude the current user from the list 
            pe = Personal_Expenses.objects.get(id=pk)

            household = Household_Expenses.objects.filter(
            creator=request.data['creator'],
            name=request.data['name'],
            category=request.data['category'], 
            date=request.data['date'],
            household=request.data['household']
            )
            

            pse = Personal_Expenses.objects.filter(
            creator=request.data['creator'],
            name=request.data['name'],
            category=request.data['category'], 
            date=request.data['date']
            )
            print(pse)


            pe.delete()
            pse.delete()
            household.delete()



        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(status=status.HTTP_204_NO_CONTENT)