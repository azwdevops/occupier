from django.urls import path

from agent.api import views

urlpatterns = (
    path('create-new-listing/<uuid:userId>/',
         views.CreateUpdateDeleteListing.as_view(), name='create_new_listing'),  # agent create a new listing
    path('get-listings/', views.GetListingsView.as_view(),
         name='get_listings'),  # users get listings
    path('get-single-listing/<uuid:listingId>/', views.GetSingleListingView.as_view(),
         name='get_single_listing'),  # get a single listing details

    path('agent-subdomain-list-or-unlist-house/<uuid:userId>/',
         views.agent_subdomain_list_or_unlist_house, name='agent_subdomain_list_or_unlist_house')  # agent subdomain list/unlist house
)
