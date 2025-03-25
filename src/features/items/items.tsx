"use client";
import { Item, ItemMain } from "@/widgets/Item/item";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

interface Props {
  className?: string;
}

const fetchVote = async () => {
  const res = await axios.get("/api/item");
  return res.data.items;
};

export const Items: React.FC<Props> = ({ className }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["votes"],
    queryFn: fetchVote,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={className}>
      <div className="grid grid-cols-4 gap-2">
        {data?.map((item: ItemMain) => (
          <Item key={item.id} votes={item} />
        ))}
      </div>
    </div>
  );
};
