import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";

const navItems = [
  { path: "/", label: "Панель управления", icon: "LayoutDashboard" },
  { path: "/clients", label: "Клиенты", icon: "Users" },
  { path: "/calls", label: "Обзвоны", icon: "Phone" },
  { path: "/analytics", label: "Аналитика", icon: "BarChart3" },
  { path: "/reports", label: "Отчёты", icon: "FileText" },
  { path: "/recommendations", label: "Рекомендации", icon: "Sparkles" },
  { path: "/scenarios", label: "Сценарии", icon: "GitBranch" },
  { path: "/settings", label: "Настройки", icon: "Settings2" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={`flex flex-col h-screen sticky top-0 transition-all duration-300 ${
        collapsed ? "w-[72px]" : "w-[240px]"
      }`}
      style={{ background: "hsl(var(--sidebar-background))" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/5">
        <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0 glow-purple">
          <Icon name="Zap" size={18} className="text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-white font-bold text-base leading-tight font-display" style={{ fontFamily: "Manrope, sans-serif" }}>
              VoiceCRM
            </p>
            <p className="text-xs" style={{ color: "hsl(var(--sidebar-foreground))" }}>
              Система обзвонов
            </p>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-md hover:bg-white/10 transition-colors"
          style={{ color: "hsl(var(--sidebar-foreground))" }}
        >
          <Icon name={collapsed ? "ChevronRight" : "ChevronLeft"} size={14} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto scrollbar-thin">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                isActive
                  ? "sidebar-item-active"
                  : "hover:bg-white/8"
              }`}
              style={!isActive ? { color: "hsl(var(--sidebar-foreground))" } : {}}
            >
              <Icon
                name={item.icon}
                size={18}
                className={`flex-shrink-0 transition-colors ${
                  isActive ? "text-white" : "group-hover:text-white/90"
                }`}
              />
              {!collapsed && (
                <span className={`text-sm font-medium truncate ${isActive ? "text-white" : "group-hover:text-white/90"}`}>
                  {item.label}
                </span>
              )}
              {collapsed && (
                <div className="absolute left-full ml-3 px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-900 text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-xl">
                  {item.label}
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User section */}
      <div className="p-3 border-t border-white/5">
        <div className={`flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/8 cursor-pointer transition-colors`}>
          <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">АМ</span>
          </div>
          {!collapsed && (
            <div className="overflow-hidden flex-1">
              <p className="text-white text-sm font-medium truncate">Алексей М.</p>
              <p className="text-xs truncate" style={{ color: "hsl(var(--sidebar-foreground))" }}>
                Администратор
              </p>
            </div>
          )}
          {!collapsed && (
            <Icon name="LogOut" size={14} style={{ color: "hsl(var(--sidebar-foreground))" }} />
          )}
        </div>
      </div>
    </aside>
  );
}
