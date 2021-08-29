import { NgModule } from '@angular/core';
import { StoreService } from './store/store.service';
import { EncryptionService } from './encryption/encryption.service';

@NgModule({
  providers: [StoreService, EncryptionService]
})
export class ServicesModule { }
