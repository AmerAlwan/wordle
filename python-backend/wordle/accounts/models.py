import os
import jwt
from dotenv import load_dotenv
from datetime import datetime, timedelta
from django.db import models
from django.conf import settings
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin
)


class UserManger(BaseUserManager):
    def create_user(self, username, email, password=None):
        if not username:
            raise TypeError('User must have a username')
        if not email:
            raise TypeError('User must have an email')

        user = self.model(username=username, email=self.normalize_email(email))
        user.set_password(password)
        user.save()

        return user
    def create_superuser(self, username, email, password):
        if not password:
            raise TypeError('Superusers must have a password')

        user = self.create_user(username, email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(
        max_length=32,
        null=False,
        blank=False,
        unique=True
    )
    email = models.EmailField(
        max_length=256,
        null=False,
        blank=False,
        unique=True
    )
    role = models.CharField(default='user', max_length=8)

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

    daily_streak = models.IntegerField(default=0)

    timed_streak = models.IntegerField(default=0)

    unlimited_streak = models.IntegerField(default=0)

    daily_best = models.IntegerField(default=0)

    timed_best = models.IntegerField(default=0)

    unlimited_best = models.IntegerField(default=0)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManger()

    @property
    def token(self):
        return self._generate_jwt_token()


    def _generate_jwt_token(self):
        dt = datetime.now() + timedelta(days=30)
        token = jwt.encode({
            'id': self.pk,
            'exp': int(dt.strftime('%S'))
        }, settings.SECRET_KEY, algorithm='HS256')
        return token

    class Meta:
        db_table='users'