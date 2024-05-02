from django.db import models
from django.db import IntegrityError, models, transaction
from django.contrib.auth.models import User


class Customer(models.Model):
    customer_id=models.AutoField(primary_key=True)
    user_id=models.ForeignKey(User,on_delete=models.CASCADE)
    email=models.EmailField()
    address=models.CharField(max_length=250)
    contact=models.PositiveBigIntegerField()
    
    def __str__(self):
        return self.user_id.first_name
    
    class Meta:
        db_table = 'customer'

class Employee(models.Model):
    employee_id=models.AutoField(primary_key=True)
    user_id=models.ForeignKey(User,on_delete=models.CASCADE)
    address=models.CharField(max_length=250)
    salary=models.CharField(max_length=25)
    email=models.EmailField()
    contact=models.PositiveBigIntegerField()
    
    def __str__(self):
        return self.user_id.first_name
    
    class Meta:
        db_table = 'employee'
    

class Category(models.Model):
    category_id = models.AutoField(primary_key=True)  
    category_name = models.CharField(max_length=50)  
    category_image = models.ImageField(blank=True, null=True,upload_to='category/')  

    class Meta:
        db_table = 'category'    
    


class SubCategory(models.Model):
    sub_category_id = models.AutoField(primary_key=True)  
    sub_category_name = models.CharField(max_length=50)  
    category_id = models.ForeignKey(Category,on_delete=models.CASCADE,related_name='category_sub')  

    class Meta:
        db_table = 'sub_category'
    
          

class Product(models.Model):
    product_id = models.AutoField(primary_key=True)  
    product_description = models.CharField(max_length=50)  
    availability = models.CharField(max_length=50)   
    price = models.CharField(max_length=150)  
    product_image=models.ImageField(upload_to='product_img/')
    sub_category_id = models.ForeignKey(SubCategory,on_delete=models.CASCADE,related_name='subcategory_product')  

    class Meta:
        db_table = 'product'
       
    
class Cart(models.Model):
    cart_id=models.AutoField(primary_key=True)
    customer_id=models.ForeignKey(Customer,on_delete=models.CASCADE,related_name='customer_cart')
    product_id=models.ForeignKey(Product,on_delete=models.CASCADE,related_name='cart_product')
    quantity=models.IntegerField()
    
    class Meta:
        db_table = 'cart'                


class Order(models.Model):
    order_id=models.AutoField(primary_key=True)
    order_date=models.DateTimeField(auto_now_add=True)
    cart_id=models.ForeignKey(Cart,on_delete=models.CASCADE,related_name='cart_order')
    customer_id=models.ForeignKey(Customer,on_delete=models.CASCADE,related_name='customer_order')
    area_pin=models.IntegerField()   
    class Meta:
        db_table='order'    

        
 