import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { GitHubIssue } from '../models/github.interface';

@Injectable({
  providedIn: 'root'
})
export class GitHubService {
  private readonly baseUrl = environment.githubApi.baseUrl;
  private readonly owner = 'avatar-crop';
  private readonly repo = 'avatar-crop';

  constructor(private http: HttpClient) { }

  /**
   * Fetch open issues with assignees from the avatar-crop repository
   * @returns Observable<GitHubIssue[]>
   */
  getOpenIssuesWithAssignees(): Observable<GitHubIssue[]> {
    const url = `${this.baseUrl}/repos/${this.owner}/${this.repo}/issues`;
    const params = {
      state: 'open',
      sort: 'created',
      direction: 'desc'
    };

    return this.http.get<GitHubIssue[]>(url, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Handle HTTP errors
   * @param error HttpErrorResponse
   * @returns Observable<never>
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred while fetching GitHub issues';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 403:
          errorMessage = 'GitHub API rate limit exceeded. Please try again later.';
          break;
        case 404:
          errorMessage = 'Repository not found or does not exist.';
          break;
        case 0:
          errorMessage = 'Network error. Please check your internet connection.';
          break;
        default:
          errorMessage = `GitHub API returned code ${error.status}: ${error.message}`;
      }
    }

    console.error('GitHub Service Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}