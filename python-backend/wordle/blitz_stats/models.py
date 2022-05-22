from django.db import models
from accounts.models import User


class blitz(models.Model):


    id = models.AutoField(
        primary_key=True
    )

    words = models.TextField(
        null=False,
        blank=False
    )

    word_count = models.IntegerField(
        null=False,
        blank=False
    )

    time = models.IntegerField(
        null=False,
        blank=False
    )

    difficulty = models.TextField(
        max_length=100,
        null=False,
        blank=False
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    class Meta:
        db_table = 'blitz_stats'