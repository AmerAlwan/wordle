import os
import jwt
from dotenv import load_dotenv
from datetime import datetime, timedelta
from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin
)

# os.chdir()
load_dotenv(os.path.dirname('../../'))

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

    @property
    def token(self):
        return self._generate_jwt_token()


    def _generate_jwt_token(self):
        dt = datetime.now() + timedelta(days=30)
        token = jwt.encode({
            'id': self.id,
            'exp': int(dt.strftime('%s'))
        }, os.environ.get('JWT_SECREt_KEY'), algorithm='HS256')
        return token.decode('utf-8')

    class Meta:
        db_table='users'
