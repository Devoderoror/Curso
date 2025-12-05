import { BookOpen, Target, TrendingUp, Trophy, Star, Zap, Award, Crown, Flame, Rocket } from "lucide-react";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  points: number;
  condition: (data: {
    completedModulos: string[];
    scores: Record<string, number>;
    totalPoints: number;
    quizAttempts: Record<string, number>;
  }) => boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-module',
    title: 'Primeiro Passo',
    description: 'Complete seu primeiro módulo',
    icon: BookOpen,
    points: 25,
    condition: (data) => data.completedModulos.length >= 1,
  },
  {
    id: 'half-way',
    title: 'No Caminho Certo',
    description: 'Complete metade dos módulos',
    icon: Target,
    points: 50,
    condition: (data) => data.completedModulos.length >= 2,
  },
  {
    id: 'high-score',
    title: 'Excelência',
    description: 'Obtenha 90% ou mais em um quiz',
    icon: TrendingUp,
    points: 50,
    condition: (data) => Object.values(data.scores).some(score => score >= 90),
  },
  {
    id: 'complete-all',
    title: 'Expert em Segurança',
    description: 'Complete todos os 4 módulos',
    icon: Trophy,
    points: 100,
    condition: (data) => data.completedModulos.length === 4,
  },
  {
    id: 'perfect-score',
    title: 'Perfeição Absoluta',
    description: 'Obtenha 100% em qualquer quiz',
    icon: Star,
    points: 75,
    condition: (data) => Object.values(data.scores).some(score => score === 100),
  },
  {
    id: 'speed-learner',
    title: 'Aprendiz Veloz',
    description: 'Complete um módulo sem repetir o quiz',
    icon: Zap,
    points: 40,
    condition: (data) => {
      return data.completedModulos.some(modulo => (data.quizAttempts[modulo] || 0) === 1);
    },
  },
  {
    id: 'all-perfect',
    title: 'Mestre Absoluto',
    description: 'Obtenha 90% ou mais em todos os quizzes',
    icon: Crown,
    points: 150,
    condition: (data) => {
      const scores = Object.values(data.scores);
      return scores.length === 4 && scores.every(score => score >= 90);
    },
  },
  {
    id: 'dedicated',
    title: 'Dedicação Total',
    description: 'Alcance nível 5',
    icon: Award,
    points: 100,
    condition: (data) => {
      const level = Math.floor(data.totalPoints / 250) + 1;
      return level >= 5;
    },
  },
  {
    id: 'persistent',
    title: 'Persistência',
    description: 'Tente um quiz 3 vezes até passar',
    icon: Flame,
    points: 30,
    condition: (data) => {
      return Object.values(data.quizAttempts).some(attempts => attempts >= 3);
    },
  },
  {
    id: 'points-collector',
    title: 'Colecionador de Pontos',
    description: 'Acumule 1000 pontos',
    icon: Rocket,
    points: 50,
    condition: (data) => data.totalPoints >= 1000,
  },
];

export const checkNewAchievements = (
  currentAchievements: string[],
  data: {
    completedModulos: string[];
    scores: Record<string, number>;
    totalPoints: number;
    quizAttempts: Record<string, number>;
  }
): string[] => {
  const newAchievements: string[] = [];

  ACHIEVEMENTS.forEach((achievement) => {
    if (!currentAchievements.includes(achievement.id) && achievement.condition(data)) {
      newAchievements.push(achievement.id);
    }
  });

  return newAchievements;
};

export const getAchievementById = (id: string): Achievement | undefined => {
  return ACHIEVEMENTS.find(a => a.id === id);
};
