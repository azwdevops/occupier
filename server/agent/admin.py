from django.contrib.admin import ModelAdmin, register

from agent.models import Listing, ListingPhoto


@register(Listing)
class ListingAdmin(ModelAdmin):
    list_display = ('name',)


@register(ListingPhoto)
class ListingPhotoAdmin(ModelAdmin):
    list_display = ('listing',)
