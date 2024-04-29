import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  AuthenticationResult,
  SilentRequest,
  InteractionRequiredAuthError,
} from "@azure/msal-browser";
import { msalInstance } from "@/Auth/msal";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: "accurate" | "normal";
  } = {}
) {
  const { decimals = 0, sizeType = "normal" } = opts;

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];
  if (bytes === 0) return "0 Byte";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === "accurate" ? accurateSizes[i] ?? "Bytest" : sizes[i] ?? "Bytes"
  }`;
}

export const getAccessToken = async (): Promise<string | null> => {
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length === 0) {
    console.error("No accounts detected");
    return null;
  }

  const silentRequest: SilentRequest = {
    account: accounts[0],
    scopes: ["api://90f2626b-7a26-4110-8ee4-23cdc2628555/AccessToken"],
  };

  try {
    const response: AuthenticationResult =
      await msalInstance.acquireTokenSilent(silentRequest);
    return response.accessToken;
  } catch (error) {
    if (error instanceof InteractionRequiredAuthError) {
      try {
        const response: AuthenticationResult =
          await msalInstance.acquireTokenPopup(silentRequest);
        return response.accessToken;
      } catch (err) {
        console.error("Error acquiring token interactively:", err);
        return null;
      }
    } else {
      console.error("Error acquiring token silently:", error);
      return null;
    }
  }
};
