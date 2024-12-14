import { Observable } from '@nativescript/core';
import { Camera } from '@nativescript/camera';
import { ImagePicker } from '@nativescript/imagepicker';
import { AIService } from '../../services/ai.service';

export class QuestionViewModel extends Observable {
  private aiService: AIService;
  public questionText: string = '';
  public answer: string = '';

  constructor() {
    super();
    this.aiService = new AIService();
  }

  async onTakePhoto() {
    try {
      const image = await Camera.takePicture();
      // Process image and send to AI service
      const answer = await this.aiService.analyzeImage(image.toBase64String());
      this.set('answer', answer);
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  }

  async onSelectImage() {
    try {
      const imagePicker = new ImagePicker();
      const selection = await imagePicker.authorize();
      if (selection) {
        const imageAsset = await imagePicker.present();
        if (imageAsset.length > 0) {
          // Process selected image and send to AI service
          const answer = await this.aiService.analyzeImage(imageAsset[0].toBase64String());
          this.set('answer', answer);
        }
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  }

  async onAskQuestion() {
    if (this.questionText.trim()) {
      try {
        const answer = await this.aiService.getAnswer(this.questionText);
        this.set('answer', answer);
      } catch (error) {
        console.error('Error getting answer:', error);
      }
    }
  }
}