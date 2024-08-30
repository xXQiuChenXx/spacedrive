import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { type ItemsResponse } from "@/lib/driveRequest";
import { ComponentPropsWithRef } from "react";

interface DeleteItemProps extends ComponentPropsWithRef<typeof Dialog> {
  item: ItemsResponse;
}

const DeleteDialog = ({ item, ...props }: DeleteItemProps) => {
  return (
    <Dialog {...props}>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogHeader >
          <DialogTitle >
            Delete Dialog
          </DialogTitle>
          <DialogDescription >
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
