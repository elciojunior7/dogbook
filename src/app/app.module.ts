import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';
import { CabecalhoComponent } from './componentes/cabecalho/cabecalho.component';
import { MenuModule } from './componentes/menu/menu.module';
import { RodapeComponent } from './componentes/rodape/rodape.component';

@NgModule({
  declarations: [AppComponent, CabecalhoComponent, RodapeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AutenticacaoModule,
    MenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
