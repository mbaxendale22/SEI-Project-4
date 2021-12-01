
# Create your views here.
from django.http.response import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 
from .models import Personal_Assets
from .serializers import PASerializer



class PAIndexView(APIView):
    def get(self, request):
        try: 
            pa = Personal_Assets.objects.all()
            serialized_pa = PASerializer(pe, many=True)
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

    def delete(self, request, pk):
        try:
            pa = Personal_Assets.objects.get(id=pk)
            pa.delete()
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        try:
            pa = Personal_Expenses.objects.get(id=pk)
            updated_pa = PESerializer(pa, data=request.data)
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

