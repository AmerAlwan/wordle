from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UnlimitedSerializer
from accounts.models import User
from django.db import connection

class unlimitedView(APIView):
    def post(self, request):
        print("inside views")
        data = request.data

        user = data['username']

        print(data)
        print()
        print()
        user_data = {
            'user': user,
            'word': data['word'],
            'attempts': data['attempts'],
            'success': data['success'],
            'difficulty': data['difficulty']
        }

        serializer = UnlimitedSerializer(data=user_data)
        serializer.is_valid(raise_exception=True)

        serializer.save(user_data)
        return Response(user_data, status=201)