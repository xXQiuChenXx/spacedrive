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
import { revalidate } from "@/lib/actions/test";
import { LoaderIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createFolder } from "@/lib/actions/createFolder";

interface DeleteItemProps extends ComponentPropsWithRef<typeof Dialog> {
  pathname: string;
}

const CreateFolderDialog = ({ pathname, ...props }: DeleteItemProps) => {
  const [folderName, setFolderName] = useState<string>("");
  const [isCreatePending, startCreateTransition] = useTransition();
  const { toast } = useToast();

  const handleClick = async () => {
    startCreateTransition(async () => {
      const { error } = await createFolder({
        folder: folderName,
        path: pathname,
      });
      props.onOpenChange?.(false);

      console.log(error);

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
    setFolderName("");
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
        <DialogFooter className="justify-end">
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
