export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
}

export interface Task{
    id: number;
    title: string;
    description: string;
    user: User;
    created_at: string;
    updated_at: string;
}

export interface Token{
    refresh: string;
    access: string;
}
