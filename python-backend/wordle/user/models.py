from django.db import models


class Users(models.Model):
    user_id = models.AutoField(
        primary_key=True
    )

    user_name = models.TextField(
        null=False,
        blank=False
    )

    daily_streak = models.IntegerField(
        null=False,
        blank=False
    )

    unlimited_streak = models.IntegerField(
        null=False,
        blank=False
    )

    timed_streak = models.IntegerField(
        null=False,
        blank=False
    )

    blitz_streak = models.IntegerField(
        null=False,
        blank=False
    )

    daily_streak_max = models.IntegerField(
        null=False,
        blank=False
    )

    unlimited_streak_max = models.IntegerField(
        null=False,
        blank=False
    )

    timed_streak_max = models.IntegerField(
        null=False,
        blank=False
    )

    blitz_streak_max = models.IntegerField(
        null=False,
        blank=False
    )

    user_bio = models.TextField(
        max_length=1000
    )

    class Meta:
        db_table = 'user'
