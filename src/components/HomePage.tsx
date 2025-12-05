import { Shield, BookOpen, Trophy, Lightbulb } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

interface HomePageProps {
  onNavigate: (page: string) => void;
  userLevel: number;
  userPoints: number;
}

export default function HomePage({ onNavigate, userLevel, userPoints }: HomePageProps) {
  const menuItems = [
    {
      id: 'modulos',
      title: 'Módulos Educacionais',
      description: 'Aprenda sobre diferentes tipos de ameaças cibernéticas',
      icon: BookOpen,
      color: 'bg-[#1A365D]',
    },
    {
      id: 'dashboard',
      title: 'Meu Progresso',
      description: 'Acompanhe seu desenvolvimento e conquistas',
      icon: Trophy,
      color: 'bg-[#2F855A]',
    },
    {
      id: 'dicas',
      title: 'Dicas Rápidas',
      description: 'Práticas essenciais de segurança digital',
      icon: Lightbulb,
      color: 'bg-[#DD6B20]',
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-neutral)]">
      <header className="bg-gradient-to-r from-[#1A365D] to-[#2D4A7C] text-white py-24 px-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-24">
            <div className="flex items-center gap-16">
              <Shield className="w-24 h-24" />
              <div>
                <h1 className="text-white mb-16">Segurança Digital</h1>
                <p className="text-xl opacity-90">
                  Aprenda a proteger-se no mundo digital
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-80 mb-4">Nível {userLevel}</div>
              <div className="text-2xl" style={{ fontWeight: 700 }}>{userPoints} pontos</div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-16 py-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.id}
                className="p-24 hover:shadow-lg transition-all hover:scale-105 cursor-pointer border-2 bg-[var(--color-card-bg)] border-[var(--color-border)]"
                onClick={() => onNavigate(item.id)}
              >
                <div className={`${item.color} w-16 h-16 rounded-lg flex items-center justify-center mb-24`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-[var(--color-text)] mb-16">{item.title}</h3>
                <p className="text-[var(--color-text)] opacity-70 mb-24">{item.description}</p>
                <Button
                  className="w-full bg-[#1A365D] hover:bg-[#2D3E63] text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate(item.id);
                  }}
                >
                  Acessar
                </Button>
              </Card>
            );
          })}
        </div>

        <div className="mt-48 bg-[var(--color-card-bg)] p-32 rounded-lg border-2 border-[#2F855A]">
          <h2 className="text-[var(--color-text)] mb-16">Bem-vindo ao treinamento de segurança digital!</h2>
          <p className="text-[var(--color-text)] opacity-80 mb-16">
            Este aplicativo foi desenvolvido para ajudá-lo a compreender as principais ameaças 
            cibernéticas e como se proteger delas. Através de módulos educacionais, quizzes 
            interativos e dicas práticas, você aprenderá a navegar com segurança no ambiente digital.
          </p>
          <p className="text-[var(--color-text)] opacity-80">
            Escolha um dos módulos acima para começar sua jornada de aprendizado!
          </p>
        </div>
      </main>
    </div>
  );
}