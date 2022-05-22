from django.urls import path
from . import views

urlpatterns = [
    path('stats/unlimited', views.unlimitedView.as_view())
]