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

const DeleteDialog = ({ item, ...props }: DeleteItemProps) => {
  return (
    <Dialog {...props}>
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
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button variant="destructive">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
