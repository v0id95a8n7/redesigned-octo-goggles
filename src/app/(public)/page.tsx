import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    // Если пользователь залогинен, перенаправляем на /saved
    redirect("/saved");
  } else {
    // Если пользователь не залогинен, перенаправляем на /landing
    redirect("/landing");
  }
}
