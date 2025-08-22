import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatBotApiResponse } from '../../Models/chatBotResponse';

@Injectable({
  providedIn: 'root'
})
export class ContractChatBotService {

  private apiUrl = 'http://localhost:8080/chatbot-file'; // 👈 Update with your FastAPI backend URL

  constructor(private http: HttpClient) { }


  askContractQuestion(file: File, question: string, model: string): Observable<ChatBotApiResponse> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('question', question);
    formData.append('model', model);
    //formData.append('country_id', countryId);

    return this.http.post<ChatBotApiResponse>(this.apiUrl, formData);
  }
}
