# Generated by Django 4.0.3 on 2022-04-08 15:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('unlimited_stats', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='unlimited',
            name='attempts',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='unlimited',
            name='word_length',
            field=models.IntegerField(),
        ),
        migrations.AlterModelTable(
            name='unlimited',
            table='unlimited_stats',
        ),
    ]