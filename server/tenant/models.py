from uuid import uuid4

from django.db.models import PROTECT, Model, UUIDField, ForeignKey, DateField, DateTimeField, BooleanField
from django.contrib.auth import get_user_model

from agent.models import Listing

User = get_user_model()


class BookAppointment(Model):
    id = UUIDField(primary_key=True, default=uuid4, editable=False)
    tenant = ForeignKey(User, on_delete=PROTECT, null=True)
    listing = ForeignKey(Listing, on_delete=PROTECT, null=True)
    tenant_proposed_date = DateField()
    agent_proposed_date = DateField(null=True)
    created_on = DateTimeField(auto_now_add=True)
    has_expired = BooleanField(default=False)

    def __str__(self):
        return self.tenant.first_name
