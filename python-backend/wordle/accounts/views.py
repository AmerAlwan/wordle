from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer
from django.contrib.auth.models import User
from django.db import connection
from rest_framework.permissions import IsAuthenticated


class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id=None):
        cursor = connection.cursor()
        if id:
            try:
                cursor.execute('SELECT username FROM users WHERE id=%s', [id])
                data = cursor.fetchone()
                if not data:
                    return Response({'error': 'This user does not exist'}, status=404)
                response = {'username': data[0]}
            except error:
                print(error)
                return Response({'error': 'Something went wrong'}, status=401)
        else:
            cursor.execute('SELECT username FROM users')
            data = cursor.fetchall()
            response = [{'username': username[0]} for username in data]

        return Response(response)

    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response(serializer.data, status=201)
            return Response(serializer.errors, status=400)
