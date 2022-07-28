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
        'href',
    ]


class HatsListEncoder(ModelEncoder):
    model = Hats
    properties= [
        "styleName",
        "pictureUrl",
        "id",
    ]

class HatsDetailEncoder(ModelEncoder):
    model = Hats
    properties = [
        "styleName",
        "color",
        "pictureUrl",
        'location',
        'id',
    ]
    encoders = {
        'location': LocationVoEncoder(),
    }


@require_http_methods(["GET", "POST", 'DELETE'])
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
            locationContent = content["location"]
            location = LocationVO.objects.get(href=locationContent)
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
@require_http_methods(["DELETE", 'GET'])
def hats_delete(request, pk):
    if request.method == "GET":
        location = Hats.objects.get(id=pk)
        return JsonResponse(
            location,
            encoder=HatsDetailEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Hats.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})