from django.http.response import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 
from .models import User
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt
from .serializers import UserSerializer
User = get_user_model()


class UserIndexView(APIView):
    def get(self, request):
        try: 
            user = User.objects.all()
            serialized_user = UserSerializer(user, many=True)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(serialized_user.data, status=status.HTTP_200_OK)

    def post(self, request):
        try:
            user = userSerializer(data=request.data)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        if user.is_valid():
            user.save()
            return Response(user.data, status=status.HTTP_201_CREATED)
        else: 
            return Response(user.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)



class UserDetailView(APIView):

    def delete(self, request, pk):
        try:
            user = User.objects.get(id=pk)
            user.delete()
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        try:
            user = User.objects.get(id=pk)
            updated_user = userSerializer(user, data=request.data)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        if updated_user.is_valid():
            updated_user.save()
            return Response(updated_user.data, status=status.HTTP_202_ACCEPTED)
        else: 
            return Response(updated_user.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def get(self, request, pk):
        try:
            user = User.objects.get(id=pk)
            serialized_user = UserSerializer(user)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(serialized_user.data, status=status.HTTP_200_OK)

class RegisterView(APIView):

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Registration successful'})

        return Response(serializer.errors, status=422)


class LoginView(APIView):

    def get_user(self, email):
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied({'message': 'Invalid credentials'})

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = self.get_user(email)
        if not user.check_password(password):
            raise PermissionDenied({'message': 'Invalid credentials'})
        token = jwt.encode({'sub': user.id}, settings.SECRET_KEY, algorithm='HS256')
        return Response({'token': token})

class updateHousehold(APIView):
    def put(self, request, pk):
        try:
            house = User.objects.filter(id=pk).update(household=request.data['household'])
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response (status=status.HTTP_204_NO_CONTENT)
        
