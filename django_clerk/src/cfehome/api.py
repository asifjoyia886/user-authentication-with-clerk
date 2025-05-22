import os
import json
import warnings
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from clerk_backend_api import Clerk
from clerk_backend_api.jwks_helpers import AuthenticateRequestOptions
from account.models import Post
from helpers.my_clerk import extract_user_id_from_request, save_clerk_user
from django.contrib.auth.decorators import login_required
warnings.filterwarnings('ignore', module='clerk_backend_api')
warnings.filterwarnings('ignore', module='pydantic')
from helpers.decorators import api_login_required
from django.views.decorators.csrf import csrf_exempt
User = get_user_model()
from django.forms.models import model_to_dict
# ✅ Return full user data from Clerk
def api_view_for_user_object(request):
    clerk_user_id = extract_user_id_from_request(request)
    if not clerk_user_id:
        return JsonResponse({'error': 'Please sign in.'}, status=401)

    sdk = Clerk(bearer_auth=os.getenv('CLERK_SECRET_KEY'))
    try:
        clerk_user = sdk.users.get(user_id=clerk_user_id)
    except Exception as e:
        return JsonResponse({'error': f'Error fetching user: {str(e)}'}, status=500)

    user_data = json.loads(clerk_user.model_dump_json())
    return JsonResponse({'user': user_data})

# ✅ View to save Clerk user into Django model
@api_login_required
def save_user_view(request):
    user_obj, created = save_clerk_user(request)
    if not user_obj:
        return JsonResponse({'error': 'User not saved'}, status=400)
    return JsonResponse({
        'status': 'created' if created else 'updated',
        'email': user_obj.email,
        'id': user_obj.id
    })



#test middleware
@api_login_required
def is_user_authenticated(request):
    user = request.users



@csrf_exempt
@api_login_required
def create_post(request):
    if request.method != "POST":
        return JsonResponse({'details': 'Method not allowed'}, status=400)

    try:
        user = request.user
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)

        post_instance = Post.objects.create(
            user=user,
            **body_data  # make sure keys match Post model fields
        )

        return JsonResponse(model_to_dict(post_instance), status=201)

    except json.JSONDecodeError as e:
        return JsonResponse({'error': 'Invalid JSON', 'details': str(e)}, status=400)

    except Exception as e:
        return JsonResponse({'error': 'Something went wrong', 'details': str(e)}, status=500)
