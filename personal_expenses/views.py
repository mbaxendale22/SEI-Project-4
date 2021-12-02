from django.shortcuts import render

# Create your views here.
from django.http.response import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 
from .models import Personal_Expenses
from household_expenses.models import Household_Expenses
from .serializers import PESerializer
from household_expenses.serializers import HESerializer
 


class PEShareView(APIView):
    def get(self, request):
        # post the expense to user's expenses
        # find the other members of the user's household'
        pe = {
        "name": request.data['name'],
        "category":request.data['category'],
        "amount": request.data['amount'],
        "date": request.data['date'],
        "share": request.data['share'],
        "resolved": request.data['resolved'],
        "user": request.data['user_id'],
        }
        hh = {
            "name": request.data['name'],
            "category":request.data['category'],
            "amount": request.data['amount'],
            "date": request.data['data'],
            "resolved": request.data['resolved'],
            "household": request.data['household_id'],
        }
        personal_expense = PESerializer(pe)
        household_expense = HESerializer(hh)
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
            # print(request.data['amount'])
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
