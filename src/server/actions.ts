"use server";

import axios from "axios";
import { withArcjetProtection } from "./arcjet-ratelimit";
import { OnboardingTypes } from "@/app/(app)/onboarding/page";

export const ServerOnboardingData = withArcjetProtection(
  async (data: OnboardingTypes) => {
    try {
      const response = await axios.post(
        "https://n8n.watchwithme.in/workflow/onboarding",
        data
      );
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: error.message,
      };
    }
  }
);

export const ServerLinkdinScrapper = withArcjetProtection(async (data) => {
  try {
    const response = await axios.post(
      "https://n8n.watchwithme.in/workflow/linkdin",
      data
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      data: error.message,
    };
  }
});

export const ServerGenerateEmail = withArcjetProtection(async (data) => {
  try {
    const response = await axios.post(
      "https://n8n.watchwithme.in/workflow/linkdin",
      data
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      data: error.message,
    };
  }
});

export const ServerGetHistory = withArcjetProtection(async (data) => {
  try {
    const response = await axios.post(
      "https://n8n.watchwithme.in/workflow/linkdin",
      data
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      data: error.message,
    };
  }
});

export const ServerEmailPreference = withArcjetProtection(async (data) => {
  try {
    const response = await axios.post(
      "https://n8n.watchwithme.in/workflow/linkdin",
      data
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      data: error.message,
    };
  }
});
