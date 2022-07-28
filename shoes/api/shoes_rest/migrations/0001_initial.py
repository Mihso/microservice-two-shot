# Generated by Django 4.0.3 on 2022-07-27 23:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BinVO',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('copy_closet_name', models.CharField(max_length=100)),
                ('copy_bin_number', models.PositiveSmallIntegerField()),
                ('copy_bin_size', models.PositiveSmallIntegerField()),
                ('copy_href', models.URLField()),
            ],
        ),
        migrations.CreateModel(
            name='Shoes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('manufacturer', models.CharField(max_length=50, unique=True)),
                ('modelName', models.CharField(max_length=50)),
                ('color', models.TextField(max_length=20)),
                ('picture_url', models.URLField(null=True)),
                ('bin', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bin', to='shoes_rest.binvo')),
            ],
        ),
    ]