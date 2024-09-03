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
import { ComponentPropsWithRef, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { renameItem } from "@/lib/actions/renameItem";
import { LoaderIcon } from "lucide-react";

interface RenameItemProps extends ComponentPropsWithRef<typeof Dialog> {
  item: ItemsResponse;
  onSuccess?: () => void;
}

const RenameDialog = ({ item, onSuccess, ...props }: RenameItemProps) => {
  const [fileName, setFileName] = useState<string>(item.name);
  const [isRenamePending, startRenameTransition] = useTransition();

  function onRename() {
    startRenameTransition(async () => {
      const { error } = await renameItem({ item, newName: fileName });
      props.onOpenChange?.(false);

      if (error) {
        toast.error(error);
      } else {
        toast.success("Successfully renamed item to " + fileName);
        onSuccess?.();
      }
    });
  }

  return (
    <Dialog {...props}>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Rename File</DialogTitle>
          <DialogDescription>Enter the new name of the file</DialogDescription>
        </DialogHeader>
        <Input value={fileName} onChange={(e) => setFileName(e.target.value)} />
        <DialogFooter className="justify-end gap-3 md:gap-2">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            title="rename"
            variant="secondary"
            disabled={isRenamePending}
            onClick={onRename}
          >
            {isRenamePending && (
              <LoaderIcon
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Rename
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RenameDialog;
