# Generated by Django 3.2.9 on 2021-12-02 14:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('household', '0001_initial'),
        ('household_assets', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='household_assets',
            name='user',
        ),
        migrations.AddField(
            model_name='household_assets',
            name='household',
            field=models.ForeignKey(default=3, on_delete=django.db.models.deletion.CASCADE, to='household.household'),
            preserve_default=False,
        ),
    ]
