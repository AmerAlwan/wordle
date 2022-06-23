from django.db import connection
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth import authenticate
from .models import User

class LoginSerializer(serializers.ModelSerializer):
    email = serializers.CharField(max_length=255)
    username = serializers.CharField(max_length=255, read_only=True)
    password = serializers.CharField(max_length=128, write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)

    def validate(self, data):
        print(data)
        email = data.get('email', None)
        password = data.get('password', None)

        if not email:
            raise serializers.ValidationError('No email address supplied')
        if not password:
            raise serializers.ValidationError('No password supplied')

        user = authenticate(username=email, password=password)

        if not user:
            raise serializers.ValidationError('No user with credentials found')

        return {
            'email': user.email,
            'username': user.username,
            'token': user.token
        }

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'token')

class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        max_length=128,
        min_length=8,
        write_only=True
    )

    token = serializers.CharField(max_length=255, read_only=True)

    def create(self, validated_data):       
        user = User.objects.create_user(**validated_data)
        return user

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'token',
                  'daily_streak', 'timed_streak', 'unlimited_streak',
                  'daily_best', 'timed_best', 'unlimited_best')

class UserUpdate(serializers.ModelSerializer):
    def validate(self, data):
        mode = data["mode"].lower()
        if mode == "daily":
            cursor = connection.cursor()
            cursor.execute("SELECT daily_streak, daily_best FROM users WHERE id=%s", [data["username"]])
            win = data["win"]
            result = cursor.fetchone()
            if win:
                self.daily_streak = 1 + result[0]
                daily_best = result[1]
                if user.daily_streak > daily_best:
                    user.daily_best = user.daily_streak
            else:
                user.daily_streak = 0
        elif mode == "timed":
            cursor.execute("SELECT timed_streak, timed_best FROM users WHERE id=%s", [uid])
            print(cursor.fetchall())
        elif mode == "unlimited":
            cursor.execute("SELECT unlimited_streak, unlimited_best FROM users WHERE id=%s", [uid])
            print(cursor.fetchall())

    class Meta:
        model = User
        fields = ('username',
                  'daily_streak', 'timed_streak', 'unlimited_streak',
                  'daily_best', 'timed_best', 'unlimited_best')
