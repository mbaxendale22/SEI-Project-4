from django.db import models


# Create your models here.

class Personal_Income(models.Model):
    PI_CHOICES = (
        ('Paycheck', 'Paycheck'),
        ('Selling', 'Selling'),
        ('Passive', 'Passive'),
        ('Misc', 'Misc'),
    )
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=10, choices=PI_CHOICES) 
    amount = models.IntegerField()
    date = models.DateField(auto_now=False, auto_now_add=False)
    user = models.ForeignKey("auth_jwt.User", on_delete=models.CASCADE)

    def __str__(self):
        return self.name


