from django.urls import path
from .views import PEIndexView, PEDetailView,PEShareView 

urlpatterns = [
    path('<int:pk>/', PEDetailView.as_view()),
    path('share/', PEShareView.as_view()),
    path('', PEIndexView.as_view()),
    ]


    