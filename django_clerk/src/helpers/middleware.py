from helpers.my_clerk import extract_user_id_from_request, save_clerk_user

# ✅ This function ensures Django user is retrieved and saved using the Clerk ID
def django_user_session_via_clerk(request):
    clerk_user_id = extract_user_id_from_request(request)
    if not clerk_user_id:
        return None
    user_obj, _ = save_clerk_user(request)
    return user_obj

# ✅ Custom middleware to attach authenticated user to request.user
class AuthMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        user = django_user_session_via_clerk(request)
        if user:
            request.user = user  # Attach the Django user object
        response = self.get_response(request)
        return response
