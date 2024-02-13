import { motion } from 'framer-motion'

type Props = {}

export default function Loading({}: Props) {
  const transition = {
    duration: 0.8,
    ease: [0.43, 0.13, 0.23, 0.96],
  }

  const variants = {
    initial: { opacity: 0 },
    enter: { opacity: 1, transition },
    exit: { opacity: 0, transition },
  }
  return (
    <motion.div
      className="absolute h-full w-full bg-background/80"
      initial="initial"
      animate="enter"
      exit="exit"
      variants={variants}
    ></motion.div>
  )
}
