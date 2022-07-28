from django.db import models
from django.urls import reverse

# Create your models here.

class LocationVO(models.Model):
    closet_name = models.CharField(max_length=100)
    section_number = models.PositiveSmallIntegerField()
    shelf_number = models.PositiveSmallIntegerField()
    href = models.URLField()


class Hats(models.Model):
    styleName = models.CharField(max_length=100)
    color = models.TextField()
    pictureUrl= models.URLField()
    location = models.ForeignKey(
        LocationVO,
        related_name="locations",
        on_delete=models.CASCADE,
    )
    def __str__(self):
        return self.styleName
    
    def get_api_url(self):
        return reverse("hats_detail", kwargs={"pk": self.pk})