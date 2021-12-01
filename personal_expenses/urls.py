from django.urls import path
from .views import PEIndexView, PEDetailView 

urlpatterns = [
    path('<int:pk>/', PEDetailView.as_view()),
    path('', PEIndexView.as_view()),
    ]


    