from django.urls import path

from agent.api import views

urlpatterns = (
    path('create-new-listing/<uuid:userId>/',
         views.CreateUpdateDeleteListing.as_view(), name='create_new_listing'),  # agent create a new listing
)
