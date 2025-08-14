import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  sender: 'user' | 'bot';
  message: string;
}

@Component({
  selector: 'app-contract-genie',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl: './contract-genie.component.html',
  styleUrls: ['./contract-genie.component.css']
})
export class ContractGenieComponent implements AfterViewChecked {

  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  userInput: string = '';
  chatMessages: ChatMessage[] = [];

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    // Add user message
    this.chatMessages.push({ sender: 'user', message: this.userInput });

    // Simulate bot response (replace with API call)
    setTimeout(() => {
      this.chatMessages.push({ sender: 'bot', message: `Bot says: ${this.userInput}` });
    }, 500);

    this.userInput = '';
  }

  private scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
