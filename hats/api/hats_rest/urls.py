from django.urls import URLPattern, path

from .views import hatsList

urlpatterns = [
    path('hats/', hatsList, name="hats_list"),
]