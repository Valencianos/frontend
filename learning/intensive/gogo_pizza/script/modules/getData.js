import { hideLoader, showLoader } from "./loader.js";

export const getData = async (url) => {
  showLoader();
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch cards')
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching cards: ${error}`);
    return [];
  } finally {
    hideLoader();
  }
}