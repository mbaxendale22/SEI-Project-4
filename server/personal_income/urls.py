from django.urls import path
from .views import PIIndexView, PIDetailView, PIRecentView, PILastMonth, PIMonthlyTotal, PILargestIncome, PIUserView, PISpendingByCategory

urlpatterns = [
    path('transactions/<int:user>/', PIUserView.as_view()),
    path('recent/<int:own>/', PIRecentView.as_view()),
    path('category/<int:user>/', PISpendingByCategory.as_view()),
    path('monthly/', PIMonthlyTotal.as_view()),
    path('dates/', PILastMonth.as_view()),
    path('largest/', PILargestIncome.as_view()),
    path('<int:pk>/', PIDetailView.as_view()),
    path('', PIIndexView.as_view()),
]