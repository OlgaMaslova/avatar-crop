import { Component, OnInit, AfterViewInit } from '@angular/core';
import panzoom from 'panzoom';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
    file: any;

    imageSrc: string | ArrayBuffer | null = "";

    panzoom: any;

    ngOnInit() {
        // Component initialization logic can go here
    }
    
    ngAfterViewInit() {
        // Initialize panzoom after view is fully initialized
        this.initializePanzoom();
    }
    
    private initializePanzoom() {
        const imageElement = document.getElementById('image');
        if (imageElement && this.imageSrc) {
            // Dispose existing panzoom instance if it exists
            if (this.panzoom) {
                this.panzoom.dispose();
            }
            this.panzoom = panzoom(imageElement);
        }
    }

    onFileChange(event: any) {
        this.file = event.target.files[0];
        if (this.file) {
            let reader = new FileReader();
            reader.onload = e => {
                this.imageSrc = reader.result;
                // Re-initialize panzoom after image is loaded
                setTimeout(() => {
                    this.initializePanzoom();
                }, 100); // Small delay to ensure image is rendered
            };
            reader.readAsDataURL(this.file);
        }
    }

    onCrop() {
        if (this.panzoom && this.imageSrc) {
            const transform = this.panzoom.getTransform();
            console.log('Transform:', transform);
            // Add your crop logic here
        } else {
            console.warn('Panzoom not initialized or no image loaded. Please select an image first.');
        }
    }
}
