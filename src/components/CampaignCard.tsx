import React from "react";
import { Campaign } from "@/pages/api/campaigns/types";

interface CampaignCardProps {
  campaign: Campaign;
  onClick: () => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, onClick }) => {
  return (
    <div className="p-4 h-full flex flex-col justify-between" onClick={onClick}>
      <h2 className="text-xl font-bold">{campaign.title}</h2>
      <p className="text-sm">{campaign.abstract}</p>
    </div>
  );
};

export default CampaignCard;
