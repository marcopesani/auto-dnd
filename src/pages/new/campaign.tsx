// pages/new/story.tsx
import React from "react";
import { GetServerSideProps } from "next";
import CampaignCard from "@/components/CampaignCard";
import { Campaign } from "@/pages/api/campaigns/types";

type NewCampaignPageProps = {
  campaigns: Campaign[];
};

const NewCampaignPage: React.FC<NewCampaignPageProps> = ({ campaigns }) => {
  const handleCampaignClick = (campaign: Campaign) => {
    // Handle the selected campaign and navigate to the next step
    console.log("Selected campaign:", campaign);
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/backgrounds/1.jpg')" }}
    >
      <div className="flex overflow-x-scroll space-x-4">
        {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
            onClick={() => handleCampaignClick(campaign)}
          />
        ))}
      </div>
    </div>
  );
};

export default NewCampaignPage;

export const getServerSideProps: GetServerSideProps<NewCampaignPageProps> = async (context) => {
  const host = context.req.headers.host;
  const protocol = context.req.headers['x-forwarded-proto'] || 'http';
  const res = await fetch(`${protocol}://${host}/api/campaigns`);
  const campaigns: Campaign[] = await res.json();

  return {
    props: {
      campaigns,
    },
  };
};
