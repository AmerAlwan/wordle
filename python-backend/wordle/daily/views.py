from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import DailySerializer
from accounts.models import User

class dailyView(APIView):
    def post(self, request):
        data=request.data
        print(data)
        user = User.objects.get(username=data['username'])
        user_data = {
            'user': user,
            'word': data['word'],
            'attempts': data['attempts'],
            'success': data['success'],
            'difficulty': data['difficulty']
        }
        serializer = DailySerializer(data=user_data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=201)