from django.urls import path
from . import views

urlpatterns = [
    path('api/users', views.UserView.as_view()),
    path('api/users/<int:id>', views.UserView.as_view()),
]
