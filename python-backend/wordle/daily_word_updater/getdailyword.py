from rest_framework.response import Response
from wordle import userrequests
from words.serializers import WordSerializer


def update_daily_word():
    request = {'num_of_letters': 0, 'num_of_words': 3}
    response = userrequests.get_word(request)
    serializer = WordSerializer(data=response)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data, status=201)



