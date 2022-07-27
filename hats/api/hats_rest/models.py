from django.db import models
from django.urls import reverse

# Create your models here.

class LocationVO(models.Model):
    copy_closet_name = models.CharField(max_length=100)
    copy_section_number = models.PositiveSmallIntegerField()
    copy_shelf_number = models.PositiveSmallIntegerField()
    copy_href = models.URLField()


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