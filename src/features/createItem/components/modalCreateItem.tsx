import React from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
  } from "@/components/ui/dialog"
import { FormCreateItem } from "./formCreateItem";

interface Props {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalCreateItem: React.FC<Props> = ({open, setOpen}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>

        <DialogTitle className="text-black text-center">Create Vote</DialogTitle>

        <FormCreateItem setOpen={setOpen} />

      </DialogContent>
    </Dialog>
  );
};
