import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { StoreModule } from "./store/store.module";
import { RouterModule } from "@angular/router";
import { CartDetailComponent } from "./store/cart-detail.component";
import { CheckoutComponent } from "./store/checkout.component";
import { StoreComponent } from "./store/store.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    StoreModule,
    RouterModule.forRoot([
      { path: "store", component: StoreComponent },
      { path: "cart", component: CartDetailComponent },
      { path: "checkout", component: CheckoutComponent },
      { path: "**", redirectTo: "/store" },
    ]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
