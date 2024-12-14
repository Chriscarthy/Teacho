import { Observable } from '@nativescript/core';
import { User } from '../models/user.model';

export class LearningPlanService extends Observable {
  private currentUser: User;

  constructor() {
    super();
    // Initialize with default user data
    this.currentUser = {
      id: '1',
      name: 'User',
      progress: {},
      learningPlan: {
        currentTopics: ['Math', 'Science'],
        nextTopics: ['History'],
        difficulty: 'beginner'
      }
    };
  }

  updateProgress(topic: string, score: number) {
    if (!this.currentUser.progress[topic]) {
      this.currentUser.progress[topic] = {
        score: 0,
        completedLessons: [],
        quizResults: []
      };
    }
    
    this.currentUser.progress[topic].score = score;
    this.notifyPropertyChange('currentUser', this.currentUser);
  }

  addQuizResult(topic: string, quizId: string, score: number) {
    if (!this.currentUser.progress[topic]) {
      this.currentUser.progress[topic] = {
        score: 0,
        completedLessons: [],
        quizResults: []
      };
    }

    this.currentUser.progress[topic].quizResults.push({
      quizId,
      score,
      date: new Date()
    });
  }

  getCurrentProgress(): any {
    return this.currentUser.progress;
  }

  getLearningPlan(): any {
    return this.currentUser.learningPlan;
  }
}