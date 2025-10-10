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
      data: (error as Error).message,
    };
  }
});

export const serverLinkedInScrapper = withArcjetProtection(async (data) => {
  try {
    const response = await axios.post(
      "https://n8n.watchwithme.in/webhook/771ebb8b-1263-4729-bbb7-62614802cefd",
      {
        linkedin: data,
      }
    );
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      data: (error as Error).message,
    };
  }
});

export const serverGenerateEmail = withArcjetProtection(async (data) => {
  try {
    const response = await axios.post(
      "https://n8n.watchwithme.in/webhook/6aaa92ae-8424-44c5-b5d4-3741ecb4d799",
      data
    );
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      data: (error as Error).message,
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
      data: (error as Error).message,
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
      data: (error as Error).message,
    };
  }
});
