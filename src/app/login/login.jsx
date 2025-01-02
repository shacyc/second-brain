import { LoginForm } from "@/components/login-form"
import { Button } from "@/components/ui/button";
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
          <a href="/" className="flex items-center gap-2 font-medium">
            <div
              className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900">
              <IconAppleFilled className="size-5" />
            </div>
            Second Brain
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm
              more={<>
                <div
                  className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-zinc-200 dark:after:border-zinc-800">
                  <span
                    className="relative z-10 bg-white px-2 text-zinc-500 dark:bg-zinc-950 dark:text-zinc-400">
                    Or play with your cursor
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  <Button variant="outline" onClick={() => changeCursor("canvas")}>Canvas</Button>
                  <Button variant="outline" onClick={() => changeCursor("animated")}>Animated</Button>
                  <Button variant="outline" onClick={() => changeCursor("donut")}>Donut</Button>
                  <Button variant="outline" onClick={() => changeCursor("default")}>Default</Button>
                </div>
              </>}
            />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-zinc-100 lg:flex dark:bg-zinc-800">
        <img
          src="/landing/landing.png"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.8] object-bottom"
        />
      </div>
    </div>

    <Cursor variant={localStorage.getItem("cursor-variant") || "canvas"} />
  </>);
}
