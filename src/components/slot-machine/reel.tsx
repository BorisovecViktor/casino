import { useRef } from 'react'
import { Box, Stack } from '@mui/material'
import { CSSTransition } from 'react-transition-group'
import { TCurrentReel, TReel } from '../../app/slices/user/types'
import { grey } from '@mui/material/colors'

type Props = {
  id: number
  reels: Array<TReel>
  reel: TCurrentReel
  isAnimation: boolean
  duration: number
}

export const Reel = ({ id, reels, reel, isAnimation, duration }: Props) => {
  const nodeRefs = [useRef(null), useRef(null), useRef(null)]

  return (
    <Stack
      position="relative"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      width="75px"
      height="75px"
      borderRadius={1}
      sx={{
        backgroundColor: grey[100],
        userSelect: 'none',
        boxShadow: '1px 5px 10px rgba(0, 0, 0, 0.2)',
      }}
    >
      <CSSTransition
        nodeRef={nodeRefs[id]}
        in={isAnimation}
        timeout={duration}
        classNames="reel-animation"
      >
        <Box ref={nodeRefs[id]} position="absolute" top={0}>
          {reels[id].map((slot, i) => (
            <Stack
              key={i}
              alignItems="center"
              justifyContent="center"
              width="75px"
              height="75px"
            >
              {slot}
            </Stack>
          ))}
        </Box>
      </CSSTransition>
      <Box key={id}>{reel}</Box>
    </Stack>
  )
}
