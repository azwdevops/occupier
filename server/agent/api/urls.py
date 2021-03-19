from django.urls import path

from agent.api import views

urlpatterns = (
    path('create-new-listing/<uuid:userId>/',
         views.CreateUpdateDeleteListing.as_view(), name='create_new_listing'),  # agent create a new listing
    path('get-listings/', views.GetListingsView.as_view(),
         name='get_listings'),  # users get listings
    path('get-single-listing/<uuid:listingId>/', views.GetSingleListingView.as_view(),
         name='get_single_listing'),  # get a single listing details
)
