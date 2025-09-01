import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatBotApiResponse } from '../../Models/chatBotResponse';

@Injectable({
  providedIn: 'root'
})
export class ContractChatBotService {

  private apiUrl = 'http://localhost:8080'; // 👈 Base URL for FastAPI backend

  constructor(private http: HttpClient) { }

  askContractQuestion(file: File, question: string, model: string): Observable<ChatBotApiResponse> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('question', question);
    formData.append('model', model);

    return this.http.post<ChatBotApiResponse>(`${this.apiUrl}/chatbot-file`, formData);
  }

  askContractMetadata(question: string, model: string): Observable<ChatBotApiResponse> {
    const body = {
      question: question,
      model: model
    };

    return this.http.post<ChatBotApiResponse>(`${this.apiUrl}/chatbot-metadata`, body);
  }
}
