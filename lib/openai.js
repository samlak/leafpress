import OpenAI from "openai";
import { createAzure } from '@ai-sdk/azure';

const resource = process.env.AZURE_OPENAI_RESOURCE_NAME;
const model = process.env.AZURE_OPENAI_DEPLOYMENT_MODEL; 
const apiVersion = process.env.AZURE_OPENAI_API_VERSION;
const apiKey = process.env.AZURE_OPENAI_API_KEY;

export const openai = new OpenAI({
  apiKey,
  baseURL: `https://${resource}.openai.azure.com/openai/deployments/${model}`,
  defaultQuery: { 'api-version': apiVersion },
  defaultHeaders: { 'api-key': apiKey },
});

export const azureOpenai = createAzure({
  resourceName: resource,
  apiKey: apiKey,
});