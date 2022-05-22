from rest_framework import serializers

from .models import blitz

from accounts.serializers import UserSerializer
from accounts.models import User

class BlitzSerializer(serializers.ModelSerializer):
    user = serializers.RelatedField(read_only=True)
    def save(self, validated_data):
        print("inside Serilizer")
        print(validated_data)
        username = validated_data.get('user', None)

        user = User.objects.get(username=username)

        if not user:
            raise serializers.ValidationError('User not found')


        return blitz.objects.create(
            user=user,
            words=validated_data.get('words'),
            word_count=validated_data.get('word_count'),
            time=validated_data.get('time'),
            difficulty=validated_data.get('difficulty'),
        )

    class Meta:
        model = blitz
        fields = (
            'user',
            'words',
            'word_count',
            'time',
            'difficulty'
        )