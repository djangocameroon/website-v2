import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';
import {
    type TargetAndTransition,
    type VariantLabels,
    type Variants
} from 'framer-motion';

type AnimatedSectionProps = {
    className?: string;
    children: Readonly<React.ReactNode>;
    variants?: Variants;
    initial?: boolean | TargetAndTransition | VariantLabels | undefined;
};

const AnimatedSection = ({ children, variants, initial, className="" }: AnimatedSectionProps) => {
    const controls = useAnimation();
    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
        if (!inView) {
            controls.start('hidden');
        }
    }, [controls, inView]);

    return (
        <motion.section
            ref={ref}
            initial={initial || 'hidden'}
            animate={controls}
            variants={variants || {
                hidden: { opacity: 0, y: 90 },
                visible: { opacity: 1, y: 0 },
            }}
            className={className}
        >
            {children}
        </motion.section>
    )
}

export default AnimatedSection