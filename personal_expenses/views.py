from django.shortcuts import render

# Create your views here.
from django.http.response import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 
from .models import Personal_Expenses
from household_expenses.models import Household_Expenses
from auth_jwt.models import User
from auth_jwt.serializers import UserSerializer
from .serializers import PESerializer
from household_expenses.serializers import HESerializer
 


class PEShareView(APIView):
    def post(self, request):
        house_members = User.objects.filter(household=request.data['household']).exclude(id=request.data['user'])
        serialized_house_members = UserSerializer(house_members, many=True)
        h_list = list(serialized_house_members.data)
        shared_amount = (request.data['amount'] / (len(h_list) + 1)) 


        pe = {
        "name": request.data['name'],
        "category":request.data['category'],
        "amount": shared_amount,
        "date": request.data['date'],
        "share": request.data['share'],
        "resolved": request.data['resolved'],
        "user": request.data['user'],
        }

        he = {
            "name": request.data['name'],
            "category":request.data['category'],
            "amount": request.data['amount'],
            "date": request.data['date'],
            "resolved": request.data['resolved'],
            "household": request.data['household'],
        }
        personal_expense = PESerializer(data=pe)
        if personal_expense.is_valid():
            personal_expense.save()
        household_expense = HESerializer(data=he)
        if household_expense.is_valid():
            household_expense.save()

        for index, person in enumerate(h_list):
            pse = {
            "name": request.data['name'],
            "category":request.data['category'],
            "amount": shared_amount,
            "date": request.data['date'],
            "share": request.data['share'],
            "resolved": request.data['resolved'],
            "user": h_list[index]['id'],
            } 
            shared_personal_expense = PESerializer(data=pse)
            if shared_personal_expense.is_valid():
                shared_personal_expense.save()


        return Response({"message": "congrats you hit the endpoint"})






class PEIndexView(APIView):
    def get(self, request):
        try: 
            pe = Personal_Expenses.objects.all()
            serialized_pe = PESerializer(pe, many=True)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(serialized_pe.data, status=status.HTTP_200_OK)

    def post(self, request):
        try:
            pe = PESerializer(data=request.data)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        if pe.is_valid():
            pe.save()
            return Response(pe.data, status=status.HTTP_201_CREATED)
        else: 
            return Response(pe.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)



class PEDetailView(APIView):

    def delete(self, request, pk):
        try:
            pe = Personal_Expenses.objects.get(id=pk)
            pe.delete()
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        try:
            pe = Personal_Expenses.objects.get(id=pk)
            updated_pe = PESerializer(pe, data=request.data)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        if updated_pe.is_valid():
            updated_pe.save()
            return Response(updated_pe.data, status=status.HTTP_202_ACCEPTED)
        else: 
            return Response(updated_pe.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def get(self, request, pk):
        try:
            pe = Personal_Expenses.objects.get(id=pk)
            serialized_pe = PESerializer(pe)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(serialized_pe.data, status=status.HTTP_200_OK)
