from django.urls import path
from .views import PEIndexView, PEDetailView, PERecentView, PELastMonth, PELargestExpense, PEMonthlyTotal, PESpendingByCategory

urlpatterns = [
    path('recent/<int:own>/', PERecentView.as_view()),
    path('largest/', PELargestExpense.as_view()),
    path('category/', PESpendingByCategory.as_view()),
    path('monthly/', PEMonthlyTotal.as_view()),
    path('dates/', PELastMonth.as_view()),
    path('<int:pk>/', PEDetailView.as_view()),
    path('', PEIndexView.as_view()),
    ]


    