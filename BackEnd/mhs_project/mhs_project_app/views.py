from .models import *
from .serializer import *
from rest_framework.response import Response
from rest_framework.decorators import api_view,APIView
from rest_framework import generics,status
from random import Random   
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail
from django.conf import settings
from django.urls import reverse
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
         
@api_view(["GET", "POST","DELETE","PUT"])
def customer_userV(request):

    if request.method == "POST":
            try:
                validated_data=request.data
                user = User.objects.create(
                                           username=validated_data["username"],
                                           first_name=validated_data["first_name"],
                                           last_name=validated_data["last_name"],
                                            )
                user.set_password(validated_data["password"])
                user.save()
                customer = Customer.objects.create(
                                                   user_id=user,
                                                   address=validated_data['address'],
                                                   email=validated_data['email'],
                                                   contact=validated_data["contact"],
                                                   )
                serializer = CustomerSerializer(customer,data=validated_data)
                if serializer.is_valid():
                    serializer.save()
                return Response(
                    {"message": "User Resgitered Successfully", "success": True},
                    status=status.HTTP_201_CREATED,
                )
            except IntegrityError as ie:
                return Response(
                    {"message": "User Already Exists", "success": False},
                    status=status.HTTP_409_CONFLICT,
                )
                    
    elif request.method == 'PUT':
        try:
            data = request.data
            obj = Customer.objects.get(customer_id=data["customer_id"])
            serializer = CustomerSerializer(obj,data=data,partial=True)
            
            if serializer.is_valid():
                serializer.save()
                return Response({"message":"Data updated successfully ","Data":serializer.data},
                                status=status.HTTP_200_OK)
            
            return Response({"Error":serializer.errors},
                          status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({"message":str(e)})
        
    elif request.method == "DELETE":
        try: 
            delete = request.GET.get('delete')
            if delete:
                user_data = Customer.objects.get(customer_id = delete)
                user_data.delete()
            return Response({"message":"Data deleted successfully"},
                            status=status.HTTP_200_OK
                            )
     
        except Exception as e:
            return Response({"message":str(e)})    
    
@api_view(["GET", "POST","DELETE","PUT"])
def employee_userV(request):

    if request.method == "POST":
            try:
                validated_data=request.data

                user = User.objects.create(
                                           username=validated_data["username"],
                                           first_name=validated_data["first_name"],
                                           last_name=validated_data["last_name"],
                                            )
                user.set_password(validated_data["password"])
                user.save()
                employee = Employee.objects.create(
                                                   user_id=user,
                                                   salary=validated_data["salary"],
                                                   email=validated_data['email'],
                                                   contact=validated_data["contact"],
                                                   address=validated_data['address'],
                                                   )
                serializer = EmployeeSerializer(employee,data=validated_data)
                if serializer.is_valid():
                    serializer.save()
                return Response(
                    {"message": "User Resgitered Successfully", "success": True },
                    status=status.HTTP_201_CREATED,
                )
            except IntegrityError as ie:
                return Response(
                    {"message": "User Already Exists", "success": False},
                    status=status.HTTP_409_CONFLICT,
                )
                    
    elif request.method == 'PUT':
        try:
            data = request.data
            obj = Employee.objects.get(employee_id=data["employee_id"])
            serializer = EmployeeSerializer(obj,data=data,partial=True)
            
            if serializer.is_valid():
                serializer.save()
                return Response({"message":"Data updated successfully ","Data":serializer.data},
                                status=status.HTTP_200_OK)
            
            return Response({"Error":serializer.errors},
                          status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({"message":str(e)})
        
    elif request.method == "DELETE":
        try: 
            delete = request.GET.get('delete')
            if delete:
                user_data = Employee.objects.get(employee_id=delete)
                user_data.delete()
            return Response({"message":"Data deleted successfully"},
                            status=status.HTTP_200_OK
                            )
     
        except Exception as e:
            return Response({"message":str(e)})   
        
        
class CategoryV(APIView):
    def get(self, request):
       c_obj = Category.objects.all()
       serializers = Category_Serializer(c_obj , many=True ,context={'request': request})
       return Response(serializers.data)

    def post(self, request):
        data=request.data
        serializers = Category_Serializer(data=data)
        if serializers.is_valid():
            Category.objects.create(category_name=data['category_name'], category_image=data['category_image'])
            serializers.save()
            return Response({'message': 'Image uploaded successfully','data':serializers.data})
        return Response(serializers.errors)
    
    def put(self,request):
        data = request.data
        obj = Category.objects.get(category_id=data["category_id"])
        serializer = Category_Serializer(obj,data=data,partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"Data updated successfully ","Data":serializer.data},
                            status=status.HTTP_200_OK)
        
        return Response({"Error":serializer.errors},
                      status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self,request):
        try: 
            delete = request.GET.get('delete')
            if delete:
                c_obj = Category.objects.get(category_id=delete)
                c_obj.delete()
            return Response({"message":"Data deleted successfully"},
                            status=status.HTTP_200_OK
                            )
     
        except Exception as e:
            return Response({"message":str(e)})
            
    
@api_view(["GET","POST","PUT","PATCH", "DELETE"])
def subcategoryV(request):
    if request.method=='GET':
        obj= SubCategory.objects.all()
        serializer= SubCategorySerializers(obj ,many=True)
        return Response(serializer.data,
                            status=status.HTTP_200_OK)
    
    elif request.method=="POST":
        data= request.data
        serializer=SubCategorySerializers(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    
    elif request.method=="PUT":
        data= request.data
        sub_obj = SubCategory.objects.get(sub_catgeory_id=data["sub_catgeory_id"])
        serializer=SubCategorySerializers(sub_obj,data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    
    elif request.method == "DELETE":
        try: 
            delete = request.GET.get('delete')
            if delete:
                sub_obj = SubCategory.objects.get(sub_catgeory_id=delete)
                sub_obj.delete()
            return Response({"message":"Data deleted successfully"},
                            status=status.HTTP_200_OK
                            )
     
        except Exception as e:
            return Response({"message":str(e)})   



@api_view(['GET','POST','PUT','DELETE'])        
def productV(request,product_id=None):
    if request.method == 'GET':
        try:
            prod_obj = Product.objects.all()
            serializers = ProductSerializers(prod_obj,many=True)
            return Response(serializers.data,
                            status=status.HTTP_200_OK
                            )
            
        except Exception as e:
            return Response({"message":str(e)})    
          
    elif request.method == 'POST':
        try:
            data = request.data 
            sub_obj = SubCategory.objects.get(sub_category_id=data['sub_category_id'])
            prod_obj = Product.objects.create(
                                              product_description =data['product_description'],
                                              availability =data['availability'],
                                              product_image =data['product_image'],
                                              price =data['price'],
                                              sub_category_id =sub_obj
                                              )
            prod_obj.save()
            serializers = ProductSerializers(prod_obj ,data=data)
            if serializers.is_valid():
                serializers.save()
                return Response(serializers.data,
                                status=status.HTTP_201_CREATED
                                ) 
            return Response(serializers.errors)
        
        except Exception as e:
            return Response({"message":str(e)})
        
    elif request.method == 'PUT':
        try:
           
            prod_obj = Product.objects.get(product_id=product_id)
            serializers = ProductSerializers(prod_obj,data=request.data)
            if serializers.is_valid():
                serializers.save()
                return Response(serializers.data,
                                status=status.HTTP_200_OK
                                )

        except Exception as e:
            return Response({"message":str(e)})  
         
    elif request.method == "DELETE":
        try:
            delete = request.GET.get('delete')
            if delete: 
                prod_obj = Product.objects.get(product_id=delete)
                prod_obj.delete()
                return Response({"message":"Data deleted successfully"},
                            status=status.HTTP_200_OK
                            )
            
        except Exception as e:
            return Response({"message":str(e)})
        
        
    
    
@api_view(['GET','POST','PUT','DELETE'])        
def cartV(request):
    if request.method == 'GET':
        try:
            cart_obj = Cart.objects.all()
            serializers = CartSerializers(cart_obj,many=True)
            return Response(serializers.data,
                            status=status.HTTP_200_OK
                            )
            
        except Exception as e:
            return Response({"message":str(e)})    
          
    elif request.method == 'POST':
        try:
            data = request.data 
            customer_obj=Customer.objects.get(customer_id=data['customer_id'])
            product_obj=Product.objects.get(product_id=data['product_id'])
            cart_obj = Cart.objects.create(
                                            customer_id = customer_obj,
                                            product_id =product_obj,
                                            quantity =data['quantity']
                                                            )
            cart_obj.save()
            serializers = CartSerializers(cart_obj ,data=data)
            if serializers.is_valid():
                serializers.save()
                return Response(serializers.data,
                                status=status.HTTP_201_CREATED
                                ) 
            return Response(serializers.errors)
        
        except Exception as e:
            return Response({"message":str(e)})
        
    elif request.method == 'PUT':
        try:
            data=request.data
            cart_obj = CartSerializers.objects.get(cart_id=data['cart_id'])
            serializers = CartSerializers(cart_obj,data=request.data)
            if serializers.is_valid():
                serializers.save()
                return Response(serializers.data,
                                status=status.HTTP_200_OK
                                )
            return Response(serializers.errors)
        except Exception as e:
            return Response({"message":str(e)})   
    elif request.method == "DELETE":
        try: 
            delete = request.GET.get('delete')
            if delete:
                cart_obj = Cart.objects.get(cart_id=delete)
                cart_obj.delete()
            return Response({"message":"Data deleted successfully"},
                            status=status.HTTP_200_OK
                            )
     
        except Exception as e:
            return Response({"message":str(e)})



@api_view(['GET','POST','PUT','DELETE'])        
def orderV(request):
    if request.method == 'GET':
        try:
            order_obj = Order.objects.all()
            serializers = OrderSerializers(order_obj,many=True)
            return Response(serializers.data,
                            status=status.HTTP_200_OK
                            )
            
        except Exception as e:
            return Response({"message":str(e)})    
          
    elif request.method == 'POST':
        try:
            data = request.data 
            customer_obj=Customer.objects.get(customer_id=data['customer_id'])
            cart_obj=Cart.objects.get(cart_id=data['cart_id'])
            order_obj = Order.objects.create(
                                            customer_id =customer_obj,
                                            cart_id =cart_obj,
                                            area_pin =data['area_pin'],
                                                            )
            order_obj.save()
            serializers = OrderSerializers(order_obj ,data=data)
            if serializers.is_valid():
                serializers.save()
                return Response(serializers.data,
                                status=status.HTTP_201_CREATED
                                ) 
            return Response(serializers.errors)
        
        except Exception as e:
            return Response({"message":str(e)})
        
    elif request.method == 'PUT':
        try:
            data=request.data
            order_obj = OrderSerializers.objects.get(order_id=data['order_id'])
            serializers = OrderSerializers(order_obj,data=request.data)
            if serializers.is_valid():
                serializers.save()
                return Response(serializers.data,
                                status=status.HTTP_200_OK
                                )
            return Response(serializers.errors)

        except Exception as e:
            return Response({"message":str(e)})   
    elif request.method == "DELETE":
        try: 
            delete = request.GET.get('delete')
            if delete:
                order_obj = Order.objects.get(order_id=delete)
                order_obj.delete()
            return Response({"message":"Data deleted successfully"},
                            status=status.HTTP_200_OK
                            )
     
        except Exception as e:
            return Response({"message":str(e)})