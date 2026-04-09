import Header from "@/components/layout/Header";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const reports = [
  { id: 1, name: "Еженедельный отчёт по звонкам", type: "weekly", date: "09 апр 2026", size: "2.4 МБ", format: "PDF", status: "ready" },
  { id: 2, name: "Конверсия по кампаниям (март)", type: "monthly", date: "01 апр 2026", size: "1.8 МБ", format: "XLSX", status: "ready" },
  { id: 3, name: "Анализ операторов — Q1 2026", type: "quarterly", date: "31 мар 2026", size: "5.1 МБ", format: "PDF", status: "ready" },
  { id: 4, name: "История звонков за апрель", type: "custom", date: "Генерируется...", size: "—", format: "CSV", status: "generating" },
  { id: 5, name: "KPI отдела продаж", type: "weekly", date: "02 апр 2026", size: "1.2 МБ", format: "PDF", status: "ready" },
];

const typeMap: Record<string, { label: string; color: string }> = {
  weekly: { label: "Недельный", color: "text-violet-700 bg-violet-100" },
  monthly: { label: "Месячный", color: "text-cyan-700 bg-cyan-100" },
  quarterly: { label: "Квартальный", color: "text-emerald-700 bg-emerald-100" },
  custom: { label: "Пользовательский", color: "text-orange-700 bg-orange-100" },
};

const templates = [
  { icon: "Phone", label: "Звонки за период", desc: "Полная история с фильтрами" },
  { icon: "TrendingUp", label: "Конверсия кампаний", desc: "Эффективность обзвонов" },
  { icon: "Users", label: "Активность клиентов", desc: "Сегментация и динамика" },
  { icon: "Mic", label: "Анализ записей", desc: "Качество разговоров" },
];

export default function Reports() {
  return (
    <div className="animate-fade-in-up">
      <Header title="Отчёты" subtitle="Создавайте и скачивайте аналитические отчёты" />
      <div className="p-6 space-y-6">
        {/* Report templates */}
        <div>
          <h2 className="text-base font-semibold text-foreground mb-3" style={{ fontFamily: "Manrope, sans-serif" }}>
            Быстрое создание отчёта
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {templates.map((t) => (
              <button
                key={t.label}
                className="bg-white border border-border rounded-2xl p-4 text-left hover:border-violet-300 hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center mb-3 group-hover:gradient-primary transition-all">
                  <Icon name={t.icon} size={18} className="text-violet-600" />
                </div>
                <p className="text-sm font-semibold text-foreground">{t.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{t.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Reports list */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-foreground" style={{ fontFamily: "Manrope, sans-serif" }}>
              Готовые отчёты
            </h2>
            <Button className="gradient-primary text-white border-0 rounded-xl hover:opacity-90" size="sm">
              <Icon name="Plus" size={14} className="mr-2" />
              Создать отчёт
            </Button>
          </div>
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/40">
                  <th className="text-left text-xs font-semibold text-muted-foreground px-5 py-3.5">Название</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3.5 hidden sm:table-cell">Тип</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3.5 hidden md:table-cell">Дата</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3.5 hidden lg:table-cell">Размер</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3.5 hidden lg:table-cell">Формат</th>
                  <th className="px-4 py-3.5"></th>
                </tr>
              </thead>
              <tbody>
                {reports.map((r) => (
                  <tr key={r.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center flex-shrink-0">
                          <Icon name={r.format === "PDF" ? "FileText" : r.format === "CSV" ? "Sheet" : "Table"} size={16} className="text-violet-600" />
                        </div>
                        <p className="text-sm font-medium text-foreground">{r.name}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden sm:table-cell">
                      <Badge className={`text-xs border-0 ${typeMap[r.type].color}`}>{typeMap[r.type].label}</Badge>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell text-sm text-muted-foreground">{r.date}</td>
                    <td className="px-4 py-4 hidden lg:table-cell text-sm text-muted-foreground">{r.size}</td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <span className="text-xs font-mono font-semibold px-2 py-1 bg-secondary rounded-lg">{r.format}</span>
                    </td>
                    <td className="px-4 py-4">
                      {r.status === "ready" ? (
                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-50 hover:bg-violet-100 transition-colors">
                          <Icon name="Download" size={13} className="text-violet-600" />
                          <span className="text-xs text-violet-700 font-medium">Скачать</span>
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="w-3 h-3 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
                          Генерация...
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
