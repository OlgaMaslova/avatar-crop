import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GitHubService } from '../../services/github.service';
import { GitHubIssue } from '../../models/github.interface';

@Component({
  selector: 'app-github-issues',
  templateUrl: './github-issues.component.html',
  styleUrls: ['./github-issues.component.scss']
})
export class GithubIssuesComponent implements OnInit, OnDestroy {
  issues: GitHubIssue[] = [];
  loading = false;
  error: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(private githubService: GitHubService) { }

  ngOnInit(): void {
    this.loadIssues();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Load GitHub issues from the service
   */
  loadIssues(): void {
    this.loading = true;
    this.error = null;

    this.githubService.getOpenIssuesWithAssignees()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (issues: GitHubIssue[]) => {
          this.issues = issues.filter(issue => issue.assignees && issue.assignees.length > 0);
          this.loading = false;
        },
        error: (error: Error) => {
          this.error = error.message;
          this.loading = false;
          console.error('Error loading GitHub issues:', error);
        }
      });
  }

  /**
   * Retry loading issues
   */
  retry(): void {
    this.loadIssues();
  }

  /**
   * Format the creation date for display
   * @param dateString ISO date string
   * @returns Formatted date string
   */
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  /**
   * Get the background color for a label
   * @param color Hex color string without #
   * @returns CSS background color
   */
  getLabelStyle(color: string): { [key: string]: string } {
    return {
      'background-color': `#${color}`,
      'color': this.getContrastColor(color)
    };
  }

  /**
   * Calculate contrast color for label text
   * @param hexColor Hex color string without #
   * @returns 'white' or 'black' for optimal contrast
   */
  private getContrastColor(hexColor: string): string {
    // Convert hex to RGB
    const r = parseInt(hexColor.substr(0, 2), 16);
    const g = parseInt(hexColor.substr(2, 2), 16);
    const b = parseInt(hexColor.substr(4, 2), 16);

    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance > 0.5 ? 'black' : 'white';
  }
}