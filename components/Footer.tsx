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

  export function Footer({}: {}) {
    return (
      <Stack
        align="center"
        direction={{ '@initial': 'column', '@768': 'row-reverse' }}
        gap="x3"
        p={{ '@initial': 'x2', '@576': 'x10' }}
        style={{ maxWidth: 1360, margin: 'auto' }}
        w="100%"
      >
        <Box>
            <Text as="a"
                href={`https://rnbwapp.com/campaign/doge?$web_only=true}`}
                target="_blank"
                size="lg"
                mt="x3">Rainbow</Text>
            <a href="https://rainbow.me">The Dog NFT</a>
        </Box>
      </Stack>
  
    )
  }