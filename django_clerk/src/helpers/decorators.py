from django.http import JsonResponse
from functools import wraps




def api_login_required(view_function):
    @wraps(view_function)
    def _wrapped_view(request, *args, **kwargs):
        if not request.user or not request.user.is_authenticated:
            return JsonResponse({'error': 'Unauthenticated buddy.'}, status=401)
        return view_function(request, *args, **kwargs)
    return _wrapped_view
