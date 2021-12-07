from django.http.response import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 
from .models import Personal_Income
from .serializers import PISerializer
from functools import reduce


class PIUserView(APIView):
    def get(self, request, user):
        try: 
            pi = Personal_Income.objects.filter(user=user)
            print(pi)
            serialized_pi = PISerializer(pi, many=True)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(serialized_pi.data, status=status.HTTP_200_OK)

class PIIndexView(APIView):
    def get(self, request):
        try: 
            pi = Personal_Income.objects.all()
            serialized_pi = PISerializer(pi, many=True)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(serialized_pi.data, status=status.HTTP_200_OK)

    def post(self, request):
        try:
            pi = PISerializer(data=request.data)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        if pi.is_valid():
            pi.save()
            return Response(pi.data, status=status.HTTP_201_CREATED)
        else: 
            return Response(pi.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)



class PIDetailView(APIView):

    def delete(self, request, pk):
        try:
            pi = Personal_Income.objects.get(id=pk)
            pi.delete()
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        try:
            pi = Personal_Income.objects.get(id=pk)
            updated_pi = PISerializer(pi, data=request.data)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        if updated_pi.is_valid():
            updated_pi.save()
            return Response(updated_pi.data, status=status.HTTP_202_ACCEPTED)
        else: 
            return Response(updated_pi.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)



    def get(self, request, pk):
        try:
            pi = Personal_Income.objects.get(id=pk)
            serialized_pi = PISerializer(pi)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(serialized_pi.data, status=status.HTTP_200_OK)


class PIRecentView(APIView):
    def get(self, request, user):
        try:
            pi = Personal_Income.objects.filter(user=user).order_by('-date')
            serialized_pi = PISerializer(pi, many=True)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(serialized_pi.data, status=status.HTTP_200_OK)

# Return all transactions from any date range specified in as query parameters in the url
class PILastMonth(APIView):
    def get(self, request):
        print('hitting the correct view')
        try:
            start = request.GET.get('start')
            end = request.GET.get('end')
            user = request.GET.get('user')
            pi = Personal_Income.objects.filter(user=user).filter(date__gte=str(start), date__lte=str(end))
            serialized_pi = PISerializer(pi, many=True)
            print(serialized_pi)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(serialized_pi.data, status=status.HTTP_200_OK)

# Return tpi total value of transactions from any date range specified in as query parameters in the url
class PIMonthlyTotal(APIView):
    def get(self, request):
        try:
            start = request.GET.get('start')
            end = request.GET.get('end')
            user = request.GET.get('user')
            pi = Personal_Income.objects.filter(user=user).filter(date__gte=str(start), date__lte=str(end)).values()
            amounts = []
            for transaction in pi:
                amounts.append(transaction['amount'])
                print(transaction['amount'])
            total = reduce((lambda x, y: x + y), amounts)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(total, status=status.HTTP_200_OK)

# Return the largest transaction from any date range
class PILargestExpense(APIView):
    def get(self, request):
        try:
            start = request.GET.get('start')
            end = request.GET.get('end')
            user = request.GET.get('user')
            pi = Personal_Income.objects.filter(user=user).filter(date__gte=str(start), date__lte=str(end)).order_by('-amount')
            serialized_pi =PISerializer(pi, many=True)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(serialized_pi.data, status=status.HTTP_200_OK)

