import {
  useCallback,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type ReactNode,
} from "react";
import { IconFile, IconUpload, IconX } from "@tabler/icons-react";
import { cn } from "../../utils/cn";
import { Icon, iconDefaults } from "../general/Icon";
import { useFieldState, useFormItemContext } from "./Form";

export interface UploadFile {
  uid: string;
  name: string;
  size: number;
  file: File;
}

export interface UploadProps {
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  maxCount?: number;
  className?: string;
  children?: ReactNode;
  /** A 13/18 ink-2 line under the prompt, e.g. "PDF or CSV, up to 10 MB". Shown with `children` too. */
  hint?: ReactNode;
  /** Accessible name for the dropzone / file input. Defaults to the visible prompt. */
  "aria-label"?: string;
  "aria-labelledby"?: string;
  /** Controlled list. When set, internal state is ignored — drive it from `onChange`/`onRemove`. */
  fileList?: UploadFile[];
  onChange?: (files: UploadFile[]) => void;
  beforeUpload?: (file: File) => boolean | Promise<boolean>;
  /** Called before a file leaves the list. Return `false` to cancel the removal. */
  onRemove?: (file: UploadFile) => boolean | void;
}

let uidCounter = 0;

function createUploadFile(file: File): UploadFile {
  uidCounter += 1;
  return {
    uid: `upload-${uidCounter}`,
    name: file.name,
    size: file.size,
    file,
  };
}

/** Same semantics as the native `accept` attribute: `.ext`, `type/*` or an exact MIME type. */
function matchesAccept(file: File, accept: string) {
  return accept
    .split(",")
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean)
    .some((token) =>
      token.startsWith(".")
        ? file.name.toLowerCase().endsWith(token)
        : token.endsWith("/*")
          ? file.type.toLowerCase().startsWith(token.slice(0, -1))
          : file.type.toLowerCase() === token,
    );
}

const UNITS = ["B", "KB", "MB", "GB", "TB"];

/** "1,5 MB", "1 023 B": decimal comma, U+202F thousands separator, no trailing ",0". */
function formatBytes(bytes: number) {
  const i = bytes > 0 ? Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), 4) : 0;
  const [whole, fraction] = (bytes / 1024 ** i).toFixed(i === 0 ? 0 : 1).split(".");
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, "\u202F");
  return `${fraction && fraction !== "0" ? `${grouped},${fraction}` : grouped} ${UNITS[i]}`;
}

/*
 * Dropzone: 1px dashed border-strong, radius 8, surface, padding 24, centred. Hover (hover devices
 * only): surface-2. Drag-over: 1px dashed action on action-subtle. Invalid: dashed danger.
 * Disabled: surface-2, border colour, ink-3. One class per property per branch, no opacity.
 */
const dropzoneBaseClass =
  "su-focus-ring flex flex-col items-center justify-center gap-su2 p-su6 rounded-su-surface border border-dashed text-center text-body transition-[border-color,background-color] duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none";

const dropzoneStateClass = {
  idle: "cursor-pointer bg-surface border-border-strong text-ink [@media(hover:hover)]:hover:bg-surface-2",
  invalid: "cursor-pointer bg-surface border-danger text-ink [@media(hover:hover)]:hover:bg-surface-2",
  drag: "cursor-pointer bg-action-subtle border-action text-ink",
  disabled: "cursor-not-allowed bg-surface-2 border-border text-ink-3",
};

/* File rows: 40 tall inside one panel, hairlines between them. */
const fileRowClass =
  "flex items-center gap-su2 h-[40px] ps-su3 pe-su1 border-t border-solid border-border first:border-t-0";

/* Remove: a 32 ghost icon button, 18 icon in ink-2; hover fill + ink, press border colour. */
const removeButtonClass = [
  "inline-flex shrink-0 items-center justify-center size-[32px] p-0 rounded-su-control bg-transparent text-ink-2 cursor-pointer su-focus-ring",
  "transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none",
  "[@media(hover:hover)]:[&:enabled:not(:active):hover]:bg-fill [@media(hover:hover)]:[&:enabled:not(:active):hover]:text-ink",
  "enabled:active:bg-border enabled:active:text-ink",
  "disabled:text-ink-3 disabled:cursor-not-allowed",
  "[@media(hover:none)]:su-hit-44",
].join(" ");

export function Upload({
  accept,
  multiple = false,
  disabled,
  maxCount,
  className,
  children,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  fileList,
  onChange,
  beforeUpload,
  onRemove,
  hint,
}: UploadProps) {
  const item = useFormItemContext();
  const { disabled: isDisabled } = useFieldState(undefined, disabled);

  const inputRef = useRef<HTMLInputElement>(null);
  const [internalFiles, setFiles] = useState<UploadFile[]>([]);
  const files = fileList ?? internalFiles;
  const [dragActive, setDragActive] = useState(false);

  const emit = useCallback(
    (next: UploadFile[]) => {
      setFiles(next);
      onChange?.(next);
    },
    [onChange],
  );

  const processFiles = async (picked: FileList | File[]) => {
    const incoming = Array.from(picked).filter(
      (file) => !accept || matchesAccept(file, accept),
    );
    const accepted: UploadFile[] = [];

    for (const file of incoming) {
      if (beforeUpload) {
        const result = await beforeUpload(file);
        if (!result) continue;
      }
      accepted.push(createUploadFile(file));
    }

    if (accepted.length === 0) return;

    const next = multiple
      ? [...files, ...accepted].slice(0, maxCount ?? Infinity)
      : accepted.slice(0, 1);
    emit(next);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      void processFiles(event.target.files);
      event.target.value = "";
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
    if (isDisabled) return;
    if (event.dataTransfer.files.length > 0) {
      void processFiles(event.dataTransfer.files);
    }
  };

  const removeFile = (file: UploadFile) => {
    if (onRemove?.(file) === false) return;
    emit(files.filter((f) => f.uid !== file.uid));
  };

  const defaultLabel = "Click to upload or drag files here";
  // The dropzone is a div, so a FormItem's <label for> can never name it. Point at
  // the item's label element when there is one; otherwise synthesize a name.
  const labelledBy = ariaLabelledBy ?? (ariaLabel ? undefined : item?.labelId);
  const accessibleName = labelledBy
    ? undefined
    : (ariaLabel ?? (typeof children === "string" ? children : defaultLabel));

  return (
    <div className={cn("w-full", className)}>
      <div
        role="button"
        tabIndex={isDisabled ? -1 : 0}
        aria-disabled={isDisabled || undefined}
        aria-label={accessibleName}
        aria-labelledby={labelledBy}
        className={cn(
          dropzoneBaseClass,
          isDisabled
            ? dropzoneStateClass.disabled
            : dragActive
              ? dropzoneStateClass.drag
              : item?.error
                ? dropzoneStateClass.invalid
                : dropzoneStateClass.idle,
        )}
        onClick={() => !isDisabled && inputRef.current?.click()}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !isDisabled) {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          if (!isDisabled) setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        aria-describedby={item?.descriptionId}
        aria-invalid={item?.error ? true : undefined}
      >
        <input
          ref={inputRef}
          id={item?.id}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={isDisabled}
          className="hidden"
          onChange={handleInputChange}
          aria-hidden="true"
          tabIndex={-1}
        />
        {children ?? (
          <>
            <Icon className="size-[24px] text-ink-3">
              <IconUpload {...iconDefaults} />
            </Icon>
            <span>
              <span className={cn("font-medium", !isDisabled && "text-action-text")}>
                Click to upload
              </span>{" "}
              or drag files here
            </span>
          </>
        )}
        {hint != null && (
          <span className={cn("-mt-su1 text-small", isDisabled ? "text-ink-3" : "text-ink-2")}>
            {hint}
          </span>
        )}
      </div>
      {files.length > 0 && (
        <ul className="su-panel list-none m-0 mt-su2 p-0">
          {files.map((file) => (
            <li key={file.uid} className={fileRowClass}>
              <Icon className="size-[16px] text-ink-3">
                <IconFile {...iconDefaults} />
              </Icon>
              <span className="min-w-0 flex-1 truncate text-body text-ink">{file.name}</span>
              <span className="shrink-0 text-small text-ink-2 su-tabular">
                {formatBytes(file.size)}
              </span>
              <button
                type="button"
                className={removeButtonClass}
                aria-label={`Remove ${file.name}`}
                disabled={isDisabled}
                onClick={() => removeFile(file)}
              >
                <Icon className="size-[18px]">
                  <IconX {...iconDefaults} />
                </Icon>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
