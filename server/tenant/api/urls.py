from django.urls import path

from tenant.api import views

urlpatterns = (
    path('book-viewing-appointment/<uuid:userId>/',
         views.tenant_book_viewing_appointment, name='tenant_book_viewing_appointment'),
)
