# Generated by Django 3.2.9 on 2021-12-02 17:51

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('personal_expenses', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='personal_expenses',
            name='user',
        ),
        migrations.AddField(
            model_name='personal_expenses',
            name='creator',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='creator', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='personal_expenses',
            name='owner',
            field=models.ForeignKey(default=6, on_delete=django.db.models.deletion.CASCADE, related_name='owner', to='auth_jwt.user'),
            preserve_default=False,
        ),
    ]
