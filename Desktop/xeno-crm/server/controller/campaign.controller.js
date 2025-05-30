import campaignService from "../services/campaign.service.js";
import { ApiResponse } from "../utils/ApiResponse.util.js";

class CampaignController {
  createCampaign = async (req, res, next) => {
    const { name, rules, operator } = req.body;
    const userId = req.user.id;
    const { campaign, audience } = await campaignService.createCampaign({
      userId,
      name,
      rules,
      operator,
    });
    res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { campaign, audience },
          "Campaign created Successfully"
        )
      );
  };

  getAllCampaigns = async (req, res, next) => {
    const userId = req.user._id;
    const allCampaigns = await campaignService.getAllCampaigns(userId);
    res.status(200).json(new ApiResponse(200, allCampaigns, "Campaigns"));
  };
}

export const campaignController = new CampaignController();
