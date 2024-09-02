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
import { ComponentPropsWithRef, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { deleteItems } from "@/lib/actions/deleteTasks";
import { LoaderIcon } from "lucide-react";
import { toast } from "sonner";

interface DeleteItemProps extends ComponentPropsWithRef<typeof Dialog> {
  item: ItemsResponse;
}

const DeleteDialog = ({ item, ...props }: DeleteItemProps) => {
  const [isDeletePending, startDeleteTransition] = useTransition();

  function onDelete() {
    startDeleteTransition(async () => {
      const { error } = await deleteItems({ items: [item] });
      props.onOpenChange?.(false);
      
      if (error) {
        toast.error(error);
      } else {
        toast.success("Item deleted successfully");
      }
    });
  }
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
            <Button type="button" variant="secondary" title="cancel">
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            title="delete"
            disabled={isDeletePending}
            onClick={onDelete}
          >
            {isDeletePending && (
              <LoaderIcon
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
