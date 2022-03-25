from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer, LoginSerializer
from django.contrib.auth.models import User
from django.db import connection
from rest_framework.permissions import IsAuthenticated, AllowAny
import requests


class WordView(APIView):

    def post(self, request):
        data = request.data
        num_of_letters = data['num_of_letters']
        word = ''
        definition = ''
        for i in range(3):
            response = requests.get('https://random-word-api.herokuapp.com/word?number=1000')
            data = eval(response.content.decode())
            for w in data:
                if len(w) == num_of_letters:
                    spell_checker_response = requests.get('https://api.dictionaryapi.dev/api/v2/entries/en/' + w)
                    spell_checker_data = eval(spell_checker_response.content.decode())
                    if spell_checker_response.status_code == 200:
                        word = w
                        definition = spell_checker_data[0]['meanings'][0]['definitions'][0]['definition']
                    break
            if word:
                break

        if word:
            return Response({'word': word, 'definition': definition}, status=200)
        else:
            return Response("No word found", status=404)



class LoginView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        print(request.data)
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=200)


class RegistrationView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=201)


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
