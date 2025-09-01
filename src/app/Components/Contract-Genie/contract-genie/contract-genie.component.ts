import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, AfterViewChecked, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ContractChatBotService } from '../../../Services/chat-bot-service/contract-chat-bot-service.service';
import { ChatBotApiResponse } from '../../../Models/chatBotResponse';
import { ApplicationServiceService } from '../../../Services/application-service/application-service.service';

interface ChatMessage {
  sender: 'user' | 'bot';
  message: string;
}

@Component({
  selector: 'app-contract-genie',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './contract-genie.component.html',
  styleUrls: ['./contract-genie.component.css']
})
export class ContractGenieComponent implements OnInit, AfterViewChecked {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  @Input() selectedFile: File| null = null;;
  
  userInput: string = '';
  chatMessages: ChatMessage[] = [];

  constructor(private chatService: ContractChatBotService,private appService:ApplicationServiceService) {}
  ngOnInit(): void {
    this.appService.file$.subscribe(file => {
    this.selectedFile = file;
  });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }


  sendMessage() {
    if (!this.userInput.trim() || !this.selectedFile) {
      alert('Please select a PDF and enter a question.');
      return;
    }

    this.chatMessages.push({ sender: 'user', message: this.userInput });

    this.chatService.askContractQuestion(this.selectedFile, this.userInput, '2')
      .subscribe({
        next: (res: ChatBotApiResponse) => {
          // Use res.answer safely
          this.chatMessages.push({ 
            sender: 'bot', 
            message: res.answer || 'No response from bot.' 
          });
          // Scroll to bottom after message
          setTimeout(() => {
            this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
          }, 0);
        },
        error: (err) => {
          console.error('Error:', err);
          this.chatMessages.push({ sender: 'bot', message: '⚠️ Error fetching response.' });
        }
      });


    this.userInput = '';
  }

  private scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      this.appService.setFile(file); // ✅ Store in service
      console.log('File uploaded:', file.name);
    }
  }

}
