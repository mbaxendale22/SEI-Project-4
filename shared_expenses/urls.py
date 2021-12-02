from django.urls import path
from .views import SEIndexView, SEDetailView

urlpatterns = [
    path('<int:pk>/', SEDetailView.as_view()),
    path('', SEIndexView.as_view()),
]