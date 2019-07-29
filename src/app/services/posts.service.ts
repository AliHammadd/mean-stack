import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../models/post.model';
import { HttpClient } from '@angular/common/http';
import  { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class PostsService {

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) { }

  getPosts() {
    this.http.get<{ message: string, posts: any }>("http://localhost:3000/api/posts")
    .pipe(map((postData)=> {
        return postData.posts.map(post=> {
            return  {
              id: post._id,
              title: post.title,
              content: post.content
            }
        });
    }))
    .subscribe((postData) => {
      this.posts = postData;
      this.postsUpdated.next([...this.posts]);
    })
    return [...this.posts];
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.http.post<{ postId: string, message: string }>('http://localhost:3000/api/posts', post).subscribe((response) => {
      const id = response.postId;
      post.id = id;
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });
  }

  deletePost(postId: string){
    this.http.delete<{ message: string }>(`http://localhost:3000/api/posts/${postId}`).subscribe((deletedPost)=>{
        const updatedPosts = this.posts.filter((post) => post.id !== postId );
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
    });
  }

}

