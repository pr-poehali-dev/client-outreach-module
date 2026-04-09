import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white/70 backdrop-blur-md border-b border-border sticky top-0 z-10">
      <div>
        <h1 className="text-xl font-bold text-foreground" style={{ fontFamily: "Manrope, sans-serif" }}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
        )}
      </div>
      <div className="flex items-center gap-3">
        {/* VoIP Status */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-medium text-emerald-700">VoIP подключён</span>
        </div>

        {/* Notifications */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-secondary hover:bg-accent/10 transition-colors">
          <Icon name="Bell" size={17} className="text-muted-foreground" />
          <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center text-[9px] gradient-primary border-0">
            3
          </Badge>
        </button>

        {/* Search */}
        <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary hover:bg-accent/10 transition-colors text-muted-foreground text-sm">
          <Icon name="Search" size={15} />
          <span className="hidden sm:block text-xs">Поиск...</span>
          <kbd className="hidden sm:block text-xs px-1.5 py-0.5 rounded bg-background border text-muted-foreground">
            ⌘K
          </kbd>
        </button>
      </div>
    </header>
  );
}
