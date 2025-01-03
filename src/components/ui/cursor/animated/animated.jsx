import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import AnimatedCursor from "react-animated-cursor"
// import "./css/animated.css"

export default forwardRef(function Aminated({ variant }, ref) {
    const [cursorVariant, setCursorVariant] = useState(variant);

    useImperativeHandle(ref, () => ({
        reset: () => {
            setTimeout(() => {
                document.querySelectorAll('[style*="cursor: none"]').forEach(el => el.style.removeProperty('cursor'));
            }, 200);
        }
    }));

    useEffect(() => {
        setCursorVariant(variant);
    }, [variant]);

    const renderCursor = () => {
        const clickables = [
            'a',
            'input[type="text"]',
            'input[type="email"]',
            'input[type="number"]',
            'input[type="submit"]',
            'input[type="image"]',
            'label[for]',
            'select',
            'textarea',
            'button',
            '.link',
            {
                target: '.cursor-pointer',
            }
        ]

        switch (cursorVariant) {
            case "donut":
                return <AnimatedCursor
                    innerSize={8}
                    outerSize={24}
                    innerScale={1}
                    outerScale={4}
                    outerAlpha={0}
                    hasBlendMode={true}
                    trailingSpeed={12}
                    innerStyle={{
                        backgroundColor: '#fff',
                        mixBlendMode: 'exclusion'
                    }}
                    outerStyle={{
                        backgroundColor: "#fff",
                        mixBlendMode: 'exclusion'
                    }}
                    clickables={clickables}
                />

            default:
                return <AnimatedCursor
                    innerSize={10}
                    innerStyle={{
                        backgroundColor: 'hsl(var(--primary))',
                    }}
                    outerStyle={{
                        backgroundColor: "hsl(var(--primary) / 20%)",
                    }}
                    clickables={clickables}
                />;
        }
    }

    return renderCursor();
})