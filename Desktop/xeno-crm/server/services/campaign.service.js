import Campaign from "../models/campaign.model.js";
import Customer from "../models/customer.model.js";
import { BaseService } from "../services/base.service.js";
import { queryBuilder } from "../utils/queryBuilder.util.js";

class CampaignService extends BaseService {
  constructor() {
    super(Campaign);
  }

/**
   * Creates a new campaign and finds the matching audience based on the provided rules and operator.
   *
   * @param {Object} params - Campaign creation parameters.
   * @param {import('mongoose').Types.ObjectId} params.userId - MongoDB ObjectId of the user creating the campaign.
   * @param {string} params.name - Name of the campaign.
   * @param {Array<{ field: string, operator: string, value: any }>} params.rules - Array of rule objects for audience selection.
   * @param {"AND"|"OR"} params.operator - Logical operator to combine the rules.
   * @returns {Promise<{ campaign: Object, audience: Array<Object> }>} The created campaign and the matching audience.
   */
  async createCampaign({ userId, name, rules, operator }) {
    const mongodbQuery = queryBuilder(rules, operator);
    const matchingAudience = await Customer.find(mongodbQuery);

    const campaign = await this.model.create({
      userId,
      name,
      rules,
      operator,
      audienceSize: matchingAudience.length,
    });

    return { campaign, audience: matchingAudience };
  }

 /**
   * Retrieves all campaigns for a specific user, sorted by creation date in descending order.
   *
   * @param {import('mongoose').Types.ObjectId} userId - MongoDB ObjectId of the user.
   * @returns {Promise<Array<Object>>} Array of campaign objects.
   */
  async getAllCampaigns(userId) {
    return await this.model.find({ userId }).sort({ createdAt: -1 });
  }
}

export default new CampaignService();
