import { ArrowLeft, Trophy, Medal, Award, Crown } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface RankingPageProps {
  onNavigate: (page: string) => void;
  userLevel: number;
  userPoints: number;
  userRank: number;
}

export default function RankingPage({ onNavigate, userLevel, userPoints, userRank }: RankingPageProps) {
  // Mock leaderboard data - in a real app, this would come from a backend
  const leaderboard = [
    { name: 'Você', level: userLevel, points: userPoints, rank: userRank, isUser: true },
    { name: 'Ana Silva', level: 8, points: 1950, rank: 1, isUser: false },
    { name: 'Carlos Santos', level: 7, points: 1680, rank: 2, isUser: false },
    { name: 'Maria Oliveira', level: 6, points: 1450, rank: 3, isUser: false },
    { name: 'João Costa', level: 6, points: 1390, rank: 4, isUser: false },
    { name: 'Pedro Alves', level: 5, points: 1150, rank: 5, isUser: false },
  ].sort((a, b) => b.points - a.points);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-[#FFD700]" />;
      case 2:
        return <Medal className="w-6 h-6 text-[#C0C0C0]" />;
      case 3:
        return <Medal className="w-6 h-6 text-[#CD7F32]" />;
      default:
        return <Award className="w-6 h-6 text-gray-400" />;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 3:
        return 'bg-gradient-to-r from-orange-400 to-orange-600';
      default:
        return 'bg-gray-200 dark:bg-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-neutral)]">
      <header className="bg-gradient-to-r from-[#1A365D] to-[#2D4A7C] text-white py-24 px-16">
        <div className="max-w-6xl mx-auto">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 mb-16"
            onClick={() => onNavigate('dashboard')}
          >
            <ArrowLeft className="w-5 h-5 mr-8" />
            Voltar
          </Button>
          <div className="flex items-center gap-16">
            <Trophy className="w-16 h-16" />
            <div>
              <h1 className="text-white mb-8">Ranking Global</h1>
              <p className="text-xl opacity-90">
                Veja sua posição entre os aprendizes de segurança digital
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-16 py-32">
        <Card className="p-32 mb-32 bg-[var(--color-card-bg)] border-2 border-[var(--color-border)]">
          <h2 className="text-[var(--color-text)] mb-24">Sua Posição</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
            <div className="text-center p-24 rounded-lg bg-[var(--color-secondary-bg)]">
              <div className="text-4xl mb-8" style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                #{userRank}
              </div>
              <p className="text-[var(--color-text)] opacity-70">Classificação</p>
            </div>
            <div className="text-center p-24 rounded-lg bg-[var(--color-secondary-bg)]">
              <div className="text-4xl mb-8" style={{ fontWeight: 700, color: '#2F855A' }}>
                Nível {userLevel}
              </div>
              <p className="text-[var(--color-text)] opacity-70">Nível Atual</p>
            </div>
            <div className="text-center p-24 rounded-lg bg-[var(--color-secondary-bg)]">
              <div className="text-4xl mb-8" style={{ fontWeight: 700, color: '#DD6B20' }}>
                {userPoints}
              </div>
              <p className="text-[var(--color-text)] opacity-70">Pontos Totais</p>
            </div>
          </div>
        </Card>

        <Card className="p-32 bg-[var(--color-card-bg)] border-2 border-[var(--color-border)]">
          <div className="flex items-center justify-between mb-24">
            <h2 className="text-[var(--color-text)]">Top Aprendizes</h2>
            <Badge className="bg-[#1A365D] text-white">Atualizado hoje</Badge>
          </div>

          <div className="space-y-16">
            {leaderboard.map((entry, index) => (
              <div
                key={index}
                className={`flex items-center gap-16 p-20 rounded-lg transition-all ${
                  entry.isUser
                    ? 'bg-gradient-to-r from-[#1A365D]/20 to-[#2F855A]/20 border-2 border-[#2F855A] shadow-lg'
                    : 'bg-[var(--color-secondary-bg)] hover:shadow-md'
                }`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${getRankColor(entry.rank)}`}>
                  {getRankIcon(entry.rank)}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-12 mb-4">
                    <h4 className="text-[var(--color-text)]">{entry.name}</h4>
                    {entry.isUser && (
                      <Badge className="bg-[#2F855A] text-white">Você</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-16 text-sm text-[var(--color-text)] opacity-70">
                    <span>Nível {entry.level}</span>
                    <span>•</span>
                    <span>{entry.points} pontos</span>
                  </div>
                </div>

                <div className="text-2xl" style={{ fontWeight: 700, color: 'var(--color-text)', opacity: 0.5 }}>
                  #{entry.rank}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-32 mt-32 bg-[var(--color-secondary-bg)] border-2 border-[var(--color-primary)]">
          <h3 className="text-[var(--color-primary)] mb-16">Como Subir no Ranking</h3>
          <ul className="space-y-12 text-[var(--color-text)]">
            <li className="flex items-start gap-12">
              <div className="w-2 h-2 rounded-full bg-[#2F855A] mt-8 flex-shrink-0" />
              <span>Complete todos os módulos educacionais (100 pontos cada)</span>
            </li>
            <li className="flex items-start gap-12">
              <div className="w-2 h-2 rounded-full bg-[#2F855A] mt-8 flex-shrink-0" />
              <span>Obtenha pontuações altas nos quizzes (até 50 pontos por quiz perfeito)</span>
            </li>
            <li className="flex items-start gap-12">
              <div className="w-2 h-2 rounded-full bg-[#2F855A] mt-8 flex-shrink-0" />
              <span>Desbloqueie conquistas especiais (25-150 pontos cada)</span>
            </li>
            <li className="flex items-start gap-12">
              <div className="w-2 h-2 rounded-full bg-[#2F855A] mt-8 flex-shrink-0" />
              <span>Passe nos quizzes na primeira tentativa (25 pontos bônus)</span>
            </li>
          </ul>
        </Card>
      </main>
    </div>
  );
}
