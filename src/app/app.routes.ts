import { Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { AppComponent } from './app.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { HistoryComponent } from './history/history.component';

export const routes: Routes = [
    // {path: '' , redirectTo: "home", pathMatch: "full" },
    // {path: 'home' , component: WelcomePageComponent},
    { path: '', pathMatch: "full", component: WelcomePageComponent },
    { path: 'login', pathMatch: "full", component: LoginComponent },
    { path: 'register', pathMatch: "full", component: RegisterComponent },
    { path: 'favorites', pathMatch: "full", component: FavoritesComponent },
    { path: 'history', pathMatch: "full", component: HistoryComponent },
    { path: '**', component: NotfoundComponent },
];
