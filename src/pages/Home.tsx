import { useMemo } from "react";
import { Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { NDKSubscriptionCacheUsage } from "@nostr-dev-kit/ndk";

import CallToAction from "@goalz/components/CallToAction";
import FeaturedGoals from "@goalz/components/FeaturedGoals";
import Features from "@goalz/components/Features";
import Support from "@goalz/components/Support";
import Link from "@goalz/components/Link";
import useSupporters from "@goalz/hooks/useSupporters";
import { NEW_GOAL } from "@goalz/routes";
import { GOAL, HEYA_PUBKEY } from "@goalz/const";

import useEvents from "@ngine/nostr/useEvents";
import useSession from "@ngine/hooks/useSession";
import { dedupeByPubkey } from "@ngine/utils";

export default function Home() {
  const navigate = useNavigate();
  const [session] = useSession();
  const isLoggedOut = session === null;
  const { events: supporters } = useSupporters(HEYA_PUBKEY);
  const { events } = useEvents(
    [
      {
        kinds: [GOAL],
        ids: [
          "bd3b899997cd4ce115532a84eabe598bb7547cab8f44b06812b2306d64761096",
          "9b734bc67402c034857ec3f2ecd8e74d61d38f46505067c5e53986cf70a0c4f6",
          "060f4f06455ee0a87db48f7d5f23b532bcc133cea7dd3bc9f2a20226f1bf2705",
        ],
      },
      {
        kinds: [GOAL],
        authors: supporters.map((ev) => ev.pubkey),
      },
    ],
    {
      cacheUsage: NDKSubscriptionCacheUsage.PARALLEL,
    },
  );
  const featuredGoals = useMemo(() => {
    return dedupeByPubkey(events);
  }, [events]);

  function createZapGoal() {
    navigate(NEW_GOAL);
  }

  return (
    <Stack align="center" spacing={20} mt={12}>
      <CallToAction
        label="Open-Source Supporters Unite!"
        title="Empower the indie dev!"
        description="Fund your open-source projects or others with Bitcoin Lightning. Fundraising is instantly available without any fees."
        ctaText="Start a fund"
        ctaAction={createZapGoal}
      />
       <FeaturedGoals events={featuredGoals} />
      {!isLoggedOut && (
        <Link href="/all" mt={-16}>
          See all active goals
        </Link>
      )}
      <CallToAction
        label="Almost unreal"
        title="Zero fees. Multiple recipients. Instant availability. It's kind of amazing!"
        description="There’s no party in the middle so all funds go directly to YOU future innovator, BitHustle uses the bitcoin lightning network to send payments anywhere in the world for near-zero cost. This makes it easy to send $1,000 or $0.01."
        ctaText="Start a fund"
        ctaAction={createZapGoal}
      />
      <Features />
      <Support />

      <CallToAction
        label="Your dreams await"
        title="Get the boost you need. Start a fund for your own project or someone else."
        description="BitHustle is an open-source project made possible by the folks at OpenSats."
        ctaText="Start a fund"
        ctaAction={createZapGoal}
      />
    </Stack>
  );
}
