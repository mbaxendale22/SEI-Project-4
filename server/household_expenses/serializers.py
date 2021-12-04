from django.db import models
from rest_framework import serializers
from .models import Household_Expenses

class HESerializer(serializers.ModelSerializer):
    class Meta:
        model = Household_Expenses
        fields = '__all__'


