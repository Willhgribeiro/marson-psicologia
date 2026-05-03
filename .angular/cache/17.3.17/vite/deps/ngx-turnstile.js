import {
  NG_VALUE_ACCESSOR
} from "./chunk-UG5VLLE6.js";
import {
  DOCUMENT
} from "./chunk-GJVTY52L.js";
import {
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Injectable,
  Input,
  NgModule,
  NgZone,
  Output,
  afterNextRender,
  forwardRef,
  setClassMetadata,
  ɵɵProvidersFeature,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject
} from "./chunk-DVD3YXHX.js";

// node_modules/ngx-turnstile/fesm2022/ngx-turnstile.mjs
var NgxTurnstileService = class _NgxTurnstileService {
  constructor() {
  }
  static ɵfac = function NgxTurnstileService_Factory(t) {
    return new (t || _NgxTurnstileService)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _NgxTurnstileService,
    factory: _NgxTurnstileService.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxTurnstileService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var SCRIPT_ID = "ngx-turnstile";
var CALLBACK_NAME = "onloadTurnstileCallback";
var NgxTurnstileComponent = class _NgxTurnstileComponent {
  elementRef;
  zone;
  document;
  siteKey;
  action;
  cData;
  theme = "auto";
  language = "auto";
  version = "0";
  tabIndex;
  appearance = "always";
  retry = "auto";
  size = "normal";
  resolved = new EventEmitter();
  errored = new EventEmitter();
  widgetId;
  constructor(elementRef, zone, document) {
    this.elementRef = elementRef;
    this.zone = zone;
    this.document = document;
    afterNextRender(() => this.createWidget());
  }
  _getCloudflareTurnstileUrl() {
    if (this.version === "0") {
      return "https://challenges.cloudflare.com/turnstile/v0/api.js";
    }
    throw "Version not defined in ngx-turnstile component.";
  }
  createWidget() {
    let turnstileOptions = {
      sitekey: this.siteKey,
      theme: this.theme,
      language: this.language,
      tabindex: this.tabIndex,
      action: this.action,
      cData: this.cData,
      appearance: this.appearance,
      retry: this.retry,
      size: this.size,
      callback: (token) => {
        this.zone.run(() => this.resolved.emit(token));
      },
      "error-callback": (errorCode) => {
        this.zone.run(() => this.errored.emit(errorCode));
        return false;
      },
      "expired-callback": () => {
        this.zone.run(() => this.reset());
      }
    };
    window[CALLBACK_NAME] = () => {
      if (!this.elementRef?.nativeElement) {
        return;
      }
      this.widgetId = window.turnstile.render(this.elementRef.nativeElement, turnstileOptions);
    };
    if (this.scriptLoaded()) {
      window[CALLBACK_NAME]();
      return;
    }
    const script = this.document.createElement("script");
    script.src = `${this._getCloudflareTurnstileUrl()}?render=explicit&onload=${CALLBACK_NAME}`;
    script.id = SCRIPT_ID;
    script.async = true;
    script.defer = true;
    this.document.head.appendChild(script);
  }
  reset() {
    if (this.widgetId) {
      this.resolved.emit(null);
      window.turnstile.reset(this.widgetId);
    }
  }
  ngOnDestroy() {
    if (this.widgetId) {
      window.turnstile.remove(this.widgetId);
    }
  }
  scriptLoaded() {
    return !!this.document.getElementById(SCRIPT_ID);
  }
  static ɵfac = function NgxTurnstileComponent_Factory(t) {
    return new (t || _NgxTurnstileComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(DOCUMENT));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _NgxTurnstileComponent,
    selectors: [["ngx-turnstile"]],
    inputs: {
      siteKey: "siteKey",
      action: "action",
      cData: "cData",
      theme: "theme",
      language: "language",
      version: "version",
      tabIndex: "tabIndex",
      appearance: "appearance",
      retry: "retry",
      size: "size"
    },
    outputs: {
      resolved: "resolved",
      errored: "errored"
    },
    exportAs: ["ngx-turnstile"],
    decls: 0,
    vars: 0,
    template: function NgxTurnstileComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxTurnstileComponent, [{
    type: Component,
    args: [{
      selector: "ngx-turnstile",
      template: ``,
      exportAs: "ngx-turnstile"
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: NgZone
  }, {
    type: Document,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }], {
    siteKey: [{
      type: Input
    }],
    action: [{
      type: Input
    }],
    cData: [{
      type: Input
    }],
    theme: [{
      type: Input
    }],
    language: [{
      type: Input
    }],
    version: [{
      type: Input
    }],
    tabIndex: [{
      type: Input
    }],
    appearance: [{
      type: Input
    }],
    retry: [{
      type: Input
    }],
    size: [{
      type: Input
    }],
    resolved: [{
      type: Output
    }],
    errored: [{
      type: Output
    }]
  });
})();
var NgxTurnstileModule = class _NgxTurnstileModule {
  static ɵfac = function NgxTurnstileModule_Factory(t) {
    return new (t || _NgxTurnstileModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _NgxTurnstileModule,
    declarations: [NgxTurnstileComponent],
    exports: [NgxTurnstileComponent]
  });
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxTurnstileModule, [{
    type: NgModule,
    args: [{
      declarations: [NgxTurnstileComponent],
      imports: [],
      exports: [NgxTurnstileComponent]
    }]
  }], null, null);
})();
var NgxTurnstileValueAccessorDirective = class _NgxTurnstileValueAccessorDirective {
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
  static ɵfac = function NgxTurnstileValueAccessorDirective_Factory(t) {
    return new (t || _NgxTurnstileValueAccessorDirective)(ɵɵdirectiveInject(NgxTurnstileComponent));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _NgxTurnstileValueAccessorDirective,
    selectors: [["ngx-turnstile", "formControl", ""], ["ngx-turnstile", "formControlName", ""], ["ngx-turnstile", "ngModel", ""]],
    features: [ɵɵProvidersFeature([{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _NgxTurnstileValueAccessorDirective),
      multi: true
    }])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxTurnstileValueAccessorDirective, [{
    type: Directive,
    args: [{
      selector: "ngx-turnstile[formControl], ngx-turnstile[formControlName], ngx-turnstile[ngModel]",
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => NgxTurnstileValueAccessorDirective),
        multi: true
      }]
    }]
  }], () => [{
    type: NgxTurnstileComponent
  }], null);
})();
var NgxTurnstileFormsModule = class _NgxTurnstileFormsModule {
  static ɵfac = function NgxTurnstileFormsModule_Factory(t) {
    return new (t || _NgxTurnstileFormsModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _NgxTurnstileFormsModule,
    declarations: [NgxTurnstileValueAccessorDirective],
    imports: [NgxTurnstileModule],
    exports: [NgxTurnstileValueAccessorDirective]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [NgxTurnstileModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxTurnstileFormsModule, [{
    type: NgModule,
    args: [{
      declarations: [NgxTurnstileValueAccessorDirective],
      imports: [NgxTurnstileModule],
      exports: [NgxTurnstileValueAccessorDirective]
    }]
  }], null, null);
})();
export {
  NgxTurnstileComponent,
  NgxTurnstileFormsModule,
  NgxTurnstileModule,
  NgxTurnstileService,
  NgxTurnstileValueAccessorDirective
};
//# sourceMappingURL=ngx-turnstile.js.map
