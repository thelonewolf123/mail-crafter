"use server";

import axios from "axios";
import { withArcjetProtection } from "./arcjet-ratelimit";

export const serverOnboardingData = withArcjetProtection(async (data) => {
  try {
    const response = await axios.post(
      "https://n8n.watchwithme.in/workflow/onboarding",
      data
    );
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      data: (error as Error).message
    };
  }
});

export const serverLinkedInScrapper = withArcjetProtection(async (data) => {
  try {
    const response = await axios.post(
      "https://n8n.watchwithme.in/webhook/scrape-linkedin",
      {
        linkedin: data
      }
    );
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      data: (error as Error).message
    };
  }
});

export const serverGenerateEmail = withArcjetProtection(async (data) => {
  try {
    const response = await axios.post(
      "https://n8n.watchwithme.in/webhook/craft-email",
      data
    );
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      data: (error as Error).message
    };
  }
});

export const serverGetHistory = withArcjetProtection(async () => {
  try {
    const response = await axios.get(
      "https://n8n.watchwithme.in/workflow/linkdin"
    );
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      data: (error as Error).message
    };
  }
});

export const serverEmailPreference = withArcjetProtection(async (data) => {
  try {
    const response = await axios.post(
      "https://n8n.watchwithme.in/workflow/linkdin",
      data
    );
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      data: (error as Error).message
    };
  }
});
