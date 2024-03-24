import { signOut } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/signin");
  }
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <h1>
        home - all user can get here
        {JSON.stringify(user)}
      </h1>
      <form action={signOut}>
        <Button type="submit">Sign Out</Button>
      </form>
    </div>
  );
}
