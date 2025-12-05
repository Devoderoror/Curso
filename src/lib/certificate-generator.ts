// Certificate generator for downloading certificates as images

export const generateCertificateImage = (
  moduloTitle: string,
  score: number,
  date: string
): void => {
  // Create canvas
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 800;
  const ctx = canvas.getContext('2d');

  if (!ctx) return;

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#1A365D');
  gradient.addColorStop(0.5, '#2D4A7C');
  gradient.addColorStop(1, '#1A365D');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Border
  ctx.strokeStyle = '#2F855A';
  ctx.lineWidth = 10;
  ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

  // Inner border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 2;
  ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

  // Decorative elements
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.lineWidth = 3;
  
  // Corner decorations
  ctx.save();
  ctx.translate(100, 100);
  ctx.rotate(Math.PI / 4);
  ctx.strokeRect(-30, -30, 60, 60);
  ctx.restore();

  ctx.save();
  ctx.translate(canvas.width - 100, canvas.height - 100);
  ctx.rotate(Math.PI / 4);
  ctx.strokeRect(-30, -30, 60, 60);
  ctx.restore();

  // Circle decoration
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 200, 0, Math.PI * 2);
  ctx.stroke();

  // Award icon (simplified shield)
  ctx.fillStyle = '#2F855A';
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 120);
  ctx.lineTo(canvas.width / 2 - 40, 140);
  ctx.lineTo(canvas.width / 2 - 40, 180);
  ctx.lineTo(canvas.width / 2, 200);
  ctx.lineTo(canvas.width / 2 + 40, 180);
  ctx.lineTo(canvas.width / 2 + 40, 140);
  ctx.closePath();
  ctx.fill();

  // Title
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 48px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('CERTIFICADO DE CONCLUSÃO', canvas.width / 2, 260);

  // Decorative line
  ctx.fillStyle = '#2F855A';
  ctx.fillRect(canvas.width / 2 - 100, 280, 200, 3);

  // Description
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.font = '24px Arial, sans-serif';
  ctx.fillText('Este certificado atesta que você concluiu com sucesso o módulo', canvas.width / 2, 340);

  // Module title
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 36px Arial, sans-serif';
  ctx.fillText(moduloTitle, canvas.width / 2, 400);

  // Score label
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.font = '22px Arial, sans-serif';
  ctx.fillText('Com aproveitamento de', canvas.width / 2, 460);

  // Score
  ctx.fillStyle = '#2F855A';
  ctx.font = 'bold 72px Arial, sans-serif';
  ctx.fillText(`${score.toFixed(0)}%`, canvas.width / 2, 540);

  // Date
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.font = '20px Arial, sans-serif';
  const formattedDate = new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
  ctx.fillText(formattedDate, canvas.width / 2, 600);

  // Verification badge
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.font = '18px Arial, sans-serif';
  ctx.fillText('✓ Verificado', canvas.width / 2, 640);

  // Footer
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2 - 150, 690);
  ctx.lineTo(canvas.width / 2 + 150, 690);
  ctx.stroke();

  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.font = '16px Arial, sans-serif';
  ctx.fillText('Plataforma de Segurança Digital', canvas.width / 2, 720);

  // Convert to blob and download
  canvas.toBlob((blob) => {
    if (!blob) return;

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `certificado-${moduloTitle.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 'image/png');
};
