from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):

    email = models.EmailField(max_length=250, unique=True)
    household = models.ForeignKey("household.Household", on_delete=models.CASCADE, null=True)

    def __str__(self):
        return "User " + self.email