
from django.contrib import admin
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),

    # include api urls
    path('api/user/', include('user.api.urls')),
    path('api/agent/', include('agent.api.urls')),
]

# serving static files
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# serving media files
if not settings.PRODUCTION:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
