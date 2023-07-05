import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';

export interface IQuestion {
  id: number;
  questionText: string;
  type: 'radio' | 'checkbox';
  answers: { id: number; text: string }[];
}

export interface ITest {
  id: number;
  ownerId: number;
  title: string;
  questions: IQuestion[];
  correctIds: number[];
  visibility: 'public' | 'private';
}

@Injectable({
  providedIn: 'root',
})
export class TestsService {
  tests$: Observable<ITest[]> = new BehaviorSubject<ITest[]>([]);

  constructor(private http: HttpClient) {
    this.tests$ = this.loadTests();
  }

  loadTests(): Observable<ITest[]> {
    // return this.http.get<ITest[]>('https://jsonplaceholder.typicode.com/users');
    return of(tests);
  }

  updateTest(id: number | undefined, user: ITest): void {
    this.tests$ = this.tests$.pipe(
      map((tests: ITest[]) => {
        const index = tests.findIndex((u) => u.id === id);
        if (index !== -1) {
          tests[index] = user;
        }
        return tests;
      })
    );
  }
}

const tests: ITest[] = [
  {
    id: 1,
    ownerId: 123,
    title: 'Test 1',
    questions: [
      {
        id: 1,
        questionText: 'Q1',
        type: 'radio',
        answers: [
          { id: 1, text: 'Option A' },
          { id: 2, text: 'Option B' },
          { id: 3, text: 'Option C' },
        ],
      },
      {
        id: 2,
        questionText: 'Q2',
        type: 'checkbox',
        answers: [
          { id: 1, text: 'Option A' },
          { id: 2, text: 'Option B' },
          { id: 3, text: 'Option C' },
        ],
      },
    ],
    correctIds: [1, 2],
    visibility: 'public',
  },
  {
    id: 2,
    ownerId: 456,
    title: 'Test 2',
    questions: [
      {
        id: 1,
        questionText: 'Q1',
        type: 'radio',
        answers: [
          { id: 1, text: 'Option X' },
          { id: 2, text: 'Option Y' },
          { id: 3, text: 'Option Z' },
        ],
      },
    ],
    correctIds: [3],
    visibility: 'private',
  },
];