import { PaginationResult } from './../_models/pagination';
import { User } from 'src/app/_models/user';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from '../_models/Message';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

getUsers(page?: any , itemsPerPage?: any, userParams?: any, likesParam?: any): Observable< PaginationResult< User[] >> {
  const paginationResult: PaginationResult<User[]> = new PaginationResult<User[]>();
  let params = new HttpParams();

  if ( page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

  if ( userParams != null) {
    params = params.append('minAge', userParams.minAge);
    params = params.append('maxAge', userParams.maxAge);
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);
  }

  if ( likesParam === 'Likers') {
    params = params.append('likers', 'true');
  }

  if(likesParam === 'Likees') {
    params = params.append('likees', 'true');
  }

  return this.http.get<User[]>(this.baseUrl + 'users', { observe: 'response', params})
  .pipe(
    map(response => {
      paginationResult.result = response.body;
      if (response.headers.get('Pagination') != null) {
         paginationResult.pagination = JSON.parse(response.headers.get('Pagination'));
      }
      return paginationResult;
    })
  );
}

getUser(id): Observable<User> {
  return this.http.get<User>(this.baseUrl + 'users/' + id );
}

updateUser(id: number, user: User) {
  return this.http.put(this.baseUrl + 'users/' + id, user);
}

setMainPhoto(userId: number, id: number) {
  return this.http.post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setmain', {});
}

deletePhoto(userId: number, id: number) {
  return this.http.delete(this.baseUrl + 'users/' + userId + '/photos/' + id);
}
sendLike(id: number, recipientId: number){
  return this.http.post(this.baseUrl + 'users/' + id + '/like/' + recipientId, {});
}

getMessages(id: number, page?, itemsPerPage?, messageContainer?) {
  const paginationResult: PaginationResult<Message[]> = new PaginationResult<Message[]>();

  let params = new HttpParams();

  params = params.append('MessageContainer', messageContainer);

  if ( page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

  return this.http.get<Message[]>(this.baseUrl + 'users/' + id + '/messages',{observe: 'response',params})
  .pipe(
    map(response => {
      paginationResult.result = response.body;
      if (response.headers.get('Pagination') !== null) {
        paginationResult.pagination = JSON.parse(response.headers.get('Pagination'));
      }

      return paginationResult;
    })
  );

}

getMessageThread(id: number, recipientId: number) {
  return this.http.get<Message[]>(this.baseUrl + 'users/' + id + 'messages/thread' + recipientId);
}

sendMessage(id: number, message: Message) {
  return this.http.post(this.baseUrl + 'users/' + id + '/messages', message);
}

deleteMessage(id: number, userId: number) {
  return this.http.post(this.baseUrl + 'users/' + userId + '/messages/' + id, {});
}

markAsRead(userId: number, messageId: number) {
  this.http.post(this.baseUrl + 'users/' + userId
  + '/messages/' + '/read', {}).subscribe();
}
}
