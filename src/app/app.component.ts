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

    panzoom: any;

    ngOnInit() {
        const maskElement = document.getElementById('image')
        if(maskElement) {
            this.panzoom = panzoom(maskElement!); 
        }
        
    }

    onFileChange(event: any) {
        this.file = event.target.files[0];
        let reader = new FileReader();
        reader.onload = e => this.imageSrc = reader.result;

        reader.readAsDataURL(this.file);
    }

    onCrop() {
        console.log(this.panzoom.getTransform());
    }
}
