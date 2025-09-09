import { Component, OnInit } from '@angular/core';
import { PastAnalysisServiceService } from '../../Services/past-analysis-service/past-analysis-service.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router, RouterLink } from '@angular/router';
import { ContractCacheServiceService } from '../../Services/contract-cache-service/contract-cache-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-past-analysis',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, RouterLink],
  templateUrl: './past-analysis.component.html',
  styleUrls: ['./past-analysis.component.css'],
})
export class PastAnalysisComponent implements OnInit {
  analyses: any[] = [];
  userId: string = '';
  page: number = 1;
  itemsPerPage: number = 5;

  // ✅ New counters for summary
  totalCount: number = 0;
  successCount: number = 0;
  failureCount: number = 0;
activePanel: number | null = null;

  constructor(
    private pastAnalysisService: PastAnalysisServiceService,
    private router: Router,
    private contractcacheService: ContractCacheServiceService,
    private toasterService:ToastrService
  ) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.userId = JSON.parse(user)._id;
      this.loadUserAnalysis();
    }
  }

  loadUserAnalysis(): void {
    this.pastAnalysisService.getUserAnalysis(this.userId).subscribe({
      next: (res) => {
        this.analyses = (res.data || []).map((a: any) => ({
          ...a,
          time_diff: this.calculateTimeDiff(a.start_time, a.end_time),
        }));

        // ✅ Update summary counts
        this.totalCount = this.analyses.length;
        this.successCount = this.analyses.filter((a) => a.is_success).length;
        this.failureCount = this.analyses.filter((a) => !a.is_success).length;
      },
      error: (err) => {
        console.error('Error fetching past analysis:', err);
      },
    });
  }

  calculateTimeDiff(start: string, end: string): string {
    if (!start || !end) return '-';
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffMs = endDate.getTime() - startDate.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const minutes = Math.floor(diffSec / 60);
    const seconds = diffSec % 60;
    return `${minutes}m ${seconds}s`;
  }

  isFastAnalysis(timeDiff: string): boolean {
    const parts = timeDiff.split(' ');
    const minutes = parseInt(parts[0].replace('m', ''), 10) || 0;
    return minutes === 0;
  }

  viewAnalysis(cacheKey: string) {
    if (!cacheKey) return;

    this.router.navigate(['/analyze'], {
      queryParams: { cacheKey: cacheKey },
    });
  }

downloadContractExcel(cacheId: string) {
  if (!cacheId) {
    console.error('No cacheId provided');
    return;
  }

  this.contractcacheService.downloadReportContract(cacheId).subscribe({
    next: (res) => {
      // Log response for debugging
      console.log('Response:', {
        status: res.status,
        headers: res.headers.get('Content-Type'),
        body: res.body
      });

      // Check for JSON error response
      if (res.body?.type === 'application/json') {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const error = JSON.parse(reader.result as string);
            console.error('Server error:', error);
          } catch (e) {
            console.error('Failed to parse JSON error:', reader.result);
          }
        };
        reader.readAsText(res.body);
        return;
      }

      // Handle Excel download
      if (res.body && res.headers.get('Content-Type')?.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
        const blob = new Blob([res.body], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;

        const contentDisposition = res.headers.get('Content-Disposition');
        let filename = 'contract_report.xlsx';
        if (contentDisposition) {
          const match = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
          if (match && match[1]) filename = match[1].replace(/['"]/g, '');
        }

        a.download = filename;
        a.click();
        setTimeout(() => window.URL.revokeObjectURL(url), 100); 
        this.toasterService.success("Report Downloaded Successfully!","Success")
      } else {
        console.error('Unexpected Content-Type:', res.headers.get('Content-Type'));
        alert('Failed to download Excel: Invalid response format.');
      }
    },
    error: (err) => {
      console.error('Error downloading Excel:', err);
      alert(`Failed to download Excel: ${err.message || 'Unknown error'}`);
    }
  });
}

 setActive(panel: number) {
    this.activePanel = this.activePanel === panel ? null : panel;
  }


}
