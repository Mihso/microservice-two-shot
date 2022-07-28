from django.urls import path

from .views import hatsList, hats_delete

urlpatterns = [
    path('hats/', hatsList, name="hats_List"),
    path('hats/<int:pk>/', hats_delete, name="hats_delete"),
]