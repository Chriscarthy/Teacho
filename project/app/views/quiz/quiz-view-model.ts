import { Observable } from '@nativescript/core';
import { QuizService } from '../../services/quiz.service';
import { LearningPlanService } from '../../services/learning-plan.service';

export class QuizViewModel extends Observable {
  private quizService: QuizService;
  private learningPlanService: LearningPlanService;
  private questions: any[];
  private currentIndex: number;
  
  public currentQuestion: any;
  public feedback: string;
  public showNextButton: boolean;

  constructor() {
    super();
    this.quizService = new QuizService();
    this.learningPlanService = new LearningPlanService();
    this.currentIndex = 0;
    this.showNextButton = false;
    this.initializeQuiz();
  }

  async initializeQuiz() {
    try {
      const quiz = await this.quizService.generateQuiz('Math', 'beginner');
      this.questions = quiz.questions;
      this.setCurrentQuestion();
    } catch (error) {
      console.error('Error initializing quiz:', error);
    }
  }

  onAnswerSelected(args: any) {
    const selectedAnswer = args.object.text;
    const isCorrect = selectedAnswer === this.currentQuestion.correctAnswer;
    
    this.set('feedback', isCorrect ? 'Correct!' : 'Incorrect. Try again!');
    this.set('showNextButton', true);
  }

  onNextQuestion() {
    this.currentIndex++;
    if (this.currentIndex < this.questions.length) {
      this.setCurrentQuestion();
    } else {
      // Quiz completed
      this.learningPlanService.addQuizResult('Math', '1', 80);
    }
  }

  private setCurrentQuestion() {
    this.set('currentQuestion', this.questions[this.currentIndex]);
    this.set('feedback', '');
    this.set('showNextButton', false);
  }
}