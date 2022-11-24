import { PostState } from "../../types/posts.model";
import * as PostsActions from './actions'
import { createReducer, on } from '@ngrx/store';


export const initialState: PostState = {
    isLoading: false,
    posts: [],
    error: null,
    payload: {}
}

export const postsReducer = createReducer(
    initialState,
    on(PostsActions.getPosts, (state: any) => ({ 
        ...state,
        isLoading: true
    })),
    
    on(PostsActions.getPostsSuccess, (state: any, action) => ({
        ...state,
        isLoading: false,
        posts: action.posts,
        payload: action.payload
    })),

    on(PostsActions.getPostsFailure, (state: any, action) => ({ 
        ...state,
        isLoading: false,
        error: action.error
    })),
);
