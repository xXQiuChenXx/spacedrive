"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import Link from "next/link";

export const GrantCode = () => {
  const [grantCode, setGrantCode] = useState("");

  return (
    <div className="mt-5 flex flex-col gap-2">
      <Label htmlFor="grantcode" className="text-base">
        Manually insert the grant code:
      </Label>
      <div className="flex gap-3">
        <Input
          onChange={(e) => setGrantCode(e.target.value)}
          id="grantcode"
          placeholder="Enter the code here"
        />
        <Link href={`/api/auth/callback?code=${grantCode}`}>
          <Button disabled={!grantCode}>Submit</Button>
        </Link>
      </div>
    </div>
  );
};
