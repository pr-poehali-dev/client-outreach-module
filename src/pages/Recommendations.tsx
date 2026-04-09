import Header from "@/components/layout/Header";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const recommendations = [
  {
    id: 1,
    title: "Лучшее время для обзвона",
    desc: "На основе анализа 839 звонков за неделю, наибольшая конверсия наблюдается в промежутке 11:00–12:00 и 15:00–16:00. Рекомендуем сосредоточить активность именно в эти окна.",
    impact: "high",
    category: "Время",
    icon: "Clock",
    iconBg: "bg-cyan-50",
    iconColor: "text-cyan-600",
    action: "Применить расписание",
  },
  {
    id: 2,
    title: "Скрипт требует обновления",
    desc: "Анализ записей показывает, что клиенты часто прерывают разговор на 2-й минуте при упоминании цены. Рекомендуем перенести блок с ценой на конец скрипта.",
    impact: "high",
    category: "Скрипт",
    icon: "FileEdit",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    action: "Редактировать скрипт",
  },
  {
    id: 3,
    title: "Повторный контакт с 47 клиентами",
    desc: "47 клиентов проявляли интерес, но не были обработаны. Согласно паттернам, повторный звонок через 3 дня после первого контакта увеличивает конверсию на 34%.",
    impact: "medium",
    category: "База",
    icon: "Users",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    action: "Создать кампанию",
  },
  {
    id: 4,
    title: "Оператор Козлов — низкая эффективность",
    desc: "За последнюю неделю конверсия оператора Козлова составила 31%, что на 43% ниже средней. Рекомендуем провести дополнительное обучение по работе с возражениями.",
    impact: "medium",
    category: "Операторы",
    icon: "UserCheck",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    action: "Перейти к обучению",
  },
  {
    id: 5,
    title: "Обновить базу номеров",
    desc: "15% номеров в текущей базе недоступны более 30 дней. Очистка базы позволит сэкономить до 2 часов машинного времени в неделю.",
    impact: "low",
    category: "База",
    icon: "Database",
    iconBg: "bg-gray-50",
    iconColor: "text-gray-600",
    action: "Очистить базу",
  },
];

const impactMap: Record<string, { label: string; color: string; bg: string }> = {
  high: { label: "Высокий эффект", color: "text-red-700", bg: "bg-red-100" },
  medium: { label: "Средний эффект", color: "text-amber-700", bg: "bg-amber-100" },
  low: { label: "Низкий эффект", color: "text-gray-600", bg: "bg-gray-100" },
};

export default function Recommendations() {
  return (
    <div className="animate-fade-in-up">
      <Header title="Рекомендации" subtitle="Персональные советы на основе анализа данных" />
      <div className="p-6 space-y-5">
        {/* AI badge */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-violet-50 to-cyan-50 border border-violet-100">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
            <Icon name="Sparkles" size={17} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Анализ обновлён: сегодня в 07:00</p>
            <p className="text-xs text-muted-foreground">На основе данных за последние 30 дней · 5 активных рекомендаций</p>
          </div>
          <Button variant="outline" size="sm" className="ml-auto rounded-xl border-violet-200 text-violet-700 hover:bg-violet-50">
            <Icon name="RefreshCw" size={13} className="mr-1.5" />
            Обновить
          </Button>
        </div>

        {/* Recommendations list */}
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="bg-white rounded-2xl border border-border p-5 stat-card"
            >
              <div className="flex items-start gap-4">
                <div className={`w-11 h-11 rounded-xl ${rec.iconBg} flex items-center justify-center flex-shrink-0`}>
                  <Icon name={rec.icon} size={20} className={rec.iconColor} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1.5">
                    <h3 className="font-semibold text-foreground" style={{ fontFamily: "Manrope, sans-serif" }}>
                      {rec.title}
                    </h3>
                    <Badge className={`text-xs border-0 ${impactMap[rec.impact].bg} ${impactMap[rec.impact].color}`}>
                      {impactMap[rec.impact].label}
                    </Badge>
                    <Badge className="text-xs border border-border bg-transparent text-muted-foreground">
                      {rec.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{rec.desc}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4 ml-15">
                <Button size="sm" className="gradient-primary text-white border-0 rounded-xl hover:opacity-90">
                  {rec.action}
                </Button>
                <Button size="sm" variant="outline" className="rounded-xl">
                  Отложить
                </Button>
                <Button size="sm" variant="ghost" className="rounded-xl text-muted-foreground ml-auto">
                  <Icon name="X" size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
