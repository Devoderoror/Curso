import { ArrowLeft, Trophy, Target, BookOpen, TrendingUp, Award, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { ACHIEVEMENTS } from "../lib/achievements";
import { getPointsForNextLevel, getPointsInCurrentLevel } from "../lib/storage";

interface DashboardPageProps {
  onNavigate: (page: string) => void;
  completedModulos: string[];
  scores: Record<string, number>;
  totalPoints: number;
  level: number;
  achievements: string[];
}

export default function DashboardPage({ onNavigate, completedModulos, scores, totalPoints, level, achievements }: DashboardPageProps) {
  const modulos = [
    { id: 'phishing', title: 'Phishing', color: 'bg-[#DD6B20]' },
    { id: 'senhas', title: 'Senhas Seguras', color: 'bg-[#2F855A]' },
    { id: 'engenharia-social', title: 'Engenharia Social', color: 'bg-[#1A365D]' },
    { id: 'ransomware', title: 'Ransomware', color: 'bg-[#C53030]' },
  ];

  const totalModulos = modulos.length;
  const completedCount = completedModulos.length;
  const overallProgress = (completedCount / totalModulos) * 100;
  
  const averageScore = completedCount > 0
    ? Object.values(scores).reduce((a, b) => a + b, 0) / completedCount
    : 0;

  const pointsForNextLevel = getPointsForNextLevel(totalPoints);
  const pointsInCurrentLevel = getPointsInCurrentLevel(totalPoints);
  const pointsNeededForNextLevel = pointsForNextLevel - totalPoints;
  const levelProgress = (pointsInCurrentLevel / 250) * 100;

  const unlockedAchievements = ACHIEVEMENTS.filter(a => achievements.includes(a.id));
  const lockedAchievements = ACHIEVEMENTS.filter(a => !achievements.includes(a.id));

  return (
    <div className="min-h-screen bg-[var(--color-neutral)]">
      <header className="bg-gradient-to-r from-[#1A365D] to-[#2D4A7C] text-white py-24 px-16">
        <div className="max-w-6xl mx-auto">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 mb-16"
            onClick={() => onNavigate('home')}
          >
            <ArrowLeft className="w-5 h-5 mr-8" />
            Voltar
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white mb-8">Meu Progresso</h1>
              <p className="text-xl opacity-90">
                Acompanhe seu desenvolvimento em segurança digital
              </p>
            </div>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              onClick={() => onNavigate('ranking')}
            >
              <Trophy className="w-5 h-5 mr-8" />
              Ver Ranking
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-16 py-32">
        {/* Level Card */}
        <Card className="p-32 mb-32 bg-gradient-to-r from-[#1A365D] to-[#2D4A7C] text-white border-2 border-[#2F855A]">
          <div className="flex items-center justify-between mb-24">
            <div className="flex items-center gap-16">
              <div className="bg-[#2F855A] w-20 h-20 rounded-full flex items-center justify-center">
                <Zap className="w-10 h-10" />
              </div>
              <div>
                <div className="text-sm opacity-80 mb-4">Nível Atual</div>
                <div className="text-4xl" style={{ fontWeight: 700 }}>Nível {level}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-80 mb-4">Pontos Totais</div>
              <div className="text-3xl" style={{ fontWeight: 700 }}>{totalPoints}</div>
            </div>
          </div>
          <div className="space-y-8">
            <div className="flex justify-between text-sm opacity-90">
              <span>{pointsInCurrentLevel} / 250 pontos</span>
              <span>{pointsNeededForNextLevel} pontos para o nível {level + 1}</span>
            </div>
            <Progress value={levelProgress} className="bg-white/20 h-3" />
          </div>
        </Card>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-24 mb-32">
          <Card className="p-24 border-2 bg-[var(--color-card-bg)] border-[var(--color-border)]">
            <div className="flex items-center gap-16 mb-16">
              <div className="bg-[#1A365D] w-12 h-12 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-[var(--color-text)]">Módulos Concluídos</h4>
            </div>
            <div className="text-4xl mb-8" style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
              {completedCount}/{totalModulos}
            </div>
            <Progress value={overallProgress} className="bg-gray-200" />
          </Card>

          <Card className="p-24 border-2 bg-[var(--color-card-bg)] border-[var(--color-border)]">
            <div className="flex items-center gap-16 mb-16">
              <div className="bg-[#2F855A] w-12 h-12 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-[var(--color-text)]">Média Geral</h4>
            </div>
            <div className="text-4xl mb-8" style={{ fontWeight: 700, color: '#2F855A' }}>
              {averageScore.toFixed(0)}%
            </div>
            <p className="text-[var(--color-text)] opacity-70">
              {averageScore >= 90 ? 'Excelente!' : averageScore >= 70 ? 'Bom trabalho!' : 'Continue praticando!'}
            </p>
          </Card>

          <Card className="p-24 border-2 bg-[var(--color-card-bg)] border-[var(--color-border)]">
            <div className="flex items-center gap-16 mb-16">
              <div className="bg-[#DD6B20] w-12 h-12 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-[var(--color-text)]">Conquistas</h4>
            </div>
            <div className="text-4xl mb-8" style={{ fontWeight: 700, color: '#DD6B20' }}>
              {achievements.length}/{ACHIEVEMENTS.length}
            </div>
            <p className="text-[var(--color-text)] opacity-70">Desbloqueadas</p>
          </Card>
        </div>

        {/* Module Progress */}
        <Card className="p-32 mb-32 border-2 bg-[var(--color-card-bg)] border-[var(--color-border)]">
          <h2 className="text-[var(--color-text)] mb-24">Progresso por Módulo</h2>
          <div className="space-y-24">
            {modulos.map((modulo) => {
              const isCompleted = completedModulos.includes(modulo.id);
              const score = scores[modulo.id] || 0;

              return (
                <div key={modulo.id} className="flex items-center gap-16">
                  <div className={`${modulo.color} w-12 h-12 rounded-lg flex-shrink-0`} />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-8">
                      <h4 className="text-[var(--color-text)]">{modulo.title}</h4>
                      {isCompleted && (
                        <Badge className="bg-[#2F855A] text-white">
                          {score.toFixed(0)}% - Concluído
                        </Badge>
                      )}
                      {!isCompleted && (
                        <Badge variant="outline" className="border-[var(--color-border)] text-[var(--color-text)] opacity-60">
                          Não iniciado
                        </Badge>
                      )}
                    </div>
                    <Progress 
                      value={isCompleted ? 100 : 0} 
                      className="bg-gray-200"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Achievements */}
        <Card className="p-32 border-2 bg-[var(--color-card-bg)] border-[var(--color-border)]">
          <h2 className="text-[var(--color-text)] mb-24">Conquistas</h2>
          
          {unlockedAchievements.length > 0 && (
            <>
              <h3 className="text-[var(--color-text)] mb-16">Desbloqueadas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-32">
                {unlockedAchievements.map((achievement) => {
                  const Icon = achievement.icon;
                  return (
                    <div
                      key={achievement.id}
                      className="p-24 rounded-lg border-2 border-[#2F855A] bg-gradient-to-br from-[#F0FFF4] to-white dark:from-[#1E4620] dark:to-[var(--color-card-bg)]"
                    >
                      <div className="flex items-start gap-16">
                        <div className="bg-[#2F855A] w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-[#2F855A] mb-4">{achievement.title}</h4>
                          <p className="text-[var(--color-text)] opacity-70 text-sm mb-8">{achievement.description}</p>
                          <Badge className="bg-[#2F855A] text-white">+{achievement.points} pontos</Badge>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {lockedAchievements.length > 0 && (
            <>
              <h3 className="text-[var(--color-text)] mb-16 opacity-70">Bloqueadas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                {lockedAchievements.slice(0, 6).map((achievement) => {
                  const Icon = achievement.icon;
                  return (
                    <div
                      key={achievement.id}
                      className="p-24 rounded-lg border-2 border-[var(--color-border)] bg-[var(--color-secondary-bg)] opacity-60"
                    >
                      <div className="flex items-start gap-16">
                        <div className="bg-gray-400 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-[var(--color-text)] mb-4">{achievement.title}</h4>
                          <p className="text-[var(--color-text)] opacity-70 text-sm mb-8">{achievement.description}</p>
                          <Badge variant="outline" className="border-[var(--color-border)]">+{achievement.points} pontos</Badge>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </Card>

        {completedCount < totalModulos && (
          <div className="mt-32 text-center">
            <Button
              className="bg-[#1A365D] hover:bg-[#2D3E63] text-white"
              onClick={() => onNavigate('modulos')}
            >
              Continuar Aprendendo
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
