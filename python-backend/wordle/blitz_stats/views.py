from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import BlitzSerializer
from accounts.models import User
from django.db import connection

class blitzView(APIView):
    def post(self, request):

        data = request.data

        user = data['username']

        user_data = {
            'user': user,
            'words': data['words'],
            'word_count': data['word_count'],
            'time': data['time'],
            'difficulty': data['difficulty']
        }


        serializer = BlitzSerializer(data=user_data)
        serializer.is_valid(raise_exception=False)
        serializer.save(user_data)
        return Response(user_data, status=201)