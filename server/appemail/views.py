import os

from django.core.mail import EmailMultiAlternatives


from core.views import generate_encoded_token

domain_name = os.environ['DOMAIN_NAME']
domain_url = os.environ['DOMAIN_URL']
email_sentby=os.environ['EMAIL_HOST_USER']


class SendTokenEmail:
    # we use @classmethod to call the method without creating an instance i.e classname.methodname
    
    def get_encoded_token(self, user):
        # since uuid is not JSON serializable, we get it's value using hex attribute, this removes the dashes from uuid
        token_kwargs = {
            'email': user.email,
            'userId':user.id.hex
        }
        activation_token = generate_encoded_token(**token_kwargs)
        return activation_token

    # function to send account activation email
    @classmethod
    def send_user_activation_email(self, user):
        activation_token = self.get_encoded_token(self, user)
        subject = f"Account activation on {domain_name}"
        body_text=f'Click this link to activate your account {domain_url}/user/activate/{activation_token}/'
        body_html = f"\
            <p>Hi {user.username},</p><br/>\
            <p>Welcome to {domain_name}.</p><br/>\
            <p>To activate your account, click the button below:</p><br/>\
            <button><a href={domain_url}/user/activate/{activation_token}/>Activate<a/></button>\
            <br/>\
            <br/>\
            <p>Thanks.</p>\
            <p>{domain_name} team</p>\
        "
        from_email=email_sentby
        to=user.email
        msg = EmailMultiAlternatives(subject, body_text, from_email, [to])
        msg.attach_alternative(body_html, "text/html")
        msg.send()
    
   
    # method to send password reset email
    @classmethod
    def send_password_reset_email(self, user):
        password_reset_token = self.get_encoded_token(self, user)
        subject = f"Account password reset on {domain_name}"
        body_text=f'Click this link to reset your account password {domain_url}/user/password-reset/{password_reset_token}/'
        body_html = f"\
            <p>Hi {user.username},</p><br/>\
            <p>A request to reset your password was made, if you did not make this request, just ignore this email.</p><br/>\
            <p>To proceed with account password reset, click the button below:</p><br/>\
            <button><a href={domain_url}/user/password-reset/{password_reset_token}/>Reset Password<a/></button>\
            <br/>\
            <br/>\
            <p>Thanks.</p>\
            <p>{domain_name} team</p>\
        "
        from_email=email_sentby
        to=user.email
        msg = EmailMultiAlternatives(subject, body_text, from_email, [to])
        msg.attach_alternative(body_html, "text/html")
        msg.send()
