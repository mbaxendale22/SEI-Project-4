from django.db import models
from rest_framework import serializers
from .models import Personal_Assets

class PASerializer(serializers.ModelSerializer):
    class Meta:
        model = Personal_Assets
        fields = '__all__'
