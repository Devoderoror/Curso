// Local Storage Manager for persisting user data

export interface UserProgress {
  completedModulos: string[];
  scores: Record<string, number>;
  totalPoints: number;
  level: number;
  achievements: string[];
  quizAttempts: Record<string, number>;
  lastAccess: string;
}

const STORAGE_KEY = 'cybersecurity_app_data';

export const defaultUserProgress: UserProgress = {
  completedModulos: [],
  scores: {},
  totalPoints: 0,
  level: 1,
  achievements: [],
  quizAttempts: {},
  lastAccess: new Date().toISOString(),
};

export const loadUserProgress = (): UserProgress => {
  try {
    if (typeof window === 'undefined') return defaultUserProgress;
    
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return defaultUserProgress;
    
    const parsed = JSON.parse(data);
    return {
      ...defaultUserProgress,
      ...parsed,
      lastAccess: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error loading user progress:', error);
    return defaultUserProgress;
  }
};

export const saveUserProgress = (progress: UserProgress): void => {
  try {
    if (typeof window === 'undefined') return;
    
    const dataToSave = {
      ...progress,
      lastAccess: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  } catch (error) {
    console.error('Error saving user progress:', error);
  }
};

export const clearUserProgress = (): void => {
  try {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing user progress:', error);
  }
};

// Points system
export const POINTS = {
  COMPLETE_MODULE: 100,
  PERFECT_QUIZ: 50,
  FIRST_TRY_SUCCESS: 25,
  QUIZ_ATTEMPT: 10,
};

export const calculateLevel = (points: number): number => {
  // Level up every 250 points
  return Math.floor(points / 250) + 1;
};

export const getPointsForNextLevel = (currentPoints: number): number => {
  const currentLevel = calculateLevel(currentPoints);
  return currentLevel * 250;
};

export const getPointsInCurrentLevel = (totalPoints: number): number => {
  const level = calculateLevel(totalPoints);
  const pointsForPreviousLevel = (level - 1) * 250;
  return totalPoints - pointsForPreviousLevel;
};
