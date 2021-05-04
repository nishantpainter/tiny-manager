import { useCallback, useMemo, useState } from "react";

function useDialog() {
  const [open, setOpen] = useState(false);

  const openDialog = useCallback(() => setOpen(true), []);
  const closeDialog = useCallback(() => setOpen(false), []);
  const toggleDialog = useCallback(() => setOpen((open) => !open), []);

  const value = useMemo(() => [open, openDialog, closeDialog, toggleDialog], [
    open,
    openDialog,
    closeDialog,
    toggleDialog,
  ]);

  return value;
}

export default useDialog;
