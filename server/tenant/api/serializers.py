from rest_framework.serializers import ModelSerializer

from tenant.models import BookAppointment


class BookAppointmentSerializer(ModelSerializer):
    class Meta:
        model = BookAppointment
        fields = ('listing', 'tenant_proposed_date')
