import { createAction, props } from '@ngrx/store';
import { Post } from '../../types/posts.model';


export const getPosts = createAction(
    '[Posts] Get Posts',
    props<{payload: any}>()
);

export const getPostsNew = createAction(
    '[Posts] Get Posts New',
    props<{payload: any}>()
);

export const getPostsSuccess = createAction(
    '[Posts] Get Posts Success',
    props<{ posts: Post[], payload: any}>()
);

export const getPostsFailure = createAction(
    '[Posts] Get Posts Failure',
    props<{ error: string}>()
);
