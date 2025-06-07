import { Routes } from '@angular/router';
import { RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WizardComponent } from './components/wizard/wizard.component';


export const routes: Routes = [
    { path: '', component: MainComponent},
    {path: 'wizard/:tipo', component: WizardComponent}
];
