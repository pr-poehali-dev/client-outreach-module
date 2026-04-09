import { useState } from "react";
import Header from "@/components/layout/Header";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const scenarios = [
  {
    id: 1,
    name: "Холодный звонок B2B",
    desc: "Первичный контакт с потенциальным клиентом. Представление продукта, выявление потребностей.",
    steps: 6,
    usedIn: 3,
    conversion: 38,
    status: "active",
    updated: "Вчера",
  },
  {
    id: 2,
    name: "Повторный контакт",
    desc: "Звонок клиентам, которые уже проявляли интерес. Дожим до сделки.",
    steps: 4,
    usedIn: 2,
    conversion: 67,
    status: "active",
    updated: "3 дня назад",
  },
  {
    id: 3,
    name: "Опрос удовлетворённости",
    desc: "Короткий опрос после завершения сделки. Сбор обратной связи, NPS.",
    steps: 3,
    usedIn: 1,
    conversion: 91,
    status: "active",
    updated: "Неделю назад",
  },
  {
    id: 4,
    name: "Работа с возражениями",
    desc: "Разветвлённый сценарий для сложных переговоров. Обработка типичных отказов.",
    steps: 12,
    usedIn: 0,
    conversion: 0,
    status: "draft",
    updated: "Сегодня",
  },
];

const steps = [
  { id: 1, type: "greeting", label: "Приветствие", desc: "Представиться и назвать компанию", icon: "Hand", color: "bg-violet-100 text-violet-600" },
  { id: 2, type: "check", label: "Проверка времени", desc: "Уточнить, удобно ли говорить", icon: "Clock", color: "bg-cyan-100 text-cyan-600" },
  { id: 3, type: "pitch", label: "Презентация", desc: "Кратко описать предложение (30 сек)", icon: "Megaphone", color: "bg-orange-100 text-orange-600" },
  { id: 4, type: "question", label: "Вопрос клиенту", desc: "Выявить ключевую потребность", icon: "HelpCircle", color: "bg-emerald-100 text-emerald-600" },
  { id: 5, type: "objection", label: "Работа с возражением", desc: "Ответить на типичный отказ", icon: "ShieldCheck", color: "bg-amber-100 text-amber-600" },
  { id: 6, type: "close", label: "Завершение", desc: "Договориться о следующем шаге", icon: "CheckCircle", color: "bg-pink-100 text-pink-600" },
];

export default function Scenarios() {
  const [selected, setSelected] = useState(scenarios[0]);

  return (
    <div className="animate-fade-in-up">
      <Header title="Сценарии" subtitle="Скрипты и алгоритмы разговора для операторов" />
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Scenarios list */}
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold text-foreground">Все сценарии</h2>
              <Button size="sm" className="gradient-primary text-white border-0 rounded-xl hover:opacity-90">
                <Icon name="Plus" size={13} className="mr-1" /> Новый
              </Button>
            </div>
            {scenarios.map((s) => (
              <div
                key={s.id}
                onClick={() => setSelected(s)}
                className={`bg-white rounded-2xl border p-4 cursor-pointer transition-all ${
                  selected.id === s.id
                    ? "border-violet-400 shadow-md glow-purple"
                    : "border-border hover:border-violet-200"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-semibold text-foreground">{s.name}</h3>
                  <Badge className={`text-xs border-0 ${s.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"}`}>
                    {s.status === "active" ? "Активный" : "Черновик"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{s.desc}</p>
                <div className="flex gap-3 text-xs text-muted-foreground">
                  <span><Icon name="GitBranch" size={11} className="inline mr-1" />{s.steps} шагов</span>
                  <span><Icon name="Play" size={11} className="inline mr-1" />В {s.usedIn} кампаниях</span>
                  {s.conversion > 0 && <span className="text-emerald-600 font-medium">{s.conversion}% конв.</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Scenario detail */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-border p-5">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h2 className="text-lg font-bold text-foreground" style={{ fontFamily: "Manrope, sans-serif" }}>
                  {selected.name}
                </h2>
                <p className="text-sm text-muted-foreground mt-0.5">{selected.desc}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="rounded-xl">
                  <Icon name="Pencil" size={13} className="mr-1.5" /> Редактировать
                </Button>
                <Button size="sm" className="gradient-primary text-white border-0 rounded-xl hover:opacity-90">
                  <Icon name="Play" size={13} className="mr-1.5" /> Использовать
                </Button>
              </div>
            </div>

            {/* Steps */}
            <h3 className="text-sm font-semibold text-foreground mb-3">Шаги сценария</h3>
            <div className="space-y-3">
              {steps.map((step, i) => (
                <div key={step.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${step.color}`}>
                      <Icon name={step.icon} size={16} />
                    </div>
                    {i < steps.length - 1 && (
                      <div className="w-0.5 h-4 bg-border mt-1" />
                    )}
                  </div>
                  <div className="flex-1 pb-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs text-muted-foreground">Шаг {i + 1}</span>
                      <span className="text-sm font-medium text-foreground">{step.label}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{step.desc}</p>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 self-start mt-1">
                    <button className="w-7 h-7 rounded-lg hover:bg-secondary flex items-center justify-center">
                      <Icon name="GripVertical" size={13} className="text-muted-foreground" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 py-3 border-2 border-dashed border-border rounded-xl text-sm text-muted-foreground hover:border-violet-300 hover:text-violet-600 transition-colors flex items-center justify-center gap-2">
              <Icon name="Plus" size={15} />
              Добавить шаг
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
