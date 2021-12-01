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






class HouseholdDetailView(APIView):
    def get(self, request, pk):
        try:
            household = Household.objects.get(id=pk)
            serialized_hh = HouseholdSerializer(household)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(serialized_hh.data, status=status.HTTP_200_OK)
