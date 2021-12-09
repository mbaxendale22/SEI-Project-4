
# Create your views here.
from django.http.response import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 
from .models import Personal_Assets
from .serializers import PASerializer
from household_assets.models import Household_Assets
from household_assets.serializers import HASerializer
from auth_jwt.models import User
from auth_jwt.serializers import UserSerializer
from functools import reduce

class PASharedView(APIView):
    def post(self, request):
            house = User.objects.filter(id=request.data['user']).values()
            household = (house[0]['household_id'])
            asset = {
                "name": request.data['name'],
                "category": request.data['category'],
                "amount": request.data['amount'],
                "date": request.data['date'],
                "household": household,
                "owner": request.data['user']
            }

            return Response(personal_shared_assets, status=status.HTTP_200_OK)


class PAIndexView(APIView):
    def get(self, request):
        try: 
            pa = Personal_Assets.objects.all()
            serialized_pa = PASerializer(pa, many=True)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(serialized_pa.data, status=status.HTTP_200_OK)

    def post(self, request):
        try:
            pa = PASerializer(data=request.data)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        if pa.is_valid():
            pa.save()
            return Response(pa.data, status=status.HTTP_201_CREATED)
        else: 
            return Response(pa.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)



class PADetailView(APIView):
    # view for deleting entire pot (not just one transaction)
    def delete(self, request, pk):
        try:
            name = request.GET.get('name')
            pa = Personal_Assets.objects.filter(user=pk).filter(name=name).delete()
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        try:
            pa = Personal_Assets.objects.get(id=pk)
            updated_pa = PASerializer(pa, data=request.data)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        if updated_pa.is_valid():
            updated_pa.save()
            return Response(updated_pa.data, status=status.HTTP_202_ACCEPTED)
        else: 
            return Response(updated_pa.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def get(self, request, pk):
        try:
            pa = Personal_Assets.objects.get(id=pk)
            serialized_pa = PASerializer(pa)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(serialized_pa.data, status=status.HTTP_200_OK)


class PACreatePot(APIView):
    def post(self, request):
        try:
            pa = PASerializer(data=request.data)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        if pa.is_valid():
            pa.save()
            return Response(pa.data, status=status.HTTP_201_CREATED)
        else: 
            return Response(pa.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class PAPotBalance(APIView):
        # returns the total 'balance', requires the user Id and the name of the pot
    def get(self, request, user):
        try:
            name = request.GET.get('name')
            pa = Personal_Assets.objects.filter(user=user).values()
        
            pa_category = list(filter(lambda x: x.get('name') == name, pa))
            pa_amounts = list(map(lambda x: x.get('amount'), pa_category))
            pa_balance = reduce(lambda x, y: x + y, pa_amounts)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response( pa_balance, status=status.HTTP_200_OK)

class PAIndividualPots(APIView):
    # returns a list of deposits to and withdrawls from  a given pot
    def get(self, request, user):
        try:
            name = request.GET.get('name')
            pa = Personal_Assets.objects.filter(user=user).values()
        
            pa_category = list(filter(lambda x: x.get('name') == name, pa))
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(pa_category, status=status.HTTP_200_OK)

class PASavingsPot(APIView):

    # returns all deposits and withdrawals from all a user's pots
    def get(self, request, user):
        try:
            pa = Personal_Assets.objects.filter(user=user)
        
            serialized_pa = PASerializer(pa, many=True)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(serialized_pa.data, status=status.HTTP_200_OK)
    
    def delete(self, request, pk):
        try:
            pa = Personal_Assets.objects.get(id=pk)
            pa.delete()
        except:
            return Response(status=status.HTTP_204_NO_CONTENT)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request, pk):
        try:
            pa = Personal_Assets.objects.get(id=pk)
            updated_pa = PASerializer(pa, data=request.data)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        if updated_pa.is_valid():
            updated_pa.save()
            return Response(updated_pa.data, status=status.HTTP_202_ACCEPTED)
        else: 
            return Response(updated_pa.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

