import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Subscription } from 'rxjs';

import { Post } from "src/app/models/post.model";
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: "app-post-list",
  templateUrl: "./post.list.component.html",
  styleUrls: ['./post.list.css']
})
export class PostListComponent  {
    posts: Post[] = [];
    private postsSub: Subscription;
  
    constructor(public postsService: PostsService) {}
  
    ngOnInit() {
      this.postsService.getPosts();
      this.postsSub = this.postsService.getPostUpdateListener()
        .subscribe((posts: Post[]) => {
          this.posts = posts;
        });
    }
    
    onDelete(postId: string){
      this.postsService.deletePost(postId);
    }

    ngOnDestroy() {
      this.postsSub.unsubscribe();
    }
}
