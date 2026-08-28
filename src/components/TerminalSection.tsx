import { useEffect, useRef, useState } from "react";

type Line = { id: number; text: string; kind?: "in" | "out" | "err" | "ok" };

const HELP: string[] = [
  "Available commands:",
  "  help              Show this list",
  "  cd projects       Jump to the projects deck",
  "  whoami            Who is behind this portfolio",
  "  contact           Jump to the contact section",
  "  clear             Wipe the terminal history",
  "  theme --cyan      Switch accent to cyan",
  "  theme --magenta   Switch accent to magenta",
  "  theme --purple    Switch accent to violet",
  "  guess             Start a number guessing mini-game (1-50)",
  "  sudo hire-me      ¯\\_(ツ)_/¯",
];

const WHOAMI: string[] = [
  "guest@portfolio:~$ whoami",
  "Creative developer & UI/UX designer.",
  "I build fluid interfaces, interactive visuals and resilient backends.",
  "",
  "core tools:",
  "  frontend  React · TypeScript · Tailwind · Motion · WebGL",
  "  backend   Node · Python · PostgreSQL · REST/GraphQL",
  "  cloud     Docker · Kubernetes · AWS · CI/CD · Networking",
];

let uid = 0;
const line = (text: string, kind: Line["kind"] = "out"): Line => ({
  id: uid++,
  text,
  kind,
});

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function TerminalSection() {
  const [history, setHistory] = useState<Line[]>([
    line("Welcome to portfolio.sh — type `help` to get started.", "ok"),
  ]);
  const [value, setValue] = useState("");
  const [game, setGame] = useState<{ target: number; tries: number } | null>(null);
  const [past, setPast] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history]);

  const push = (lines: Line[]) => setHistory((h) => [...h, ...lines]);

  const setAccent = (name: "cyan" | "magenta" | "purple") => {
    const map = {
      cyan: "oklch(0.84 0.19 210)",
      magenta: "oklch(0.58 0.27 350)",
      purple: "oklch(0.62 0.24 300)",
    } as const;
    document.documentElement.style.setProperty("--primary", map[name]);
    document.documentElement.style.setProperty("--ring", map[name]);
  };

  const run = (raw: string) => {
    const cmd = raw.trim();
    const out: Line[] = [line(`guest@portfolio:~$ ${raw}`, "in")];
    if (!cmd) return push(out);

    setPast((p) => [cmd, ...p]);
    setCursor(-1);

    if (game) {
      const n = Number(cmd);
      if (Number.isNaN(n)) {
        out.push(line('Not a number. Type a guess between 1 and 50, or "quit".', "err"));
        if (cmd.toLowerCase() === "quit") {
          out.pop();
          out.push(line(`Game over — the number was ${game.target}.`, "ok"));
          setGame(null);
        }
      } else if (n === game.target) {
        out.push(line(`Correct! ${game.target} in ${game.tries + 1} tries. 🎉`, "ok"));
        setGame(null);
      } else {
        out.push(line(n < game.target ? "Higher ↑" : "Lower ↓", "out"));
        setGame({ ...game, tries: game.tries + 1 });
      }
      return push(out);
    }

    const lower = cmd.toLowerCase();

    switch (true) {
      case lower === "help":
        out.push(...HELP.map((t) => line(t)));
        break;
      case lower === "cd projects" || lower === "projects":
        out.push(line("Navigating to /projects...", "ok"));
        setTimeout(() => scrollToId("projects"), 150);
        break;
      case lower === "whoami":
        out.push(...WHOAMI.slice(1).map((t) => line(t)));
        break;
      case lower === "contact":
        out.push(line("Opening contact channel...", "ok"));
        setTimeout(() => scrollToId("contact"), 150);
        break;
      case lower === "clear":
        setHistory([]);
        return;
      case lower.startsWith("theme"): {
        const flag = lower.split(/\s+/)[1]?.replace(/^--/, "");
        if (flag === "cyan" || flag === "magenta" || flag === "purple") {
          setAccent(flag);
          out.push(line(`Accent theme set to ${flag}.`, "ok"));
        } else {
          out.push(line("usage: theme --cyan | --magenta | --purple", "err"));
        }
        break;
      }
      case lower === "guess": {
        setGame({ target: Math.floor(Math.random() * 50) + 1, tries: 0 });
        out.push(line("I picked a number between 1 and 50. Guess it! (type `quit` to stop)", "ok"));
        break;
      }
      case lower === "sudo hire-me":
        out.push(line("Permission granted. Scroll to contact and let's talk. ✨", "ok"));
        break;
      default:
        out.push(
          line(`command not found: ${cmd}. Type "help" for a list of commands.`, "err")
        );
    }
    push(out);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(value);
      setValue("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(cursor + 1, past.length - 1);
      if (next >= 0) {
        setCursor(next);
        setValue(past[next] ?? "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = cursor - 1;
      setCursor(next);
      setValue(next >= 0 ? past[next] ?? "" : "");
    }
  };

  return (
    <section
      id="terminal"
      className="relative flex min-h-screen items-center justify-center px-4 py-24"
    >
      <div
        className="pointer-events-none absolute left-1/3 top-1/3 h-72 w-72 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: "var(--magenta)" }}
      />
      <div className="relative z-10 w-full max-w-3xl">
        <p className="mb-4 text-center font-mono text-sm text-foreground/60">
          Prefer keyboard over cursor? Navigate this site from the shell.
        </p>
        <div
          className="overflow-hidden rounded-xl"
          onClick={() => inputRef.current?.focus()}
          style={{
            backdropFilter: "blur(14px)",
            backgroundColor: "rgba(10, 6, 24, 0.6)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow:
              "0 0 40px rgba(224,32,140,0.18), 0 20px 60px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.05)",
          }}
        >
          {/* title bar */}
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{
              backgroundColor: "rgba(255,255,255,0.06)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: "#ff5f57" }} />
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: "#febc2e" }} />
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: "#28c840" }} />
            <span className="flex-1 text-center font-mono text-xs text-foreground/70">
              user@portfolio: ~
            </span>
            <span className="w-12" />
          </div>

          <div
            ref={scrollRef}
            className="h-[420px] overflow-y-auto px-5 py-4 font-mono text-sm leading-relaxed"
          >
            {history.map((l) => (
              <pre
                key={l.id}
                className="whitespace-pre-wrap break-words"
                style={{
                  color:
                    l.kind === "err"
                      ? "#ff6b8b"
                      : l.kind === "ok"
                        ? "var(--cyan)"
                        : l.kind === "in"
                          ? "rgba(255,255,255,0.55)"
                          : "rgba(255,255,255,0.85)",
                }}
              >
                {l.text}
              </pre>
            ))}

            <div className="flex items-center gap-2 pt-1">
              <span className="shrink-0" style={{ color: "var(--magenta)" }}>
                guest@portfolio
              </span>
              <span className="shrink-0 text-foreground/60">:~$</span>
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                spellCheck={false}
                autoComplete="off"
                aria-label="Terminal command input"
                className="w-full bg-transparent font-mono text-sm text-foreground caret-[var(--cyan)] outline-none"
                placeholder={game ? "your guess…" : "type help"}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
