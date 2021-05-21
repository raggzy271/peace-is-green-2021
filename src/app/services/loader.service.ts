import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(public loadingController: LoadingController) { }

  loading = null;

  async showLoader(message: string, spinner: any, cssClass: string) {
    // Dismiss previously created loading
    if (this.loading != null) {
      this.loading.dismiss();
    }

    this.loading = await this.loadingController.create({
      message: message,
      spinner: spinner,
      cssClass: cssClass
    })
    
    return await this.loading.present();
  }

  async hideLoader() {
    if (this.loading != null) {
      await this.loadingController.dismiss();
      this.loading = null;
    }
  }
}