import { useState } from "react";
import { ArrowLeft, CheckCircle, XCircle, Trophy, Download } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import Certificate from "./Certificate";
import { generateCertificateImage } from "../lib/certificate-generator";

interface QuizPageProps {
  moduloId: string;
  onNavigate: (page: string) => void;
  onComplete: (moduloId: string, score: number) => void;
}

export default function QuizPage({ moduloId, onNavigate, onComplete }: QuizPageProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const quizData: Record<string, any> = {
    'phishing': {
      title: 'Quiz: Phishing',
      questions: [
        {
          question: 'Qual é a principal característica de um ataque de phishing?',
          options: [
            'Invadir sistemas usando força bruta',
            'Enganar pessoas para obter informações confidenciais',
            'Criptografar arquivos e exigir resgate',
            'Instalar vírus através de USB',
          ],
          correct: 1,
        },
        {
          question: 'Como você pode verificar se um email é legítimo?',
          options: [
            'Clicar em todos os links para testar',
            'Verificar o endereço de email do remetente',
            'Confiar se tiver o logo da empresa',
            'Responder ao email pedindo confirmação',
          ],
          correct: 1,
        },
        {
          question: 'O que você deve fazer ao receber um email suspeito?',
          options: [
            'Clicar nos links para investigar',
            'Encaminhar para todos os contatos',
            'Não clicar em links e reportar como spam',
            'Responder perguntando se é verdadeiro',
          ],
          correct: 2,
        },
        {
          question: 'Qual destes NÃO é um sinal de phishing?',
          options: [
            'Erros de ortografia e gramática',
            'Senso de urgência extrema',
            'Email personalizado com seu nome',
            'Solicitação de senha por email',
          ],
          correct: 2,
        },
        {
          question: 'Antes de clicar em um link, você deve:',
          options: [
            'Clicar rapidamente para não perder tempo',
            'Passar o mouse sobre o link para ver a URL real',
            'Confiar se vier de um amigo',
            'Abrir em uma nova aba primeiro',
          ],
          correct: 1,
        },
      ],
    },
    'senhas': {
      title: 'Quiz: Senhas Seguras',
      questions: [
        {
          question: 'Qual é o tamanho mínimo recomendado para uma senha forte?',
          options: [
            '6 caracteres',
            '8 caracteres',
            '12 caracteres',
            '20 caracteres',
          ],
          correct: 2,
        },
        {
          question: 'Qual destas é uma prática CORRETA para senhas?',
          options: [
            'Usar a mesma senha em todos os sites',
            'Anotar senhas em um papel na carteira',
            'Usar um gerenciador de senhas confiável',
            'Compartilhar senha com amigos próximos',
          ],
          correct: 2,
        },
        {
          question: 'O que é autenticação de dois fatores (2FA)?',
          options: [
            'Usar duas senhas diferentes',
            'Verificação adicional além da senha',
            'Fazer login em dois dispositivos',
            'Ter duas contas no mesmo serviço',
          ],
          correct: 1,
        },
        {
          question: 'Qual destas senhas é MENOS segura?',
          options: [
            'Tr0c@rS3nh@2025!',
            '123456',
            'mX9$pL2#qR8@vN5',
            'C@s@D3P3dr0!89',
          ],
          correct: 1,
        },
        {
          question: 'Com que frequência você deve mudar senhas importantes?',
          options: [
            'Nunca, se for forte',
            'Todo dia',
            'Regularmente e após suspeita de vazamento',
            'Uma vez por década',
          ],
          correct: 2,
        },
      ],
    },
    'engenharia-social': {
      title: 'Quiz: Engenharia Social',
      questions: [
        {
          question: 'O que é engenharia social?',
          options: [
            'Um tipo de vírus de computador',
            'Manipulação psicológica para obter informações',
            'Software de proteção',
            'Rede social profissional',
          ],
          correct: 1,
        },
        {
          question: 'Qual é um exemplo de pretexting?',
          options: [
            'Enviar vírus por email',
            'Criar história falsa para obter dados',
            'Hackear senha por força bruta',
            'Instalar antivírus falso',
          ],
          correct: 1,
        },
        {
          question: 'Alguém liga dizendo ser do suporte técnico pedindo sua senha. Você deve:',
          options: [
            'Fornecer a senha para resolver o problema',
            'Desligar e ligar para o número oficial da empresa',
            'Dar a senha mas pedir para não contar',
            'Fornecer metade da senha apenas',
          ],
          correct: 1,
        },
        {
          question: 'Qual informação NÃO deve ser compartilhada em redes sociais?',
          options: [
            'Suas músicas favoritas',
            'Data de nascimento e endereço completo',
            'Fotos de paisagens',
            'Opinião sobre filmes',
          ],
          correct: 1,
        },
        {
          question: 'O que é "tailgating" em segurança da informação?',
          options: [
            'Seguir alguém para entrar em área restrita',
            'Enviar emails em massa',
            'Copiar arquivos sem permissão',
            'Criar perfis falsos',
          ],
          correct: 0,
        },
      ],
    },
    'ransomware': {
      title: 'Quiz: Ransomware',
      questions: [
        {
          question: 'O que é ransomware?',
          options: [
            'Software de proteção contra vírus',
            'Malware que criptografa arquivos e exige pagamento',
            'Tipo de firewall',
            'Ferramenta de backup',
          ],
          correct: 1,
        },
        {
          question: 'Qual é a melhor defesa contra ransomware?',
          options: [
            'Pagar o resgate imediatamente',
            'Backups regulares em locais seguros',
            'Usar senhas mais fortes',
            'Desligar o computador',
          ],
          correct: 1,
        },
        {
          question: 'Se você for infectado por ransomware, deve:',
          options: [
            'Pagar o resgate rapidamente',
            'Deletar todos os arquivos',
            'NÃO pagar e reportar às autoridades',
            'Compartilhar a senha com o hacker',
          ],
          correct: 2,
        },
        {
          question: 'Como o ransomware geralmente se propaga?',
          options: [
            'Através de conversas telefônicas',
            'Por anexos de email maliciosos',
            'Pensamento telepático',
            'Apenas através de redes sociais',
          ],
          correct: 1,
        },
        {
          question: 'Qual prática ajuda a prevenir ransomware?',
          options: [
            'Abrir todos os anexos de email',
            'Manter software sempre atualizado',
            'Desativar o antivírus',
            'Usar apenas senhas simples',
          ],
          correct: 1,
        },
      ],
    },
  };

  const quiz = quizData[moduloId];

  if (!quiz) {
    return <div>Quiz não encontrado</div>;
  }

  const handleNext = () => {
    if (selectedAnswer === "") return;

    const isCorrect = parseInt(selectedAnswer) === quiz.questions[currentQuestion].correct;
    const newAnswers = [...answers, isCorrect];
    setAnswers(newAnswers);

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    } else {
      setShowResult(true);
      const score = (newAnswers.filter(a => a).length / quiz.questions.length) * 100;
      onComplete(moduloId, score);
    }
  };

  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  if (showResult) {
    const correctCount = answers.filter(a => a).length;
    const score = (correctCount / quiz.questions.length) * 100;
    const passed = score >= 70;

    const moduloTitles: Record<string, string> = {
      'phishing': 'Phishing',
      'senhas': 'Senhas Seguras',
      'engenharia-social': 'Engenharia Social',
      'ransomware': 'Ransomware',
    };

    return (
      <div className="min-h-screen bg-[var(--color-neutral)]">
        <header className="bg-gradient-to-r from-[#1A365D] to-[#2D4A7C] text-white py-24 px-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-white mb-8">Resultado do Quiz</h1>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-16 py-32">
          <Card className={`p-48 text-center border-4 bg-[var(--color-card-bg)] ${passed ? 'border-[#2F855A]' : 'border-[#DD6B20]'}`}>
            <div className={`w-32 h-32 mx-auto mb-24 rounded-full flex items-center justify-center ${passed ? 'bg-[#2F855A]' : 'bg-[#DD6B20]'}`}>
              {passed ? (
                <Trophy className="w-16 h-16 text-white" />
              ) : (
                <XCircle className="w-16 h-16 text-white" />
              )}
            </div>

            <h2 className={passed ? 'text-[#2F855A]' : 'text-[#DD6B20]'}>
              {passed ? 'Parabéns!' : 'Quase lá!'}
            </h2>

            <p className="text-[var(--color-text)] opacity-70 mb-24">
              Você acertou {correctCount} de {quiz.questions.length} questões
            </p>

            <div className="text-6xl mb-24" style={{ fontWeight: 700, color: 'var(--color-text)' }}>
              {score.toFixed(0)}%
            </div>

            <p className="text-[var(--color-text)] opacity-70 mb-32">
              {passed
                ? 'Você demonstrou excelente compreensão do conteúdo!'
                : 'Revise o conteúdo e tente novamente. Você precisa de 70% para passar.'}
            </p>

            <div className="flex gap-16 justify-center flex-wrap">
              <Button
                variant="outline"
                className="border-[#1A365D] text-[#1A365D]"
                onClick={() => onNavigate('modulos')}
              >
                Voltar para Módulos
              </Button>
              {!passed && (
                <Button
                  className="bg-[#DD6B20] hover:bg-[#C05621] text-white"
                  onClick={() => {
                    setCurrentQuestion(0);
                    setSelectedAnswer("");
                    setAnswers([]);
                    setShowResult(false);
                  }}
                >
                  Tentar Novamente
                </Button>
              )}
              {passed && (
                <>
                  <Button
                    className="bg-[#2F855A] hover:bg-[#276749] text-white"
                    onClick={() => onNavigate('dashboard')}
                  >
                    Ver Progresso
                  </Button>
                  <Button
                    className="bg-[#1A365D] hover:bg-[#2D3E63] text-white"
                    onClick={() => {
                      generateCertificateImage(moduloTitles[moduloId] || moduloId, score, new Date().toISOString());
                    }}
                  >
                    <Download className="w-5 h-5 mr-8" />
                    Baixar Certificado
                  </Button>
                </>
              )}
            </div>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-neutral)]">
      <header className="bg-gradient-to-r from-[#1A365D] to-[#2D4A7C] text-white py-24 px-16">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 mb-16"
            onClick={() => onNavigate('modulos')}
          >
            <ArrowLeft className="w-5 h-5 mr-8" />
            Sair do Quiz
          </Button>
          <h1 className="text-white mb-16">{quiz.title}</h1>
          <div className="space-y-8">
            <div className="flex justify-between text-sm opacity-90">
              <span>Questão {currentQuestion + 1} de {quiz.questions.length}</span>
              <span>{progress.toFixed(0)}% completo</span>
            </div>
            <Progress value={progress} className="bg-white/20" />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-16 py-32">
        <Card className="p-32 border-2 bg-[var(--color-card-bg)] border-[var(--color-border)]">
          <h3 className="text-[var(--color-text)] mb-32">
            {quiz.questions[currentQuestion].question}
          </h3>

          <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
            <div className="space-y-16">
              {quiz.questions[currentQuestion].options.map((option: string, index: number) => (
                <div
                  key={index}
                  className={`flex items-start space-x-16 p-16 rounded-lg border-2 transition-colors cursor-pointer ${
                    selectedAnswer === index.toString()
                      ? 'border-[#1A365D] bg-[var(--color-secondary-bg)]'
                      : 'border-[var(--color-border)] hover:border-gray-400'
                  }`}
                  onClick={() => setSelectedAnswer(index.toString())}
                >
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-[var(--color-text)]">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>

          <div className="flex justify-end mt-32">
            <Button
              className="bg-[#1A365D] hover:bg-[#2D3E63] text-white"
              onClick={handleNext}
              disabled={selectedAnswer === ""}
            >
              {currentQuestion < quiz.questions.length - 1 ? 'Próxima Questão' : 'Finalizar Quiz'}
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}