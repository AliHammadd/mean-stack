import { Component } from '@angular/core';

@Component({
    selector: 'app-post-create',
    templateUrl: './post.create.component.html',
    styleUrls: ['./post.create.css']
})

export class PostCreateComponent{
    enteredValue = null;
    newPost = null;

    onAddPost(){
        this.newPost = this.enteredValue;
    }
}