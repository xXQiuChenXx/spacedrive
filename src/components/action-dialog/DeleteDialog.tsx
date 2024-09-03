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
  items: ItemsResponse[];
  onSuccess?: () => void
}

const DeleteDialog = ({ items, onSuccess, ...props }: DeleteItemProps) => {
  const [isDeletePending, startDeleteTransition] = useTransition();

  function onDelete() {
    startDeleteTransition(async () => {
      const { error } = await deleteItems({ items });
      props.onOpenChange?.(false);

      if (error) {
        toast.error(error);
      } else {
        toast.success("Item deleted successfully");
        onSuccess?.();
      }
    });
  }

  return (
    <Dialog {...props}>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Delete Files</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <span className="font-bold">{items.length} files</span>?
            This is a permanent action and the files cannot be recovered.
          </DialogDescription>
            <ul className="list-disc list-inside text-muted-foreground">
              {items.map((item) => {
                return <li key={item.id}>{item.name}</li>;
              })}
            </ul>
        </DialogHeader>
        <DialogFooter className="justify-end gap-3 md:gap-2">
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
