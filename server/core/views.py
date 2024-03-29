import re
import os
from datetime import datetime, timedelta

import jwt

from django.contrib.auth import get_user_model
from django.conf import settings

from decouple import config

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response

User = get_user_model()

# keys used for encoding and decoding
if settings.PRODUCTION:
    token_generation_key = os.environ['TOKEN_GENERATION_SECRET']
else:
    token_generation_key = config('TOKEN_GENERATION_SECRET')

# validate password


def validate_password(password):
    regex = re.compile('[@_!#$%^&*()<>?/\|}{~:]')
    if len(password) < 8:
        return "Password must be at least 8 characters", False
    elif re.search('[0-9]', password) is None:
        return "Password must contain a number", False
    elif re.search('[A-Z]', password) is None:
        return "Password must contain an uppercase letter", False
    elif regex.search(password) is None:
        return "Password must contain a special character", False
    else:
        return "", True


# validate to ensure fields (this is a list) are not empty


def fields_empty(fields):
    for field in fields:
        if field.strip() == '':
            return True
    return False


# verify user using django simple jwt
def verify_user(request, userId):
    # we extract the authorization token from the headers
    raw_token = request.META['HTTP_AUTHORIZATION'].split()[1]
    obj = JWTAuthentication()
    validated_token = obj.get_validated_token(raw_token)
    user = obj.get_user(validated_token)
    try:
        new_user = User.objects.get(id=userId)
        if user == new_user:
            return user
        else:
            return None
    except User.DoesNotExist:
        return None

# validate phone number


def validate_phone_number(phone):
    if len(phone) != 10:
        return False
    user_exists = get_object_or_none(User, phone__iexact=phone)
    if user_exists:
        return False
    return True


#####################################  GET FUNCTIONS - TO GET OBJECTS FROM THE DATABASE #######################################
# custom function to get object or return none if not found

def get_object_or_none(model_name, **kwargs):
    try:
        obj = model_name.objects.get(**kwargs)
        return obj
    except model_name.DoesNotExist:
        return None


# TOKEN RELATED GENERATION, ENCODING AND DECODING

# method to generate an encoded token
def generate_encoded_token(**kwargs):
    # kwargs can be any number of arguments in their key value pairs
    payload = {
        **kwargs,
        "exp": datetime.utcnow() + timedelta(hours=24)
    }
    encoded_token = jwt.encode(
        payload, token_generation_key, algorithm="HS256")
    return encoded_token


# method to decode an encoded token
def decode_token(token):
    try:
        decode_token = jwt.decode(
            token, token_generation_key, algorithms=["HS256"])
        return decode_token
    except jwt.ExpiredSignatureError:
        return 'expired token'
    except jwt.DecodeError:
        return 'invalid token'


# return error functions
def unknown_error():
    return Response({'detail': 'An unknown error occurred'}, status=400)


################################# ERROR FUNCTIONS #########################################################
# invalid serializer
def invalid_serializer():
    return Response({'detail': 'Ensure all required fields have valid data'}, status=400)

# invalid user


def invalid_user():
    return Response({'detail': 'invalid user credentials'}, status=400)


def invalid_listing():
    return Response({'detail': 'Invalid listing specified'}, status=400)


# invalid serializer with error message


def invalid_serializer_error_message(serializer, serializer_fields):
    for field in serializer_fields:
        # to avoid ke error in case one of the fields has valid data, we use try /except block
        try:
            if serializer.errors[field][0] == 'This field may not be blank.':
                # since the blank error does not show field name, we use custom error
                return f'{field} should not be blank'
            else:
                # for other error types, we get the specific error
                return serializer.errors[field][0]
        except:
            pass


#####################################  END OF ERROR FUNCTIONS #############################################
