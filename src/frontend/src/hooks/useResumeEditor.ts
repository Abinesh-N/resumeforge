import { useCallback, useEffect, useRef, useState } from "react";
import type { ResumeContent } from "../types";

const MAX_HISTORY = 50;
const AUTOSAVE_DELAY = 500;

interface UseResumeEditorOptions {
  initialContent: ResumeContent;
  initialTitle: string;
  initialTemplateId: string;
  onSave: (data: {
    content: ResumeContent;
    title: string;
    templateId: string;
  }) => Promise<void>;
}

export function useResumeEditor({
  initialContent,
  initialTitle,
  initialTemplateId,
  onSave,
}: UseResumeEditorOptions) {
  const [content, setContentState] = useState<ResumeContent>(initialContent);
  const [title, setTitleState] = useState(initialTitle);
  const [templateId, setTemplateIdState] = useState(initialTemplateId);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [history, setHistory] = useState<ResumeContent[]>([initialContent]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const autosaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onSaveRef = useRef(onSave);
  onSaveRef.current = onSave;

  const triggerAutosave = useCallback(
    (nextContent: ResumeContent, nextTitle: string, nextTemplateId: string) => {
      if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
      autosaveTimer.current = setTimeout(async () => {
        setIsSaving(true);
        try {
          await onSaveRef.current({
            content: nextContent,
            title: nextTitle,
            templateId: nextTemplateId,
          });
          setIsDirty(false);
        } finally {
          setIsSaving(false);
        }
      }, AUTOSAVE_DELAY);
    },
    [],
  );

  const pushHistory = useCallback(
    (newContent: ResumeContent) => {
      setHistory((prev) => {
        const trimmed = prev.slice(0, historyIndex + 1);
        const next = [...trimmed, newContent];
        return next.length > MAX_HISTORY ? next.slice(-MAX_HISTORY) : next;
      });
      setHistoryIndex((i) => Math.min(i + 1, MAX_HISTORY - 1));
    },
    [historyIndex],
  );

  const setContent = useCallback(
    (newContent: ResumeContent) => {
      setContentState(newContent);
      setIsDirty(true);
      pushHistory(newContent);
      triggerAutosave(newContent, title, templateId);
    },
    [title, templateId, triggerAutosave, pushHistory],
  );

  const setTitle = useCallback(
    (newTitle: string) => {
      setTitleState(newTitle);
      setIsDirty(true);
      triggerAutosave(content, newTitle, templateId);
    },
    [content, templateId, triggerAutosave],
  );

  const setTemplateId = useCallback(
    (newTemplateId: string) => {
      setTemplateIdState(newTemplateId);
      setIsDirty(true);
      triggerAutosave(content, title, newTemplateId);
    },
    [content, title, triggerAutosave],
  );

  const undo = useCallback(() => {
    if (historyIndex <= 0) return;
    const prevIndex = historyIndex - 1;
    const prevContent = history[prevIndex];
    setHistoryIndex(prevIndex);
    setContentState(prevContent);
    setIsDirty(true);
    triggerAutosave(prevContent, title, templateId);
  }, [history, historyIndex, title, templateId, triggerAutosave]);

  const redo = useCallback(() => {
    if (historyIndex >= history.length - 1) return;
    const nextIndex = historyIndex + 1;
    const nextContent = history[nextIndex];
    setHistoryIndex(nextIndex);
    setContentState(nextContent);
    setIsDirty(true);
    triggerAutosave(nextContent, title, templateId);
  }, [history, historyIndex, title, templateId, triggerAutosave]);

  const manualSave = useCallback(async () => {
    if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    setIsSaving(true);
    try {
      await onSaveRef.current({ content, title, templateId });
      setIsDirty(false);
    } finally {
      setIsSaving(false);
    }
  }, [content, title, templateId]);

  useEffect(() => {
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
    manualSave,
  };
}
