from django.urls import path
from .views import SEIndexView

urlpatterns = [
    path('', SEIndexView.as_view())
]