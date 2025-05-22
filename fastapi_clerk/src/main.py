from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import os
import warnings
from clerk_backend_api import Clerk
from clerk_backend_api.jwks_helpers import AuthenticateRequestOptions

# Ignore unnecessary warnings from clerk_backend_api and pydantic
warnings.filterwarnings('ignore', module='clerk_backend_api')
warnings.filterwarnings('ignore', module='pydantic')


# Helper function to extract user ID from Clerk auth
def extract_user_id_from_request(request):
    sdk = Clerk(bearer_auth=os.getenv('CLERK_SECRET_KEY'))
    try:
        request_state = sdk.authenticate_request(
            request,
            AuthenticateRequestOptions(authorized_parties=["http://localhost:5173", "http://127.0.0.1:5173","http://localhost:3000", "http://localhost:8888"])
        )
        print("Request state:", request_state)
        if request_state.is_signed_in:
            return request_state.payload.get('sub')
    except Exception as e:
        print("Auth error:", str(e))
    return None


# Initialize FastAPI app
app = FastAPI()

# CORS configuration
origins = [
    "http://localhost:5173",     # React dev URL with localhost
    "http://127.0.0.1:5173",
    "http://localhost:3000",      # React dev URL with 127.0.0.1
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,         # ✅ Must match browser origin exactly
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from pydantic import BaseModel
#let create the schema its an agremnet between client what kind of dta we want u know
class PostCreateSchema(BaseModel):
    content:str


# Root endpoint
@app.get("/")
async def root(request: Request):
    auth_header = request.headers.get("authorization")
    print("Incoming Authorization Header:", auth_header)

    clerk_user_id = extract_user_id_from_request(request)
    return {"message": clerk_user_id or "No valid Clerk user"}

@app.post('/api/posts')
async def create_post(request: Request, payload: PostCreateSchema):
    clerk_user_id = extract_user_id_from_request(request)

    if not clerk_user_id:
        return {"error": "Unauthorized"}, 401

    data = payload.model_dump()
    content = payload.content

    # Optional: save to DB or log
    print(f"User ID: {clerk_user_id} | Content: {content}")

    return {
        "message": "Post received!",
        "user_id": clerk_user_id,
        "data": data
    }
