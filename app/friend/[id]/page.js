import { notFound } from "next/navigation";
import friends from "@/data/friends.json";
import FriendDetailsView from "@/components/friend/FriendDetailsView";

export default async function FriendDetailsPage({ params }) {
  const { id } = await params;
  const friend = friends.find((f) => f.id === Number(id));

  if (!friend) notFound();

  return <FriendDetailsView friend={friend} />;
}
