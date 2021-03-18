from django.contrib.admin import ModelAdmin, register

from agent.models import Listing


@register(Listing)
class ListingAdmin(ModelAdmin):
    list_display = ('name',)
