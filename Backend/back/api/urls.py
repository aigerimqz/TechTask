from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import *
urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', CurrentUserView.as_view()),
    path('tasks/', TaskListView.as_view(), name='tasks'),
    path('tasks/<int:pk>/', TaskDetailView.as_view(), name='task-detail'),
    path('tasks/create/', CreateTaskView.as_view(), name='task-create'),
    path('tasks/<int:pk>/update/', UpdateTaskView.as_view(), name='task-update'),
    path('tasks/<int:pk>/delete/', DeleteTaskView.as_view(), name='task-delete'),
    
 
]
