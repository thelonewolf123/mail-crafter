"use server";

import axios from "axios";
import { withArcjetProtection } from "./arcjet-ratelimit";

export const ServerOnboardingData = withArcjetProtection(async (data) => {
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
});

export const ServerLinkdinScrapper = withArcjetProtection(async (data) => {
  const params = {
    linkedin: data,
  };
  try {
    const response = await axios.post(
      "https://n8n.watchwithme.in/webhook-test/64286cce-a92b-4675-af9f-f2d18a67a058",
      params
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
      "https://n8n.watchwithme.in/webhook-test/45fb8eeb-5874-40d7-81d4-3d8d95e5d92b",
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

export const ServerGetHistory = withArcjetProtection(async () => {
  try {
    const response = await axios.get(
      "https://n8n.watchwithme.in/workflow/linkdin"
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
