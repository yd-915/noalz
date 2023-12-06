import { useMemo, ReactNode } from "react";
import {
  HStack,
  Icon,
  Image,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Stack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { NDKKind } from "@nostr-dev-kit/ndk";

import { useReactions, Amount, User, EventProps } from "@ngine/react";
import { Repost as RepostIcon, Heart } from "@ngine/icons";
import { zapsSummary, ZapRequest } from "@ngine/nostr/nip57";

function Zap({ zap }: { zap: ZapRequest }) {
  return (
    <HStack justifyContent="space-between">
      <User pubkey={zap.pubkey} />
      <Text fontSize="lg" fontWeight={600}>
        <Amount amount={zap.amount} />
      </Text>
    </HStack>
  );
}

function Like({ event }: EventProps) {
  const emoji = event.content;
  const customEmoji = event?.tags.find(
    (t) =>
      emoji &&
      t[0] === "emoji" &&
      t[1] === `${emoji.slice(1, emoji?.length - 1)}`,
  );
  return (
    <HStack justifyContent="space-between">
      <User pubkey={event.pubkey} />
      {customEmoji ? (
        <Image boxSize={5} src={customEmoji[2]} />
      ) : !["+", "-"].includes(emoji) ? (
        <Text fontSize="xl">{emoji}</Text>
      ) : (
        <Icon as={Heart} boxSize={5} />
      )}
    </HStack>
  );
}

function Repost({ event }: EventProps) {
  return (
    <HStack justifyContent="space-between">
      <User pubkey={event.pubkey} />
      <Icon as={RepostIcon} boxSize={5} />
    </HStack>
  );
}

function ReactionsList({ children }: { children: ReactNode }) {
  return (
    <Stack
      h="210px"
      sx={{
        overflowY: "scroll",
        flexWrap: "nowrap",
        scrollbarWidth: "none",
        "-webkit-overflow-scrolling": "touch",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {children}
    </Stack>
  );
}

interface ReactionModalProps extends EventProps {
  isOpen: boolean;
  onClose(): void;
  reactions: NDKKind[];
}

export default function ReactionModal({
  event,
  isOpen,
  reactions: reactionKinds,
  onClose,
}: ReactionModalProps) {
  const { events, zaps, reposts, reactions } = useReactions(
    event,
    reactionKinds,
  );
  const { zapRequests } = useMemo(() => zapsSummary(zaps), [zaps]);
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Reactions ({events.length})</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs variant="soft-rounded" colorScheme="brand">
            <TabList>
              {reactionKinds.map((k) => {
                if (k === NDKKind.Zap) {
                  return <Tab>Zaps ({zaps.length})</Tab>;
                }
                if (k === NDKKind.Reaction) {
                  return <Tab>Likes ({reactions.length})</Tab>;
                }
                if (k === NDKKind.Repost || k === NDKKind.GenericRepost) {
                  return <Tab>Reposts ({reposts.length})</Tab>;
                }
                return null;
              })}
            </TabList>

            <TabPanels>
              {reactionKinds.map((k) => {
                if (k === NDKKind.Zap) {
                  return (
                    <TabPanel>
                      <ReactionsList>
                        {zapRequests.map((z) => (
                          <Zap key={z.id} zap={z} />
                        ))}
                      </ReactionsList>
                    </TabPanel>
                  );
                }
                if (k === NDKKind.Repost || k === NDKKind.GenericRepost) {
                  return (
                    <TabPanel>
                      <ReactionsList>
                        {reposts.map((e) => (
                          <Repost key={e.id} event={e} />
                        ))}
                      </ReactionsList>
                    </TabPanel>
                  );
                }
                if (k === NDKKind.Reaction) {
                  return (
                    <TabPanel>
                      <ReactionsList>
                        {reactions.map((e) => (
                          <Like key={e.id} event={e} />
                        ))}
                      </ReactionsList>
                    </TabPanel>
                  );
                }
                return null;
              })}
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
