import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { CommonFunction } from "@/lib/common-function";

const CanvasCursor = lazy(() => import("./canvas/canvasCursor"));
const FluidCursor = lazy(() => import("./fluid/fluidCursor"));

export default function Cursor({ variant }) {

    const [cursorVariant, setCursorVariant] = useState(variant);
    const refCursor = useRef(variant);

    useEffect(() => {
        CommonFunction.eventBus.on("change-cursor", changeCursorVariant);

        return () => {
            CommonFunction.eventBus.remove("change-cursor", changeCursorVariant);
        }
    }, []);

    const changeCursorVariant = (newVariant) => {
        if (refCursor.current !== newVariant) {
            refCursor.current = newVariant;
            setCursorVariant(newVariant);
        }
    }

    const renderCursor = () => {
        switch (cursorVariant) {
            case "canvas":
                return (<Suspense>
                    <CanvasCursor />
                </Suspense>);
            case "fluid":
                return (<Suspense>
                    <FluidCursor />
                </Suspense>);
            default:
                return null;
        }
    };

    return renderCursor();
}