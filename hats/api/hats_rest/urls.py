from django.urls import URLPattern, path

from .views import hatsList

urlspatterns = [
    path('hats/', hatsList, name="hats_list"),
]