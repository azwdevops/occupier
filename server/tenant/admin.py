from django.contrib.admin import ModelAdmin, register

from tenant.models import BookAppointment


@register(BookAppointment)
class BookAppointmentAdmin(ModelAdmin):
    list_display = ('tenant', 'listing',
                    'tenant_proposed_date', 'agent_proposed_date', 'has_expired')
    list_editable = ('has_expired',)
