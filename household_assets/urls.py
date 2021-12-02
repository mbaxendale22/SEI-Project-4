from django.urls import path 
from .views import HAIndexView, HADetailView

urlpatterns = [
    path('<int:pk>/', HADetailView.as_view()),
    path('', HAIndexView.as_view()),
]