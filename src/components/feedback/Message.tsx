import * as Toast from "@radix-ui/react-toast";
import { IconX } from "@tabler/icons-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useConfig } from "../../ConfigProvider";
import { iconDefaults } from "../general/Icon";
import { cn } from "../../utils/cn";
import { dismissButtonClass, toneIcon, toneTextClass, type FeedbackTone } from "./shared";

export type MessageType = FeedbackTone;

export interface MessageOptions {
  /** 14/20 ink. Put identifiers in mono at 0.9em. */
  content: ReactNode;
  type?: MessageType;
  /** Milliseconds before it dismisses itself (4500 by default; paused on hover and focus). `0` keeps it until closed. */
  duration?: number;
  /** Replaces the tone icon (18, in the tone's text colour). */
  icon?: ReactNode;
  /** Optional action link at the end (14/20 500), e.g. a `Button variant="text"`. */
  action?: ReactNode;
}

interface MessageItem extends MessageOptions {
  id: string;
}

interface MessageContextValue {
  open: (options: MessageOptions) => void;
  success: (content: ReactNode) => void;
  error: (content: ReactNode) => void;
  info: (content: ReactNode) => void;
  warning: (content: ReactNode) => void;
}

const MessageContext = createContext<MessageContextValue | null>(null);

let idCounter = 0;

/** Default auto-dismiss (spec §4.4: 4.5s, paused on hover). */
const DEFAULT_DURATION = 4500;

/**
 * Toasts (spec §4.4). 360 wide, surface-overlay with a hairline, 8px radius and the overlay
 * shadow; tone icon 18, text 14/20 ink. They sit at the bottom-left of the main content area,
 * 24 from its bottom and 32 (the page padding) from its left, and stack upward with an 8 gap.
 * Set `--su-content-inset-start` on the root (e.g. to the rail width) to move them past a rail.
 * Errors are announced assertively, the rest politely.
 */
export function MessageProvider({
  children,
  closeLabel = "Dismiss",
}: {
  children: ReactNode;
  /** The close button's accessible name on every toast, "Dismiss" by default. Pass the application's word. */
  closeLabel?: string;
}) {
  const [items, setItems] = useState<MessageItem[]>([]);

  const { direction } = useConfig();

  const open = useCallback((options: MessageOptions) => {
    const id = `msg-${++idCounter}`;
    setItems((prev) => [...prev, { ...options, id }]);
  }, []);

  const api = useMemo<MessageContextValue>(
    () => ({
      open,
      success: (content) => open({ content, type: "success" }),
      error: (content) => open({ content, type: "error" }),
      info: (content) => open({ content, type: "info" }),
      warning: (content) => open({ content, type: "warning" }),
    }),
    [open],
  );

  // Binds the imperative `message` helper. Without this every message.* call
  // is a silent no-op.
  useEffect(() => {
    message._api = api;
    return () => {
      if (message._api === api) message._api = null;
    };
  }, [api]);

  return (
    <MessageContext.Provider value={api}>
      {/* The stack hugs the start edge, so a swipe towards that edge dismisses. */}
      <Toast.Provider swipeDirection={direction === "rtl" ? "right" : "left"}>
        {children}
        {items.map((item) => {
          const type = item.type ?? "info";
          const Glyph = toneIcon[type];
          const persistent = item.duration === 0;
          return (
            <Toast.Root
              key={item.id}
              type={type === "error" ? "foreground" : "background"}
              className={cn(
                "box-border flex min-h-[48px] py-su3 px-su4 rounded-su-surface border border-solid border-border bg-surface-overlay text-ink font-sans shadow-su-overlay su-focus-ring",
                "data-[state=open]:animate-su-rise-in motion-reduce:animate-none",
                "data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-transform data-[swipe=cancel]:duration-[var(--su-duration-fast)] data-[swipe=cancel]:ease-[var(--su-ease-out)]",
              )}
              duration={persistent ? Infinity : (item.duration ?? DEFAULT_DURATION)}
              onOpenChange={(open) => {
                if (!open) setItems((previous) => previous.filter((entry) => entry.id !== item.id));
              }}
            >
              {/* One line: centred in the 48 row. Several lines: padded 12 16, icon on the first. */}
              <div className="my-auto w-full flex items-start gap-[10px]">
                <span aria-hidden className={cn("shrink-0 flex mt-[1px]", toneTextClass[type])}>
                  {item.icon ?? <Glyph size={18} {...iconDefaults} />}
                </span>
                <Toast.Description className="flex-1 min-w-0 text-body text-ink [overflow-wrap:anywhere]">
                  {item.content}
                </Toast.Description>
                {item.action ? <div className="shrink-0 text-body font-medium">{item.action}</div> : null}
                {/* The drawn toast has no close. Every toast keeps one all the same: a toast that
                    never times out needs a way to go, and a keyboard or switch user cannot swipe. */}
                <Toast.Close className={cn(dismissButtonClass, "-my-su1 -me-su1")} aria-label={closeLabel}>
                  <IconX size={16} {...iconDefaults} />
                </Toast.Close>
              </div>
            </Toast.Root>
          );
        })}
        <Toast.Viewport className="fixed bottom-su6 start-[calc(var(--su-content-inset-start,0px)+var(--su-page-pad-x))] z-[var(--su-z-toast)] m-0 p-0 list-none flex flex-col gap-su2 w-[min(var(--su-toast-width),calc(100vw-var(--su-content-inset-start,0px)-var(--su-page-pad-x)*2))] outline-none" />
      </Toast.Provider>
    </MessageContext.Provider>
  );
}

export function useMessage(): MessageContextValue {
  const ctx = useContext(MessageContext);
  if (!ctx) throw new Error("useMessage must be used within MessageProvider");
  return ctx;
}

/** Imperative helper when provider is mounted via App */
export const message = {
  _api: null as MessageContextValue | null,
  useBind(api: MessageContextValue) {
    message._api = api;
  },
  open(opts: MessageOptions) {
    message._api?.open(opts);
  },
  success(content: ReactNode) {
    message._api?.success(content);
  },
  error(content: ReactNode) {
    message._api?.error(content);
  },
  info(content: ReactNode) {
    message._api?.info(content);
  },
  warning(content: ReactNode) {
    message._api?.warning(content);
  },
};
