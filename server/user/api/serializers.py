from django.contrib.auth import get_user_model

from rest_framework.serializers import ModelSerializer


User = get_user_model()

# registration serializer


class RegistrationSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'username',
                  'email', 'phone', 'location', 'account_type')


# user serializer
class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'username', 'email', 'id', 'bio')
