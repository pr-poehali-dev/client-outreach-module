import { useState } from "react";
import Header from "@/components/layout/Header";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const sections = [
  { id: "voip", label: "VoIP интеграция", icon: "Wifi" },
  { id: "notifications", label: "Уведомления", icon: "Bell" },
  { id: "operators", label: "Операторы", icon: "Users" },
  { id: "general", label: "Общие", icon: "Settings2" },
];

const operators = [
  { id: 1, name: "Алексей Михайлов", role: "Администратор", status: "online", calls: 142 },
  { id: 2, name: "Екатерина Фролова", role: "Оператор", status: "online", calls: 87 },
  { id: 3, name: "Иван Козлов", role: "Оператор", status: "offline", calls: 23 },
  { id: 4, name: "Ольга Петрова", role: "Супервайзер", status: "online", calls: 56 },
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState("voip");
  const [voipSettings, setVoipSettings] = useState({
    server: "sip.example.com",
    port: "5060",
    login: "voicecrm_user",
    recording: true,
    autoCall: true,
    parallelLines: "3",
  });
  const [notifications, setNotifications] = useState({
    missedCall: true,
    dailyReport: true,
    lowConversion: false,
    newClient: true,
    campaignEnd: true,
  });

  return (
    <div className="animate-fade-in-up">
      <Header title="Настройки" subtitle="Управление системой и интеграциями" />
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar nav */}
          <div className="space-y-1">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeSection === s.id
                    ? "sidebar-item-active"
                    : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                <Icon name={s.icon} size={16} />
                {s.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-5">
            {activeSection === "voip" && (
              <div className="bg-white rounded-2xl border border-border p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center">
                    <Icon name="Wifi" size={18} className="text-cyan-600" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-foreground" style={{ fontFamily: "Manrope, sans-serif" }}>
                      Настройки VoIP
                    </h2>
                    <p className="text-xs text-muted-foreground">SIP протокол, Asterisk, облачная телефония</p>
                  </div>
                  <div className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs text-emerald-700 font-medium">Подключено</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-medium text-muted-foreground mb-1.5">SIP сервер</Label>
                    <Input
                      value={voipSettings.server}
                      onChange={(e) => setVoipSettings({ ...voipSettings, server: e.target.value })}
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-muted-foreground mb-1.5">Порт</Label>
                    <Input
                      value={voipSettings.port}
                      onChange={(e) => setVoipSettings({ ...voipSettings, port: e.target.value })}
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-muted-foreground mb-1.5">Логин</Label>
                    <Input
                      value={voipSettings.login}
                      onChange={(e) => setVoipSettings({ ...voipSettings, login: e.target.value })}
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-muted-foreground mb-1.5">Пароль</Label>
                    <Input type="password" value="••••••••" className="rounded-xl" />
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-muted-foreground mb-1.5">Параллельных линий</Label>
                    <Input
                      value={voipSettings.parallelLines}
                      onChange={(e) => setVoipSettings({ ...voipSettings, parallelLines: e.target.value })}
                      type="number"
                      className="rounded-xl"
                    />
                  </div>
                </div>
                <div className="mt-5 space-y-3 pt-5 border-t border-border">
                  {[
                    { key: "recording", label: "Запись всех звонков", desc: "Автоматически записывать каждый разговор" },
                    { key: "autoCall", label: "Автодозвон", desc: "Повторно набирать при занятости или нет ответа" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                      <Switch
                        checked={voipSettings[item.key as keyof typeof voipSettings] as boolean}
                        onCheckedChange={(v) => setVoipSettings({ ...voipSettings, [item.key]: v })}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <Button className="gradient-primary text-white border-0 rounded-xl hover:opacity-90">
                    Сохранить
                  </Button>
                  <Button variant="outline" className="rounded-xl">
                    Проверить соединение
                  </Button>
                </div>
              </div>
            )}

            {activeSection === "notifications" && (
              <div className="bg-white rounded-2xl border border-border p-6">
                <h2 className="font-semibold text-foreground mb-5" style={{ fontFamily: "Manrope, sans-serif" }}>
                  Настройки уведомлений
                </h2>
                <div className="space-y-4">
                  {[
                    { key: "missedCall", label: "Пропущенные звонки", desc: "Push-уведомление при каждом пропуске" },
                    { key: "dailyReport", label: "Ежедневный отчёт", desc: "Сводка в 20:00 каждый день" },
                    { key: "lowConversion", label: "Низкая конверсия", desc: "Если конверсия падает ниже 40%" },
                    { key: "newClient", label: "Новый клиент", desc: "При добавлении нового контакта" },
                    { key: "campaignEnd", label: "Завершение кампании", desc: "Когда кампания обзвона завершена" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                      <Switch
                        checked={notifications[item.key as keyof typeof notifications]}
                        onCheckedChange={(v) => setNotifications({ ...notifications, [item.key]: v })}
                      />
                    </div>
                  ))}
                </div>
                <Button className="mt-5 gradient-primary text-white border-0 rounded-xl hover:opacity-90">
                  Сохранить
                </Button>
              </div>
            )}

            {activeSection === "operators" && (
              <div className="bg-white rounded-2xl border border-border p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-semibold text-foreground" style={{ fontFamily: "Manrope, sans-serif" }}>
                    Операторы
                  </h2>
                  <Button size="sm" className="gradient-primary text-white border-0 rounded-xl hover:opacity-90">
                    <Icon name="UserPlus" size={14} className="mr-1.5" /> Добавить
                  </Button>
                </div>
                <div className="space-y-2">
                  {operators.map((op) => (
                    <div key={op.id} className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-secondary/50 transition-colors">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-bold">
                          {op.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                        <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${op.status === "online" ? "bg-emerald-500" : "bg-gray-300"}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{op.name}</p>
                        <p className="text-xs text-muted-foreground">{op.role} · {op.calls} звонков</p>
                      </div>
                      <span className={`text-xs font-medium ${op.status === "online" ? "text-emerald-600" : "text-muted-foreground"}`}>
                        {op.status === "online" ? "Онлайн" : "Офлайн"}
                      </span>
                      <button className="w-8 h-8 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors">
                        <Icon name="MoreHorizontal" size={15} className="text-muted-foreground" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === "general" && (
              <div className="bg-white rounded-2xl border border-border p-6">
                <h2 className="font-semibold text-foreground mb-5" style={{ fontFamily: "Manrope, sans-serif" }}>
                  Общие настройки
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label className="text-xs font-medium text-muted-foreground mb-1.5">Название компании</Label>
                    <Input defaultValue="VoiceCRM Pro" className="rounded-xl max-w-sm" />
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-muted-foreground mb-1.5">Часовой пояс</Label>
                    <Input defaultValue="UTC+3 (Москва)" className="rounded-xl max-w-sm" />
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-muted-foreground mb-1.5">Рабочие часы</Label>
                    <div className="flex gap-2 max-w-sm">
                      <Input defaultValue="09:00" className="rounded-xl" />
                      <span className="self-center text-muted-foreground">—</span>
                      <Input defaultValue="20:00" className="rounded-xl" />
                    </div>
                  </div>
                </div>
                <Button className="mt-5 gradient-primary text-white border-0 rounded-xl hover:opacity-90">
                  Сохранить
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
