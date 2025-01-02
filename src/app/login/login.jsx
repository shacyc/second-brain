import { LoginForm } from "@/components/login-form"
import Cursor from "@/components/ui/cursor/cursor";
import { CommonFunction } from "@/lib/common-function";
import { IconAppleFilled } from "@tabler/icons-react";

export default function LoginPage() {

  const changeCursor = (variant) => {
    CommonFunction.eventBus.dispatch("change-cursor", variant);
  }

  return (<>
    <div className="grid min-h-svh lg:grid-cols-[1fr_0.65fr]">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div
              className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900">
              <IconAppleFilled className="size-5" />
            </div>
            Second Brain
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>

        <button onClick={() => changeCursor("canvas")}>Canvas</button>
        <button onClick={() => changeCursor("fluid")}>Fluid</button>
        <button onClick={() => changeCursor("default")}>Normal</button>

      </div>
      <div className="relative hidden bg-zinc-100 lg:flex dark:bg-zinc-800">
        <img
          src="/landing/landing.png"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.8] object-bottom"
        />
      </div>
    </div>

    <Cursor variant={"canvas"} />
  </>);
}
