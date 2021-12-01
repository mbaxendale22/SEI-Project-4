from django.db import models

# Create your models here.
class Personal_Assets(models.Model):
    PA_CHOICES = (
        ('savings', 'savings'),
        ('stocks', 'stocks'),
        ('cypto', 'cypto'),
        ('other', 'other'),
    )
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=PA_CHOICES) 
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField(auto_now=False, auto_now_add=False)
    share = models.BooleanField(default=False, verbose_name='share with household')
    user = models.ForeignKey("auth_jwt.User", on_delete=models.CASCADE)

    def __str__(self):
        return self.name
