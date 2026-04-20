import { c as createLucideIcon } from "./createLucideIcon-C7JxXydK.js";
import { r as reactExports } from "./index-twaNkWBq.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode);
const MAX_HISTORY = 50;
const AUTOSAVE_DELAY = 500;
function useResumeEditor({
  initialContent,
  initialTitle,
  initialTemplateId,
  onSave
}) {
  const [content, setContentState] = reactExports.useState(initialContent);
  const [title, setTitleState] = reactExports.useState(initialTitle);
  const [templateId, setTemplateIdState] = reactExports.useState(initialTemplateId);
  const [isDirty, setIsDirty] = reactExports.useState(false);
  const [isSaving, setIsSaving] = reactExports.useState(false);
  const [history, setHistory] = reactExports.useState([initialContent]);
  const [historyIndex, setHistoryIndex] = reactExports.useState(0);
  const autosaveTimer = reactExports.useRef(null);
  const onSaveRef = reactExports.useRef(onSave);
  onSaveRef.current = onSave;
  const triggerAutosave = reactExports.useCallback(
    (nextContent, nextTitle, nextTemplateId) => {
      if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
      autosaveTimer.current = setTimeout(async () => {
        setIsSaving(true);
        try {
          await onSaveRef.current({
            content: nextContent,
            title: nextTitle,
            templateId: nextTemplateId
          });
          setIsDirty(false);
        } finally {
          setIsSaving(false);
        }
      }, AUTOSAVE_DELAY);
    },
    []
  );
  const pushHistory = reactExports.useCallback(
    (newContent) => {
      setHistory((prev) => {
        const trimmed = prev.slice(0, historyIndex + 1);
        const next = [...trimmed, newContent];
        return next.length > MAX_HISTORY ? next.slice(-MAX_HISTORY) : next;
      });
      setHistoryIndex((i) => Math.min(i + 1, MAX_HISTORY - 1));
    },
    [historyIndex]
  );
  const setContent = reactExports.useCallback(
    (newContent) => {
      setContentState(newContent);
      setIsDirty(true);
      pushHistory(newContent);
      triggerAutosave(newContent, title, templateId);
    },
    [title, templateId, triggerAutosave, pushHistory]
  );
  const setTitle = reactExports.useCallback(
    (newTitle) => {
      setTitleState(newTitle);
      setIsDirty(true);
      triggerAutosave(content, newTitle, templateId);
    },
    [content, templateId, triggerAutosave]
  );
  const setTemplateId = reactExports.useCallback(
    (newTemplateId) => {
      setTemplateIdState(newTemplateId);
      setIsDirty(true);
      triggerAutosave(content, title, newTemplateId);
    },
    [content, title, triggerAutosave]
  );
  const undo = reactExports.useCallback(() => {
    if (historyIndex <= 0) return;
    const prevIndex = historyIndex - 1;
    const prevContent = history[prevIndex];
    setHistoryIndex(prevIndex);
    setContentState(prevContent);
    setIsDirty(true);
    triggerAutosave(prevContent, title, templateId);
  }, [history, historyIndex, title, templateId, triggerAutosave]);
  const redo = reactExports.useCallback(() => {
    if (historyIndex >= history.length - 1) return;
    const nextIndex = historyIndex + 1;
    const nextContent = history[nextIndex];
    setHistoryIndex(nextIndex);
    setContentState(nextContent);
    setIsDirty(true);
    triggerAutosave(nextContent, title, templateId);
  }, [history, historyIndex, title, templateId, triggerAutosave]);
  const manualSave = reactExports.useCallback(async () => {
    if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    setIsSaving(true);
    try {
      await onSaveRef.current({ content, title, templateId });
      setIsDirty(false);
    } finally {
      setIsSaving(false);
    }
  }, [content, title, templateId]);
  reactExports.useEffect(() => {
    return () => {
      if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    };
  }, []);
  return {
    content,
    title,
    templateId,
    isDirty,
    isSaving,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1,
    setContent,
    setTitle,
    setTemplateId,
    undo,
    redo,
    manualSave
  };
}
export {
  ChevronLeft as C,
  useResumeEditor as u
};
