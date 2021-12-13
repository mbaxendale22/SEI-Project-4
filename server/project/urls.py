"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from .views import index

urlpatterns = [
    re_path(r'^.*$', index),
    path('api/admin/', (admin.site.urls)),
    path('api/users/', include('auth_jwt.urls')),
    path('api/household/', include('household.urls')),
    path('api/personal-income/', include('personal_income.urls')),
    path('api/personal-expenses/', include('personal_expenses.urls')),
    path('api/personal-assets/', include('personal_assets.urls')),
    path('api/household-expenses/', include('household_expenses.urls')),
    path('api/household-assets/', include('household_assets.urls')),
    path('api/shared-expenses/', include('shared_expenses.urls')),
]
