"use client";
import { IconLogin, IconLogout, IconUserCircle } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PermissionDialog } from "../action-dialog/PermissionDialog";
import { useRouter } from "nextjs-toploader/app";
import { LogoutDialog } from "../action-dialog/LogoutDialog";

export const UserButton = ({
  user,
}: {
  user: { isAdmin: boolean; path: string[] };
}) => {
  const [isPermDialogOpen, setPermDialogOpen] = useState<boolean>(false);
  const [isLogoutDialogOpen, setLogoutDialogOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleClick = () => {
    if (!user.isAdmin && !user.path.length) {
      setPermDialogOpen(true);
    } else {
      setLogoutDialogOpen(true);
    }
  };

  return (
    <>
      <PermissionDialog
        onSuccess={() => router.refresh()} // todo: check
        open={isPermDialogOpen}
        onOpenChange={setPermDialogOpen}
      />
      <LogoutDialog
        onSuccess={() => router.refresh()} // todo: check
        open={isLogoutDialogOpen}
        onOpenChange={setLogoutDialogOpen}
      />
      <Button
        variant="ghost"
        size="icon"
        className="size-8"
        onClick={handleClick}
      >
        {user.isAdmin && <IconUserCircle className="size-5" />}
        {user.path.length > 0 && <IconLogout className="size-5" />}
        {!user.isAdmin && !user.path.length && <IconLogin className="size-5" />}
      </Button>
    </>
  );
};
