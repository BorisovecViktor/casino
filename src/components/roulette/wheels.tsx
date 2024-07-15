import { Box } from '@mui/material'
import { RefObject, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

type Props = {
  isAnimationWheel: boolean
  duration: number
  nodeRefBall: RefObject<HTMLDivElement>
}

export const Wheels = ({ isAnimationWheel, duration, nodeRefBall }: Props) => {
  const nodeRefWheels = [useRef(null), useRef(null)]

  return (
    <Box className="wheel">
      <CSSTransition
        nodeRef={nodeRefWheels[0]}
        in={isAnimationWheel}
        timeout={duration}
        classNames="wheel-animation"
      >
        <Box ref={nodeRefWheels[0]} className="wheel-2"></Box>
      </CSSTransition>
      <Box className="wheel-3"></Box>
      <CSSTransition
        nodeRef={nodeRefWheels[1]}
        in={isAnimationWheel}
        timeout={duration}
        classNames="wheel-animation"
      >
        <Box ref={nodeRefWheels[1]} className="wheel-4"></Box>
      </CSSTransition>
      <Box className="wheel-5"></Box>
      <Box ref={nodeRefBall} className="ball-container">
        <Box className="ball"></Box>
      </Box>
    </Box>
  )
}
