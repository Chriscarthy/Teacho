import { Observable } from '@nativescript/core';
import { AIService } from '../../services/ai.service';

export class HomeViewModel extends Observable {
  private aiService: AIService;
  public welcomeMessage: string;
  public learningStatus: string;

  constructor() {
    super();
    this.aiService = new AIService();
    this.welcomeMessage = "Welcome back!";
    this.learningStatus = "You're making great progress!";
  }

  onAskQuestion() {
    // Navigate to question page
  }

  onPracticeTests() {
    // Navigate to practice tests
  }

  onLearningPlan() {
    // Navigate to learning plan
  }

  onCommunity() {
    // Navigate to community forum
  }
}