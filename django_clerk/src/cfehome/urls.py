from django.contrib import admin
from django.urls import path
from cfehome.api import (
    api_view_for_user_object,
    save_user_view,
    is_user_authenticated,
    create_post
)

urlpatterns = [
    path('admin', admin.site.urls),
    path('api/createpost/', create_post),    path('api/hello', api_view_for_user_object),  # ✅ JSON response with user ID
    path('api/save', save_user_view),  # ✅ Saves or updates user in DB
    path('api/user',is_user_authenticated)
]
