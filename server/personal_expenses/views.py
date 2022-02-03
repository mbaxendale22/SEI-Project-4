from django.shortcuts import render

# Create your views here.
from django.http.response import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 
from .models import Personal_Expenses
from .serializers import PESerializer
from functools import reduce

 

class PEIndexView(APIView):
    def get(self, request):
        try: 
            pe = Personal_Expenses.objects.all()
            serialized_pe = PESerializer(pe, many=True)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(serialized_pe.data, status=status.HTTP_200_OK)

    def post(self, request):
        print('hitting the correct endpoint')
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

# Return all transactions ordered from most recent
class PERecentView(APIView):
    def get(self, request, own):
        try:
            pe = Personal_Expenses.objects.filter(owner=own).order_by('-date')
            serialized_pe = PESerializer(pe, many=True)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(serialized_pe.data, status=status.HTTP_200_OK)

# Return all transactions from any date range specified in as query parameters in the url
class PELastMonth(APIView):
    def get(self, request):
        try:
            print('htting corrent endpoint')
            start = request.GET.get('start')
            end = request.GET.get('end')
            owner = request.GET.get('owner')
            pe = Personal_Expenses.objects.filter(owner=owner).filter(date__gte=str(start), date__lte=str(end)).order_by('-date')
            print(pe)
            serialized_pe = PESerializer(pe, many=True)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(serialized_pe.data, status=status.HTTP_200_OK)

# Return the total value of transactions from any date range specified in as query parameters in the url
class PEMonthlyTotal(APIView):
    def get(self, request):
        try:
            start = request.GET.get('start')
            end = request.GET.get('end')
            owner = request.GET.get('owner')
            pe = Personal_Expenses.objects.filter(owner=owner).filter(date__gte=str(start), date__lte=str(end)).values()
            amounts = []
            for transaction in pe:
                amounts.append(transaction['amount'])
            total = reduce((lambda x, y: x + y), amounts)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(total, status=status.HTTP_200_OK)

# Return the largest transaction from any date range
class PELargestExpense(APIView):
    def get(self, request):
        try:
            start = request.GET.get('start')
            end = request.GET.get('end')
            owner = request.GET.get('owner')
            pe = Personal_Expenses.objects.filter(owner=owner).filter(date__gte=str(start), date__lte=str(end)).order_by('-amount')
            serialized_pe = PESerializer(pe, many=True)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(serialized_pe.data, status=status.HTTP_200_OK)

class PESpendingByCategory(APIView):

    def get(self, request):
        try:
            start = request.GET.get('start')
            end = request.GET.get('end')
            owner = request.GET.get('owner')
            pe = Personal_Expenses.objects.filter(owner=owner).filter(date__gte=str(start), date__lte=str(end)).order_by('-date').values()

            transport = list(filter(lambda x: x.get('category') == 'transport', pe ))
            entertainment = list(filter(lambda x: x.get('category') == 'entertainment', pe ))
            dining = list(filter(lambda x: x.get('category') == 'dining', pe ))
            grocery = list(filter(lambda x: x.get('category') == 'grocery', pe ))
            travel = list(filter(lambda x: x.get('category') == 'travel', pe ))
            retail = list(filter(lambda x: x.get('category') == 'retail', pe ))
            bills = list(filter(lambda x: x.get('category') == 'bills', pe ))
            general = list(filter(lambda x: x.get('category') == 'general', pe ))

            categories = [transport, entertainment, dining, grocery, travel, retail, bills, general]
            total_amount= {}
        
            def get_amounts(category):
                if len(category) == 0:
                    pass
                else:
                    category_name = ''
                    category_total = []
                    for cost in category:
                        category_total.append(cost['amount'])
                        category_name = cost['category']
                    final = reduce(lambda x, y: x + y, category_total)
                    total_amount[category_name] = final
                  
            
            for choice in categories:
                get_amounts(choice)

        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(total_amount, status=status.HTTP_200_OK)