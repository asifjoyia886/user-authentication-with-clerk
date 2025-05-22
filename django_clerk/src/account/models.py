from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group, Permission
from  django.conf import settings


user=settings.AUTH_USER_MODEL
class MyAccountManager(BaseUserManager):
    def create_user(self, clerk_user_id, password=None, **extra_fields):
        if not clerk_user_id:
            raise ValueError('Users must have a clerk_user_id')

        user = self.model(clerk_user_id=clerk_user_id, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, clerk_user_id, password=None, **extra_fields):
        extra_fields.setdefault('is_admin', True)
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(clerk_user_id, password, **extra_fields)


class Account(AbstractBaseUser, PermissionsMixin):
    clerk_user_id = models.CharField(max_length=255, unique=True, verbose_name='Clerk ID')

    # Optional fields
    email = models.EmailField(max_length=60, blank=True, null=True)
    username = models.CharField(max_length=30, blank=True, null=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)
    first_name = models.CharField(max_length=30, blank=True, null=True)
    last_name = models.CharField(max_length=30, blank=True, null=True)
    # Permissions
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    hide_email = models.BooleanField(default=True)

    # Related fields for groups and permissions
    groups = models.ManyToManyField(
        Group,
        related_name='custom_user_groups',
        blank=True,
        help_text='The groups this user belongs to.'
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='custom_user_permissions',
        blank=True,
        help_text='Specific permissions for this user.'
    )

    objects = MyAccountManager()

    USERNAME_FIELD = 'clerk_user_id'
    REQUIRED_FIELDS = []

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True

    def __str__(self):
        return self.clerk_user_id

#create a post Model
#two things we goan add fields content,user,data of published 
class Post(models.Model):
    user = models.ForeignKey(user,on_delete=models.CASCADE)
    content=models.TextField()
    date_of_publish=models.DateField(auto_now_add=True)

    def __str__(self):
        return f"'data':{self.content} by 'user':{self.user}"