from rest_framework import serializers
from .models import *

        
class UserSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = User
        fields = "__all__"
        
class CustomerSerializer(serializers.ModelSerializer):
    User_id =UserSerializer()
    class Meta:
        model = Customer
        fields = "__all__"
        
    def update(self,instance,validated_data):
        user_profile_data = validated_data.pop('User_id', {})
        user_profile_instance = instance.User_id
        user_profile_instance.username = user_profile_data.get('username', user_profile_instance.username)
        user_profile_instance.first_name = user_profile_data.get('first_name', user_profile_instance.first_name)
        user_profile_instance.last_name = user_profile_data.get('last_name', user_profile_instance.last_name)
        user_profile_instance.save()
        
        instance.Contact = validated_data.get('Contact', instance.Contact)
        instance.Email = validated_data.get('Email', instance.Email)
        instance.save()
        return instance    
        
class EmployeeSerializer(serializers.ModelSerializer):
    User_id =UserSerializer()
    class Meta:
        model = Employee
        fields = "__all__"
        
    def update(self,instance,validated_data):
        user_profile_data = validated_data.pop('User_id', {})
        user_profile_instance = instance.User_id
        user_profile_instance.username = user_profile_data.get('username', user_profile_instance.username)
        user_profile_instance.first_name = user_profile_data.get('first_name', user_profile_instance.first_name)
        user_profile_instance.last_name = user_profile_data.get('last_name', user_profile_instance.last_name)
        user_profile_instance.save()
        
        instance.Contact = validated_data.get('Contact', instance.Contact)
        instance.Email = validated_data.get('Email', instance.Email)
        instance.Address = validated_data.get('Address', instance.Address)
        instance.Salary = validated_data.get('Salary', instance.Salary)
        instance.save()
        return instance        
        
class Category_Serializer(serializers.ModelSerializer):
    
    class Meta:
        model = Category
        fields = "__all__"
        
        
class SubCategorySerializers(serializers.ModelSerializer):
   
    class Meta:
        model= SubCategory
        fields= "__all__"   
        
         
class ProductSerializers(serializers.ModelSerializer):
  
    class Meta:
        model= Product  
        fields= "__all__"    
                
            
class CartSerializers(serializers.ModelSerializer):
        
    class Meta:
        model= Cart
        fields= "__all__"      
        
          
class OrderSerializers(serializers.ModelSerializer):
        
    class Meta:
        model= Order
        fields= "__all__"      