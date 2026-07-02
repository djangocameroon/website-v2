import React, { forwardRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';

type AnimatedSectionProps = React.ComponentPropsWithoutRef<typeof motion.section> & {
    children: Readonly<React.ReactNode>;
};

const AnimatedSection = forwardRef<HTMLElement, AnimatedSectionProps>(
    ({ children, variants, initial, className = "", ...props }, forwardedRef) => {
        const controls = useAnimation();
        const { ref: inViewRef, inView } = useInView();

        useEffect(() => {
            if (inView) {
                controls.start('visible');
            }
            if (!inView) {
                controls.start('hidden');
            }
        }, [controls, inView]);

        const setRefs = (node: HTMLElement | null) => {
            inViewRef(node);
            if (typeof forwardedRef === 'function') {
                forwardedRef(node);
            } else if (forwardedRef) {
                forwardedRef.current = node;
            }
        };

        return (
            <motion.section
                ref={setRefs}
                initial={initial || 'hidden'}
                animate={controls}
                variants={variants || {
                    hidden: { opacity: 0, y: 90 },
                    visible: { opacity: 1, y: 0 },
                }}
                className={className}
                {...props}
            >
                {children}
            </motion.section>
        )
    }
);

AnimatedSection.displayName = 'AnimatedSection';

export default AnimatedSection