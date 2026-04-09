import Header from "@/components/layout/Header";
import Icon from "@/components/ui/icon";
import {
  AreaChart, Area,
  BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const weeklyData = [
  { day: "Пн", total: 120, success: 82, missed: 38 },
  { day: "Вт", total: 145, success: 98, missed: 47 },
  { day: "Ср", total: 89, success: 61, missed: 28 },
  { day: "Чт", total: 167, success: 124, missed: 43 },
  { day: "Пт", total: 153, success: 109, missed: 44 },
  { day: "Сб", total: 44, success: 28, missed: 16 },
  { day: "Вс", total: 21, success: 13, missed: 8 },
];

const hourlyData = [
  { hour: "8:00", calls: 12 }, { hour: "9:00", calls: 38 }, { hour: "10:00", calls: 67 },
  { hour: "11:00", calls: 89 }, { hour: "12:00", calls: 54 }, { hour: "13:00", calls: 31 },
  { hour: "14:00", calls: 72 }, { hour: "15:00", calls: 85 }, { hour: "16:00", calls: 76 },
  { hour: "17:00", calls: 45 }, { hour: "18:00", calls: 22 }, { hour: "19:00", calls: 8 },
];

const resultsPie = [
  { name: "Успешных", value: 511, color: "#10b981" },
  { name: "Нет ответа", value: 187, color: "#94a3b8" },
  { name: "Занято", value: 89, color: "#f59e0b" },
  { name: "Отказ", value: 52, color: "#ef4444" },
];

const kpis = [
  { label: "Всего звонков", value: "839", sub: "за неделю", icon: "Phone", color: "text-violet-600", bg: "bg-violet-50" },
  { label: "Успешность", value: "60.9%", sub: "+4.2% к прошлой неделе", icon: "TrendingUp", color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Среднее время", value: "4:18", sub: "мин на звонок", icon: "Clock", color: "text-cyan-600", bg: "bg-cyan-50" },
  { label: "Пиковый час", value: "11:00", sub: "89 звонков", icon: "Zap", color: "text-orange-600", bg: "bg-orange-50" },
];

export default function Analytics() {
  return (
    <div className="animate-fade-in-up">
      <Header title="Аналитика" subtitle="Детальная статистика по звонкам и кампаниям" />
      <div className="p-6 space-y-6">
        {/* KPI row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="stat-card rounded-2xl p-5 border border-border bg-white">
              <div className={`w-10 h-10 rounded-xl ${kpi.bg} flex items-center justify-center mb-3`}>
                <Icon name={kpi.icon} size={18} className={kpi.color} />
              </div>
              <p className="text-2xl font-bold text-foreground" style={{ fontFamily: "Manrope, sans-serif" }}>{kpi.value}</p>
              <p className="text-sm font-medium text-foreground mt-0.5">{kpi.label}</p>
              <p className="text-xs text-muted-foreground">{kpi.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weekly area chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-border p-5">
            <h3 className="font-semibold text-foreground mb-1" style={{ fontFamily: "Manrope, sans-serif" }}>Звонки по дням недели</h3>
            <p className="text-sm text-muted-foreground mb-5">Разбивка по результатам</p>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={weeklyData} barSize={22}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0" }} />
                <Bar dataKey="success" fill="#10b981" name="Успешных" radius={[4, 4, 0, 0]} />
                <Bar dataKey="missed" fill="#f1f5f9" name="Пропущенных" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie chart */}
          <div className="bg-white rounded-2xl border border-border p-5">
            <h3 className="font-semibold text-foreground mb-1" style={{ fontFamily: "Manrope, sans-serif" }}>Результаты звонков</h3>
            <p className="text-sm text-muted-foreground mb-3">Распределение по типам</p>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={resultsPie} innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                  {resultsPie.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {resultsPie.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                    <span className="text-xs text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="text-xs font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hourly distribution */}
        <div className="bg-white rounded-2xl border border-border p-5">
          <h3 className="font-semibold text-foreground mb-1" style={{ fontFamily: "Manrope, sans-serif" }}>Распределение по часам</h3>
          <p className="text-sm text-muted-foreground mb-5">Активность в течение рабочего дня</p>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={hourlyData}>
              <defs>
                <linearGradient id="gradHourly" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="hour" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0" }} />
              <Area type="monotone" dataKey="calls" stroke="#7c3aed" strokeWidth={2.5} fill="url(#gradHourly)" name="Звонков" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
