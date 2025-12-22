import { Component, OnInit } from '@angular/core';
import panzoom from 'panzoom';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    file: any;

    imageSrc: string | ArrayBuffer | null = "";

    maxFileSize = 5 * 1024 * 1024; // 5MB in bytes
    fileSizeError = "";

    panzoom: any;

    ngOnInit() {
        const maskElement = document.getElementById('image')
        if(maskElement) {
            this.panzoom = panzoom(maskElement!); 
        }
        
    }

    onFileChange(event: any) {
        this.fileSizeError = "";
        this.file = event.target.files[0];

        if (this.file.size > this.maxFileSize) {
            this.fileSizeError = "File size exceeds 5MB limit. Please choose a smaller image.";
            this.imageSrc = "";
            return;
        }

        let reader = new FileReader();
        reader.onload = () => this.imageSrc = reader.result;
        reader.readAsDataURL(this.file);
    }

    onCrop() {
        console.log(this.panzoom.getTransform());
    }
}
