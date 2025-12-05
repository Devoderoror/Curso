import { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import ModulosPage from './components/ModulosPage';
import ModuloContent from './components/ModuloContent';
import QuizPage from './components/QuizPage';
import DashboardPage from './components/DashboardPage';
import DicasPage from './components/DicasPage';
import RankingPage from './components/RankingPage';
import ThemeToggle from './components/ThemeToggle';
import AchievementNotification from './components/AchievementNotification';
import { loadUserProgress, saveUserProgress, UserProgress, POINTS, calculateLevel, defaultUserProgress } from './lib/storage';
import { checkNewAchievements, getAchievementById } from './lib/achievements';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedModulo, setSelectedModulo] = useState<string>('');
  const [userProgress, setUserProgress] = useState<UserProgress>(defaultUserProgress);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [newAchievements, setNewAchievements] = useState<string[]>([]);

  // Load user progress on mount
  useEffect(() => {
    const progress = loadUserProgress();
    setUserProgress(progress);

    // Load theme preference
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Save user progress whenever it changes
  useEffect(() => {
    saveUserProgress(userProgress);
  }, [userProgress]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const handleSelectModulo = (moduloId: string) => {
    setSelectedModulo(moduloId);
    setCurrentPage('modulo-content');
  };

  const handleStartQuiz = (moduloId: string) => {
    setSelectedModulo(moduloId);
    setCurrentPage('quiz');

    // Increment quiz attempts
    setUserProgress(prev => ({
      ...prev,
      quizAttempts: {
        ...prev.quizAttempts,
        [moduloId]: (prev.quizAttempts[moduloId] || 0) + 1,
      },
    }));
  };

  const handleQuizComplete = (moduloId: string, score: number) => {
    if (score >= 70) {
      let pointsEarned = 0;
      const wasAlreadyCompleted = userProgress.completedModulos.includes(moduloId);
      
      // Points for completing module (only first time)
      if (!wasAlreadyCompleted) {
        pointsEarned += POINTS.COMPLETE_MODULE;
      }

      // Points for quiz score
      if (score === 100) {
        pointsEarned += POINTS.PERFECT_QUIZ;
      }

      // Bonus for first try success
      if (userProgress.quizAttempts[moduloId] === 1) {
        pointsEarned += POINTS.FIRST_TRY_SUCCESS;
      }

      // Base points for attempting quiz
      pointsEarned += POINTS.QUIZ_ATTEMPT;

      const newCompletedModulos = wasAlreadyCompleted 
        ? userProgress.completedModulos 
        : [...userProgress.completedModulos, moduloId];

      const newScores = { ...userProgress.scores, [moduloId]: Math.max(score, userProgress.scores[moduloId] || 0) };
      const newTotalPoints = userProgress.totalPoints + pointsEarned;
      const newLevel = calculateLevel(newTotalPoints);

      // Check for new achievements
      const achievementData = {
        completedModulos: newCompletedModulos,
        scores: newScores,
        totalPoints: newTotalPoints,
        quizAttempts: userProgress.quizAttempts,
      };

      const unlockedAchievements = checkNewAchievements(userProgress.achievements, achievementData);
      
      // Add points from achievements
      let achievementPoints = 0;
      unlockedAchievements.forEach(achievementId => {
        const achievement = getAchievementById(achievementId);
        if (achievement) {
          achievementPoints += achievement.points;
        }
      });

      const finalTotalPoints = newTotalPoints + achievementPoints;
      const finalLevel = calculateLevel(finalTotalPoints);

      setUserProgress(prev => ({
        ...prev,
        completedModulos: newCompletedModulos,
        scores: newScores,
        totalPoints: finalTotalPoints,
        level: finalLevel,
        achievements: [...prev.achievements, ...unlockedAchievements],
      }));

      // Show achievement notifications
      if (unlockedAchievements.length > 0) {
        setNewAchievements(unlockedAchievements);
      }
    }
  };

  const handleToggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleCloseAchievement = () => {
    setNewAchievements(prev => prev.slice(1));
  };

  // Calculate user rank (mock - in a real app would come from backend)
  const getUserRank = () => {
    const baseRank = 6 - Math.min(userProgress.completedModulos.length, 5);
    return baseRank;
  };

  return (
    <div className="min-h-screen">
      <ThemeToggle theme={theme} onToggle={handleToggleTheme} />

      {newAchievements.length > 0 && (
        <AchievementNotification
          achievementId={newAchievements[0]}
          onClose={handleCloseAchievement}
        />
      )}

      {currentPage === 'home' && (
        <HomePage
          onNavigate={handleNavigate}
          userLevel={userProgress.level}
          userPoints={userProgress.totalPoints}
        />
      )}

      {currentPage === 'modulos' && (
        <ModulosPage
          onNavigate={handleNavigate}
          onSelectModulo={handleSelectModulo}
          completedModulos={userProgress.completedModulos}
        />
      )}

      {currentPage === 'modulo-content' && selectedModulo && (
        <ModuloContent
          moduloId={selectedModulo}
          onNavigate={handleNavigate}
          onStartQuiz={handleStartQuiz}
        />
      )}

      {currentPage === 'quiz' && selectedModulo && (
        <QuizPage
          moduloId={selectedModulo}
          onNavigate={handleNavigate}
          onComplete={handleQuizComplete}
        />
      )}

      {currentPage === 'dashboard' && (
        <DashboardPage
          onNavigate={handleNavigate}
          completedModulos={userProgress.completedModulos}
          scores={userProgress.scores}
          totalPoints={userProgress.totalPoints}
          level={userProgress.level}
          achievements={userProgress.achievements}
        />
      )}

      {currentPage === 'ranking' && (
        <RankingPage
          onNavigate={handleNavigate}
          userLevel={userProgress.level}
          userPoints={userProgress.totalPoints}
          userRank={getUserRank()}
        />
      )}

      {currentPage === 'dicas' && (
        <DicasPage onNavigate={handleNavigate} />
      )}
    </div>
  );
}
