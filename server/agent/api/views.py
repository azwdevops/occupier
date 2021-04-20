from django.contrib.auth import get_user_model

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from core.views import verify_user, invalid_user, invalid_serializer, get_object_or_none, invalid_listing, invalid_serializer_error_message
from permission.get_permissions import CanCreateListing

from agent.api.serializers import ListingSerializer, ListingViewSerializer
from agent.models import Listing, ListingPhoto

User = get_user_model()


# view to create update and delete listing
class CreateUpdateDeleteListing(APIView):
    permission_classes = (IsAuthenticated, CanCreateListing)

    def post(self, request, **kwargs):
        userId = kwargs['userId']

        user = verify_user(request, userId)

        if not user:
            return invalid_user()

        serializer = ListingSerializer(data=request.data)
        if serializer.is_valid():
            listing = serializer.save()
            listing.agent = user
            listing.save()
            new_listing = ListingSerializer(listing).data
            return Response({'detail': 'Listing created successfully', 'new_listing': new_listing}, status=201)
        else:
            return invalid_serializer()


# view to get listings available

class GetListingsView(APIView):

    def get(self, request, **kwargs):
        listings = self.get_query_set()

        return Response({'detail': 'success', 'listings': listings}, status=200)

    def get_query_set(self):
        # we will later implement pagination to avoid very long list of listings
        listings = Listing.objects.filter(is_active=True)
        listings_data = ListingSerializer(listings, many=True).data

        return listings_data

# view to get a single listing


class GetSingleListingView(APIView):

    def get(self, request, **kwargs):
        listingId = kwargs['listingId']

        listing = get_object_or_none(Listing, id=listingId)

        if not listing:
            return invalid_listing()
        listing_data = ListingViewSerializer(listing).data

        listing_photos = ListingPhoto.objects.filter(listing=listing)
        listing_photos_data = []
        for item in listing_photos:
            listing_photos_data.append(item.listing_photo.url)
        listing_data = {**listing_data, 'listing_photos': listing_photos_data}

        return Response({'detail': 'success', 'listing': listing_data}, status=200)


# view to handle submission of listings from agent subdomains
@api_view(['POST'])
@permission_classes([])
def agent_subdomain_list_or_unlist_house(request, userId):
    user = get_object_or_none(User, id=userId)

    if not user:
        return Response({'detail': 'Invalid user account'}, status=400)

    if user.account_type != 'agent':
        return Response({'detail': 'Permission denied, not an agemt'}, status=400)

    data = request.data

    house_exists = get_object_or_none(
        Listing, agent=user, agent_house_id=data['agent_house_id'])

    if house_exists:
        return Response({'detail': 'You have already listed this house'}, status=400)

    if data['actionType'] == 'list':
        serializer = ListingSerializer(data=data)

        if serializer.is_valid():
            listing = serializer.save()
            listing.agent = user
            listing.from_agent_subdomain = True
            listing.agent_house_id = data['agent_house_id']
            listing.agent_phone = data['agent_phone']
            listing.save()

            return Response({'detail': 'House listed successfully', 'listingId': listing.id}, status=201)
        else:
            serializer_fields = ['name', 'main_photo', 'description', 'house_no', 'house_size',
                                 'bedrooms', 'bathrooms', 'listing_type', 'location', 'status', 'price']
            serializer_error_message = invalid_serializer_error_message(
                serializer, serializer_fields)
            return Response({'detail': serializer_error_message}, status=400)

    elif data['actionType'] == 'unlist':
        listing = get_object_or_none(Listing, id=data['listingId'])

        if not listing:
            return Response({'detail': 'Invalid house provided'}, status=400)
        listing.is_active = False
        listing.save()

        return Response({'detail': 'House removed from listing', 'listingId': listing.id}, status=200)
