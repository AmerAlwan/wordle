from rest_framework import serializers

from .models import Word


class WordSerializer(serializers.ModelSerializer):
    word = serializers.CharField(max_length=16, required=True)

    def create(self, validated_data):
        return Word.objects.create(
            word=validated_data.get('word'),
            description=validated_data.get('description'),
            num_of_letters=len(validated_data.get('word'))
        )

    class Meta:
        model = Word
        fields = (
            'word',
            'description',
        )