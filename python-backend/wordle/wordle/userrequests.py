from rest_framework.response import Response
import requests


def get_word(data):
    num_of_letters = data['num_of_letters']
    num_of_words = data['num_of_words']
    word = ''
    definition = ''
    for i in range(3):
        response = requests.get('https://random-word-api.herokuapp.com/word?number=' + str(num_of_words))
        data = eval(response.content.decode())
        for w in data:
            if num_of_letters == 0 or len(w) == num_of_letters:
                spell_checker_response = requests.get('https://api.dictionaryapi.dev/api/v2/entries/en/' + w)
                spell_checker_data = eval(spell_checker_response.content.decode())
                if spell_checker_response.status_code == 200:
                    word = w
                    definition = spell_checker_data[0]['meanings'][0]['definitions'][0]['definition']
                    break
        if word:
            break
    if word:
        return {'word': word, 'definition': definition}
    return {}