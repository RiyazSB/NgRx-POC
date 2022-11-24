export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
  }
  

export interface PostState {
    isLoading: boolean;
    posts: Post[];
    error: string | null;
    payload: any
}