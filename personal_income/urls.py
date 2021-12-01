from django.urls import path
from .views import PIIndexView, PIDetailView 

urlpatterns = [
    path('<int:pk>/', PIDetailView.as_view()),
    path('', PIIndexView.as_view()),
]