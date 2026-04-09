import { useState } from "react";
import Header from "@/components/layout/Header";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const campaigns = [
  {
    id: 1,
    name: "Акция декабрь 2025",
    status: "running",
    total: 500,
    done: 341,
    success: 231,
    startTime: "09:00",
    voip: "SIP Trunk 1",
    operators: 3,
  },
  {
    id: 2,
    name: "Холодный обзвон B2B",
    status: "running",
    total: 200,
    done: 70,
    success: 38,
    startTime: "10:30",
    voip: "Asterisk Local",
    operators: 1,
  },
  {
    id: 3,
    name: "Повторные клиенты",
    status: "paused",
    total: 150,
    done: 137,
    success: 119,
    startTime: "08:00",
    voip: "SIP Trunk 2",
    operators: 2,
  },
  {
    id: 4,
    name: "Опрос удовлетворённости",
    status: "completed",
    total: 80,
    done: 80,
    success: 64,
    startTime: "Вчера",
    voip: "SIP Trunk 1",
    operators: 1,
  },
];

const callLog = [
  { name: "Ирина Смирнова", phone: "+7 999 123-45-67", campaign: "Акция декабрь", status: "success", duration: "3:42", recording: true, time: "11:24" },
  { name: "Дмитрий Козлов", phone: "+7 916 234-56-78", campaign: "Холодный обзвон B2B", status: "missed", duration: "—", recording: false, time: "11:18" },
  { name: "Наталья Попова", phone: "+7 926 345-67-89", campaign: "Акция декабрь", status: "success", duration: "7:15", recording: true, time: "11:05" },
  { name: "Сергей Волков", phone: "+7 903 456-78-90", campaign: "Повторные клиенты", status: "busy", duration: "—", recording: false, time: "10:57" },
  { name: "Елена Новикова", phone: "+7 977 567-89-01", campaign: "Холодный обзвон B2B", status: "success", duration: "5:08", recording: true, time: "10:43" },
  { name: "Андрей Морозов", phone: "+7 965 678-90-12", campaign: "Акция декабрь", status: "noanswer", duration: "—", recording: false, time: "10:31" },
];

const statusCamp: Record<string, { label: string; color: string; dot: string }> = {
  running: { label: "Запущена", color: "text-emerald-700 bg-emerald-100", dot: "bg-emerald-500" },
  paused: { label: "На паузе", color: "text-amber-700 bg-amber-100", dot: "bg-amber-500" },
  completed: { label: "Завершена", color: "text-gray-600 bg-gray-100", dot: "bg-gray-400" },
};

const callStatusMap: Record<string, { label: string; color: string; bg: string }> = {
  success: { label: "Успешный", color: "text-emerald-700", bg: "bg-emerald-100" },
  missed: { label: "Пропущен", color: "text-red-700", bg: "bg-red-100" },
  busy: { label: "Занято", color: "text-orange-700", bg: "bg-orange-100" },
  noanswer: { label: "Нет ответа", color: "text-gray-600", bg: "bg-gray-100" },
};

export default function Calls() {
  const [activeTab, setActiveTab] = useState<"campaigns" | "log">("campaigns");

  return (
    <div className="animate-fade-in-up">
      <Header title="Обзвоны" subtitle="Управление кампаниями и интеграция VoIP" />
      <div className="p-6 space-y-5">
        {/* VoIP status banner */}
        <div className="rounded-2xl p-4 border border-cyan-200 bg-gradient-to-r from-cyan-50 to-blue-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center">
              <Icon name="Wifi" size={20} className="text-cyan-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">VoIP соединение активно</p>
              <p className="text-xs text-muted-foreground">2 активных SIP транка · Asterisk v18.2 · Задержка 12 мс</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-xl border-cyan-200 text-cyan-700 hover:bg-cyan-100">
              <Icon name="Settings2" size={14} className="mr-1.5" />
              Настройки VoIP
            </Button>
            <Button size="sm" className="gradient-primary text-white border-0 rounded-xl hover:opacity-90">
              <Icon name="Plus" size={14} className="mr-1.5" />
              Новая кампания
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-secondary rounded-xl p-1 w-fit">
          {(["campaigns", "log"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab ? "bg-white shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {{ campaigns: "Кампании", log: "История звонков" }[tab]}
            </button>
          ))}
        </div>

        {activeTab === "campaigns" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {campaigns.map((camp) => {
              const progress = Math.round((camp.done / camp.total) * 100);
              const convRate = camp.done > 0 ? Math.round((camp.success / camp.done) * 100) : 0;
              return (
                <div key={camp.id} className="bg-white rounded-2xl border border-border p-5 stat-card">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-foreground text-base" style={{ fontFamily: "Manrope, sans-serif" }}>
                        {camp.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        <Icon name="Clock" size={11} className="inline mr-1" />
                        Начало: {camp.startTime} · {camp.voip}
                      </p>
                    </div>
                    <Badge className={`text-xs border-0 ${statusCamp[camp.status].color}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusCamp[camp.status].dot} inline-block mr-1.5 ${camp.status === "running" ? "animate-pulse" : ""}`} />
                      {statusCamp[camp.status].label}
                    </Badge>
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-muted-foreground">{camp.done} / {camp.total} звонков</span>
                      <span className="font-semibold text-foreground">{progress}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full gradient-primary transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-secondary/50 rounded-xl p-2.5 text-center">
                      <p className="text-lg font-bold text-foreground">{camp.success}</p>
                      <p className="text-xs text-muted-foreground">Успешных</p>
                    </div>
                    <div className="bg-secondary/50 rounded-xl p-2.5 text-center">
                      <p className="text-lg font-bold text-foreground">{convRate}%</p>
                      <p className="text-xs text-muted-foreground">Конверсия</p>
                    </div>
                    <div className="bg-secondary/50 rounded-xl p-2.5 text-center">
                      <p className="text-lg font-bold text-foreground">{camp.operators}</p>
                      <p className="text-xs text-muted-foreground">Линий</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {camp.status === "running" ? (
                      <Button variant="outline" size="sm" className="flex-1 rounded-xl">
                        <Icon name="Pause" size={13} className="mr-1.5" /> Пауза
                      </Button>
                    ) : camp.status === "paused" ? (
                      <Button size="sm" className="flex-1 rounded-xl gradient-primary text-white border-0 hover:opacity-90">
                        <Icon name="Play" size={13} className="mr-1.5" /> Продолжить
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="flex-1 rounded-xl">
                        <Icon name="RotateCcw" size={13} className="mr-1.5" /> Повторить
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="rounded-xl px-3">
                      <Icon name="BarChart2" size={14} />
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-xl px-3">
                      <Icon name="MoreHorizontal" size={14} />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "log" && (
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/40">
                  <th className="text-left text-xs font-semibold text-muted-foreground px-5 py-3.5">Клиент</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3.5 hidden md:table-cell">Кампания</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3.5">Результат</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3.5 hidden sm:table-cell">Длит.</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3.5 hidden lg:table-cell">Время</th>
                  <th className="px-4 py-3.5"></th>
                </tr>
              </thead>
              <tbody>
                {callLog.map((call, i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                          {call.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{call.name}</p>
                          <p className="text-xs text-muted-foreground">{call.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell text-sm text-muted-foreground">{call.campaign}</td>
                    <td className="px-4 py-4">
                      <Badge className={`text-xs border-0 ${callStatusMap[call.status].bg} ${callStatusMap[call.status].color}`}>
                        {callStatusMap[call.status].label}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 hidden sm:table-cell text-sm text-muted-foreground">{call.duration}</td>
                    <td className="px-4 py-4 hidden lg:table-cell text-sm text-muted-foreground">{call.time}</td>
                    <td className="px-4 py-4">
                      {call.recording && (
                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-50 hover:bg-violet-100 transition-colors">
                          <Icon name="Play" size={12} className="text-violet-600" />
                          <span className="text-xs text-violet-700 font-medium">Запись</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
