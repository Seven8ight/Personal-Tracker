import { AnimatePresence, motion } from "motion/react";

const containerVariants = {
  initial: {
    x: 300,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: 500,
    opacity: 0,
  },
};

const Loading = (): React.ReactNode => {
  return (
    <AnimatePresence>
      <motion.div
        id="Loader"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <h1>Loading</h1>
      </motion.div>
    </AnimatePresence>
  );
};

export default Loading;
