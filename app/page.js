import HomePageClient from "@/components/home/HomePageClient";
import { getFriends } from "@/lib/getFriends";

export default async function HomePage() {
  const friends = await getFriends();

  return <HomePageClient friends={friends} />;
}
