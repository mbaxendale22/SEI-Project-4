from django.db import models
from rest_framework import serializers
from .models import Household_Assets

class HASerializer(serializers.ModelSerializer):
    class Meta:
        model = Household_Assets
        fields = '__all__'


