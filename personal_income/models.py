from django.db import models


# Create your models here.

class Personal_Income(models.Model):
    PI_CHOICES = (
        ('PC', 'Paycheck'),
        ('SL', 'Selling'),
        ('OT', 'Other'),
    )
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=2, choices=PI_CHOICES) 
    amount = models.IntegerField()
    date = models.DateField(auto_now=False, auto_now_add=False)
    user = models.ForeignKey("auth_jwt.User", on_delete=models.CASCADE)

    def __str__(self):
        return self.name

# Create your models here.
