from django.shortcuts import render
from models import Shoes
from shoes.api.shoes_rest.models import BinVO
from wardrobe.api.common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json

# Create your views here.
class BinVoEncoder(ModelEncoder):
    model = BinVO
    properties = [
        "closet_name",
        "bin_number",
        "bin_size",
        "href",
    ]

class ShoeDetailEncoder(ModelEncoder):
    model = Shoes
    properties = [
        "manufacturer",
        "modelName",
        "color",
        "picture_url",
    ]
    encoders = {
        'bin': BinVoEncoder(),
    }


class ShoeListEncoder(ModelEncoder):
    model = Shoes
    properties = ["name", "picture_url"]
    


@require_http_methods(["GET", "POST"])
def list_shoes(request):
    if request.method == "GET":
        shoes = Shoes.objects.all()
        return JsonResponse(
            {"shoes": shoes},
            encoder = ShoeListEncoder,
        )
    else:
        content = json.load(request.body)
        try:
            bin_href = content["bin"]["href"]
            print(bin_href)
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


     