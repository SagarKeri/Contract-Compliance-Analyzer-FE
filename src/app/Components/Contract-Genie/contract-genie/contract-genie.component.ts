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

              // Detect JSON string
              if (typeof res.answer === 'string') {
                const trimmed = res.answer.trim();
                if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
                  parsed = JSON.parse(trimmed);
                } else {
                  parsed = res.answer;
                }
              } else {
                parsed = res.answer;
              }

              if (Array.isArray(parsed)) {
                // Format array of clauses
                botMessage = parsed
                  .map(
                    (item: any, index: number) =>
                      `📌 Clause ${index + 1}: ${
                        item.clause_name || 'Unknown'
                      }\n${item.clause_summary || ''}`
                  )
                  .join('\n\n');
              } else if (typeof parsed === 'object') {
                botMessage = parsed.response || JSON.stringify(parsed, null, 2);
              } else {
                botMessage = parsed || botMessage;
              }

              // Clean up unwanted markdown symbols
              botMessage = botMessage
                .replace(/\*\*/g, '')
                .replace(/\*/g, '')
                .replace(/-/g, '')
                .replace(/\+/g, '')
                .trim();
            } catch (e) {
              console.error('Parse error, using raw response:', e);
              botMessage =
                typeof res.answer === 'string' ? res.answer : botMessage;
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

            // Detect JSON string
            if (typeof res.answer === 'string') {
              const trimmed = res.answer.trim();
              if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
                parsed = JSON.parse(trimmed);
              } else {
                parsed = res.answer;
              }
            } else {
              parsed = res.answer;
            }

            if (Array.isArray(parsed)) {
              // Format array of clauses
              botMessage = parsed
                .map(
                  (item: any, index: number) =>
                    `📌 Clause ${index + 1}: ${
                      item.clause_name || 'Unknown'
                    }\n${item.clause_summary || ''}`
                )
                .join('\n\n');
            } else if (typeof parsed === 'object') {
              botMessage = parsed.response || JSON.stringify(parsed, null, 2);
            } else {
              botMessage = parsed || botMessage;
            }

            // Clean up unwanted markdown symbols
            botMessage = botMessage
              .replace(/\*\*/g, '')
              .replace(/\*/g, '')
              .replace(/-/g, '')
              .replace(/\+/g, '')
              .trim();
          } catch (e) {
            console.error('Parse error, using raw response:', e);
            botMessage =
              typeof res.answer === 'string' ? res.answer : botMessage;
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

  removeSelectedFile()
  {
    this.appService.clearFile();
  }
}
