from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
import requests

class UnlimitedWordView(APIView):

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
