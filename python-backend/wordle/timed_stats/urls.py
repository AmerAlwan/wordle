from django.urls import path
from . import views

urlpatterns = [
    path('stats/timed', views.timedView.as_view())
]