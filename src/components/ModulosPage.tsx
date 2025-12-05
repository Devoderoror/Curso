import { Mail, Lock, Users, ShieldAlert, ArrowLeft, ArrowRight } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface ModulosPageProps {
  onNavigate: (page: string) => void;
  onSelectModulo: (moduloId: string) => void;
  completedModulos: string[];
}

export default function ModulosPage({ onNavigate, onSelectModulo, completedModulos }: ModulosPageProps) {
  const modulos = [
    {
      id: 'phishing',
      title: 'Phishing',
      description: 'Aprenda a identificar e evitar tentativas de phishing por email, SMS e redes sociais.',
      icon: Mail,
      color: 'bg-[#DD6B20]',
      topics: ['E-mails fraudulentos', 'Links suspeitos', 'Verificação de remetentes'],
    },
    {
      id: 'senhas',
      title: 'Senhas Seguras',
      description: 'Descubra como criar e gerenciar senhas fortes para proteger suas contas online.',
      icon: Lock,
      color: 'bg-[#2F855A]',
      topics: ['Senhas fortes', 'Gerenciadores de senha', 'Autenticação em duas etapas'],
    },
    {
      id: 'engenharia-social',
      title: 'Engenharia Social',
      description: 'Entenda as táticas de manipulação usadas por criminosos para obter informações.',
      icon: Users,
      color: 'bg-[#1A365D]',
      topics: ['Técnicas de manipulação', 'Pretexting', 'Proteção de dados pessoais'],
    },
    {
      id: 'ransomware',
      title: 'Ransomware',
      description: 'Saiba como se proteger de ataques que podem sequestrar seus dados e arquivos.',
      icon: ShieldAlert,
      color: 'bg-[#C53030]',
      topics: ['O que é ransomware', 'Como se propaga', 'Prevenção e backup'],
    },
  ];

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
          <h1 className="text-white mb-8">Módulos Educacionais</h1>
          <p className="text-xl opacity-90">
            Escolha um módulo para começar seu aprendizado
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-16 py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          {modulos.map((modulo) => {
            const Icon = modulo.icon;
            const isCompleted = completedModulos.includes(modulo.id);
            
            return (
              <Card
                key={modulo.id}
                className="p-24 hover:shadow-lg transition-all hover:scale-105 border-2 bg-[var(--color-card-bg)] border-[var(--color-border)]"
              >
                <div className="flex items-start justify-between mb-16">
                  <div className={`${modulo.color} w-16 h-16 rounded-lg flex items-center justify-center`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  {isCompleted && (
                    <Badge className="bg-[#2F855A] text-white">Concluído</Badge>
                  )}
                </div>
                
                <h3 className="text-[var(--color-text)] mb-16">{modulo.title}</h3>
                <p className="text-[var(--color-text)] opacity-70 mb-24">{modulo.description}</p>
                
                <div className="mb-24">
                  <h4 className="text-[var(--color-text)] mb-12">Tópicos abordados:</h4>
                  <ul className="space-y-8">
                    {modulo.topics.map((topic, index) => (
                      <li key={index} className="text-[var(--color-text)] opacity-70 flex items-center gap-8">
                        <div className="w-2 h-2 rounded-full bg-[#2F855A]" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button
                  className="w-full bg-[#1A365D] hover:bg-[#2D3E63] text-white"
                  onClick={() => onSelectModulo(modulo.id)}
                >
                  {isCompleted ? 'Revisar Módulo' : 'Começar Módulo'}
                  <ArrowRight className="w-5 h-5 ml-8" />
                </Button>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}