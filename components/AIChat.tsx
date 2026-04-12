"use client";

import { Bot, Send, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type ChatMessage = { role: "user" | "assistant"; content: string };

const WELCOME: ChatMessage = {
  role: "assistant",
  content:
    "Hi — I’m a small AI assistant for this site (not David in real time). Ask about his work, stack, or how to get in touch.",
};

export function OpenAIChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, open, streaming]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || streaming) return;

    setInput("");
    setError(null);
    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: text },
      { role: "assistant", content: "" },
    ];
    setMessages(nextMessages);
    setStreaming(true);

    const idx = nextMessages.length - 1;
    const withoutStreaming = nextMessages.slice(0, -1);
    const dropLeadAssistant =
      withoutStreaming[0]?.role === "assistant" ? withoutStreaming.slice(1) : withoutStreaming;
    const payload = dropLeadAssistant.map(({ role, content }) => ({
      role,
      content,
    }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payload }),
      });

      if (!res.ok) {
        let msg = `Request failed (${res.status})`;
        let detail: string | undefined;
        try {
          const j = (await res.json()) as { error?: string; detail?: string };
          if (j.error) msg = j.error;
          if (j.detail) detail = j.detail;
        } catch {
          /* ignore */
        }
        const full = detail ? `${msg}\n\n${detail}` : msg;
        setMessages((m) => {
          const copy = [...m];
          copy[idx] = {
            role: "assistant",
            content:
              full ||
              "Something went wrong. If OPENAI_API_KEY is missing, chat stays disabled.",
          };
          return copy;
        });
        if (detail) setError("See message above for API details.");
        setStreaming(false);
        return;
      }

      if (!res.body) {
        setMessages((m) => {
          const copy = [...m];
          copy[idx] = {
            role: "assistant",
            content: "No response body from server.",
          };
          return copy;
        });
        setStreaming(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[idx] = { role: "assistant", content: accumulated };
          return copy;
        });
      }
      accumulated += decoder.decode();
      setMessages((m) => {
        const copy = [...m];
        copy[idx] = { role: "assistant", content: accumulated };
        return copy;
      });
    } catch {
      setError("Network error — try again in a moment.");
      setMessages((m) => {
        const copy = [...m];
        copy[idx] = {
          role: "assistant",
          content:
            "Could not reach the chat server. Check your connection and try again.",
        };
        return copy;
      });
    } finally {
      setStreaming(false);
    }
  }, [input, messages, streaming]);

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-60 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open ? (
        <div
          className="pointer-events-auto flex max-h-[min(32rem,calc(100dvh-6rem))] w-[min(100vw-2.5rem,22rem)] flex-col overflow-hidden rounded-2xl border border-stone-200/90 bg-[#faf7f2]/85 shadow-2xl shadow-stone-900/15 backdrop-blur-xl dark:border-white/10 dark:bg-[#1c1a18]/90 dark:shadow-black/40 sm:w-[24rem]"
          role="dialog"
          aria-label="AI assistant chat"
        >
          <div className="flex shrink-0 items-start justify-between gap-2 border-b border-stone-200/80 px-4 py-3 dark:border-white/10">
            <div className="flex min-w-0 items-start gap-2">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-stone-200/80 bg-white/80 text-teal-700 dark:border-white/10 dark:bg-white/10 dark:text-teal-400">
                <Bot className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-semibold text-stone-900 dark:text-stone-50">
                  AI assistant
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Not a direct message — answers are generated by a robot using
                  David&apos;s public bio.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="shrink-0 rounded-lg p-2 text-stone-600 transition hover:bg-stone-200/80 dark:text-stone-300 dark:hover:bg-white/10"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div
            ref={listRef}
            className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-3"
          >
            {messages.map((m, i) => (
              <div
                key={`${i}-${m.role}`}
                className={
                  m.role === "user"
                    ? "ml-6 rounded-2xl rounded-br-md border border-teal-200/80 bg-teal-50/90 px-3 py-2 text-sm text-teal-950 backdrop-blur-sm dark:border-teal-800/40 dark:bg-teal-950/40 dark:text-teal-50"
                    : "mr-4 rounded-2xl rounded-bl-md border border-stone-200/80 bg-white/70 px-3 py-2 text-sm text-stone-800 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:text-stone-200"
                }
              >
                {m.role === "assistant" ? (
                  <span className="flex gap-2">
                    <Bot
                      className="mt-0.5 h-4 w-4 shrink-0 text-teal-600 opacity-80 dark:text-teal-400"
                      aria-hidden
                    />
                    <span className="min-w-0 whitespace-pre-wrap wrap-break-word">
                      {m.content ||
                        (streaming && i === messages.length - 1 ? "…" : "")}
                    </span>
                  </span>
                ) : (
                  <span className="whitespace-pre-wrap wrap-break-word">
                    {m.content}
                  </span>
                )}
              </div>
            ))}
          </div>

          {error ? (
            <p className="shrink-0 px-4 pb-1 text-xs text-rose-700 dark:text-rose-300">
              {error}
            </p>
          ) : null}

          <form
            className="shrink-0 border-t border-stone-200/80 p-3 dark:border-white/10"
            onSubmit={(e) => {
              e.preventDefault();
              void send();
            }}
          >
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask the assistant…"
                disabled={streaming}
                className="min-w-0 flex-1 rounded-xl border border-stone-300/90 bg-white/80 px-3 py-2 text-sm text-stone-900 outline-none ring-teal-500/25 placeholder:text-stone-400 focus:border-teal-500 focus:ring-2 dark:border-white/10 dark:bg-white/5 dark:text-stone-100 dark:placeholder:text-stone-500"
                aria-label="Message to AI assistant"
              />
              <button
                type="submit"
                disabled={streaming || !input.trim()}
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-teal-600 px-3 py-2 text-white shadow-md transition hover:bg-teal-700 disabled:opacity-50 dark:bg-teal-500 dark:hover:bg-teal-400"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full border border-stone-200/90 bg-[#faf7f2]/90 text-teal-700 shadow-lg shadow-stone-900/20 backdrop-blur-xl transition hover:scale-105 hover:bg-white dark:border-white/10 dark:bg-[#1c1a18]/90 dark:text-teal-400 dark:shadow-black/40"
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        aria-expanded={open}
      >
        <Bot className="h-7 w-7" aria-hidden />
      </button>
    </div>
  );
}
