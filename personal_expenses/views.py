from django.shortcuts import render

# Create your views here.
from django.http.response import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 
from .models import Personal_Expenses
from .serializers import PESerializer



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
            household = Personal_Expenses.objects.get(id=pk)
            serialized_hh = PESerializer(household)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(serialized_hh.data, status=status.HTTP_200_OK)
