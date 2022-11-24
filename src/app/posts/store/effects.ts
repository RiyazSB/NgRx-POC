import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import * as PostActions from "./actions"
import { map, mergeMap, catchError } from "rxjs/operators";
import { PostsService } from "../posts.service";
import { of } from "rxjs";
import { Injectable } from '@angular/core';
import { Store } from "@ngrx/store";
import { AppState } from "../../types/app-state.model";
import { postsDataSelector } from "./selectors";

@Injectable()
export class PostsEffects {

    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private postService: PostsService
    ) { }

    getPosts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PostActions.getPosts),
            concatLatestFrom(() => this.store.select(postsDataSelector)),
            mergeMap(([action, data]) => {
                console.log(data);
                // Need to use isEqual lodash method for object  comparison and add date to payload obj 
                if(data.payload?.data === action.payload?.data && data.payload?.date === new Date().toISOString().slice(0, 10)) {
                    return of(PostActions.getPostsSuccess({ posts: data.posts, payload: {...action.payload, date: new Date().toISOString().slice(0, 10)} }))
                } else {
                    return this.postService.getPosts(action.payload).pipe(
                        map(posts => {
                            console.log(posts);
                            return PostActions.getPostsSuccess({ posts: posts, payload: {...action.payload, date: new Date().toISOString().slice(0, 10)} })
                        }),
                        catchError(error =>
                            of(PostActions.getPostsFailure({ error: error.message }))
                        )
                    );
                }
                
            }))
    )
}