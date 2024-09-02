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
import { useToast } from "@/hooks/use-toast";
import { LoaderIcon } from "lucide-react";

interface DeleteItemProps extends ComponentPropsWithRef<typeof Dialog> {
  item: ItemsResponse;
}

const DeleteDialog = ({ item, ...props }: DeleteItemProps) => {
  const [isDeletePending, startDeleteTransition] = useTransition();
  const { toast } = useToast();

  function onDelete() {
    startDeleteTransition(async () => {
      const { error } = await deleteItems({ items: [item] });
      props.onOpenChange?.(false);

      console.log(error)

      if (error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error,
        });
      } else {
        toast({
          title: "Item deleted successfully",
        });
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
