from django.urls import path
from .views import HEDetailView, HEIndexView

urlpatterns = [
    path('<int:pk>/', HEDetailView.as_view()),
    path('', HEIndexView.as_view()),
]