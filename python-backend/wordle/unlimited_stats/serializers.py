from rest_framework import serializers

from .models import unlimited

from accounts.serializers import UserSerializer
from accounts.models import User

class UnlimitedSerializer(serializers.ModelSerializer):
    user = serializers.RelatedField(read_only=True)


    def save(self, validated_data):
        print("inside Serilizer")
        print(validated_data)
        username = validated_data.get('user', None)

        word = validated_data.get('word', None)

        user = User.objects.get(username=username)
        if not word:
            raise serializers.ValidationError('No word provided')

        if not user:
            raise serializers.ValidationError('User not found')

        word_length = len(word)

        return unlimited.objects.create(
            user=user,
            word=word,
            attempts=validated_data.get('attempts'),
            success=validated_data.get('success'),
            difficulty=validated_data.get('difficulty'),
            word_length=word_length
        )

    class Meta:
        model = unlimited
        fields = (
            'user',
            'word',
            'attempts',
            'success',
            'difficulty'
        )