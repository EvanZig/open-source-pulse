/**
 * Shared domain types exchanged between the Spring Boot backend and the
 * Next.js frontend. Concrete shapes will be filled in once the REST contract
 * is finalized.
 */

export type IssueLabel = 'good-first-issue' | 'help-wanted' | 'docs' | 'bug' | string;

export interface Repository {
  id: string;
  owner: string;
  name: string;
  fullName: string;
  language: string;
  stars: number;
  url: string;
}

export interface Issue {
  id: string;
  number: number;
  title: string;
  body?: string;
  labels: IssueLabel[];
  commentsCount: number;
  repository: Pick<Repository, 'owner' | 'name' | 'fullName'>;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface Paginated<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
}
