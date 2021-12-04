from django.urls import path
from .views import HEDetailView, HEIndexView, HERecentView, HELastMonth, HEMonthlyTotal, HELargestExpense

urlpatterns = [
    path('recent/<int:house>/', HERecentView.as_view()),
    path('dates/', HELastMonth.as_view()),
    path('monthly/', HEMonthlyTotal.as_view()),
    path('largest/', HELargestExpense.as_view()),
    path('<int:pk>/', HEDetailView.as_view()),
    path('', HEIndexView.as_view()),
]