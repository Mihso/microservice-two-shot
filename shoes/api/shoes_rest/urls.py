from django.urls import path 
from .views import list_shoes, shoes_delete

urlpatterns = [
    path('shoes/', list_shoes, name="list_shoes"),
    path('shoes/<ink:pk>/', shoes_delete, name="shoes_detail") 
]