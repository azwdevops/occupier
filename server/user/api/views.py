from django.contrib.auth import get_user_model

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication


from user.api.serializers import RegistrationSerializer, UserSerializer
from core.views import validate_password, fields_empty, send_user_activation_email

User = get_user_model()


# function to register new user
@api_view(['POST', ])
@permission_classes([])
def register_user(request):
    if request.method == 'POST':
        data = request.data
        if validate_email(data['email']) is not None:
            return Response({'msg': 'email taken'}, status=400)

        if validate_username(data['username']) is not None:
            return Response({'msg': 'username taken'}, status=400)

        extra_fields = [data['first_name'], data['last_name'],
                        data['password'], data['confirm_password']]

        # ensure that names are submitted
        if fields_empty(extra_fields):
            return Response('fill all fields')

        if not data['password'].strip() == data['confirm_password'].strip():
            return Response({'msg': 'Passwords must match'}, status=400)

        if not validate_password(data['password'])[1]:
            return Response({'msg': validate_password(data['password'])[0]}, status=400)

        serializer = RegistrationSerializer(data=data)

        if serializer.is_valid():
            user = serializer.save()
            user.set_password(data['password'])
            user.save()
            send_user_activation_email(request, user)
            return Response({'msg': 'Success. Check your email for the activation link.'}, status=201)
        else:
            return Response({'msg': 'An error occurred, please try again later'}, status=400)

        return Response(res)


def validate_email(email):
    user = None
    try:
        user = User.objects.get(email__iexact=email)
    except User.DoesNotExist:
        return None
    if user is not None:
        return email


def validate_username(username):
    user = None
    try:
        user = User.objects.get(username__iexact=username)
    except User.DoesNotExist:
        return None
    if user is not None:
        return username


# using django simple jwt
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_data(request):
    if request.method == 'GET':
        raw_token = request.META['HTTP_AUTHORIZATION'].split()[1]
        obj = JWTAuthentication()  # create a class instance first to call the non-static method
        validated_token = obj.get_validated_token(raw_token)
        user = obj.get_user(validated_token)
        if user:
            data = {}
            user_data = UserSerializer(user).data
            return Response({'user': user_data, 'msg': 'success'}, status=200)

        else:
            return Response({'msg': 'user not found'}, status=404)
