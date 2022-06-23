from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.UserView.as_view()),
    path('users/<int:id>', views.UserView.as_view()),
    path('users/register', views.RegistrationView.as_view()),
    path('users/login', views.LoginView.as_view()),
    path('users/modify', views.UserStats.as_view()),
    path('users/stats/<str:username>', views.UserStats.as_view()),
]