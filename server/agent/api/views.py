from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from core.views import verify_user, invalid_user, invalid_serializer, get_object_or_none, invalid_listing
from permission.get_permissions import CanCreateListing

from agent.api.serializers import ListingSerializer, ListingViewSerializer
from agent.models import Listing, ListingPhoto


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
