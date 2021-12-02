from django.http.response import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 
from .models import Household_Assets
from .serializers import HASerializer
from auth_jwt.models import User



class HAIndexView(APIView):
    def get(self, request):
        try: 
            ha = Household_Assets.objects.all()
            serialized_ha = HASerializer(ha, many=True)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(serialized_ha.data, status=status.HTTP_200_OK)

    def post(self, request):
        try:
            print('hitting the correct view')
            house = User.objects.filter(id=request.data['user']).values()
            household = (house[0]['household_id'])
            print(household)
            asset = {
                "name": request.data['name'],
                "category": request.data['category'],
                "amount": request.data['amount'],
                "date": request.data['date'],
                "household": household,
                "owner": request.data['user']
            }
            print(asset)
            ha = HASerializer(data=asset)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        if ha.is_valid():
            ha.save()
            return Response(ha.data, status=status.HTTP_201_CREATED)
        else: 
            return Response(ha.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)



class HADetailView(APIView):

    def delete(self, request, pk):
        try:
            ha = Household_Assets.objects.get(id=pk)
            ha.delete()
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        try:
            ha = Household_Assets.objects.get(id=pk)
            updated_ha = HASerializer(ha, data=request.data)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        if updated_ha.is_valid():
            updated_ha.save()
            return Response(updated_ha.data, status=status.HTTP_202_ACCEPTED)
        else: 
            return Response(updated_ha.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def get(self, request, pk):
        try:
            ha = Household_Assets.objects.get(id=pk)
            serialized_ha = HASerializer(ha)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(serialized_ha.data, status=status.HTTP_200_OK)
