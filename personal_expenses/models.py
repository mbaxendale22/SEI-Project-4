from django.db import models

# Create your models here.
class Personal_Expenses(models.Model):
    PE_CHOICES = (
        ('bills', 'bills'),
        ('grocery', 'grocery'),
        ('dining', 'dining'),
        ('travel', 'travel'),
        ('entertainment', 'entertainment'),
        ('transport', 'transport'),
        ('retail', 'retail'),
        ('general', 'general'),
    )
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=PE_CHOICES) 
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField(auto_now=False, auto_now_add=False)
    share = models.BooleanField(default=False, verbose_name='share with household')
    resolved = models.BooleanField(default=False, verbose_name='shared bill resolved')
    user = models.ForeignKey("auth_jwt.User", on_delete=models.CASCADE)

    def __str__(self):
        return self.name
