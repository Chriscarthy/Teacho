import { GenerativeAI } from '@google/generative-ai';

export class AIService {
  private genAI: GenerativeAI;

  constructor() {
    this.genAI = new GenerativeAI('AIzaSyD7ziBu7VPnHMx4cvmVOOzz32DvLb34u_I');
  }

  async analyzeImage(imageBase64: string): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-pro-vision' });
      const result = await model.generateContent([imageBase64]);
      return result.response.text();
    } catch (error) {
      console.error('Error analyzing image:', error);
      throw error;
    }
  }

  async getAnswer(question: string): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
      const result = await model.generateContent(question);
      return result.response.text();
    } catch (error) {
      console.error('Error getting answer:', error);
      throw error;
    }
  }

  async generateQuiz(topic: string, difficulty: string): Promise<any> {
    const prompt = `Generate a quiz about ${topic} at ${difficulty} level with 5 multiple choice questions.`;
    return this.getAnswer(prompt);
  }
}