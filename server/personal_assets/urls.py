from django.urls import path
from .views import PAIndexView, PADetailView, PASharedView, PASavingsPot, PACreatePot, PAPotBalance, PAIndividualPots, PADeposit, PAWithdraw

urlpatterns = [

    path('saving-pots/pots/<int:user>/', PAIndividualPots.as_view()),
    path('saving-pots/<int:pk>/', PASavingsPot.as_view()),
    path('balance/<int:user>/', PAPotBalance.as_view()),
    path('deposit/<int:pk>/', PADeposit.as_view()),
    path('withdraw/<int:pk>/', PAWithdraw.as_view()),
    path('saving-pots/', PACreatePot.as_view()),
    path('<int:pk>/', PADetailView.as_view()),
    path('shared/', PASharedView.as_view()),
    path('', PAIndexView.as_view()),
    ]

    