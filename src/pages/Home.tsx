//import { useMemo } from "react";
import { Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
//import { NDKSubscriptionCacheUsage } from "@nostr-dev-kit/ndk";

import CallToAction from "@goalz/components/CallToAction";
//import FeaturedGoals from "@goalz/components/FeaturedGoals";
import Features from "@goalz/components/Features";
import Support from "@goalz/components/Support";
import Link from "@goalz/components/Link";
import useSupporters from "@goalz/hooks/useSupporters";
import { NEW_GOAL } from "@goalz/routes";
//import { HEYA_PUBKEY } from "@goalz/const";

//import useEvents from "@ngine/nostr/useEvents";
import useSession from "@ngine/hooks/useSession";
//import { dedupeByPubkey } from "@ngine/utils";

export default function Home() {
  const navigate = useNavigate();
  const [session] = useSession();
  const isLoggedOut = session === null;
  //const { events: supporters } = useSupporters(HEYA_PUBKEY);
  //const { events } = useEvents(
    //[
     //{
        //kinds: [GOAL],
        //ids: [
          //"nostr:nevent1qqsfhus8fz0sf6q7mhn7v78ggarcy5dm2dvrx8l8puut2f2749kvm2spzamhxue69uhhyetvv9ujucm4wfex2mn59en8j6gzyptswsrlvxfqhdv9k0n2zsvpy7dp6w6hnrzf4xdjcxq7m8ehn3h8kwzxwq6",
          //"nostr:nevent1qqst3k6a7z5pecuvf8c8cuuen4lgtc4kc9kur7axmqftpuc6tauy4sgppemhxue69uhkummn9ekx7mp0qgs9wp6q0aseyza4ske7dg2psyne58fm27vvfx5ektqcrmvlx7wxu7cl6wnxv",
        //],
      //},
      //{
        //kinds: [GOAL],
        //authors: supporters.map((ev) => ev.pubkey),
      //},
    //],
    //{
      //cacheUsage: NDKSubscriptionCacheUsage.PARALLEL,
    //},
   //);
  //const featuredGoals = useMemo(() => {
    //return dedupeByPubkey(events);
  //}, [events]);

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
