import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ComponentPropsWithRef, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";
import { clearPermission } from "@/lib/PermissionManager";

interface CreateFolderProps extends ComponentPropsWithRef<typeof Dialog> {
  onSuccess?: () => void;
}

export const LogoutDialog = ({ onSuccess, ...props }: CreateFolderProps) => {
  const [isPending, startTransition] = useTransition();

  const handleClick = async () => {
    startTransition(async () => {
      await clearPermission();
      await onSuccess?.();
      await props.onOpenChange?.(false);
    });
  };
  return (
    <Dialog {...props}>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogHeader className="space-y-3">
          <DialogTitle>Logout</DialogTitle>
          <DialogDescription>
            Are you sure you want to clear all the permissions? You will be no
            longer to do some actions and access to specific locked folder.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="justify-end gap-3 md:gap-2">
          <DialogClose asChild>
            <Button type="button" variant="outline" title="cancel">
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            title="delete"
            onClick={handleClick}
            disabled={isPending}
            type="submit"
          >
            {isPending && (
              <LoaderIcon
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
