from django.urls import path
from . import views

urlpatterns = [
    path('stats/daily', views.dailyView.as_view())
]