from django.urls import path
from .views import PIIndexView, PIDetailView, PIRecentView, PILastMonth, PIMonthlyTotal, PILargestExpense

urlpatterns = [
    path('recent/<int:own>/', PIRecentView.as_view()),
    path('largest/', PILargestExpense.as_view()),
    path('monthly/', PIMonthlyTotal.as_view()),
    path('dates/', PILastMonth.as_view()),
    path('<int:pk>/', PIDetailView.as_view()),
    path('', PIIndexView.as_view()),
]