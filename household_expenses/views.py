from django.shortcuts import render

# Create your views here.
from django.http.response import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 
from .models import Household_Expenses
from .serializers import HESerializer



class HEIndexView(APIView):
    def get(self, request):
        try: 
            he = Household_Expenses.objects.all()
            serialized_he = HESerializer(he, many=True)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(serialized_he.data, status=status.HTTP_200_OK)

    def post(self, request):
        try:
            he = HESerializer(data=request.data)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        if he.is_valid():
            he.save()
            return Response(he.data, status=status.HTTP_201_CREATED)
        else: 
            return Response(he.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)



class HEDetailView(APIView):

    def delete(self, request, pk):
        try:
            he = Household_Expenses.objects.get(id=pk)
            he.delete()
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        try:
            he = Household_Expenses.objects.get(id=pk)
            updated_he = HESerializer(he, data=request.data)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        if updated_he.is_valid():
            updated_he.save()
            return Response(updated_he.data, status=status.HTTP_202_ACCEPTED)
        else: 
            return Response(updated_he.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def get(self, request, pk):
        try:
            he = Household_Expenses.objects.get(id=pk)
            serialized_he = HESerializer(he)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(serialized_he.data, status=status.HTTP_200_OK)

