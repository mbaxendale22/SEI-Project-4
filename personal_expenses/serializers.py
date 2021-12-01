from django.db import models
from rest_framework import serializers
from .models import Personal_Expenses

class PESerializer(serializers.ModelSerializer):
    class Meta:
        model = Personal_Expenses
        fields = '__all__'


