# Generated by Django 3.2.9 on 2021-12-02 15:45

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('household_expenses', '0002_auto_20211202_1405'),
    ]

    operations = [
        migrations.AddField(
            model_name='household_expenses',
            name='user',
            field=models.ForeignKey(default=6, on_delete=django.db.models.deletion.CASCADE, to='auth_jwt.user'),
            preserve_default=False,
        ),
    ]
