from django.shortcuts import render

# Create your views here.
from django.http.response import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 
from .models import Household_Expenses
from .serializers import HESerializer
from functools import reduce



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

        # Return all transactions ordered from most recent
class HERecentView(APIView):
    def get(self, request, house):
        try:
            he = Household_Expenses.objects.filter(household=house).order_by('-date')
            serialized_he = HESerializer(he, many=True)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(serialized_he.data, status=status.HTTP_200_OK)

# Return all transactions from any date range specified in as query parameters in the url
class HELastMonth(APIView):
    def get(self, request):
        try:
            start = request.GET.get('start')
            end = request.GET.get('end')
            house = request.GET.get('house')
            he = Household_Expenses.objects.filter(household=house).filter(date__gte=str(start), date__lte=str(end))

            serialized_he = HESerializer(he, many=True)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(serialized_he.data, status=status.HTTP_200_OK)

# Return the total value of transactions from any date range specified in as query parameters in the url
class HEMonthlyTotal(APIView):
    def get(self, request):
        try:
            start = request.GET.get('start')
            end = request.GET.get('end')
            owner = request.GET.get('owner')
            he = Household_Expenses.objects.filter(creator=owner).filter(date__gte=str(start), date__lte=str(end)).values()
            amounts = []
            for transaction in he:
                amounts.append(transaction['amount'])
            total = reduce((lambda x, y: x + y), amounts)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(total, status=status.HTTP_200_OK)

# Return the largest transaction from any date range
class HELargestExpense(APIView):
    def get(self, request):
        try:
            start = request.GET.get('start')
            end = request.GET.get('end')
            owner = request.GET.get('owner')
            he = Household_Expenses.objects.filter(creator=owner).filter(date__gte=str(start), date__lte=str(end)).order_by('-amount')
            serialized_he =HESerializer(he, many=True)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(serialized_he.data, status=status.HTTP_200_OK)

# grabs all expenses within a specified date range, totals each category of spending and returns it in a single dict
class HESpendingByCategory(APIView):

    def get(self, request):
        try:
            start = request.GET.get('start')
            end = request.GET.get('end')
            owner = request.GET.get('owner')
            he = Household_Expenses.objects.filter(creator=owner).filter(date__gte=str(start), date__lte=str(end)).order_by('-date').values()

            transport = list(filter(lambda x: x.get('category') == 'transport', he ))
            entertainment = list(filter(lambda x: x.get('category') == 'entertainment', he ))
            dining = list(filter(lambda x: x.get('category') == 'dining', he ))
            grocery = list(filter(lambda x: x.get('category') == 'grocery', he ))
            travel = list(filter(lambda x: x.get('category') == 'travel', he ))
            retail = list(filter(lambda x: x.get('category') == 'retail', he ))
            bills = list(filter(lambda x: x.get('category') == 'bills', he ))
            general = list(filter(lambda x: x.get('category') == 'general', he ))

            categories = [transport, entertainment, dining, grocery, travel, retail, bills, general]
            final_totals = {}
        
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
                    final_totals[category_name] = final
                  
            
            for choice in categories:
                get_amounts(choice)

        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(final_totals, status=status.HTTP_200_OK)

