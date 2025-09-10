import { ChangeDetectorRef, Component, OnDestroy, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterOutlet, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import {
  NgxExtendedPdfViewerModule,
  NgxExtendedPdfViewerService,
  PDFNotificationService,
} from 'ngx-extended-pdf-viewer';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  FindState,
  FindResultMatchesCount,
  RenderedTextLayerHighlights,
  PageRenderedEvent,
} from 'ngx-extended-pdf-viewer';

import { ContractAnalysisServiceService } from '../../Services/contract-analysis.service.service';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { ContractAnalysisResponse } from '../../Models/contract-analysis-response.model';
import { HeaderComponent } from '../../shared/header/header.component';
import { CountryService } from '../../Services/Country-Service/country-service.service';
import { DomainService } from '../../Services/Domain-Service/domain-service.service';
import { ClauseService } from '../../Services/Clause-Service/clause-service.service';
import { ContractGenieComponent } from '../Contract-Genie/contract-genie/contract-genie.component';
import { ClauseDetailsComponent } from '../clause-details/clause-details.component';
import { ApplicationServiceService } from '../../Services/application-service/application-service.service';
import { ContractCacheServiceService } from '../../Services/contract-cache-service/contract-cache-service.service';
import { ContractCache } from '../../Models/contract-cache-response';

@Component({
  selector: 'app-analyze-contract',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    NgxExtendedPdfViewerModule,
    FormsModule,
    ContractGenieComponent,
    ClauseDetailsComponent,
    RouterLink,
  ],
  templateUrl: './analyze-contract.component.html',
  styleUrl: './analyze-contract.component.css',
})
export class AnalyzeContractComponent implements OnInit, OnDestroy {
  fileName: string = '';
  analysisResult: ContractAnalysisResponse[] = [];
  pdfSrc: any;
  selectedFile: File | null = null;
  selectedModel: number = 3; // Default: Mistral
  selectedCountry: number | null = null; // Default: USA
  cacheKey: string | null = null;
  errorMessage: string | null = null;
  feedbackMessages: { [key: string]: string } = {};
  pdfLoaded: boolean = false; // Track PDF loading status
  pageRenderedbool: boolean = false; // Track page rendering status
  findState?: FindState;
  currentMatchNumber?: number;
  totalMatches?: number;
  private PDFViewerApplication: any;
  feedbackSubmitted = false;
  fileUploaded: boolean = false;
  isSidebarVisible: boolean = true;
  countries: { _id: number; country_name: string }[] = [];
  domains: { _id: number; domain_name: string }[] = [];
  selectedStatus: string = ''; // bound to dropdown
  selectedDomain: number | null = null;
  selectedClauseId: number = 0;
  selectAll: boolean = false;
  description: string = '';
  isBackBtnEnable: boolean = false;
  isCachedAnalysis:boolean=false;

  constructor(
    private countryService: CountryService,
    private domainService: DomainService,
    private clauseService: ClauseService,
    private contractService: ContractAnalysisServiceService,
    private toastr: ToastrService,
    private ngxExtendedPdfViewerService: NgxExtendedPdfViewerService,
    private notificationService: PDFNotificationService,
    private appService: ApplicationServiceService,
    private contractCacheService: ContractCacheServiceService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    // Wait for PDF.js initialization
    effect(() => {
      // 🔹 Handle PDF.js init
      this.PDFViewerApplication = this.notificationService.onPDFJSInitSignal();
      if (this.PDFViewerApplication) {
        console.log('PDFViewerApplication initialized');
        this.PDFViewerApplication.eventBus?.on(
          'renderedtextlayerhighlights',
          (event: RenderedTextLayerHighlights) => {
            console.log('Applying custom highlights');
            // event.highlights.forEach((highlight) => {
            //   highlight.classList.add('highlighted-clause');
            //   highlight.classList.remove('highlight');
            // });
          }
        );
      } else {
        console.log('PDFViewerApplication not yet initialized');
      }

      this.appService.file$.subscribe((file) => {
        this.selectedFile = file;
        this.fileName = file ? file.name : '';
        if (file) {
          this.pdfSrc = URL.createObjectURL(file);
        }
      });
    });
  }

  ngOnInit(): void {
    this.loadCountries();

    this.route.queryParams.subscribe((params) => {
      const cacheKey = params['cacheKey'];
      if (cacheKey) {
        this.loadCachedAnalysis(cacheKey);
        this.downloadContract(cacheKey);
        this.isCachedAnalysis=true;
      } else {
        // 🔹 Reset UI when no cacheKey is provided
        this.analysisResult = [];
        this.description = '';
        this.fileUploaded = false;
        this.selectedFile = null;
        this.selectedCountry = null;
        this.selectedDomain = null;
        this.pdfSrc = null;
        this.cacheKey = null;
        this.selectedClauses = [];
        this.clauses = [];
        this.clauses.forEach((c) => (c.selected = false));
        this.selectAll = false;
        this.appService.file$.subscribe((file) => {
      if (file) {
        this.selectedFile = file;
        this.fileName = file.name;
        this.pdfSrc = URL.createObjectURL(file);
        this.fileUploaded = false; // Reset until analysis
      } else {
        this.selectedFile = null;
        this.fileName = '';
        this.pdfSrc = null;
        this.fileUploaded = false;
      }
    });
      }
    });
  }

  loadCachedAnalysis(cacheKey: string): void {
  this.contractCacheService.getContractById(cacheKey).subscribe({
    next: (response: any) => {
      console.log('Cached analysis response:', response);
      this.isBackBtnEnable = true;
      this.analysisResult = response.data.analysis.analysis || [];
      this.description = response.data.analysis.description || '';
      this.fileUploaded = true;
      this.selectedCountry = response.data.country_id;
      this.selectedDomain = response.data.domain_id;
      this.selectedClauses = response.data.clauses || [];
      console.log('Selected Clauses from cache:', this.selectedClauses);

      // Load domains and clauses sequentially
      if (this.selectedCountry) {
        this.domainService.getDomainsByCountry(this.selectedCountry).subscribe({
          next: (domains) => {
            //this.domains = domains;
            this.loadClauses(); // Load clauses after domains
          },
          error: (err) => {
            console.error('Error fetching domains:', err);
            this.toastr.error('Failed to load domains');
          },
        });
      }

      this.downloadContract(cacheKey);
      this.toastr.success('Loaded cached analysis', 'Success');
    },
    error: (err) => {
      console.error('Error loading cached analysis:', err);
      this.toastr.error('Failed to load cached analysis');
    },
  });
}

  downloadContract(cacheKey: string) {
    this.contractCacheService
      .downloadContract(cacheKey)
      .subscribe((response) => {
        const contentDisposition = response.headers.get('content-disposition');
        let fileName = 'unknown.pdf';

        if (contentDisposition) {
          const matches = /filename="?([^"]+)"?/.exec(contentDisposition);
          if (matches?.[1]) {
            fileName = matches[1];
          }
        }

        this.selectedFile = new File([response.body!], fileName, {
          type: 'application/pdf',
        });

        this.pdfSrc = URL.createObjectURL(this.selectedFile);
        this.appService.setFile(this.selectedFile);

        console.log('✅ Loaded file:', fileName);
      });
  }

  removeFile(): void {
    this.appService.clearFile(); // Clear file in the service
    this.selectedFile = null; // Reset selected file
    this.fileName = ''; // Reset file name
    this.pdfSrc = null; // Reset PDF source
    this.fileUploaded = false; // Reset file uploaded flag
    this.analysisResult = []; // Clear analysis results
    this.description = ''; // Clear description
    this.feedbackSubmitted = false; // Reset feedback
    const input = document.getElementById('contractUpload') as HTMLInputElement;
    if (input) input.value = '';
    this.toastr.info('File removed successfully.');
  }

  ngOnDestroy(): void {
    this.isBackBtnEnable = false;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      if (file.type !== 'application/pdf') {
        this.toastr.error('Please upload a valid PDF file.');
        input.value = ''; // Clear the input
        return;
      }
      this.selectedFile = file;
      this.fileName = file.name;
      this.pdfSrc = URL.createObjectURL(file);
      this.fileUploaded = false; // Reset until analysis is performed
      this.pdfLoaded = false;
      this.pageRenderedbool = false;
      this.appService.setFile(file); // Update service
      this.toastr.success(`File "${file.name}" selected.`);
    } else {
      this.removeFile(); // Handle case where no file is selected
    }
  }

  loadCountries(): void {
    this.countryService.getCountries().subscribe({
      next: (data: any) => (this.countries = data),
      error: (err) => {
        console.error('Error fetching countries', err);
        this.toastr.error('Failed to load countries');
      },
    });
  }

  onCountryChange(event: any): void {
    this.selectedCountry = +event.target.value;
    this.selectedDomain = null;
    this.clauses = [];
    this.selectedClauses = [];
    if (this.selectedCountry) this.loadDomains(this.selectedCountry);
  }

  loadDomains(countryId: number): void {
    this.domainService.getDomainsByCountry(countryId).subscribe({
      next: (data: any) => (this.domains = data),
      error: (err) => {
        console.error('Error fetching domains', err);
        this.toastr.error('Failed to load domains');
      },
    });
  }

  analyzeContract(): void {
    if (!this.selectedFile) {
      this.toastr.warning('No file selected.');
      return;
    }

    this.feedbackMessages = {};
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user._id;

    this.contractService
      .analyzeContract(
        this.selectedFile,
        this.selectedClauses,
        this.selectedModel,
        this.selectedCountry || 0,
        this.selectedDomain || 0,
        userId
      )
      .subscribe({
        next: (response: any) => {
          console.log(response);
          this.fileUploaded = true;
          this.analysisResult = response.analysis.analysis || [];
          this.cacheKey = response.cachekey || null;
          this.description = response.analysis.description;
          console.log(this.cacheKey);
          this.feedbackSubmitted = false;
          this.restoreSelectedClauses();
          this.toastr.success('Contract Successfully Analyzed.', 'Success!');
        },
        error: (err) => {
          this.toastr.error('Error analyzing contract: ' + err.message);
          this.analysisResult = [];
          this.cacheKey = null;
        },
      });
  }

  loadComplete(event: any): void {
    console.log('PDF Load Complete', event);
    this.pdfLoaded = true;
  }

  pageRendered(event: PageRenderedEvent): void {
    console.log(`Page ${event.pageNumber} rendered`);
    this.pageRenderedbool = true;
  }

  async highlightTextt(searchText: string): Promise<void> {
    const text = searchText.replace('...', '');
    if (!text) {
      this.toastr.warning('No text to highlight.');
      return;
    }

    if (!this.pdfLoaded || !this.PDFViewerApplication || !this.pageRendered) {
      this.toastr.error(
        'PDF or page is not fully loaded yet. Please try again.'
      );
      console.log('Cannot search yet:', {
        pdfLoaded: this.pdfLoaded,
        PDFViewerApplication: !!this.PDFViewerApplication,
        pageRendered: this.pageRendered,
      });
      return;
    }

    const normalizedSearchText = text
      .replace(/\s+/g, ' ')
      .replace(/–|—/g, '-')
      .replace(/[‘’“”]/g, "'")
      .trim();

    try {
      console.log('Executing search for:', normalizedSearchText);
      const numberOfResultsPromises = this.ngxExtendedPdfViewerService.find(
        normalizedSearchText,
        {
          highlightAll: false,
          matchCase: false,
          wholeWords: false,
          matchDiacritics: false,
          dontScrollIntoView: false,
          useSecondaryFindcontroller: false,
          findMultiple: false,
          regexp: false,
        }
      );

      if (!numberOfResultsPromises) {
        console.log('No search results returned');
        this.toastr.error('Text not found in the PDF.');
        return;
      }

      const pagesWithResult: number[] = [];
      for (
        let pageIndex = 0;
        pageIndex < numberOfResultsPromises.length;
        pageIndex++
      ) {
        const numberOfResultsPerPage = await numberOfResultsPromises[pageIndex];
        if (numberOfResultsPerPage > 0) {
          pagesWithResult.push(pageIndex + 1);
        }
      }

      if (pagesWithResult.length === 0) {
        console.log('Search text not found:', normalizedSearchText);
        this.toastr.error('Text not found in the PDF.');
        return;
      }

      console.log('Pages with results:', pagesWithResult);
    } catch (err) {
      console.error('Error in highlightTextt:', err);
      this.toastr.error('Failed to search or highlight text.');
    }
  }

  updateFindState(result: FindState): void {
    this.findState = result;
    console.log('Find state updated:', result);
  }

  updateFindMatchesCount(result: FindResultMatchesCount): void {
    this.currentMatchNumber = result.current;
    this.totalMatches = result.total;
    console.log('Find matches updated:', result);
  }

  searchExtractedText(text: string | null): void {
    if (!text) {
      this.toastr.warning('No text to search.');
      return;
    }
    this.highlightTextt(text);
  }

  onModelChange(event: any): void {
    this.selectedModel = +event.target.value;
    console.log('Model changed to:', this.selectedModel);
  }

  submitFeedback(feedback: 'like' | 'dislike'): void {
    if (!this.cacheKey) {
      this.toastr.warning('No analyzed result to provide feedback on.');
      return;
    }

    this.contractService.submitFeedback('', feedback, this.cacheKey).subscribe({
      next: () => {
        this.feedbackSubmitted = true;
        this.toastr.success(`Your feedback (${feedback}) has been submitted.`);
      },
      error: (err) => {
        this.toastr.error('Error submitting feedback: ' + err.message);
      },
    });
  }

  onDomainChange(event: any): void {
    this.selectedDomain = +event.target.value;
    this.loadClauses();
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  clauses: {
    selected: boolean;
    _id: number;
    clause_name: string;
  }[] = [];
  selectedClauses: number[] = [];

 loadClauses(): void {
  if (this.selectedCountry && this.selectedDomain) {
    this.clauseService.getClausesByCountryDomain(this.selectedCountry, this.selectedDomain).subscribe({
      next: (data: any) => {
        this.clauses = data.map((clause: any) => ({
          ...clause,
          selected: this.selectedClauses.includes(clause._id), // Set selected state based on cached clauses
        }));
        console.log('Clauses after loading:', this.clauses);
        this.selectAll = this.clauses.length > 0 && this.clauses.every((c) => c.selected);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching clauses:', err);
        this.toastr.error('Failed to load clauses');
        this.clauses = [];
        this.selectedClauses = [];
        this.cdr.detectChanges();
      },
    });
  } else {
    this.clauses = [];
    this.selectedClauses = [];
    this.cdr.detectChanges();
  }
}

  onClauseChange(clauseId: number, event: any): void {
    if (event.target.checked) {
      this.selectedClauses.push(clauseId);
    } else {
      this.selectedClauses = this.selectedClauses.filter(
        (id) => id !== clauseId
      );
    }
  }

  restoreSelectedClauses(): void {
  if (!this.selectedClauses || this.selectedClauses.length === 0) return;
  this.clauses.forEach((clause) => {
    clause.selected = this.selectedClauses.includes(clause._id);
  });
  console.log('Clauses after restore:', this.clauses);
  console.log('Selected Clauses:', this.selectedClauses);
  this.cdr.detectChanges();
}

  openClause(id: number): void {
    console.log(id);
    this.selectedClauseId = id;
  }

  filteredAnalysisResult() {
    if (!this.selectedStatus) {
      return this.analysisResult;
    }
    return this.analysisResult.filter(
      (item) => item.missing_clause === this.selectedStatus
    );
  }

  getPercentage(status: string): number {
    if (!this.analysisResult || this.analysisResult.length === 0) return 0;

    const total = this.analysisResult.length;
    const count = this.analysisResult.filter(
      (item) => item.missing_clause === status
    ).length;

    return ((count / total) * 100).toFixed(2) as unknown as number; // returns 2 decimal %
  }

  onSingleClauseChange(): void {
  this.selectedClauses = this.clauses.filter((c) => c.selected).map((c) => c._id);
  this.selectAll = this.clauses.length > 0 && this.clauses.every((c) => c.selected);
  this.cdr.detectChanges();
}

  toggleSelectAll(event: any): void {
  this.selectAll = event.target.checked;
  this.clauses.forEach((c) => (c.selected = this.selectAll));
  this.selectedClauses = this.selectAll ? this.clauses.map((c) => c._id) : [];
  this.cdr.detectChanges();
}

  isFormValid(): boolean {
    return (
      !!this.selectedCountry &&
      !!this.selectedDomain &&
      !!this.selectedModel &&
      !!this.fileName &&
      this.selectedClauses.length > 0
    );
  }
}
