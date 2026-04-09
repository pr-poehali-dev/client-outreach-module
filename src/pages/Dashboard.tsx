import Header from "@/components/layout/Header";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const callData = [
  { day: "Пн", calls: 42, success: 28 },
  { day: "Вт", calls: 58, success: 41 },
  { day: "Ср", calls: 35, success: 22 },
  { day: "Чт", calls: 71, success: 55 },
  { day: "Пт", calls: 63, success: 48 },
  { day: "Сб", calls: 19, success: 12 },
  { day: "Вс", calls: 8, success: 5 },
];

const recentCalls = [
  { name: "Ирина Смирнова", phone: "+7 (999) 123-45-67", status: "success", duration: "3:42", time: "2 мин назад" },
  { name: "Дмитрий Козлов", phone: "+7 (916) 234-56-78", status: "missed", duration: "—", time: "8 мин назад" },
  { name: "Наталья Попова", phone: "+7 (926) 345-67-89", status: "success", duration: "7:15", time: "15 мин назад" },
  { name: "Сергей Волков", phone: "+7 (903) 456-78-90", status: "busy", duration: "—", time: "22 мин назад" },
  { name: "Елена Новикова", phone: "+7 (977) 567-89-01", status: "success", duration: "5:08", time: "31 мин назад" },
];

const stats = [
  {
    label: "Звонков сегодня",
    value: "247",
    change: "+18%",
    positive: true,
    icon: "Phone",
    gradient: "from-violet-500 to-purple-600",
    bg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    label: "Успешных контактов",
    value: "183",
    change: "+12%",
    positive: true,
    icon: "PhoneCall",
    gradient: "from-cyan-500 to-blue-500",
    bg: "bg-cyan-50",
    iconColor: "text-cyan-600",
  },
  {
    label: "Конверсия",
    value: "74.1%",
    change: "+3.2%",
    positive: true,
    icon: "TrendingUp",
    gradient: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    label: "Активных клиентов",
    value: "1,429",
    change: "-2.1%",
    positive: false,
    icon: "Users",
    gradient: "from-orange-400 to-rose-500",
    bg: "bg-orange-50",
    iconColor: "text-orange-600",
  },
];

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  success: { label: "Успешный", color: "text-emerald-700", bg: "bg-emerald-100" },
  missed: { label: "Пропущен", color: "text-red-700", bg: "bg-red-100" },
  busy: { label: "Занято", color: "text-orange-700", bg: "bg-orange-100" },
};

export default function Dashboard() {
  return (
    <div className="animate-fade-in-up">
      <Header
        title="Панель управления"
        subtitle="Добро пожаловать! Вот что происходит сегодня."
      />
      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card rounded-2xl p-5 border border-border">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <Icon name={stat.icon} size={20} className={stat.iconColor} />
                </div>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    stat.positive
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground" style={{ fontFamily: "Manrope, sans-serif" }}>
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-border p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-semibold text-foreground" style={{ fontFamily: "Manrope, sans-serif" }}>
                  Активность звонков
                </h3>
                <p className="text-sm text-muted-foreground">За последние 7 дней</p>
              </div>
              <div className="flex gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-violet-500 inline-block"></span>
                  Всего
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block"></span>
                  Успешных
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={callData}>
                <defs>
                  <linearGradient id="gradCalls" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradSuccess" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
                />
                <Area type="monotone" dataKey="calls" stroke="#7c3aed" strokeWidth={2.5} fill="url(#gradCalls)" name="Всего" />
                <Area type="monotone" dataKey="success" stroke="#06b6d4" strokeWidth={2.5} fill="url(#gradSuccess)" name="Успешных" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Quick actions */}
          <div className="bg-white rounded-2xl border border-border p-5">
            <h3 className="font-semibold text-foreground mb-4" style={{ fontFamily: "Manrope, sans-serif" }}>
              Быстрые действия
            </h3>
            <div className="space-y-3">
              <Button className="w-full justify-start gap-3 gradient-primary text-white border-0 h-11 rounded-xl hover:opacity-90">
                <Icon name="Play" size={16} />
                Запустить обзвон
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3 h-11 rounded-xl">
                <Icon name="UserPlus" size={16} />
                Добавить клиента
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3 h-11 rounded-xl">
                <Icon name="Upload" size={16} />
                Импорт базы
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3 h-11 rounded-xl">
                <Icon name="FileBarChart" size={16} />
                Создать отчёт
              </Button>
            </div>

            <div className="mt-5 pt-5 border-t border-border">
              <h4 className="text-sm font-semibold text-foreground mb-3">Активные кампании</h4>
              <div className="space-y-2.5">
                {[
                  { name: "Акция декабрь", progress: 68, color: "bg-violet-500" },
                  { name: "Холодный обзвон", progress: 35, color: "bg-cyan-500" },
                  { name: "Повторные клиенты", progress: 91, color: "bg-emerald-500" },
                ].map((camp) => (
                  <div key={camp.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">{camp.name}</span>
                      <span className="font-medium">{camp.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full ${camp.color} rounded-full transition-all`}
                        style={{ width: `${camp.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent calls */}
        <div className="bg-white rounded-2xl border border-border p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-foreground" style={{ fontFamily: "Manrope, sans-serif" }}>
              Последние звонки
            </h3>
            <Button variant="ghost" size="sm" className="text-violet-600 hover:text-violet-700 hover:bg-violet-50">
              Все звонки <Icon name="ArrowRight" size={14} className="ml-1" />
            </Button>
          </div>
          <div className="space-y-1">
            {recentCalls.map((call, i) => (
              <div
                key={i}
                className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-secondary/50 transition-colors cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {call.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{call.name}</p>
                  <p className="text-xs text-muted-foreground">{call.phone}</p>
                </div>
                <Badge className={`text-xs ${statusConfig[call.status].bg} ${statusConfig[call.status].color} border-0`}>
                  {statusConfig[call.status].label}
                </Badge>
                <span className="text-xs text-muted-foreground w-12 text-right">{call.duration}</span>
                <span className="text-xs text-muted-foreground hidden sm:block w-24 text-right">{call.time}</span>
                <button className="w-7 h-7 rounded-lg hover:bg-violet-100 flex items-center justify-center transition-colors">
                  <Icon name="Play" size={13} className="text-violet-600" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
