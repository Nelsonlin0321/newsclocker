"use server";

import pdfApiClient from "@/app/services/get-pdf-url-services";

export async function getPdfUrl(params: {
  markdown: string;
  keywords: string;
}) {
  const response = await pdfApiClient.get({
    params: params,
  });

  return response;
}
