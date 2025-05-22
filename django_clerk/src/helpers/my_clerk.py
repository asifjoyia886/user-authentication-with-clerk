import json
import warnings
import os
from django.http import JsonResponse
from django.conf import settings
from clerk_backend_api import Clerk
from clerk_backend_api.jwks_helpers import AuthenticateRequestOptions

from django.contrib.auth import get_user_model

warnings.filterwarnings('ignore', module='clerk_backend_api')
warnings.filterwarnings('ignore', module='pydantic')

User = get_user_model()

def extract_user_id_from_request(request):
    sdk = Clerk(bearer_auth=os.getenv('CLERK_SECRET_KEY'))
    request_state = sdk.authenticate_request(
        request,
        AuthenticateRequestOptions(authorized_parties=["http://localhost:5173","http://localhost:3000"])
    )
    if request_state.is_signed_in:
        return request_state.payload.get('sub')
    return None

def save_clerk_user(request):
    clerk_user_id = extract_user_id_from_request(request)
    if not clerk_user_id:
        return None, False

    sdk = Clerk(bearer_auth=os.getenv('CLERK_SECRET_KEY'))
    try:
        clerk_user = sdk.users.get(user_id=clerk_user_id)
    except Exception as e:
        return None, False

    user_data = json.loads(clerk_user.model_dump_json())

    clerk_id = user_data.get('id')
    first_name = user_data.get('first_name', '')
    last_name = user_data.get('last_name', '')

    email_obj = user_data.get('email_addresses', [])[0] if user_data.get('email_addresses') else None
    email = email_obj.get('email_address') if email_obj else ''

    if not clerk_id:
        return None, False

    user_obj, created = User.objects.update_or_create(
        clerk_user_id=clerk_id,
        defaults={
            'email': email,
            # 'first_name': first_name,
            # 'last_name': last_name,
        }
    )

    return user_obj, created
