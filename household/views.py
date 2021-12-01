from django.http.response import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 
from .models import Household
from .serializers import HouseholdSerializer



class HouseholdIndexView(APIView):
    def get(self, request):
        try: 
            household = Household.objects.all()
            serialized_hh = HouseholdSerializer(household, many=True)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(serialized_hh.data, status=status.HTTP_200_OK)

    def post(self, request, pk):
        try:
            household = HouseholdSerializer(data=request.data)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        if household.is_valid():
            household.save()
            return Response(household.data, status=status.HTTP_201_CREATED)
        else: 
            return Response(household.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)



class HouseholdDetailView(APIView):

    def delete(self, request, pk):
        try:
            household = House.objects.get(id=pk)
            house.delete()
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        try:
            household = Household.objects.get(id=pk)
            updated_household = HouseholdSerializer(household, data=request.data)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        if updated_household.is_valid():
            updated_household.save()
            return Response(updated_household.data, status=status.HTTP_202_ACCEPTED)
        else: 
            return Response(updated_household.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)



    def get(self, request, pk):
        try:
            household = Household.objects.get(id=pk)
            serialized_hh = HouseholdSerializer(household)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(serialized_hh.data, status=status.HTTP_200_OK)
