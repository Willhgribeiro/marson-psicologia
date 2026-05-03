import { Directive, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "./ngx-turnstile.component";
export class NgxTurnstileValueAccessorDirective {
    turnstileComp;
    onChange;
    onTouched;
    resolved = false;
    constructor(turnstileComp) {
        this.turnstileComp = turnstileComp;
    }
    ngOnInit() {
        this.turnstileComp.resolved.subscribe((token) => {
            this.resolved = !!token;
            if (this.onChange) {
                this.onChange(token);
            }
            if (this.onTouched) {
                this.onTouched();
            }
        });
    }
    // Prevent form control from setting token value
    writeValue(value) {
        // reset turnstile component if form control sets the value after already receiving a valid token
        if (this.resolved) {
            this.resolved = false;
            this.turnstileComp.reset();
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.8", ngImport: i0, type: NgxTurnstileValueAccessorDirective, deps: [{ token: i1.NgxTurnstileComponent }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.0.8", type: NgxTurnstileValueAccessorDirective, selector: "ngx-turnstile[formControl], ngx-turnstile[formControlName], ngx-turnstile[ngModel]", providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => NgxTurnstileValueAccessorDirective),
                multi: true,
            },
        ], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.8", ngImport: i0, type: NgxTurnstileValueAccessorDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ngx-turnstile[formControl], ngx-turnstile[formControlName], ngx-turnstile[ngModel]',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NgxTurnstileValueAccessorDirective),
                            multi: true,
                        },
                    ],
                }]
        }], ctorParameters: () => [{ type: i1.NgxTurnstileComponent }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXR1cm5zdGlsZS12YWx1ZS1hY2Nlc3Nvci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtdHVybnN0aWxlL3NyYy9saWIvbmd4LXR1cm5zdGlsZS12YWx1ZS1hY2Nlc3Nvci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFjekUsTUFBTSxPQUFPLGtDQUFrQztJQU96QjtJQUpaLFFBQVEsQ0FBMkI7SUFDbkMsU0FBUyxDQUFjO0lBQ3ZCLFFBQVEsR0FBWSxLQUFLLENBQUM7SUFFbEMsWUFBb0IsYUFBb0M7UUFBcEMsa0JBQWEsR0FBYixhQUFhLENBQXVCO0lBQUcsQ0FBQztJQUU1RCxRQUFRO1FBQ04sSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBYSxFQUFFLEVBQUU7WUFDdEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBRXhCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN0QjtZQUVELElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2FBQ2xCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsZ0RBQWdEO0lBQ2hELFVBQVUsQ0FBQyxLQUFVO1FBQ25CLGlHQUFpRztRQUNqRyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDdEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUM1QjtJQUNILENBQUM7SUFDRCxnQkFBZ0IsQ0FBQyxFQUFPO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFDRCxpQkFBaUIsQ0FBQyxFQUFPO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLENBQUM7dUdBcENVLGtDQUFrQzsyRkFBbEMsa0NBQWtDLDZHQVJsQztZQUNUO2dCQUNFLE9BQU8sRUFBRSxpQkFBaUI7Z0JBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsa0NBQWtDLENBQUM7Z0JBQ2pFLEtBQUssRUFBRSxJQUFJO2FBQ1o7U0FDRjs7MkZBRVUsa0NBQWtDO2tCQVg5QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFDTixvRkFBb0Y7b0JBQ3RGLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxtQ0FBbUMsQ0FBQzs0QkFDakUsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0Y7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIGZvcndhcmRSZWYsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTmd4VHVybnN0aWxlQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtdHVybnN0aWxlLmNvbXBvbmVudCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjpcbiAgICAnbmd4LXR1cm5zdGlsZVtmb3JtQ29udHJvbF0sIG5neC10dXJuc3RpbGVbZm9ybUNvbnRyb2xOYW1lXSwgbmd4LXR1cm5zdGlsZVtuZ01vZGVsXScsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmd4VHVybnN0aWxlVmFsdWVBY2Nlc3NvckRpcmVjdGl2ZSksXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hUdXJuc3RpbGVWYWx1ZUFjY2Vzc29yRGlyZWN0aXZlXG4gIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdFxue1xuICBwcml2YXRlIG9uQ2hhbmdlITogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHByaXZhdGUgb25Ub3VjaGVkITogKCkgPT4gdm9pZDtcbiAgcHJpdmF0ZSByZXNvbHZlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHVybnN0aWxlQ29tcDogTmd4VHVybnN0aWxlQ29tcG9uZW50KSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMudHVybnN0aWxlQ29tcC5yZXNvbHZlZC5zdWJzY3JpYmUoKHRva2VuOiBzdHJpbmcpID0+IHtcbiAgICAgIHRoaXMucmVzb2x2ZWQgPSAhIXRva2VuO1xuXG4gICAgICBpZiAodGhpcy5vbkNoYW5nZSkge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKHRva2VuKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMub25Ub3VjaGVkKSB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBQcmV2ZW50IGZvcm0gY29udHJvbCBmcm9tIHNldHRpbmcgdG9rZW4gdmFsdWVcbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgLy8gcmVzZXQgdHVybnN0aWxlIGNvbXBvbmVudCBpZiBmb3JtIGNvbnRyb2wgc2V0cyB0aGUgdmFsdWUgYWZ0ZXIgYWxyZWFkeSByZWNlaXZpbmcgYSB2YWxpZCB0b2tlblxuICAgIGlmICh0aGlzLnJlc29sdmVkKSB7XG4gICAgICB0aGlzLnJlc29sdmVkID0gZmFsc2U7XG4gICAgICB0aGlzLnR1cm5zdGlsZUNvbXAucmVzZXQoKTtcbiAgICB9XG4gIH1cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG59XG4iXX0=