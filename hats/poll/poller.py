import django
import os
import sys
import time
import json
import requests

sys.path.append(os.path.abspath('../api'))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "hats_project.settings")
django.setup()



from hats_rest.models import LocationVO
# Import models from hats_rest, here.
# from hats_rest.models import Something

def get_locations():
    response = requests.get("http://wardrobe-api:8000/api/locations/")
    content = json.loads(response.content)
    for location in content['locations']:
        print(location)
        LocationVO.objects.update_or_create(
            href = location['href'],
            closet_name = location["closet_name"],
            section_number = location['section_number'],
            shelf_number = location['shelf_number'],
        )

def poll():
    while True:
        print('Hats poller polling for data')
        try:
            # Write your polling logic, here
            get_locations()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
