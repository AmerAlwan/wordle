from rest_framework.response import Response
import requests


def get_word(data):
    num_of_letters = data['num_of_letters']
    num_of_words = data['num_of_words']
    word = 'garbo'
    definition = 'idk what it means, just a hardcoded word till we find new api'
    for i in range(3):
       # response = requests.get('https://random-word-api.herokuapp.com/word?number=' + str(num_of_words))
       # data = eval(response.content.decode())
#
        if word:
            break
    if word:
        return {'word': word, 'definition': definition}
    return {}