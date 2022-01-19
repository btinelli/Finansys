import { element } from 'protractor';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { Entry } from './entry.model';
import { catchError, map, flatMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  private apiPath: string = 'api/entries'
  constructor(private http: HttpClient) { }

  getAll(): Observable<Entry[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntryes)
    )
  }

  getById(id: number): Observable<Entry> {
    const url = `${this.apiPath}/${id}`
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntry)
    )
  }
  create(entrie: Entry): Observable<Entry> {
    return this.http.post(this.apiPath, entrie).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntry)
    )
  }
  update(entrie: Entry): Observable<Entry> {
    return this.http.put(`${this.apiPath}/${entrie.id}`, entrie).pipe(
      catchError(this.handleError),
      map(() => entrie)
    )
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiPath}/${id}`).pipe(
      catchError(this.handleError),
      map(() => null)
    )
  }

  private jsonDataToEntryes(jsonData: any[]): Entry[] {
    const entries: Entry[] = []
    jsonData.forEach(element => {
      const entry = Object.assign(new Entry(), element)
      entries.push(entry)
    })
    return entries
  }

  private jsonDataToEntry(jsonData: any): Entry {
    return Object.assign(new Entry(), jsonData)
  }

  private handleError(error: any): Observable<any> {
    console.log('Erro na requisição => ', error)
    return throwError(error)
  }
}
