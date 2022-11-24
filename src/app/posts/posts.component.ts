import { Component, OnInit } from '@angular/core';
import { Store, select } from "@ngrx/store";
import * as PostActions from "./store/actions";
import { errorSelector, isLoadingSelector, postsDataSelector, postsSelector } from './store/selectors';
import {Observable} from "rxjs";
import { AppState } from '../types/app-state.model';
import { PostsService } from './posts.service';
import { Post } from '../types/posts.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  isLoading$: Observable<boolean>;
  posts$: Observable<Post[]>;
  error$: Observable<string | null>

  constructor(
    private store: Store<AppState>,
    private postsService: PostsService  
  ) { 

    this.isLoading$ = this.store.pipe(select(isLoadingSelector) )
    this.posts$ = this.store.pipe(select(postsSelector) )
    this.error$ = this.store.pipe(select(errorSelector) )
    this.store.pipe(select(postsDataSelector)).subscribe(data => {
      console.log('postsData', data);
    })

  }

  ngOnInit(): void {
    this.store.dispatch(PostActions.getPosts({ payload: { data: 'test1'}}));
    setTimeout(() => {
      this.store.dispatch(PostActions.getPosts({ payload: { data: 'test1'}}));
    }, 3000);
  }

}
