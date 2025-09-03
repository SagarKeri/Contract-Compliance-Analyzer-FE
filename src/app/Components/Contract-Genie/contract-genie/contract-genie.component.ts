import { CommonModule } from '@angular/common';
import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  Input,
  OnInit,
} from '@angular/core';
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
  styleUrls: ['./contract-genie.component.css'],
})
export class ContractGenieComponent implements OnInit, AfterViewChecked {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  @Input() selectedFile: File | null = null;

  userInput: string = '';
  chatMessages: ChatMessage[] = [];

  constructor(
    private chatService: ContractChatBotService,
    private appService: ApplicationServiceService
  ) {}

  ngOnInit(): void {
    this.appService.file$.subscribe((file) => {
      this.selectedFile = file;
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

 sendMessage() {
  if (!this.userInput.trim()) {
    alert('Please enter a question.');
    return;
  }

  // Push user message
  this.chatMessages.push({ sender: 'user', message: this.userInput });

  if (this.selectedFile) {
    this.chatService
      .askContractQuestion(this.selectedFile, this.userInput, '2')
      .subscribe({
        next: (res: ChatBotApiResponse) => {
          let botMessage = 'No response from bot.';
          console.log(res);

          try {
            let parsed;

            // Only try parsing if it looks like JSON
            if (typeof res.answer === 'string' && res.answer.trim().startsWith('{')) {
              parsed = JSON.parse(res.answer);
            } else {
              parsed = res.answer;
            }

            if (typeof parsed === 'object') {
              botMessage = parsed.response || botMessage;
            } else {
              botMessage = parsed || botMessage;
            }

            // Cleanup unwanted markdown characters
            botMessage = botMessage
              .replace(/\*\*/g, '')
              .replace(/\*/g, '')
              .replace(/-/g, '')
              .replace(/\+/g, '')
              .trim();

            const prefix = 'Here are the termination clauses and payment terms:';
            if (botMessage.startsWith(prefix)) {
              botMessage = botMessage.replace(prefix, '').trim();
            }
          } catch (e) {
            console.error('Parse error, using raw response:', e);
            botMessage = typeof res.answer === 'string' ? res.answer : botMessage;
          }

          this.chatMessages.push({ sender: 'bot', message: botMessage });
          this.scrollToBottomSmooth();
        },
        error: (err) => {
          console.error('Error:', err);
          this.chatMessages.push({
            sender: 'bot',
            message: '⚠️ Error fetching response.',
          });
        },
      });
  } else {
    this.chatService.askContractMetadata(this.userInput, '2').subscribe({
      next: (res: ChatBotApiResponse) => {
        let botMessage = 'No response from bot.';
        console.log(res);

        try {
          let parsed;

          if (typeof res.answer === 'string' && res.answer.trim().startsWith('{')) {
            parsed = JSON.parse(res.answer);
          } else {
            parsed = res.answer;
          }

          if (typeof parsed === 'object') {
            botMessage = parsed.response || botMessage;
          } else {
            botMessage = parsed || botMessage;
          }

          botMessage = botMessage
            .replace(/\*\*/g, '')
            .replace(/\*/g, '')
            .replace(/-/g, '')
            .replace(/\+/g, '')
            .trim();
        } catch (e) {
          console.error('Parse error, using raw response:', e);
          botMessage = typeof res.answer === 'string' ? res.answer : botMessage;
        }

        this.chatMessages.push({ sender: 'bot', message: botMessage });
        this.scrollToBottomSmooth();
      },
      error: (err) => {
        console.error('Error:', err);
        this.chatMessages.push({
          sender: 'bot',
          message: '⚠️ Error fetching response.',
        });
      },
    });
  }

  this.userInput = '';
}


  private scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop =
        this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  private scrollToBottomSmooth(): void {
    setTimeout(() => {
      this.chatContainer.nativeElement.scrollTop =
        this.chatContainer.nativeElement.scrollHeight;
    }, 0);
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      this.appService.setFile(file);
      console.log('File uploaded:', file.name);
    }
  }
}
