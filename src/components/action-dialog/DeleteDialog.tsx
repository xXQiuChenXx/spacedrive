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
import { ComponentPropsWithRef } from "react";
import { Button } from "@/components/ui/button";

interface DeleteItemProps extends ComponentPropsWithRef<typeof Dialog> {
  item: ItemsResponse;
}

const DeleteDialog = ({ item, onOpenChange, ...props }: DeleteItemProps) => {
  const onDelete = async () => {
    const res = await fetch("http://localhost:3000/api/graph/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then((res) => res.json());
    if (onOpenChange && res?.success) await onOpenChange(false);
  };
  return (
    <Dialog {...props} onOpenChange={onOpenChange}>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Delete Confirmation</DialogTitle>
          <DialogDescription>
            You will not be able to recover the contents of{" "}
            <span className="font-bold">{item.name}</span> once deleted
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              title="cancel"
              onClick={(e) => {
                if (onOpenChange) onOpenChange(false);
              }}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            title="delete"
            onClick={onDelete}
            type="submit"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
