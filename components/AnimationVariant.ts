export const sentence = {
  hidden: (i = 1) => ({
    opacity: 0,
    y: -80,
    x: 50,
    scale: 0,
    transition: {
      delayChildren: 0.04 * i,
      staggerChildren: 0.12,
      delay:1
    }
  }),
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      delayChildren: 0.04 * i,
      staggerChildren: 0.12,
    }
  })
} 

export const letter = {
  hidden: {
    opacity: 0, 
    y: -200, 
    transition: {
    type: "spring",
    damping: 12,
    stiffness: 100
  }},
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100
  }},
}

export const container = {
  hidden: { 
    scale: 0,
    transition: {
      staggerChildren: 0.5,
    }
  },
  show: {
    scale: 1,
    transition: {
      staggerChildren: 0.5,
    }
  }
}