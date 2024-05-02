from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path('category/',CategoryV.as_view()),
    path('customer/',customer_userV),
    path('employee/',employee_userV),
    path('subcategory/',subcategoryV),
    path('product/',productV),
    path('cart/',cartV),
    path('order/',orderV),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),    
] 
