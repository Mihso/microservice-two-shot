from django.db import models
from django.urls import reverse 
# Create your models here.



class BinVO(models.Model):
    closet_name = models.CharField(max_length=100)
    bin_number = models.PositiveSmallIntegerField()
    bin_size = models.PositiveSmallIntegerField()
    href = models.URLField()



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
        return self.modelName
    
    def get_api_url(self):
        return reverse ("shoes_detail", kwargs={"pk": self.pk})   
