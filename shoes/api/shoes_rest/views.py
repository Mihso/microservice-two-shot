from django.shortcuts import render


from .models import Shoes, BinVO
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json

# Create your views here.
class BinVoEncoder(ModelEncoder):
    model = BinVO
    properties = [
        "href",
    ]

class ShoeDetailEncoder(ModelEncoder):
    model = Shoes
    properties = [
        "manufacturer",
        "modelName",
        "color",
        "picture_url",
        "id",
    ]
    encoders = {
        "bin": BinVoEncoder(),
    }


class ShoeListEncoder(ModelEncoder):
    model = Shoes
    properties = ["name", "picture_url", "id"]
    


@require_http_methods(["GET", "POST", "DELETE"])
def list_shoes(request):
    if request.method == "GET":
        shoes = Shoes.objects.all()
        return JsonResponse(
            {"shoes": shoes},
            encoder = ShoeListEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            bin_href = content["bin"]
            bin = BinVO.objects.get(href=bin_href)
            content["bin"] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Bin"},
                status=400
            )
        shoe = Shoes.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=ShoeListEncoder,
            safe=False,
        )

@require_http_methods(["DELETE", "GET"])
def shoes_delete(request, pk):
    if request.method == "GET":
        bin = Shoes.objects.get(id=pk)
        return JsonResponse(
            bin,
            encoder=ShoeDetailEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ =  Shoes.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0 })