from django.urls import path
from .views import UserIndexView, UserDetailView

urlpatterns = [

    path('<int:pk>/', UserDetailView.as_view()),
    path('', UserIndexView.as_view()),
    ]