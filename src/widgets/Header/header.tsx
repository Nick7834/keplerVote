"use client";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { ModalCreateItem } from "@/features/createItem/components/modalCreateItem";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  const { data: session } = useSession();

  const [open, setOpen] = useState(false);

  const exitAuth = () => {
    const confirm = window.confirm("You want to exit?");

    if (confirm) {
      signOut();
    }
  };

  return (
    <header
      className={cn(
        "flex items-center justify-between py-3 border-b border-[#e2e2e2]",
        className
      )}
    >
      <Container className="flex items-center justify-between">
        <div className="text-2xl text-gray-800 font-bold">KeplerVote</div>

        <span className="text-gray-800 font-medium">
          {session && `${session?.user.username.charAt(0).toUpperCase()}${session?.user.username.slice(1)}`} 
        </span>

        <div className="flex gap-2">
          <Button
            onClick={() => setOpen(!open)}
            className="h-fit bg-[#5697ff] text-amber-50 hover:bg-[#7ba0df]"
          >
            Create
          </Button>

          <Button
            onClick={exitAuth}
            className="h-fit bg-[#ff5656] text-amber-50 hover:bg-[#df7b7b]"
          >
            Exit
          </Button>
        </div>
      </Container>

      <ModalCreateItem open={open} setOpen={setOpen} />
    </header>
  );
};
