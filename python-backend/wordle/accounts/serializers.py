from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import User


class UserSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        user = User.objects.create(username = validated_data['username'], email=validated_data['email'],
                                        password=validated_data['password'])
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
