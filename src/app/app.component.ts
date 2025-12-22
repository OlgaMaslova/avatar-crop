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
    isLoading: boolean = false;
    errorMessage: string = '';
    
    // Maximum file size in bytes (5MB)
    readonly MAX_FILE_SIZE = 5 * 1024 * 1024;

    ngOnInit() {
        const maskElement = document.getElementById('image')
        if(maskElement) {
            this.panzoom = panzoom(maskElement!); 
        }
        
    }

    onFileChange(event: any) {
        this.file = event.target.files[0];
        this.errorMessage = '';
        
        if (!this.file) {
            return;
        }
        
        // Validate file size
        if (this.file.size > this.MAX_FILE_SIZE) {
            this.errorMessage = `File size (${(this.file.size / (1024 * 1024)).toFixed(1)}MB) exceeds the maximum limit of 5MB. Please resize or compress your image, or convert TIFF files to JPEG/PNG format.`;
            this.imageSrc = '';
            return;
        }
        
        // Show loading state
        this.isLoading = true;
        
        let reader = new FileReader();
        
        // Handle successful load
        reader.onload = (e) => {
            this.imageSrc = reader.result;
            this.isLoading = false;
            
            // Initialize panzoom after image loads
            setTimeout(() => {
                const imageElement = document.getElementById('image');
                if (imageElement && this.panzoom) {
                    this.panzoom.dispose();
                }
                if (imageElement) {
                    this.panzoom = panzoom(imageElement);
                }
            }, 100);
        };
        
        // Handle errors
        reader.onerror = () => {
            this.isLoading = false;
            this.errorMessage = 'Failed to load the image. The file may be corrupted or in an unsupported format.';
            this.imageSrc = '';
        };
        
        // Handle abort
        reader.onabort = () => {
            this.isLoading = false;
            this.errorMessage = 'Image loading was cancelled.';
            this.imageSrc = '';
        };
        
        try {
            reader.readAsDataURL(this.file);
        } catch (error) {
            this.isLoading = false;
            this.errorMessage = 'An error occurred while processing the image.';
            this.imageSrc = '';
        }
    }

    onCrop() {
        console.log(this.panzoom.getTransform());
    }

    onImageLoad() {
        // Image loaded successfully, panzoom is already initialized in onFileChange
    }
    
    onImageError() {
        this.errorMessage = 'Failed to display the image. Please try a different file.';
        this.imageSrc = '';
        this.isLoading = false;
    }
}
