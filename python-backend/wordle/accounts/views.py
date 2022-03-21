from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer
from django.contrib.auth.models import User
from django.db import connection


class UserView(APIView):
    def get(self, request, id=None):
        cursor = connection.cursor()
        if id:
            try:
                cursor.execute('SELECT * FROM users WHERE id=%s', [id])
                queryset = cursor.fetchone()
            except User.DoesNotExist:
                return Response({'error': 'This user does not exist'}, status=400)
        else:
            cursor.execute('SELECT * FROM users')
            queryset=cursor.fetchall()

        return Response(queryset)

    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response(serializer.data, status=201)
            return Response(serializer.errors, status=400)
