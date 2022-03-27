from django.urls import path
from . import views

urlpatterns = [
    path('word/unlimited/get', views.UnlimitedWordView.as_view()),
]
