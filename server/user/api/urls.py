from django.urls import path
from rest_framework_simplejwt.views import (TokenObtainPairView,
                                            TokenRefreshView)

from user.api import views

urlpatterns = [
    path('signup/', views.register_user,
         name='register_user'),  # register new user
    path('login/', TokenObtainPairView.as_view(),
         name='token_obtain_pair'),  # user login
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('get-user-data/', views.get_user_data,
         name='get_user_data'),  # get user data
]
