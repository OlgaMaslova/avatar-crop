import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'avatar-crop'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('avatar-crop');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1.text-heading')?.textContent?.trim()).toContain('Best tool to crop avatar pictures!');
  });

  it('should set fileSizeError and clear imageSrc when file exceeds 5MB limit', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    const mockFile = { name: 'big.png', size: 6 * 1024 * 1024, type: 'image/png' } as any;
    const mockEvent = { target: { files: [mockFile] } };

    app.onFileChange(mockEvent);

    expect(app.fileSizeError).toEqual('File size exceeds 5MB limit. Please choose a smaller image.');
    expect(app.imageSrc).toEqual('');
  });

  it('should set imageSrc and clear fileSizeError when a valid file is uploaded', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    const mockReader = {
      result: 'data:image/png;base64,abc',
      onload: null as any,
      onerror: null as any,
      readAsDataURL: jasmine.createSpy('readAsDataURL').and.callFake(function(this: any) {
        this.onload();
      })
    };
    spyOn(window as any, 'FileReader').and.returnValue(mockReader);

    const mockFile = { name: 'small.png', size: 1 * 1024 * 1024, type: 'image/png' } as any;
    const mockEvent = { target: { files: [mockFile] } };

    app.onFileChange(mockEvent);

    expect(app.fileSizeError).toEqual('');
    expect(app.imageSrc).toEqual('data:image/png;base64,abc');
  });
});
