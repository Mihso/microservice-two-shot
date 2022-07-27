from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import LocationVO, Hats

class LocationVoEncoder(ModelEncoder):
    model = LocationVO
    properties = [
        "closet_name",
        "section_number",
        "shelf_number",
        'href',
    ]


class HatsListEncoder(ModelEncoder):
    model = Hats
    properties= [
        "styleName",
        "pictureUrl",
    ]

class HatsDetailEncoder(ModelEncoder):
    model = Hats
    properties = [
        "styleName",
        "color",
        "pictureUrl",
        'location',
    ]
    encoders = {
        'location': LocationVoEncoder(),
    }


@require_http_methods(["GET", "POST"])
def hatsList(request):
    if request.method == "GET":
        hats = Hats.objects.all()
        return JsonResponse(
            {"hats": hats},
            encoder=HatsListEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            location_href = content["location"]['href']
            print(location_href)
            location = LocationVO.objects.get(href=location_href)
            content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location"},
                status=400,
            )

        hat = Hats.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatsDetailEncoder,
            safe=False,
        )