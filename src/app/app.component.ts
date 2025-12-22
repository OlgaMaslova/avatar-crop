import { Component, OnInit, OnDestroy } from '@angular/core';
import panzoom from 'panzoom';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    file: any;

    imageSrc: string | ArrayBuffer | null = "";

    panzoom: any = null;
    private imageElement: HTMLImageElement | null = null;

    ngOnInit() {
        // Don't initialize panzoom here - wait for image to load
    }

    ngOnDestroy() {
        this.destroyPanzoom();
    }

    private initializePanzoom() {
        try {
            this.destroyPanzoom();
            
            this.imageElement = document.getElementById('image') as HTMLImageElement;
            if (this.imageElement && this.imageSrc) {
                // Wait a bit to ensure image is rendered
                setTimeout(() => {
                    if (this.imageElement) {
                        this.panzoom = panzoom(this.imageElement);
                    }
                }, 100);
            }
        } catch (error) {
            console.error('Failed to initialize panzoom:', error);
            this.panzoom = null;
        }
    }

    private destroyPanzoom() {
        if (this.panzoom) {
            try {
                this.panzoom.dispose();
            } catch (error) {
                console.error('Error disposing panzoom:', error);
            }
            this.panzoom = null;
        }
    }

    onFileChange(event: any) {
        if (!event.target.files || event.target.files.length === 0) {
            return;
        }

        this.file = event.target.files[0];
        let reader = new FileReader();
        
        reader.onload = (e) => {
            this.imageSrc = reader.result;
            // Initialize panzoom after image loads
            setTimeout(() => this.initializePanzoom(), 200);
        };

        reader.onerror = (error) => {
            console.error('Error reading file:', error);
            this.imageSrc = '';
        };

        reader.readAsDataURL(this.file);
    }

    onCrop() {
        if (!this.panzoom) {
            console.error('Panzoom not initialized. Please ensure an image is loaded.');
            alert('Please select and load an image before cropping.');
            return;
        }

        if (!this.imageSrc) {
            console.error('No image selected for cropping.');
            alert('Please select an image first.');
            return;
        }

        try {
            const transform = this.panzoom.getTransform();
            console.log('Transform data:', transform);
            
            // Here you would typically implement the actual cropping logic
            // For now, we're just logging the transform data
            
        } catch (error) {
            console.error('Error getting transform data:', error);
            alert('Error occurred while processing the image. Please try again.');
        }
    }
}
