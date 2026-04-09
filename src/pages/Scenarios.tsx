/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useCallback } from "react";
import Header from "@/components/layout/Header";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/* ── Types ── */
interface FlowNode {
  id: string;
  type: "start" | "message" | "branch" | "action" | "end";
  label: string;
  desc: string;
  x: number;
  y: number;
}

interface FlowEdge {
  id: string;
  from: string;
  to: string;
  label?: string;
  color?: string;
}

/* ── Default flow ── */
const defaultNodes: FlowNode[] = [
  { id: "start",   type: "start",   label: "Начало звонка",      desc: "Робот набирает номер клиента",     x: 60,  y: 40  },
  { id: "greet",   type: "message", label: "Приветствие",        desc: "«Здравствуйте! Это компания…»",    x: 60,  y: 160 },
  { id: "branch1", type: "branch",  label: "Клиент ответил?",    desc: "Ждём ответа до 25 сек",            x: 60,  y: 280 },
  { id: "pitch",   type: "message", label: "Презентация",        desc: "Краткое описание предложения",     x: 60,  y: 400 },
  { id: "branch2", type: "branch",  label: "Интерес есть?",      desc: "Анализ ответа клиента",            x: 60,  y: 520 },
  { id: "deal",    type: "action",  label: "Перевод на менеджера", desc: "Соединить с живым оператором",    x: 60,  y: 640 },
  { id: "callback",type: "action",  label: "Запись на перезвон", desc: "Предложить удобное время",         x: 260, y: 580 },
  { id: "noanswer",type: "action",  label: "Нет ответа",         desc: "Повтор через 2 часа",              x: 260, y: 310 },
  { id: "end_ok",  type: "end",     label: "Успех",              desc: "Сделка / встреча назначена",       x: 60,  y: 760 },
  { id: "end_no",  type: "end",     label: "Завершён",           desc: "CRM: статус «Отказ»",             x: 260, y: 700 },
];

const defaultEdges: FlowEdge[] = [
  { id: "e1", from: "start",    to: "greet",    label: "" },
  { id: "e2", from: "greet",    to: "branch1",  label: "" },
  { id: "e3", from: "branch1",  to: "pitch",    label: "Ответил", color: "#10b981" },
  { id: "e4", from: "branch1",  to: "noanswer", label: "Не ответил", color: "#f59e0b" },
  { id: "e5", from: "pitch",    to: "branch2",  label: "" },
  { id: "e6", from: "branch2",  to: "deal",     label: "Да", color: "#10b981" },
  { id: "e7", from: "branch2",  to: "callback", label: "Нет", color: "#f43f5e" },
  { id: "e8", from: "deal",     to: "end_ok",   label: "" },
  { id: "e9", from: "callback", to: "end_no",   label: "" },
];

/* ── Node config ── */
const NODE_CFG: Record<string, { color: string; bg: string; icon: string }> = {
  start:   { color: "#10b981", bg: "rgba(16,185,129,0.12)",  icon: "Play" },
  message: { color: "#a855f7", bg: "rgba(168,85,247,0.12)",  icon: "MessageSquare" },
  branch:  { color: "#f59e0b", bg: "rgba(245,158,11,0.12)",  icon: "GitBranch" },
  action:  { color: "#06b6d4", bg: "rgba(6,182,212,0.12)",   icon: "Zap" },
  end:     { color: "#6b7280", bg: "rgba(107,114,128,0.12)", icon: "StopCircle" },
};

const SIDEBAR_SCENARIOS = [
  { id: "cold", name: "Холодный звонок B2B", conv: 38, active: true  },
  { id: "warm", name: "Повторный контакт",   conv: 67, active: true  },
  { id: "nps",  name: "Опрос NPS",           conv: 91, active: true  },
  { id: "obj",  name: "Работа с возражениями", conv: 0, active: false },
];

/* ── SVG edge helper ── */
function EdgeSVG({ nodes, edges }: { nodes: FlowNode[]; edges: FlowEdge[] }) {
  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const NODE_W = 175;
  const NODE_H = 80;

  return (
    <svg
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "visible" }}
    >
      <defs>
        {["#10b981", "#a855f7", "#f59e0b", "#f43f5e", "#6b7280", "#06b6d4"].map((c) => (
          <marker key={c} id={`arrow-${c.replace("#","")}`} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill={c} />
          </marker>
        ))}
      </defs>
      {edges.map((e) => {
        const from = nodeMap[e.from];
        const to = nodeMap[e.to];
        if (!from || !to) return null;
        const x1 = from.x + NODE_W / 2;
        const y1 = from.y + NODE_H;
        const x2 = to.x + NODE_W / 2;
        const y2 = to.y;
        const color = e.color || "rgba(255,255,255,0.15)";
        const cx1 = x1;
        const cy1 = y1 + (y2 - y1) * 0.4;
        const cx2 = x2;
        const cy2 = y2 - (y2 - y1) * 0.4;
        const arrowId = `arrow-${(e.color || "#6b7280").replace("#", "")}`;
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;
        return (
          <g key={e.id}>
            <path
              d={`M${x1},${y1} C${cx1},${cy1} ${cx2},${cy2} ${x2},${y2}`}
              fill="none"
              stroke={color}
              strokeWidth="1.5"
              strokeDasharray={e.label ? "none" : "none"}
              markerEnd={`url(#${arrowId})`}
              opacity={0.7}
            />
            {e.label && (
              <text x={mx} y={my} textAnchor="middle" fill={color} fontSize="10" fontFamily="Golos Text, sans-serif" fontWeight="600"
                dy={-4} style={{ filter: "drop-shadow(0 1px 2px #070b12)" }}>
                {e.label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* ── Flow Node component ── */
function FlowNodeCard({
  node,
  selected,
  onSelect,
  onDrag,
}: {
  node: FlowNode;
  selected: boolean;
  onSelect: (id: string) => void;
  onDrag: (id: string, dx: number, dy: number) => void;
}) {
  const cfg = NODE_CFG[node.type];
  const dragRef = useRef<{ startX: number; startY: number } | null>(null);

  const onMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(node.id);
    dragRef.current = { startX: e.clientX, startY: e.clientY };

    const onMove = (ev: MouseEvent) => {
      if (!dragRef.current) return;
      onDrag(node.id, ev.clientX - dragRef.current.startX, ev.clientY - dragRef.current.startY);
      dragRef.current = { startX: ev.clientX, startY: ev.clientY };
    };
    const onUp = () => {
      dragRef.current = null;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  return (
    <div
      className={`flow-node ${selected ? "flow-node--selected" : ""}`}
      style={{ left: node.x, top: node.y, width: 175 }}
      onMouseDown={onMouseDown}
    >
      <div className="flow-node-header">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: cfg.bg }}
        >
          <Icon name={cfg.icon as any} size={13} style={{ color: cfg.color }} />
        </div>
        <div className="flex-1 min-w-0 ml-2">
          <div className="text-white text-xs font-semibold truncate">{node.label}</div>
        </div>
        <div
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: cfg.color, boxShadow: `0 0 6px ${cfg.color}` }}
        />
      </div>
      <div className="flow-node-body">{node.desc}</div>
    </div>
  );
}

/* ── Main page ── */
export default function Scenarios() {
  const [activeScenario, setActiveScenario] = useState("cold");
  const [nodes, setNodes] = useState<FlowNode[]>(defaultNodes);
  const [edges] = useState<FlowEdge[]>(defaultEdges);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [showBuilder, setShowBuilder] = useState(true);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleDrag = useCallback((id: string, dx: number, dy: number) => {
    setNodes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, x: Math.max(0, n.x + dx), y: Math.max(0, n.y + dy) } : n))
    );
  }, []);

  const selected = nodes.find((n) => n.id === selectedNode);

  const addNode = (type: FlowNode["type"]) => {
    const id = `node_${Date.now()}`;
    const labels: Record<string, string> = {
      message: "Новое сообщение",
      branch: "Новое условие",
      action: "Новое действие",
      end: "Завершение",
      start: "Старт",
    };
    setNodes((prev) => [
      ...prev,
      { id, type, label: labels[type], desc: "Нажмите для редактирования", x: 100 + Math.random() * 100, y: 100 + Math.random() * 100 },
    ]);
    setSelectedNode(id);
  };

  return (
    <div className="animate-fade-in-up h-full flex flex-col">
      <Header title="Сценарии" subtitle="Визуальный конструктор схем автообзвона" />

      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar: scenario list */}
        <div className="w-56 border-r border-white/5 flex flex-col bg-[#0a0f1a]">
          <div className="p-3 border-b border-white/5 flex items-center justify-between">
            <span className="text-white/60 text-xs font-semibold uppercase tracking-widest">Сценарии</span>
            <button
              onClick={() => addNode("start")}
              className="w-6 h-6 bg-violet-500/20 rounded-lg flex items-center justify-center text-violet-400 hover:bg-violet-500/30 transition-colors"
            >
              <Icon name="Plus" size={13} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {SIDEBAR_SCENARIOS.map((s) => (
              <button
                key={s.id}
                onClick={() => { setActiveScenario(s.id); setNodes(defaultNodes); setSelectedNode(null); }}
                className={`w-full text-left p-2.5 rounded-xl transition-all ${
                  activeScenario === s.id
                    ? "bg-violet-500/15 border border-violet-500/25"
                    : "hover:bg-white/4 border border-transparent"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white text-xs font-medium leading-snug">{s.name}</span>
                  <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ml-1 ${s.active ? "bg-emerald-400" : "bg-white/20"}`} />
                </div>
                {s.conv > 0 && (
                  <span className="text-emerald-400 text-[10px] font-semibold">{s.conv}% конв.</span>
                )}
              </button>
            ))}
          </div>

          {/* Node palette */}
          <div className="p-3 border-t border-white/5">
            <p className="text-white/30 text-[10px] uppercase tracking-widest mb-2">Добавить блок</p>
            <div className="grid grid-cols-2 gap-1.5">
              {(["message", "branch", "action", "end"] as const).map((t) => {
                const cfg = NODE_CFG[t];
                const labels: Record<string, string> = { message: "Сообщ.", branch: "Условие", action: "Действие", end: "Конец" };
                return (
                  <button
                    key={t}
                    onClick={() => addNode(t)}
                    className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg border border-white/6 hover:border-white/15 transition-all text-[10px] text-white/50 hover:text-white"
                    style={{ background: cfg.bg }}
                  >
                    <Icon name={cfg.icon as any} size={11} style={{ color: cfg.color }} />
                    {labels[t]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Center: flow canvas */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Canvas toolbar */}
          <div className="flex items-center gap-3 px-4 py-2.5 border-b border-white/5 bg-[#080c14]">
            <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/25 border text-xs">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse inline-block mr-1.5" />
              Автообзвон активен
            </Badge>
            <div className="flex-1" />
            <button
              onClick={() => setShowBuilder(!showBuilder)}
              className="text-xs text-white/40 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Icon name={showBuilder ? "EyeOff" : "Eye"} size={13} />
              {showBuilder ? "Скрыть схему" : "Показать схему"}
            </button>
            <Button size="sm" className="crm-btn-primary text-xs h-7 px-3">
              <Icon name="Play" size={12} />
              <span className="ml-1">Запустить</span>
            </Button>
            <Button size="sm" variant="outline" className="crm-btn-outline text-xs h-7 px-3">
              <Icon name="Download" size={12} />
              <span className="ml-1">Экспорт</span>
            </Button>
          </div>

          {/* Canvas */}
          {showBuilder && (
            <div
              ref={canvasRef}
              className="flow-canvas flex-1 relative"
              style={{ minHeight: 900 }}
              onClick={() => setSelectedNode(null)}
            >
              <EdgeSVG nodes={nodes} edges={edges} />
              {nodes.map((node) => (
                <FlowNodeCard
                  key={node.id}
                  node={node}
                  selected={selectedNode === node.id}
                  onSelect={setSelectedNode}
                  onDrag={handleDrag}
                />
              ))}

              {/* Legend */}
              <div className="absolute bottom-4 left-4 flex flex-col gap-1.5 bg-black/40 backdrop-blur-sm border border-white/5 rounded-xl p-3">
                <p className="text-white/30 text-[10px] uppercase tracking-widest mb-1">Легенда</p>
                {Object.entries(NODE_CFG).map(([type, cfg]) => (
                  <div key={type} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: cfg.color, opacity: 0.8 }} />
                    <span className="text-white/40 text-[10px]">
                      {{ start: "Начало", message: "Сообщение", branch: "Условие", action: "Действие", end: "Конец" }[type]}
                    </span>
                  </div>
                ))}
              </div>

              {/* Stats overlay */}
              <div className="absolute top-4 right-4 flex gap-2">
                {[
                  { v: nodes.length, label: "Узлов" },
                  { v: edges.length, label: "Связей" },
                  { v: nodes.filter((n) => n.type === "branch").length, label: "Условий" },
                ].map((s) => (
                  <div key={s.label} className="bg-black/40 backdrop-blur-sm border border-white/5 rounded-xl px-3 py-2 text-center">
                    <div className="text-white font-bold text-base">{s.v}</div>
                    <div className="text-white/30 text-[10px]">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right sidebar: node properties */}
        <div className="w-56 border-l border-white/5 bg-[#0a0f1a] flex flex-col">
          <div className="p-3 border-b border-white/5">
            <span className="text-white/60 text-xs font-semibold uppercase tracking-widest">Свойства</span>
          </div>

          {selected ? (
            <div className="p-3 space-y-4 flex-1 overflow-y-auto">
              <div>
                <label className="text-white/30 text-[10px] uppercase tracking-widest block mb-1.5">Тип блока</label>
                <div
                  className="flex items-center gap-2 px-2.5 py-2 rounded-lg"
                  style={{ background: NODE_CFG[selected.type].bg }}
                >
                  <Icon name={NODE_CFG[selected.type].icon as any} size={13} style={{ color: NODE_CFG[selected.type].color }} />
                  <span className="text-white text-xs font-medium">
                    {{ start: "Начало", message: "Сообщение", branch: "Условие", action: "Действие", end: "Конец" }[selected.type]}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-white/30 text-[10px] uppercase tracking-widest block mb-1.5">Название</label>
                <input
                  className="crm-input w-full text-xs"
                  value={selected.label}
                  onChange={(e) =>
                    setNodes((prev) => prev.map((n) => (n.id === selected.id ? { ...n, label: e.target.value } : n)))
                  }
                />
              </div>

              <div>
                <label className="text-white/30 text-[10px] uppercase tracking-widest block mb-1.5">Описание</label>
                <textarea
                  className="crm-input w-full text-xs resize-none"
                  rows={3}
                  value={selected.desc}
                  onChange={(e) =>
                    setNodes((prev) => prev.map((n) => (n.id === selected.id ? { ...n, desc: e.target.value } : n)))
                  }
                />
              </div>

              {selected.type === "branch" && (
                <div>
                  <label className="text-white/30 text-[10px] uppercase tracking-widest block mb-1.5">Условия</label>
                  <div className="space-y-1.5">
                    {["Ответил", "Не ответил", "Занято"].map((c) => (
                      <div key={c} className="flex items-center gap-2 text-xs text-white/50">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selected.type === "message" && (
                <div>
                  <label className="text-white/30 text-[10px] uppercase tracking-widest block mb-1.5">Текст TTS</label>
                  <textarea
                    className="crm-input w-full text-xs resize-none"
                    rows={4}
                    placeholder="Текст для синтеза речи..."
                  />
                </div>
              )}

              <button
                onClick={() => {
                  setNodes((prev) => prev.filter((n) => n.id !== selected.id));
                  setSelectedNode(null);
                }}
                className="w-full py-2 rounded-lg text-xs text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 transition-colors flex items-center justify-center gap-1.5"
              >
                <Icon name="Trash2" size={12} />
                Удалить блок
              </button>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
              <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center mb-3">
                <Icon name="MousePointer" size={18} className="text-white/20" />
              </div>
              <p className="text-white/25 text-xs leading-relaxed">Кликните на блок схемы, чтобы редактировать его свойства</p>
            </div>
          )}

          {/* Scenario stats */}
          <div className="p-3 border-t border-white/5 space-y-2">
            <p className="text-white/30 text-[10px] uppercase tracking-widest">Статистика</p>
            {[
              { label: "Обзвонено", value: "1 240" },
              { label: "Конверсия", value: "38%" },
              { label: "Ср. время", value: "3:42" },
            ].map((s) => (
              <div key={s.label} className="flex justify-between">
                <span className="text-white/35 text-xs">{s.label}</span>
                <span className="text-white text-xs font-semibold">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
