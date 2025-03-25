import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Item as ItemPost } from "@prisma/client";
import React from "react";

interface Props {
  className?: string;
  votes: ItemMain;
}

export interface ItemMain extends ItemPost {
  author: {
    username: string;
  };
}

export const Item: React.FC<Props> = ({ className, votes }) => {
  return (
    <div
      className={cn(
        "relative flex flex-col justify-between overflow-hidden p-3 border-[1px] border-solid border-neutral-800/10 rounded-[5px] w-[300px]",
        className
      )}
    >
      <p className="font-semibold">{votes.author.username}</p>

      <img
        src={votes.poster}
        alt="img"
        loading="lazy"
        className="mt-2 w-full object-contain h-[400px]"
      />

      <div className="mt-2">
        <div className="flex gap-2 justify-between">
          <p className="font-semibold text-[#171717]">{votes.title}</p>
          <span className="text-sm">{votes.category}</span>
        </div>
        <p className="mt-1">{votes.description}</p>
      </div>

      <Button className="w-full mt-2 bg-emerald-300 hover:bg-emerald-400">Vote</Button>

      <img
        src={votes.poster}
        alt="poster"
        className="absolute top-0 left-0 w-full h-full object-contain scale-[10] blur-sm z-[-1] opacity-25"
      />
    </div>
  );
};
