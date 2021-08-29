import { Injectable } from '@angular/core';
import { SHA1, AES, enc } from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  encrypt(value: string, key: string): string {
    return AES.encrypt(value, key).toString();
  }

  decrypt(code: string, key: string): string {
    return AES.decrypt(code, key).toString(enc.Utf8);
  }
}
