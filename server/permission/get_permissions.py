from rest_framework.permissions import BasePermission
from django.contrib.auth.models import Permission

all_permissions = Permission.objects.filter(
    content_type__app_label='agent', content_type__model='listing')


class CanCreateListing(BasePermission):
    message = 'not allowed to create a listing'

    # print(all_permissions)

    def has_permission(self, request, view):
        print(request.user.has_perm('agent.can_add_listing', obj=None))
        return request.user.has_perm('agent.can_add_listing', obj=None)
