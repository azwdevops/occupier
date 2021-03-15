
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),

    # include api urls
    path('api/user/', include('user.api.urls')),
]