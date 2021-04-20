from django.contrib.auth import get_user_model

from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from tenant.api.serializers import BookAppointmentSerializer
from tenant.models import BookAppointment
from core.views import verify_user, get_object_or_none, invalid_user, invalid_serializer
from agent.models import Listing


User = get_user_model()

# view to book appointment


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def tenant_book_viewing_appointment(request, userId):
    user = verify_user(request, userId)

    if not user:
        return invalid_user()
    data = request.data
    listing = get_object_or_none(Listing, id=data['listing'])

    if listing.agent == user:
        return Response({'detail': 'You cannot book your own listing'}, status=400)

    booking_exists = get_object_or_none(
        BookAppointment, tenant=user, listing=data['listing'])

    if booking_exists and not booking_exists.has_expired:
        return Response({'detail': 'You already have an active appointment for this listing'}, status=400)

    serializer = BookAppointmentSerializer(data=data)
    if serializer.is_valid():
        appointment = serializer.save()
        appointment.tenant = user
        appointment.save()
        return Response({'detail': 'Request submitted to agent, you will receive a response soon'}, status=200)
    else:
        return invalid_serializer()
