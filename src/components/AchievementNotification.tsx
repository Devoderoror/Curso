import { useEffect, useState } from "react";
import { X, Trophy } from "lucide-react";
import { Card } from "./ui/card";
import { getAchievementById } from "../lib/achievements";

interface AchievementNotificationProps {
  achievementId: string;
  onClose: () => void;
}

export default function AchievementNotification({ achievementId, onClose }: AchievementNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const achievement = getAchievementById(achievementId);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!achievement) return null;

  const Icon = achievement.icon;

  return (
    <div className="fixed top-24 right-24 z-50 max-w-sm">
      <Card
        className={`p-24 bg-gradient-to-r from-[#2F855A] to-[#38A169] text-white border-2 border-white/20 shadow-2xl transition-all duration-300 ${
          isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <div className="flex items-start gap-16">
          <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-8 mb-4">
              <Trophy className="w-4 h-4" />
              <span className="text-sm opacity-90">Nova Conquista!</span>
            </div>
            <h4 className="text-white mb-4">{achievement.title}</h4>
            <p className="text-sm text-white/90 mb-8">{achievement.description}</p>
            <div className="text-sm">+{achievement.points} pontos</div>
          </div>
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </Card>
    </div>
  );
}
