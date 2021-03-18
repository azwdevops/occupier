from rest_framework.serializers import ModelSerializer, SerializerMethodField

from agent.models import Listing

# serializer to create new listing


class ListingSerializer(ModelSerializer):
    class Meta:
        model = Listing
        fields = ('name', 'main_photo', 'description', 'house_no', 'house_size',
                  'bedrooms', 'bathrooms', 'listing_type', 'location', 'main_photo', 'status', 'price', 'id')
