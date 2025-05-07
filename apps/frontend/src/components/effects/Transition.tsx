import { motion } from 'framer-motion';

export default function Transition() {
  return (
    <>
      <motion.div
        className="fixed bottom-[-200px] left-[-200px] w-[200px] h-[200px] bg-primary z-10"
        initial={{ scale: 0, rotate: 45 }}
        animate={{ scale: [0, 10, 0], rotate: 45 }}
        transition={{
          duration: 1.8,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="fixed top-[-200px] right-[-200px] w-[200px] h-[200px] bg-primary z-20"
        initial={{ scale: 0, rotate: 45 }}
        animate={{ scale: [0, 10, 0], rotate: 45 }}
        transition={{
          duration: 1.8,
          ease: 'easeInOut',
        }}
      />
    </>
  );
}
