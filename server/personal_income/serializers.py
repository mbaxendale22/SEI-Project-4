from django.db import models
from rest_framework import serializers
from .models import Personal_Income

class PISerializer(serializers.ModelSerializer):
    class Meta:
        model = Personal_Income
        fields = '__all__'
