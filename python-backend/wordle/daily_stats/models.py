from django.db import models
from accounts.models import User


class Daily(models.Model):
    daily_id = models.AutoField(
        primary_key=True
    )

    word = models.TextField(
        max_length=11,
        null=False,
        blank=False
    )

    word_length = models.IntegerField(
        null=False,
        blank=False
    )

    attempts = models.IntegerField(
        null=False,
        blank=False
    )

    win = models.BooleanField(
        default=False
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
        db_table = 'daily_stats'
