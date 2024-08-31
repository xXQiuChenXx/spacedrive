import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ComponentPropsWithRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DeleteItemProps extends ComponentPropsWithRef<typeof Dialog> {
  pathname: string;
}

const CreateFolderDialog = ({
  pathname,
  onOpenChange,
  ...props
}: DeleteItemProps) => {
  const [folderName, setFolderName] = useState<string>("");
  const onCreate = async () => {
    const res = await fetch("http://localhost:3000/api/graph/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ path: pathname, newFolder: folderName }),
    }).then((res) => res.json());
    if (onOpenChange && res?.name) await onOpenChange(false);
  };
  return (
    <Dialog {...props} onOpenChange={onOpenChange}>
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
            <Button
              type="button"
              variant="outline"
              title="cancel"
              onClick={(e) => {
                if (onOpenChange) onOpenChange(false);
              }}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="secondary"
            title="delete"
            onClick={onCreate}
            type="submit"
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFolderDialog;
