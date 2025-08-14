export interface ContractAnalysisResponse {
  compliance_area: string;
  missing_clause: string;
  extracted_text: string | null;
}
