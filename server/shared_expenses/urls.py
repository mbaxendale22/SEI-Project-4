from django.urls import path
from .views import SEIndexView, SEDetailView, SEResolveView

urlpatterns = [
    path('resolve/<int:pk>/', SEResolveView.as_view()),
    path('<int:pk>/', SEDetailView.as_view()),
    path('', SEIndexView.as_view()),
]