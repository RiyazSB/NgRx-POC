import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { postsReducer } from './store/reducers';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from "@angular/common/http";
import { PostsService } from './posts.service';
import { EffectsModule } from '@ngrx/effects';
import { PostsEffects } from './store/effects';

@NgModule({
  declarations: [
    PostsComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    StoreModule.forFeature('posts', postsReducer),
    EffectsModule.forFeature([PostsEffects]),
    HttpClientModule
  ],
  providers: [
    PostsService
  ]
})
export class PostsModule { }
