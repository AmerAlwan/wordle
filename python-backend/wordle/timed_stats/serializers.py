from rest_framework import serializers

from .models import timed

from accounts.models import User

class TimedSerializer(serializers.ModelSerializer):
    user = serializers.RelatedField(read_only=True)
    def save(self, validated_data):
        print('inside timed Serializer')
        username = validated_data.get('user', None)

        word = validated_data.get('word', None)

        user = User.objects.get(username=username)
        if not word:
            raise serializers.ValidationError('No word provided')

        if not user:
            raise serializers.ValidationError('User not found')

        word_length = len(word)

        return timed.objects.create(
            user=user,
            word=validated_data.get('word'),
            attempts=validated_data.get('attempts'),
            success=validated_data.get('success'),
            time=validated_data.get('time'),
            difficulty=validated_data.get('difficulty'),
            word_length=word_length
        )


    class Meta:
        model = timed
        fields = (
            'user',
            'word',
            'word_length',
            'attempts',
            'time',
            'success',
            'difficulty'
        )
