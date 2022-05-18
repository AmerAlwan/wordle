from rest_framework import serializers

from .models import daily

from accounts.models import User

class DailySerializer(serializers.ModelSerializer):
    username = serializers.RelatedField(source='user', read_only=True)

    def create(selfself, validated_data):
        username = validated_data.get('username', None)
        word = validated_data.get('word', None)

        if not word:
            raise serializers.ValidationError('No word provided')

        if not username:
            raise serializers.ValidationError('User not found')

        user_id = user.id

        word_length = len(word)

        return daily.objects.create(
            user=user,
            word=word,
            attempts=validated_data.get('attempts')+1,
            success=validated_data.get('success'),
            difficulty=validated_data.get('difficulty'),
            word_length=word_length
        )


    class Meta:
        model = daily
        fields = (
            'username',
            'word',
            'attempts',
            'success',
            'difficulty'
        )
