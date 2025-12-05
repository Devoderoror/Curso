import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface ModuloContentProps {
  moduloId: string;
  onNavigate: (page: string) => void;
  onStartQuiz: (moduloId: string) => void;
}

export default function ModuloContent({ moduloId, onNavigate, onStartQuiz }: ModuloContentProps) {
  const moduloData: Record<string, any> = {
    'phishing': {
      title: 'Phishing',
      intro: 'Phishing é uma técnica de fraude onde criminosos se passam por entidades confiáveis para roubar informações pessoais, senhas e dados financeiros.',
      sections: [
        {
          title: 'O que é Phishing?',
          icon: Info,
          color: 'bg-[#1A365D]',
          content: 'Phishing é um tipo de ataque cibernético que utiliza comunicações fraudulentas (emails, SMS, mensagens) que parecem vir de fontes confiáveis. O objetivo é enganar as vítimas para que revelem informações confidenciais ou cliquem em links maliciosos.',
        },
        {
          title: 'Como Identificar Phishing',
          icon: AlertTriangle,
          color: 'bg-[#DD6B20]',
          content: 'Sinais de alerta: erros de ortografia, senso de urgência, solicitações de informações pessoais, remetentes desconhecidos, links suspeitos, anexos inesperados.',
          list: [
            'Verifique o endereço de email do remetente cuidadosamente',
            'Passe o mouse sobre links antes de clicar',
            'Desconfie de mensagens urgentes pedindo ação imediata',
            'Nunca forneça senhas ou dados bancários por email',
            'Verifique a URL do site antes de fazer login',
          ],
        },
        {
          title: 'Como se Proteger',
          icon: CheckCircle,
          color: 'bg-[#2F855A]',
          content: 'Proteção efetiva contra phishing requer vigilância constante e boas práticas de segurança.',
          list: [
            'Use autenticação de dois fatores sempre que possível',
            'Mantenha seu software antivírus atualizado',
            'Não clique em links de fontes não confiáveis',
            'Verifique a autenticidade antes de fornecer informações',
            'Reporte tentativas de phishing às autoridades competentes',
          ],
        },
      ],
    },
    'senhas': {
      title: 'Senhas Seguras',
      intro: 'Senhas fortes são a primeira linha de defesa contra acessos não autorizados às suas contas online. Aprenda a criar e gerenciar senhas de forma segura.',
      sections: [
        {
          title: 'Características de uma Senha Forte',
          icon: Info,
          color: 'bg-[#1A365D]',
          content: 'Uma senha forte é a base da segurança digital. Ela deve ser única, complexa e difícil de adivinhar.',
          list: [
            'Mínimo de 12 caracteres (quanto mais, melhor)',
            'Combinação de letras maiúsculas e minúsculas',
            'Incluir números e símbolos especiais',
            'Evitar palavras do dicionário e informações pessoais',
            'Não usar sequências óbvias (123456, abcdef)',
          ],
        },
        {
          title: 'Erros Comuns a Evitar',
          icon: AlertTriangle,
          color: 'bg-[#DD6B20]',
          content: 'Evite práticas que tornam suas senhas vulneráveis.',
          list: [
            'Usar a mesma senha em múltiplas contas',
            'Compartilhar senhas com outras pessoas',
            'Anotar senhas em locais inseguros',
            'Usar informações pessoais óbvias (data de nascimento, nome)',
            'Salvar senhas em arquivos de texto simples',
          ],
        },
        {
          title: 'Gerenciamento de Senhas',
          icon: CheckCircle,
          color: 'bg-[#2F855A]',
          content: 'Use ferramentas e práticas para gerenciar suas senhas com segurança.',
          list: [
            'Considere usar um gerenciador de senhas confiável',
            'Ative autenticação em duas etapas (2FA)',
            'Altere senhas regularmente, especialmente após vazamentos',
            'Use senhas únicas para cada conta importante',
            'Mantenha suas perguntas de segurança privadas',
          ],
        },
      ],
    },
    'engenharia-social': {
      title: 'Engenharia Social',
      intro: 'Engenharia social é a arte de manipular pessoas para que divulguem informações confidenciais ou realizem ações que comprometam a segurança.',
      sections: [
        {
          title: 'O que é Engenharia Social?',
          icon: Info,
          color: 'bg-[#1A365D]',
          content: 'Diferente de ataques técnicos, a engenharia social explora a psicologia humana. Criminosos usam manipulação, persuasão e enganação para obter acesso a informações ou sistemas.',
        },
        {
          title: 'Técnicas Comuns',
          icon: AlertTriangle,
          color: 'bg-[#DD6B20]',
          content: 'Conheça as táticas mais utilizadas por criminosos:',
          list: [
            'Pretexting: criar cenários falsos para obter informações',
            'Baiting: oferecer algo atraente para infectar sistemas',
            'Quid pro quo: oferecer serviço em troca de informações',
            'Tailgating: seguir pessoas para acessar áreas restritas',
            'Impersonificação: fingir ser alguém de autoridade',
          ],
        },
        {
          title: 'Como se Proteger',
          icon: CheckCircle,
          color: 'bg-[#2F855A]',
          content: 'Defesa contra engenharia social requer consciência e ceticismo saudável.',
          list: [
            'Verifique sempre a identidade de quem solicita informações',
            'Não compartilhe informações sensíveis por telefone ou email',
            'Questione solicitações incomuns, mesmo de conhecidos',
            'Proteja suas informações nas redes sociais',
            'Denuncie tentativas suspeitas de manipulação',
          ],
        },
      ],
    },
    'ransomware': {
      title: 'Ransomware',
      intro: 'Ransomware é um tipo de malware que criptografa seus arquivos e exige pagamento para liberá-los. É uma das ameaças mais sérias atualmente.',
      sections: [
        {
          title: 'O que é Ransomware?',
          icon: Info,
          color: 'bg-[#1A365D]',
          content: 'Ransomware é um software malicioso que sequestra seus dados. Ele criptografa arquivos importantes e exige pagamento (geralmente em criptomoedas) para restaurar o acesso. Pode afetar computadores pessoais, empresas e até sistemas governamentais.',
        },
        {
          title: 'Como se Propaga',
          icon: AlertTriangle,
          color: 'bg-[#DD6B20]',
          content: 'Entenda como o ransomware pode infectar seus dispositivos:',
          list: [
            'Anexos de email maliciosos',
            'Downloads de sites comprometidos',
            'Vulnerabilidades em software desatualizado',
            'Anúncios maliciosos (malvertising)',
            'Dispositivos USB infectados',
          ],
        },
        {
          title: 'Prevenção e Proteção',
          icon: CheckCircle,
          color: 'bg-[#2F855A]',
          content: 'Medidas essenciais para proteger-se contra ransomware:',
          list: [
            'Faça backups regulares em locais seguros e offline',
            'Mantenha sistema operacional e software atualizados',
            'Use antivírus confiável e mantenha-o atualizado',
            'Evite clicar em links ou baixar anexos suspeitos',
            'Não pague o resgate (não há garantia de recuperação)',
          ],
        },
      ],
    },
  };

  const modulo = moduloData[moduloId];

  if (!modulo) {
    return <div>Módulo não encontrado</div>;
  }

  return (
    <div className="min-h-screen bg-[var(--color-neutral)]">
      <header className="bg-gradient-to-r from-[#1A365D] to-[#2D4A7C] text-white py-24 px-16">
        <div className="max-w-6xl mx-auto">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 mb-16"
            onClick={() => onNavigate('modulos')}
          >
            <ArrowLeft className="w-5 h-5 mr-8" />
            Voltar para Módulos
          </Button>
          <h1 className="text-white mb-8">{modulo.title}</h1>
          <p className="text-xl opacity-90">{modulo.intro}</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-16 py-32">
        <div className="space-y-24">
          {modulo.sections.map((section: any, index: number) => {
            const Icon = section.icon;
            return (
              <Card key={index} className="p-32 border-2 bg-[var(--color-card-bg)] border-[var(--color-border)]">
                <div className="flex items-start gap-16 mb-24">
                  <div className={`${section.color} w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[var(--color-text)] mb-16">{section.title}</h3>
                    <p className="text-[var(--color-text)] opacity-80">{section.content}</p>
                  </div>
                </div>
                
                {section.list && (
                  <ul className="space-y-12 ml-32">
                    {section.list.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-12">
                        <div className="w-6 h-6 rounded-full bg-[#2F855A] flex items-center justify-center flex-shrink-0 mt-4">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-[var(--color-text)] opacity-80">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            );
          })}
        </div>

        <Card className="p-32 mt-32 bg-[var(--color-secondary-bg)] border-2 border-[#1A365D]">
          <h3 className="text-[var(--color-primary)] mb-16">Pronto para testar seus conhecimentos?</h3>
          <p className="text-[var(--color-text)] opacity-80 mb-24">
            Complete o quiz para verificar o que você aprendeu e ganhar certificado de conclusão deste módulo.
          </p>
          <Button
            className="bg-[#2F855A] hover:bg-[#276749] text-white"
            onClick={() => onStartQuiz(moduloId)}
          >
            Iniciar Quiz
            <ArrowRight className="w-5 h-5 ml-8" />
          </Button>
        </Card>
      </main>
    </div>
  );
}