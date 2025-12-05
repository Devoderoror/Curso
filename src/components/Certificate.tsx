import { Award, Download, Calendar, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface CertificateProps {
  moduloTitle: string;
  score: number;
  date: string;
  onDownload: () => void;
}

export default function Certificate({ moduloTitle, score, date, onDownload }: CertificateProps) {
  return (
    <Card className="p-48 bg-gradient-to-br from-[#1A365D] via-[#2D4A7C] to-[#1A365D] text-white border-4 border-[#2F855A] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-24 left-24 w-32 h-32 border-4 border-white rotate-45" />
        <div className="absolute bottom-24 right-24 w-32 h-32 border-4 border-white rotate-45" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-4 border-white rounded-full" />
      </div>

      <div className="relative z-10">
        <div className="text-center mb-32">
          <div className="inline-block bg-[#2F855A] rounded-full p-16 mb-24">
            <Award className="w-24 h-24 text-white" />
          </div>
          <h2 className="text-white mb-16">Certificado de Conclusão</h2>
          <div className="w-32 h-1 bg-[#2F855A] mx-auto" />
        </div>

        <div className="text-center mb-32">
          <p className="text-xl opacity-90 mb-16">Este certificado atesta que você concluiu com sucesso o módulo</p>
          <h3 className="text-white mb-24">{moduloTitle}</h3>
          <p className="text-lg opacity-90 mb-16">Com aproveitamento de</p>
          <div className="text-5xl mb-24" style={{ fontWeight: 700 }}>
            {score.toFixed(0)}%
          </div>
        </div>

        <div className="flex items-center justify-center gap-32 mb-32">
          <div className="flex items-center gap-8">
            <Calendar className="w-5 h-5 opacity-80" />
            <span className="opacity-90">{new Date(date).toLocaleDateString('pt-BR')}</span>
          </div>
          <div className="flex items-center gap-8">
            <CheckCircle className="w-5 h-5 text-[#2F855A]" />
            <span className="opacity-90">Verificado</span>
          </div>
        </div>

        <div className="text-center mb-32">
          <div className="inline-block">
            <div className="border-t-2 border-white/40 pt-8 px-32">
              <p className="text-sm opacity-80">Plataforma de Segurança Digital</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button
            onClick={onDownload}
            className="bg-[#2F855A] hover:bg-[#276749] text-white"
          >
            <Download className="w-5 h-5 mr-8" />
            Baixar Certificado
          </Button>
        </div>
      </div>
    </Card>
  );
}
