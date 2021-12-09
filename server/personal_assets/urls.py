from django.urls import path
from .views import PAIndexView, PADetailView, PASharedView, PASavingsPot, PACreatePot, PAPotBalance, PAIndividualPots

urlpatterns = [

    path('saving-pots/pots/<int:user>/', PAIndividualPots.as_view()),
    path('saving-pots/<int:user>/', PASavingsPot.as_view()),
    path('balance/<int:user>/', PAPotBalance.as_view()),
    path('saving-pots/', PACreatePot.as_view()),
    path('<int:pk>/', PADetailView.as_view()),
    path('shared/', PASharedView.as_view()),
    path('', PAIndexView.as_view()),
    ]

    