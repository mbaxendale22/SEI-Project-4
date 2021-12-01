from django.urls import path
from .views import PAIndexView, PADetailView 

urlpatterns = [
    path('<int:pk>/', PADetailView.as_view()),
    path('', PAIndexView.as_view()),
    ]

    