export interface ContractCache {
  _id: string;
  clauses: number[];
  analysis: ContractAnalysis;
  feedback: string;
  feedback_given: boolean;
  country_id: string; // Added
  domain_id: string;  // Added
}

export interface ContractAnalysis {
  description: string;
  analysis: ClauseAnalysis[];
}

export interface ClauseAnalysis {
  compliance_area: string;
  missing_clause: string;
  reason: string;
  extracted_text: string;
}
