import { AIService } from './ai.service';

export class QuizService {
  private aiService: AIService;

  constructor() {
    this.aiService = new AIService();
  }

  async generateQuiz(topic: string, difficulty: string): Promise<any> {
    try {
      const quiz = await this.aiService.generateQuiz(topic, difficulty);
      return this.parseQuizResponse(quiz);
    } catch (error) {
      console.error('Error generating quiz:', error);
      throw error;
    }
  }

  private parseQuizResponse(response: string): any {
    // Parse the AI response into a structured quiz format
    // This is a simplified implementation
    return {
      questions: response.split('\n\n').map((q, index) => ({
        id: index + 1,
        question: q,
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 'A'
      }))
    };
  }
}