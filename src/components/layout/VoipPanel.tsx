 
import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

type CallState = "idle" | "dialing" | "ringing" | "active" | "ended";

interface RecentCall {
  name: string;
  phone: string;
  time: string;
  status: "success" | "missed";
}

const RECENT: RecentCall[] = [
  { name: "Алексей Петров", phone: "+7 912 345-67-89", time: "10:24", status: "success" },
  { name: "Марина Соколова", phone: "+7 916 234-56-78", time: "09:51", status: "missed" },
  { name: "Ольга Новикова", phone: "+7 921 987-65-43", time: "вчера", status: "success" },
];

const DIALPAD = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["*", "0", "#"],
];

function formatTime(sec: number) {
  const m = Math.floor(sec / 60).toString().padStart(2, "0");
  const s = (sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function VoipPanel() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"dial" | "recent">("dial");
  const [phone, setPhone] = useState("");
  const [callState, setCallState] = useState<CallState>("idle");
  const [elapsed, setElapsed] = useState(0);
  const [muted, setMuted] = useState(false);
  const [held, setHeld] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (callState === "active") {
      timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [callState]);

  const dial = (digit: string) => setPhone((p) => p + digit);
  const backspace = () => setPhone((p) => p.slice(0, -1));

  const startCall = () => {
    if (!phone.trim()) return;
    setCallState("dialing");
    setElapsed(0);
    setTimeout(() => setCallState("ringing"), 1200);
    setTimeout(() => setCallState("active"), 3500);
  };

  const endCall = () => {
    setCallState("ended");
    setTimeout(() => {
      setCallState("idle");
      setPhone("");
      setMuted(false);
      setHeld(false);
    }, 1500);
  };

  const callQuick = (p: string) => {
    setPhone(p);
    setTab("dial");
    setCallState("dialing");
    setElapsed(0);
    setTimeout(() => setCallState("ringing"), 1200);
    setTimeout(() => setCallState("active"), 3500);
  };

  const isInCall = callState === "dialing" || callState === "ringing" || callState === "active";

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className={`voip-fab ${isInCall ? "voip-fab--active" : ""}`}
        title="VoIP звонок"
      >
        <Icon name={isInCall ? "PhoneCall" : "Phone"} size={20} className="text-white" />
        {isInCall && (
          <span className="voip-fab-badge">
            <span className="voip-fab-badge-dot" />
          </span>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div className="voip-panel animate-slide-up">
          {/* Header */}
          <div className="voip-panel-header">
            <div className="flex items-center gap-2">
              <div className="voip-logo-dot" />
              <span className="text-white font-semibold text-sm">VoIP Звонок</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/20">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-emerald-400 text-xs font-medium">SIP онлайн</span>
              </div>
              <button onClick={() => setOpen(false)} className="voip-close-btn">
                <Icon name="X" size={14} />
              </button>
            </div>
          </div>

          {/* Call active screen */}
          {isInCall && (
            <div className="voip-call-screen">
              <div className="voip-call-avatar">
                {phone[0] || "?"}
              </div>
              <div className="text-white font-semibold text-base mt-3">{phone}</div>
              <div className={`voip-call-status-text ${callState === "active" ? "text-emerald-400" : "text-amber-400"}`}>
                {callState === "dialing" && "Набор..."}
                {callState === "ringing" && "Звонок..."}
                {callState === "active" && formatTime(elapsed)}
                {callState === "ended" && "Завершён"}
              </div>

              {callState === "active" && (
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => setMuted(!muted)}
                    className={`voip-action-btn ${muted ? "voip-action-btn--active" : ""}`}
                  >
                    <Icon name={muted ? "MicOff" : "Mic"} size={16} />
                    <span>{muted ? "Вкл. микр." : "Микр. выкл."}</span>
                  </button>
                  <button
                    onClick={() => setHeld(!held)}
                    className={`voip-action-btn ${held ? "voip-action-btn--active" : ""}`}
                  >
                    <Icon name={held ? "Play" : "Pause"} size={16} />
                    <span>{held ? "Снять удерж." : "Удержание"}</span>
                  </button>
                </div>
              )}

              <button onClick={endCall} className="voip-end-btn mt-4">
                <Icon name="PhoneOff" size={18} />
              </button>
            </div>
          )}

          {!isInCall && callState !== "ended" && (
            <>
              {/* Tabs */}
              <div className="flex gap-1 p-3 border-b border-white/5">
                {(["dial", "recent"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      tab === t ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70"
                    }`}
                  >
                    {{ dial: "Набор", recent: "История" }[t]}
                  </button>
                ))}
              </div>

              {tab === "dial" && (
                <div className="p-3">
                  {/* Phone display */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex-1 bg-white/5 rounded-xl px-3 py-2.5 text-white text-lg font-mono tracking-widest text-center min-h-[44px]">
                      {phone || <span className="text-white/20 text-sm font-sans font-normal tracking-normal">введите номер</span>}
                    </div>
                    <button onClick={backspace} className="voip-close-btn">
                      <Icon name="Delete" size={15} />
                    </button>
                  </div>

                  {/* Dialpad */}
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {DIALPAD.flat().map((d) => (
                      <button key={d} onClick={() => dial(d)} className="voip-digit-btn">
                        {d}
                      </button>
                    ))}
                  </div>

                  {/* Call button */}
                  <button
                    onClick={startCall}
                    disabled={!phone.trim()}
                    className="voip-call-start-btn w-full"
                  >
                    <Icon name="Phone" size={18} />
                    <span>Позвонить</span>
                  </button>
                </div>
              )}

              {tab === "recent" && (
                <div className="p-3 space-y-1">
                  {RECENT.map((r, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 cursor-pointer group">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        r.status === "success" ? "bg-emerald-500/15" : "bg-rose-500/15"
                      }`}>
                        <Icon
                          name={r.status === "success" ? "PhoneIncoming" : "PhoneMissed"}
                          size={14}
                          className={r.status === "success" ? "text-emerald-400" : "text-rose-400"}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white text-xs font-medium truncate">{r.name}</div>
                        <div className="text-white/40 text-xs font-mono">{r.phone}</div>
                      </div>
                      <div className="text-white/30 text-xs">{r.time}</div>
                      <button
                        onClick={() => callQuick(r.phone)}
                        className="opacity-0 group-hover:opacity-100 w-7 h-7 bg-emerald-500/20 rounded-lg flex items-center justify-center transition-opacity"
                      >
                        <Icon name="Phone" size={12} className="text-emerald-400" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}
