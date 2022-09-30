import {Injectable, OnInit} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class UniqueIdService{
  private id: number = 0;
  private readonly idKey = 'idKey';

  constructor() {
    this.id = Number(localStorage.getItem(this.idKey) ?? 0);
  }

  generateId(){
    localStorage.setItem(this.idKey,JSON.stringify(++this.id))
    return this.id;
  }
}
