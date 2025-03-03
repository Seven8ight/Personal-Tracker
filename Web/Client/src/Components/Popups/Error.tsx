import { motion } from "motion/react";

const containerVariants = {
    hidden: {
      opacity: 0,
      x: 500,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, delayChildren: 1 },
    },
  },
  textVariants = {
    hidden: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 1, delay: 0.5 } },
  };

const Error = ({
  type,
}: {
  type: "Rejected Media" | "Network" | "Photo request invalid";
}): React.ReactNode => {
  const refreshHandler = () => {
    window.location.reload();
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="animate"
      id="Error"
    >
      <motion.h1 variants={textVariants}>Error</motion.h1>
      <motion.p variants={textVariants}>
        {type == "Rejected Media" &&
          "This site requires permission to use microphone in order to record audio notes"}
        {type == "Network" && "An error has occurred, please refresh the page"}
        {type == "Photo request invalid" &&
          "An error has occurred in fetching the images"}
      </motion.p>
      <motion.button
        drag
        dragConstraints={{ left: 20, right: 20 }}
        variants={textVariants}
        whileHover={{ scale: 1.1 }}
        onClick={() => refreshHandler()}
      >
        Refresh
      </motion.button>
    </motion.div>
  );
};

export default Error;
