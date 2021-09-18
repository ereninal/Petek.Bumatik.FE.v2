import { Component, OnInit } from '@angular/core';
import { CoreTranslationService } from '@core/services/translation.service';
import { User } from 'app/auth/models';
import { AuthenticationService } from 'app/auth/service';

import { locale as english } from 'app/main/dashboard/i18n/en';
import { locale as french } from 'app/main/dashboard/i18n/fr';
import { locale as german } from 'app/main/dashboard/i18n/de';
import { locale as portuguese } from 'app/main/dashboard/i18n/pt';
import { locale as turkish } from 'app/main/dashboard/i18n/tr';

@Component({
  selector: 'app-total-price',
  templateUrl: './total-price.component.html',
  styleUrls: ['./total-price.component.scss']
})

  /**
   * Constructor

   * @param {CoreTranslationService} coreTranslationService
   */
export class TotalPriceComponent implements OnInit {
  public currentUser: string;

  constructor(private authenticationService: AuthenticationService,private coreTranslationService: CoreTranslationService) { 
    this.currentUser = localStorage.getItem('currentUsername');
    this.coreTranslationService.translate(english, french, german, portuguese,turkish);
  }

  ngOnInit(): void {
  }

}
