from django.shortcuts import render
from .models import Task
from .serializers import TaskSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from rest_framework import generics

# Create your views here.
class TaskListView(generics.ListAPIView):
   
    serializer_class = TaskSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Task.objects.all().order_by('-created_at')
        if self.request.user.is_authenticated:
            queryset = queryset.exclude(author=self.request.user)
        return queryset

class CreateTaskView(generics.CreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
  
    def perform_create(self, serializer):
        serializer.save(author = self.request.user)



class TaskDetailView(generics.RetrieveAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    permission_classes = [IsAuthenticated]

class UpdateTaskView(generics.UpdateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_update(self, serializer):
        if self.get_object().author != self.request.user:
            raise PermissionDenied("You can not change post.")
        serializer.save()


class DeleteTaskView(generics.DestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def perform_destroy(self, instance):
        if instance.author != self.request.user:
            raise PermissionDenied("You can not delete post.")
        instance.delete()


# class TaskListCreateView(generics.ListCreateAPIView):
#     serializer_class = TaskSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         return Task.objects.filter(user=self.request.user)
    
#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)


# class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
#     serializer_class = TaskSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
        
#         return Task.objects.filter(user=self.request.user)