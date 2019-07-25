import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-post-create',
    templateUrl: './post.create.component.html',
    styleUrls: ['./post.create.css']
})

export class PostCreateComponent {
    enteredTitle = "";
    enteredContent = "";
  
    constructor(public postsService: PostsService) {}
  
    onAddPost(form: NgForm) {
      if (form.invalid) {
        return;
      }
      this.postsService.addPost(form.value.title, form.value.content);
      form.resetForm();
    }
  }