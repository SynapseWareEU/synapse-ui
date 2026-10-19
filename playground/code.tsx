import { useEffect, useState } from "react";
import { Glyph } from "./icons";

export function CopyButton({
  text,
  label = "Copy code",
}: {
  text: string;
  label?: string;
}) {
  const [status, setStatus] = useState("");
  useEffect(() => {
    if (!status) return;
    const timer = setTimeout(() => setStatus(""), 2500);
    return () => clearTimeout(timer);
  }, [status]);
  return (
    <button
      className="quiet-button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setStatus("Copied");
        } catch {
          setStatus("Select and copy manually");
        }
      }}
    >
      <Glyph name={status === "Copied" ? "check" : "copy"} size={14} />
      <span role="status">{status || label}</span>
    </button>
  );
}

export function Code({ text, lang = "React · TSX" }: { text: string; lang?: string }) {
  return (
    <div className="code-block">
      <div className="code-toolbar">
        <span>{lang}</span>
        <CopyButton text={text} />
      </div>
      <pre>
        <code>{text}</code>
      </pre>
    </div>
  );
}
