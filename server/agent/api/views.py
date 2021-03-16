from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from core.views import verify_user, invalid_user
from permission.get_permissions import CanCreateListing


class CreateUpdateDeleteListing(APIView):
    permission_classes = (IsAuthenticated, CanCreateListing)

    def post(self, request, **kwargs):
        userId = kwargs['userId']

        user = verify_user(request, userId)

        if not user:
            return invalid_user()
