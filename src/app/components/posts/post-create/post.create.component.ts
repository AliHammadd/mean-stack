import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/models/post.model';
import { post } from 'selenium-webdriver/http';

@Component({
    selector: 'app-post-create',
    templateUrl: './post.create.component.html',
    styleUrls: ['./post.create.css']
})

export class PostCreateComponent implements OnInit{
    enteredTitle = "";
    enteredContent = "";
    private mode = 'create';
    private postId: string;
    post: Post;
    loading: boolean = false;

    constructor(public postsService: PostsService, public route: ActivatedRoute) {}

    ngOnInit(){
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if(paramMap.has('postId')){
          this.mode = 'edit';
          this.postId = paramMap.get('postId');
          this.loading = true;
          this.postsService.getPost(this.postId).subscribe((postData)=> {
            this.loading = false;
            this.post = {id: postData._id, title: postData.title, content: postData.content };
          });
        }else{
          this.mode = 'create';
          this.postId = null;
        }
      });
    }

    onSavePost(form: NgForm) {
      if (form.invalid) {
        return;
      }
      this.loading = true;
      if(this.mode === 'create'){
        this.postsService.addPost(form.value.title, form.value.content);
      }else{
        this.postsService.updatePost(this.postId, form.value.title, form.value.content);
      }

      form.resetForm();
    }
  }