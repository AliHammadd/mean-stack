import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from 'src/app/models/post.model';

@Component({
    selector: 'app-post-create',
    templateUrl: './post.create.component.html',
    styleUrls: ['./post.create.css']
})

export class PostCreateComponent{
   
    postTitle = null;
    postContent = null;
    @Output() postCreated = new EventEmitter<Post>();

    onAddPost(){
        const post: Post = {
            title: this.postTitle,
            content: this.postContent
        }

        this.postCreated.emit(post);
    }
}