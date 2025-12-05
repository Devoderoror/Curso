import { ArrowLeft, Shield, Lock, Eye, Wifi, Smartphone, HardDrive, Mail, AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface DicasPageProps {
  onNavigate: (page: string) => void;
}

export default function DicasPage({ onNavigate }: DicasPageProps) {
  const dicas = [
    {
      category: 'Senhas e Autenticação',
      icon: Lock,
      color: 'bg-[#2F855A]',
      tips: [
        'Use senhas únicas para cada conta importante',
        'Ative autenticação de dois fatores (2FA) sempre que disponível',
        'Utilize um gerenciador de senhas confiável',
        'Nunca compartilhe suas senhas com ninguém',
        'Altere senhas comprometidas imediatamente',
      ],
    },
    {
      category: 'Navegação Segura',
      icon: Shield,
      color: 'bg-[#1A365D]',
      tips: [
        'Verifique se sites usam HTTPS (cadeado no navegador)',
        'Evite clicar em links suspeitos ou encurtados',
        'Use navegação privada para dados sensíveis em computadores públicos',
        'Mantenha seu navegador sempre atualizado',
        'Desconfie de pop-ups e janelas inesperadas',
      ],
    },
    {
      category: 'Email e Comunicação',
      icon: Mail,
      color: 'bg-[#DD6B20]',
      tips: [
        'Não abra anexos de remetentes desconhecidos',
        'Verifique cuidadosamente o endereço do remetente',
        'Desconfie de mensagens urgentes pedindo ação imediata',
        'Nunca forneça informações confidenciais por email',
        'Reporte emails suspeitos como spam ou phishing',
      ],
    },
    {
      category: 'Redes Wi-Fi',
      icon: Wifi,
      color: 'bg-[#805AD5]',
      tips: [
        'Evite redes Wi-Fi públicas para transações bancárias',
        'Use VPN ao conectar em redes públicas',
        'Desative compartilhamento automático de arquivos',
        'Esqueça redes Wi-Fi que não usa mais',
        'Altere a senha padrão do seu roteador doméstico',
      ],
    },
    {
      category: 'Dispositivos Móveis',
      icon: Smartphone,
      color: 'bg-[#D53F8C]',
      tips: [
        'Mantenha sistema operacional e apps atualizados',
        'Baixe aplicativos apenas de lojas oficiais',
        'Use bloqueio de tela com senha ou biometria',
        'Revise permissões de aplicativos regularmente',
        'Ative localização remota e bloqueio do dispositivo',
      ],
    },
    {
      category: 'Backup e Proteção de Dados',
      icon: HardDrive,
      color: 'bg-[#2F855A]',
      tips: [
        'Faça backups regulares de arquivos importantes',
        'Mantenha pelo menos uma cópia offline',
        'Teste seus backups periodicamente',
        'Use criptografia para dados sensíveis',
        'Configure backup automático na nuvem',
      ],
    },
    {
      category: 'Privacidade Online',
      icon: Eye,
      color: 'bg-[#1A365D]',
      tips: [
        'Revise configurações de privacidade em redes sociais',
        'Limite informações pessoais compartilhadas online',
        'Use configurações de privacidade rigorosas',
        'Pense antes de postar informações sensíveis',
        'Verifique quem pode ver suas postagens',
      ],
    },
    {
      category: 'Prevenção Geral',
      icon: AlertTriangle,
      color: 'bg-[#DD6B20]',
      tips: [
        'Mantenha antivírus atualizado e ativo',
        'Desconfie de ofertas "boas demais para ser verdade"',
        'Verifique extratos bancários regularmente',
        'Eduque familiares sobre segurança digital',
        'Mantenha-se informado sobre novas ameaças',
      ],
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
          <h1 className="text-white mb-8">Dicas Rápidas de Segurança</h1>
          <p className="text-xl opacity-90">
            Práticas essenciais para proteger-se no dia a dia digital
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-16 py-32">
        <Card className="p-32 mb-32 bg-[#FFF5E6] dark:bg-[#2D2416] border-2 border-[#DD6B20]">
          <div className="flex items-start gap-16">
            <AlertTriangle className="w-8 h-8 text-[#DD6B20] flex-shrink-0 mt-4" />
            <div>
              <h3 className="text-[#DD6B20] mb-8">Importante!</h3>
              <p className="text-[var(--color-text)] opacity-80">
                A segurança digital é um processo contínuo. Estas dicas são orientações gerais, 
                mas é fundamental manter-se atualizado sobre novas ameaças e práticas de segurança. 
                Em caso de dúvida, sempre opte pela opção mais segura.
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          {dicas.map((categoria, index) => {
            const Icon = categoria.icon;
            return (
              <Card key={index} className="p-24 border-2 bg-[var(--color-card-bg)] border-[var(--color-border)] hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-16 mb-24">
                  <div className={`${categoria.color} w-14 h-14 rounded-lg flex items-center justify-center`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-[var(--color-text)]">{categoria.category}</h3>
                </div>
                
                <ul className="space-y-12">
                  {categoria.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start gap-12">
                      <div className="w-6 h-6 rounded-full bg-[#2F855A] flex items-center justify-center flex-shrink-0 mt-2">
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                      <span className="text-[var(--color-text)] opacity-80 flex-1">{tip}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>

        <Card className="p-32 mt-32 bg-[var(--color-secondary-bg)] border-2 border-[#1A365D]">
          <h3 className="text-[var(--color-primary)] mb-16">Quer aprender mais?</h3>
          <p className="text-[var(--color-text)] opacity-80 mb-24">
            Explore nossos módulos educacionais para um conhecimento mais profundo sobre 
            cada aspecto da segurança digital.
          </p>
          <Button
            className="bg-[#1A365D] hover:bg-[#2D3E63] text-white"
            onClick={() => onNavigate('modulos')}
          >
            Ver Módulos Educacionais
          </Button>
        </Card>
      </main>
    </div>
  );
}