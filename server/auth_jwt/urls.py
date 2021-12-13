from django.urls import path
from .views import UserIndexView, UserDetailView, RegisterView, LoginView, updateHousehold

urlpatterns = [

    path('<int:pk>/', UserDetailView.as_view()),
    path('register/', RegisterView.as_view()),
    path('update/<int:pk>/', updateHousehold.as_view()),
    path('login/', LoginView.as_view()),
    path('', UserIndexView.as_view()),
    ]