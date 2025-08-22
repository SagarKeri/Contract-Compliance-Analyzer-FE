export interface ContractAnalysisResponse {
  compliance_area: string;
  reason:string;
  missing_clause: string;
  extracted_text: string | null;
}
