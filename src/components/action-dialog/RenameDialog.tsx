"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { type ItemsResponse } from "@/lib/driveRequest";
import { ComponentPropsWithRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DeleteItemProps extends ComponentPropsWithRef<typeof Dialog> {
  item: ItemsResponse;
}

const RenameDialog = ({ item, onOpenChange, ...props }: DeleteItemProps) => {
  const [fileName, setFileName] = useState<string>(item.name);
  const handleSubmit = async () => {
    const res = await fetch("http://localhost:3000/api/graph/rename", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...item, name: fileName }),
    }).then((res) => res.json());
    if (res.name && onOpenChange) await onOpenChange(false);
  };

  return (
    <Dialog {...props} onOpenChange={onOpenChange}>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Rename File</DialogTitle>
          <DialogDescription>Enter the new name of the file</DialogDescription>
        </DialogHeader>
        <Input value={fileName} onChange={(e) => setFileName(e.target.value)} />
        <DialogFooter className="justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              onClick={(e) => {
                if (onOpenChange) onOpenChange(false);
              }}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            title="rename"
            variant="secondary"
            onClick={handleSubmit}
          >
            Rename
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RenameDialog;
