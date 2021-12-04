from django.urls import path
from .views import PAIndexView, PADetailView, PASharedView 

urlpatterns = [

    path('shared/', PASharedView.as_view()),
    path('<int:pk>/', PADetailView.as_view()),
    path('', PAIndexView.as_view()),
    ]

    