from uuid import uuid4
from os import sys

from django.db.models import Model, CharField, UUIDField, ImageField, ForeignKey, TextField, CASCADE, BooleanField, \
    DateTimeField, PositiveIntegerField, PROTECT, PositiveSmallIntegerField
from django.contrib.postgres.fields import CICharField
from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import InMemoryUploadedFile

from PIL import Image
from io import BytesIO

from user.choices import locations
from agent.choices import listing_type, listing_status

User = get_user_model()

# Create your models here.


class Listing(Model):
    id = UUIDField(primary_key=True, default=uuid4, editable=False)
    name = CharField(max_length=255)
    house_no = CharField(max_length=100)
    agent = ForeignKey(User, on_delete=PROTECT, null=True)
    house_size = PositiveSmallIntegerField()
    description = TextField()
    bedrooms = CharField(max_length=50)
    bathrooms = CharField(max_length=50)
    price = PositiveIntegerField()
    listing_type = CharField(max_length=80, choices=listing_type)
    location = CharField(max_length=255, choices=locations)
    geo_location = CharField(max_length=255, null=True)
    main_photo = ImageField(upload_to='listing_photos/%Y/%m/%d')
    is_active = BooleanField(default=True)
    status = CharField(choices=listing_status, max_length=100)
    listing_date = DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.main_photo:
            image = Image.open(self.main_photo)
            output = BytesIO()

            # resize image
            image = image.resize((1280, 583))
            # after modifications save the output
            image.save(output, format='JPEG', quality=90)
            output.seek(0)
            # change the image field value to be the newly modified image value
            self.main_photo = InMemoryUploadedFile(
                output, 'ImageField', "%s.jpg" % self.main_photo.name.split('.')[0], 'image/jpeg', sys.getsizeof(output), None)
        super(Listing, self).save(*args, **kwargs)

# model to hold listing extra pictures


class ListingPhoto(Model):
    listing = ForeignKey(Listing, null=True, on_delete=CASCADE)
    listing_photo = ImageField(upload_to='listing_photos/%Y/%m/%d')

    def __str__(self):
        return self.listing.name
