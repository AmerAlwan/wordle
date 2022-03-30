from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Word
from .serializers import WordSerializer
from wordle import userrequests
import requests

class UnlimitedWordView(APIView):

    def post(self, request):
        data = request.data
        response = userrequests.get_word(data)
        if response:
            return Response(response, status=200)
        else:
            return Response("No word found", status=404)


class DailyWordView(APIView):

    def get(self, request):
        try:
            queryset = Word.objects.latest('word_date')
        except Word.DoesNotExist:
            return Response({'errors': 'No Latest Entry Found'}, status=400)

        serializer=WordSerializer(queryset)

        return Response(serializer.data, status=200)
