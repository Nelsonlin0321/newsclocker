"use server";
import { SearchAllPromptParams } from "@/app/types/prompt-search";
import { searchFavoritePrompts } from "./search-favorite-prompt";
import { searchPrompts } from "./search-prompt";

export const searchAllPrompts = async ({
  q,
  userId,
  category,
  page,
  tab,
}: SearchAllPromptParams) => {
  if (!userId) {
    //  public
    const response = await searchPrompts({ q, page, category });
    console.log(response);
    return response;
  }

  if (tab == "public") {
    const response = await searchPrompts({ q, page, category });
    // console.log(response);
    return response;
  }
  //   favorite
  if (tab == "my") {
    const response = await searchPrompts({ q, page, userId, category });
    // console.log(response);
    return response;
  }

  if (tab == "favorite") {
    return await searchFavoritePrompts({ q, page, userId, category });
  }
  //  my prompt
  const response = searchPrompts({ q, page, userId, category });
  // console.log(response);
  return response;
};
