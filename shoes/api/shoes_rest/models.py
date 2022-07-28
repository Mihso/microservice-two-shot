from django.db import models
from django.urls import reverse 
# Create your models here.



class BinVO(models.Model):
    copy_closet_name = models.CharField(max_length=100)
    copy_bin_number = models.PositiveSmallIntegerField()
    copy_bin_size = models.PositiveSmallIntegerField()
    copy_href = models.URLField()



class Shoes(models.Model):
    manufacturer = models.CharField(max_length= 50, unique=True)
    modelName = models.CharField(max_length=50)
    color = models.TextField(max_length=20)
    picture_url = models.URLField(null=True)
    bin = models.ForeignKey(
        BinVO,
        related_name="bin",
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.styleName
    
