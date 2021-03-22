from rest_framework.serializers import ModelSerializer, SerializerMethodField

from agent.models import Listing

# serializer to create new listing


class ListingSerializer(ModelSerializer):
    class Meta:
        model = Listing
        fields = ('name', 'main_photo', 'description', 'house_no', 'house_size',
                  'bedrooms', 'bathrooms', 'listing_type', 'location', 'main_photo', 'status', 'price', 'id')


class ListingViewSerializer(ModelSerializer):
    agent_details = SerializerMethodField('get_agent_details')

    class Meta:
        model = Listing
        fields = ('name', 'main_photo', 'description', 'house_no', 'house_size',
                  'bedrooms', 'bathrooms', 'listing_type', 'location', 'main_photo', 'status', 'price', 'id', 'agent_details')

    def get_agent_details(self, obj):
        agent = {
            'name': f'{obj.agent.first_name} {obj.agent.last_name}',
            'photo': obj.agent.photo.url,
        }
        return agent
