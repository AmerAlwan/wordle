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
        fields = ('username', 'email', 'password', 'token')
