import django
import os
import sys
import time
import json
import requests

sys.path.append(os.path.abspath('.../api'))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "shoes_project.settings")
django.setup()

# Import models from hats_rest, here.
# from shoes_rest.models import Something
from api.shoes_rest.models import BinVO

def get_bin():
    response = requests.get("http://wardrobe-api:8000/api/bins/")
    content = json.loads(response.content)
    for bin in content['bin']:
        print(bin)
        BinVO.objects.update_or_create(
            href = bin['href'],
            closet_name = ["closet_name"],
            bin_number = ["bin_number"],
            bin_size = ["bin_size"],
        )

def poll():
    while True:
        print('Shoes poller polling for data')
        try:
            # Write your polling logic, here
            get_bin
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
