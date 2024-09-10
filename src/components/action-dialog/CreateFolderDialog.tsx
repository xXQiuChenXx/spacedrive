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
import { createFolder } from "@/lib/actions/createFolder";
import { toast } from "sonner";

interface CreateFolderProps extends ComponentPropsWithRef<typeof Dialog> {
  pathname: string;
  onSuccess?: () => void;
}

const CreateFolderDialog = ({
  pathname,
  onSuccess,
  ...props
}: CreateFolderProps) => {
  const [folderName, setFolderName] = useState<string>("");
  const [isCreatePending, startCreateTransition] = useTransition();

  const handleClick = async () => {
    startCreateTransition(async () => {
      const { error } = await createFolder({
        folder: folderName,
        path: pathname,
      });
      props.onOpenChange?.(false);

      if (error) {
        toast.error(error);
      } else {
        toast.success("Item deleted successfully");
        onSuccess?.();
      }
      setFolderName("");
    });
  };
  return (
    <Dialog {...props}>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Create Folder</DialogTitle>
          <DialogDescription>
            Please enter the new folder name
          </DialogDescription>
        </DialogHeader>
        <Input
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />
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
            disabled={isCreatePending}
            type="submit"
          >
            {isCreatePending && (
              <LoaderIcon
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFolderDialog;
