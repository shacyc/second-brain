import { useEffect, useRef, useState } from "react";
import { CommonFunction } from "@/lib/common-function";
import CanvasCursor from "./canvas/canvasCursor";
import Aminated from "./animated/animated";

export default function Cursor({ variant }) {

    const [cursorVariant, setCursorVariant] = useState(variant);
    const refCursor = useRef(localStorage.getItem("cursor-variant"));
    const refAnimated = useRef();

    useEffect(() => {
        CommonFunction.eventBus.on("change-cursor", changeCursorVariant);

        return () => {
            CommonFunction.eventBus.remove("change-cursor", changeCursorVariant);
        }
    }, []);

    const changeCursorVariant = (newVariant) => {
        if (refCursor.current !== newVariant) {
            // save to ref
            refCursor.current = newVariant;

            // save to local storage
            localStorage.setItem("cursor-variant", newVariant);

            if (refAnimated.current) {
                refAnimated.current.reset(newVariant);
            }

            // update state
            setTimeout(() => {
                setCursorVariant(newVariant);
            }, 300);
        }
    }

    const renderCursor = () => {
        switch (cursorVariant) {
            case "canvas":
                return <CanvasCursor />
            case "animated":
            case "donut":
                return <Aminated ref={refAnimated} variant={cursorVariant} />
            default:
                return null;
        }
    };

    return renderCursor();
}