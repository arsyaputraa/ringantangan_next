import { signOut } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { validateRequest } from "@/lib/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import mainLogo from "@/assets/images/logo.png";

export default async function Home() {
  return (
    <div className="px-12 ">
      <section className="flex items-center">
        <div className="flex-1 space-y-5">
          <h1 className="font-semibold leading-8 text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed odit
            quis quos esse alias laborum sint rerum. Nostrum, repellendus et?
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
            molestias!
          </p>
          <Button className="">Mari berbagi</Button>
        </div>
        <div className="">
          <Image src={mainLogo} alt="main logo" width={400} height={400} />
        </div>
      </section>
    </div>
  );
}
