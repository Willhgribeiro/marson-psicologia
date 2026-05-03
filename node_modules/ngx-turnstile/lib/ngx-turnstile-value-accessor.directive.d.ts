import { OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NgxTurnstileComponent } from './ngx-turnstile.component';
import * as i0 from "@angular/core";
export declare class NgxTurnstileValueAccessorDirective implements ControlValueAccessor, OnInit {
    private turnstileComp;
    private onChange;
    private onTouched;
    private resolved;
    constructor(turnstileComp: NgxTurnstileComponent);
    ngOnInit(): void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxTurnstileValueAccessorDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgxTurnstileValueAccessorDirective, "ngx-turnstile[formControl], ngx-turnstile[formControlName], ngx-turnstile[ngModel]", never, {}, {}, never, never, false, never>;
}
