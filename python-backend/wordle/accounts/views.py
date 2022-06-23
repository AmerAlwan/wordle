from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer, LoginSerializer, UserUpdate
from . import models
from django.db import connection
from rest_framework.permissions import IsAuthenticated, AllowAny
import requests

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


class UserStats(APIView):
    def get(self, request, username=None):
        if not username:
            return Response({"Error": "Couldn't retrieve user"})
        cursor = connection.cursor()
        cursor.execute("SELECT id FROM users WHERE username=%s", [username])
        uid = cursor.fetchone()
        user = models.User.objects.get(pk=uid[0])
        cursor.execute("SELECT * FROM daily_stats WHERE user_id=%s", [uid])
        daily = cursor.fetchall()

        cursor.execute("SELECT * FROM timed_stats WHERE user_id=%s", [uid])
        timed = cursor.fetchall()

        cursor.execute("SELECT * FROM unlimited_stats WHERE user_id=%s", [uid])
        unlimited = cursor.fetchall()

        cursor.execute("SELECT * FROM blitz_stats WHERE user_id=%s", [uid])
        blitz = cursor.fetchall()
        resp = {
            "daily": {
                "daily_streak": user.daily_streak,
                "daily_best": user.daily_best,
                "games": [
                    {
                        'word': game[1],
                        'word_len': game[2],
                        'attempts': game[3],
                        'success': game[4],
                        'difficulty': game[5]
                    } for game in daily
                ]
            },
            "timed": {
                "timed_streak": user.timed_streak,
                "timed_best": user.timed_best,
                "games": [
                    {
                        'word': game[1],
                        'word_len': game[2],
                        'attempts': game[3],
                        'success': game[4],
                        "time": game[5],
                        'difficulty': game[6]
                    } for game in timed
                ]
            },
            "unlimited": {
                "unlimited_streak": user.unlimited_streak,
                "unlimited_best": user.unlimited_best,
                "games": [
                    {
                        'word': game[1],
                        'word_len': game[2],
                        'attempts': game[3],
                        'success': game[4],
                        'difficulty': game[5]
                    } for game in unlimited
                ]
            },
            "blitz": {
                "games": [
                    {
                        'words': game[1],
                        'words_len': game[2],
                        'time': game[3],
                        'difficulty': game[4]
                    } for game in blitz
                ]
            }
        }
        return Response(resp)

    def patch(self, request):
        data = request.data
        username = data["username"]
        if not username:
            return Response({"Error": "Couldn't retrieve user"})
        cursor = connection.cursor()
        cursor.execute("SELECT id FROM users WHERE username=%s", [username])
        uid = cursor.fetchone()
        user = models.User.objects.get(pk=uid[0])

        mode = data["mode"].lower()
        if mode == "daily":
            cursor.execute("SELECT daily_streak, daily_best FROM users WHERE id=%s", [uid])
            win = data["win"]
            result = cursor.fetchone()
            if win:
                user.daily_streak = 1 + result[0]
                daily_best = result[1]
                if user.daily_streak > daily_best:
                    user.daily_best = user.daily_streak
            else:
                user.daily_streak = 0

        elif mode == "timed":
            cursor.execute("SELECT timed_streak, timed_best FROM users WHERE id=%s", [uid])
            win = data["win"]
            result = cursor.fetchone()
            if win:
                user.timed_streak = 1 + result[0]
                timed_best = result[1]
                if user.timed_streak > timed_best:
                    user.timed_best = user.timed_streak
            else:
                user.timed_streak = 0

        elif mode == "unlimited":
            cursor.execute("SELECT unlimited_streak, unlimited_best FROM users WHERE id=%s", [uid])
            win = data["win"]
            result = cursor.fetchone()
            if win:
                user.unlimited_streak = 1 + result[0]
                unlimited_best = result[1]
                if user.unlimited_streak > unlimited_best:
                    user.unlimited_best = user.unlimited_streak
            else:
                user.daily_streak = 0

        user.save()

        serializer = UserSerializer(data=user)
        if serializer.is_valid():
            user.save()
            serializer.validate()
            serializer.save()
            return Response({"Success": "Updated user data"})
        else:
            return Response({"Error": "Couldn't update user"})

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