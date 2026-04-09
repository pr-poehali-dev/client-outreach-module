import { useState } from "react";
import Header from "@/components/layout/Header";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const clients = [
  { id: 1, name: "Ирина Смирнова", phone: "+7 (999) 123-45-67", email: "i.smirnova@mail.ru", company: "ООО Ромашка", status: "active", calls: 14, lastCall: "Сегодня", score: 92 },
  { id: 2, name: "Дмитрий Козлов", phone: "+7 (916) 234-56-78", email: "d.kozlov@gmail.com", company: "ИП Козлов", status: "inactive", calls: 3, lastCall: "3 дня назад", score: 41 },
  { id: 3, name: "Наталья Попова", phone: "+7 (926) 345-67-89", email: "n.popova@yandex.ru", company: "Стройгрупп", status: "active", calls: 27, lastCall: "Вчера", score: 87 },
  { id: 4, name: "Сергей Волков", phone: "+7 (903) 456-78-90", email: "s.volkov@corp.ru", company: "ЗАО Альфа", status: "prospect", calls: 1, lastCall: "Неделю назад", score: 58 },
  { id: 5, name: "Елена Новикова", phone: "+7 (977) 567-89-01", email: "e.novikova@bk.ru", company: "ООО Прогресс", status: "active", calls: 19, lastCall: "Сегодня", score: 95 },
  { id: 6, name: "Андрей Морозов", phone: "+7 (965) 678-90-12", email: "a.morozov@list.ru", company: "Технопарк", status: "blocked", calls: 0, lastCall: "—", score: 12 },
  { id: 7, name: "Мария Лебедева", phone: "+7 (985) 789-01-23", email: "m.lebedeva@mail.ru", company: "Медиахолдинг", status: "active", calls: 8, lastCall: "2 дня назад", score: 76 },
  { id: 8, name: "Алексей Соколов", phone: "+7 (906) 890-12-34", email: "a.sokolov@rambler.ru", company: "Логистик РУС", status: "prospect", calls: 2, lastCall: "4 дня назад", score: 63 },
];

const statusMap: Record<string, { label: string; color: string; bg: string }> = {
  active: { label: "Активный", color: "text-emerald-700", bg: "bg-emerald-100" },
  inactive: { label: "Неактивный", color: "text-gray-600", bg: "bg-gray-100" },
  prospect: { label: "Потенциальный", color: "text-blue-700", bg: "bg-blue-100" },
  blocked: { label: "Заблокирован", color: "text-red-700", bg: "bg-red-100" },
};

export default function Clients() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = clients.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.company.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || c.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="animate-fade-in-up">
      <Header title="Клиенты" subtitle={`${clients.length} контактов в базе`} />
      <div className="p-6 space-y-5">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-md">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск по имени, телефону, компании..."
              className="pl-9 rounded-xl"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {["all", "active", "prospect", "inactive", "blocked"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  filter === f
                    ? "gradient-primary text-white shadow-sm"
                    : "bg-white border border-border text-muted-foreground hover:border-violet-300"
                }`}
              >
                {{ all: "Все", active: "Активные", prospect: "Потенциальные", inactive: "Неактивные", blocked: "Заблокированные" }[f]}
              </button>
            ))}
          </div>
          <Button className="gradient-primary text-white border-0 rounded-xl hover:opacity-90 ml-auto">
            <Icon name="UserPlus" size={16} className="mr-2" />
            Добавить
          </Button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/40">
                <th className="text-left text-xs font-semibold text-muted-foreground px-5 py-3.5">Клиент</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3.5 hidden md:table-cell">Компания</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3.5 hidden lg:table-cell">Звонков</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3.5 hidden lg:table-cell">Последний звонок</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3.5">Статус</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3.5 hidden xl:table-cell">Оценка</th>
                <th className="px-4 py-3.5"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((client, i) => (
                <tr key={client.id} className={`border-b border-border last:border-0 hover:bg-secondary/30 transition-colors cursor-pointer ${i % 2 === 0 ? "" : "bg-secondary/10"}`}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {client.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{client.name}</p>
                        <p className="text-xs text-muted-foreground">{client.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <p className="text-sm text-foreground">{client.company}</p>
                    <p className="text-xs text-muted-foreground">{client.email}</p>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <span className="text-sm font-medium text-foreground">{client.calls}</span>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <span className="text-sm text-muted-foreground">{client.lastCall}</span>
                  </td>
                  <td className="px-4 py-4">
                    <Badge className={`text-xs ${statusMap[client.status].bg} ${statusMap[client.status].color} border-0`}>
                      {statusMap[client.status].label}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 hidden xl:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 bg-secondary rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${client.score >= 80 ? "bg-emerald-500" : client.score >= 50 ? "bg-amber-500" : "bg-red-500"}`}
                          style={{ width: `${client.score}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium">{client.score}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-1.5">
                      <button className="w-8 h-8 rounded-lg hover:bg-violet-100 flex items-center justify-center transition-colors">
                        <Icon name="Phone" size={14} className="text-violet-600" />
                      </button>
                      <button className="w-8 h-8 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors">
                        <Icon name="MoreHorizontal" size={14} className="text-muted-foreground" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
