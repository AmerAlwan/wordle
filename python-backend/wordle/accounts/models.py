from django.db import models

class User(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(
        max_length=32,
        null=False,
        blank=False
    )
    email = models.EmailField(
        max_length=256,
        null=False,
        blank=False
    )

    password = models.CharField(
        max_length=32,
        null=False,
        blank=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
        null=False,
        blank=False
    )

    updated_at = models.DateTimeField(
        auto_now=True,
        null=False,
        blank=False
    )

    class Meta:
        db_table='users'
