from django.contrib import admin
from .models import * 

# Register your models here.

admin.site.register(Category)
admin.site.register(SubCategory)
admin.site.register(Product)
admin.site.register(Customer)
admin.site.register(Employee)
admin.site.register(Cart)
admin.site.register(Order)



