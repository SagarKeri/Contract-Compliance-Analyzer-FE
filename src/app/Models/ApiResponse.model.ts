import { ContractAnalysisResponse } from "./contract-analysis-response.model";

export interface ApiResponse {
  analysis: ContractAnalysisResponse[],
  cache_key: "" 
}
