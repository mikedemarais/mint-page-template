import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { SubgraphERC721Drop } from 'models/subgraph'
import ReactMarkdown from 'react-markdown'
import { useDropMetadataContract } from 'providers/DropMetadataProvider'
import { useState } from 'react'
import { useSaleStatus } from 'hooks/useSaleStatus'
import { useDisconnect } from 'wagmi'
import { ipfsImage } from '@lib/helpers'
import { loggedInText, maxWidth, heroImage, mobileHeader, wrapWords } from 'styles/styles.css'
import { MintComponent } from '@components/zord/MintComponent'
import { MintDetails } from '@components/zord/MintDetails'
import { PresaleComponent } from '@components/zord/PresaleComponent'
import {
  vars,
  Box,
  Flex,
  Well,
  Stack,
  Text,
  Button,
  Paragraph,
  SpinnerOG,
} from '@zoralabs/zord'

export function Collection({
  collection,
  username,
}: {
  collection: SubgraphERC721Drop
  username?: string
}) {
  const { metadata } = useDropMetadataContract()
  const { disconnect } = useDisconnect()
  const { presaleExists, saleNotStarted, saleIsFinished } = useSaleStatus({ collection })
  const [showPresale, setShowPresale] = useState(saleNotStarted && !saleIsFinished)

  const willChange = { willChange: 'transform' }

  const [angle, setAngle] = useState(12.5)

  const y = useMotionValue(0.5)
  const x = useMotionValue(0.5)
  const hoverProgress = useMotionValue(1)

  const rotateY = useTransform(x, [0, 1], [angle, -angle], {
    clamp: true,
  })
  const rotateX = useTransform(y, [0, 1], [-angle, angle], {
    clamp: true,
  })
  const moveY = useTransform(y, [0, 1], [angle / 2, -angle / 2], {
    clamp: true,
  })
  const moveX = useTransform(x, [0, 1], [angle / 2, -angle / 2], {
    clamp: true,
  })

  function onMove(e) {
    const bounds = e.currentTarget.getBoundingClientRect()
    const xValue = (e.clientX - bounds.x) / e.currentTarget.clientWidth
    const yValue = (e.clientY - bounds.y) / e.currentTarget.clientHeight
    
    x.stop()
    y.stop()

    const duration = 0.5 * hoverProgress.get()

    animate(x, xValue, {
      ease: [0.25, 1, 0.5, 1],
      duration
    })
    animate(y, yValue, {
      ease: [0.25, 1, 0.5, 1],
      duration
    })
  }

  function onEnter() {
    x.stop()
    y.stop()
    hoverProgress.set(1, true)

    animate(x, 0.5, {
      ease: [0.25, 1, 0.5, 1],
      duration: 0.5
    })
    animate(y, 0.5, {
      ease: [0.25, 1, 0.5, 1],
      duration: 0.5
    })
    animate(hoverProgress, 0, {
      ease: [0.25, 1, 0.5, 1],
      duration: 0.5
    })
  }

  function onLeave() {
    hoverProgress.stop()
    animate(x, 0.5, {
      ease: [0.25, 1, 0.5, 1],
      duration: 0.5
    })
    animate(y, 0.5, {
      ease: [0.25, 1, 0.5, 1],
      duration: 0.5
    })
    hoverProgress.set(1, true)
  }

  return (
    <Flex
      mt="x3"
      align="center"
      direction={{ '@initial': 'column', '@768': 'row-reverse' }}
      gap="x3"
      p={{ '@initial': 'x1', '@576': 'x10' }}
      style={{ height: '100vh', maxWidth: 1360, margin: 'auto', minHeight: '80vh', zIndex: 10 }}
      w="100%"
    >
      <Flex flex={{ '@initial': '1', '@1024': '1' }} p="x2" justify="center">
        <motion.div
          animate={{
            scale: 1,
            y: 0,
          }}
          initial={{
            scale: 0,
            y: 200,
          }}
          style={willChange}
          transition={{
            damping: 40,
            delay: 0.4,
            mass: 1,
            stiffness: 300,
            type: 'spring',
          }}
        >
          <motion.div
            animate={{
              rotateY: 0,
              transformPerspective: 1200,
            }}
            initial={{
              rotateY: 180,
              transformPerspective: 0,
            }}
            style={willChange}
            transition={{
              damping: 8,
              delay: 0.4,
              mass: 1,
              stiffness: 60,
              type: 'spring',
            }}
          >
            <motion.div
              onMouseMove={onMove}
              whileHover={{ scale: 1.0666 }}
              onHoverStart={onEnter}
              onHoverEnd={onLeave}
              style={ willChange, { rotateX, rotateY, transformPerspective: 800 }}
              transition={{ ease: [0.25, 1, 0.5, 1], duration: 0.5 }}
            >
              <div
                className={mobileHeader}
                style={{
                  height: 1024,
                  width: 1024,
                  objectFit: 'contain',
                  position: 'relative',
                  maxHeight: '45vh',
                  maxWidth: '45vh',
                  willChange: 'transform',
                }}
              >
                <img
                  className={heroImage}
                  src="appIconBackground.png"
                  alt={collection.name}
                />
                <motion.div
                  style={{
                    position: 'absolute',
                    left: '0',
                    right: '0',
                    top: '0',
                    bottom: '0',
                    willChange: 'transform',
                    x: moveX,
                    y: moveY,
                  }}
                >
                  <img
                    src="zorb.png"
                    alt={collection.name}
                    style={{
                      aspectRatio: '1 / 1',
                      height: '100%',
                      width: '100%',
                      '-webkit-touch-callout': 'none',
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Flex>
      <Box flex={{ '@initial': '1', '@1024': 'none' }} className={maxWidth} p="x4">
        <Stack gap="x2" mb="x3">
          <Text variant="display-md" mb="x2">
            {/* {collection.name} */}
            Very Wow Rainbow ✗ The Doge NFT
          </Text>
          <Paragraph className={wrapWords} mb="x2">
            <ReactMarkdown>
              {/* {JSON.parse(`"${metadata?.description || collection?.editionMetadata?.description}"`)} */}
              {'A special edition Rainbow app icon in celebration of Kabosu\'s 17th birthday.\n\nMake a swap for 16969 $DOG in Rainbow to get allow listed and win a free Pixel.\n\n '}
            </ReactMarkdown>
            {/* <Flex justify="space-between" align="center">
            <Button
                as="a"
                href={`https://rnbwapp.com/campaign/doge?$web_only=true}`}
                target="_blank"
                size="lg"
                mt="x3">
                  DO IT FOR THE DOGE
            </Button>
            </Flex> */}
          </Paragraph>
        </Stack>
        <Box>
          {collection != null ? (
            <>
              {presaleExists ? (
                <>
                  <Flex flexChildren gap="x3" mb="x4">
                    <Button
                      pill
                      variant={showPresale ? 'primary' : 'ghost'}
                      color={showPresale ? 'primary' : 'tertiary'}
                      onClick={() => setShowPresale(true)}
                    >
                      Presale
                    </Button>
                    <Button
                      pill
                      variant={!showPresale ? 'primary' : 'ghost'}
                      color={!showPresale ? 'primary' : 'tertiary'}
                      onClick={() => setShowPresale(false)}
                    >
                      Public sale
                    </Button>
                  </Flex>
                  <Box style={{ display: showPresale ? 'block' : 'none' }}>
                    <PresaleComponent collection={collection} />
                  </Box>
                  <Box style={{ display: !showPresale ? 'block' : 'none' }}>
                    <MintComponent collection={collection} />
                  </Box>
                </>
              ) : (
                <MintComponent collection={collection} />
              )}

              <Box>
                {username && (
                  <Well borderColor="accent" py="x1" mt="x4">
                    <Flex justify="space-between" align="center">
                      <Text fontSize={14}><span className={loggedInText}>Logged in as </span>{username}</Text>
                      <Button pill variant="ghost" onClick={disconnect} positive="relative" style={{ left: vars.space.x5, marginRight: 4, paddingBottom: 2 }}>
                        <Box as="span" fontSize={14}>
                          Disconnect
                        </Box>
                      </Button>
                    </Flex>
                  </Well>
                )}
              </Box>
              <Well borderColor="accent" fontSize={14} mt="x4">
                <MintDetails collection={collection} showToggle={false} />
              </Well>
            </>
          ) : (
            <Paragraph align="center" mt="x8">
              <SpinnerOG />
            </Paragraph>
          )}
        </Box>

      </Box>
    </Flex>

  )
}
