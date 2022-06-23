from django.urls import path
from . import views

urlpatterns = [
    path('stats/blitz', views.blitzView.as_view())
]