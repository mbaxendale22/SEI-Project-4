from django.db import models

# Create your models here.
class Household_Assets(models.Model):
    HA_CHOICES = (
        ('savings', 'savings'),
        ('stocks', 'stocks'),
        ('crypto', 'crypto'),
        ('other', 'other'),
    )
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=HA_CHOICES) 
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField(auto_now=False, auto_now_add=False)
    user = models.ForeignKey("auth_jwt.User", on_delete=models.CASCADE)

    def __str__(self):
        return self.name

