import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Post } from "../types/posts.model";
import { Observable } from "rxjs";

@Injectable()
export class PostsService {

    constructor(private http: HttpClient) {}

    getPosts(payload: any): Observable<Post[]> {
        console.log('payload', payload);
        return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
    }
}