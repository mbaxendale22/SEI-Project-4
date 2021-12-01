from django.urls import path
from .views import HouseholdIndexView, HouseholdDetailView 

urlpatterns = [
    path('<int:pk>/', HouseholdDetailView.as_view()),
    path('', HouseholdIndexView.as_view()),
]