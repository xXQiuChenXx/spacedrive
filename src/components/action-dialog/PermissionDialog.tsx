import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ComponentPropsWithRef, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderIcon } from "lucide-react";
import { grantAdmin } from "@/lib/PermissionManager";

interface CreateFolderProps extends ComponentPropsWithRef<typeof Dialog> {
  onSuccess?: () => void;
}

export const PermissionDialog = ({
  onSuccess,
  ...props
}: CreateFolderProps) => {
  const [isPending, startTransition] = useTransition();
  const [secretKey, setSecretKey] = useState<string>();
  const [error, setError] = useState<string>();

  const handleClick = async () => {
    startTransition(async () => {
      if (!secretKey) return;
      const res = await grantAdmin(secretKey);
      if (res) {
        await onSuccess?.();
        await props.onOpenChange?.(false);
      } else setError("Invalid Secret Key");
    });
  };
  return (
    <Dialog {...props}>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Grant Permissions</DialogTitle>
          <DialogDescription>
            Please enter the secret key to grant permission to do the action
          </DialogDescription>
        </DialogHeader>
        <Input
          onChange={(e) => setSecretKey(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleClick();
          }}
        />
        {error && <p className="text-red-600">{error}</p>}
        <DialogFooter className="justify-end gap-3 md:gap-2">
          <DialogClose asChild>
            <Button type="button" variant="outline" title="cancel">
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="secondary"
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
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
