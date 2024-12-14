export interface User {
  id: string;
  name: string;
  progress: {
    [topic: string]: {
      score: number;
      completedLessons: string[];
      quizResults: {
        quizId: string;
        score: number;
        date: Date;
      }[];
    };
  };
  learningPlan: {
    currentTopics: string[];
    nextTopics: string[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
  };
}