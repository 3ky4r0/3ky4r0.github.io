(function () {
  'use strict';

  /******************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */
  /* global Reflect, Promise, SuppressedError, Symbol, Iterator */


  function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  }

  typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
  };

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  const t$3=t=>(e,o)=>{ void 0!==o?o.addInitializer(()=>{customElements.define(t,e);}):customElements.define(t,e);};

  /**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  const t$2=globalThis,e$6=t$2.ShadowRoot&&(void 0===t$2.ShadyCSS||t$2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$4=new WeakMap;let n$3 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$6&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$4.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$4.set(s,t));}return t}toString(){return this.cssText}};const r$4=t=>new n$3("string"==typeof t?t:t+"",void 0,s$2),i$4=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n$3(o,t,s$2)},S$1=(s,o)=>{if(e$6)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t$2.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$6?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$4(e)})(t):t;

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */const{is:i$3,defineProperty:e$5,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$3,getOwnPropertySymbols:o$3,getPrototypeOf:n$2}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$3(t,s),b$1={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b$1){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$5(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$2(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$3(t),...o$3(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(t=>t.hostConnected?.());}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.());}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i,e=false,h){if(void 0!==t){const r=this.constructor;if(false===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.2");

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */const o$2={attribute:true,type:String,converter:u$1,reflect:false,hasChanged:f$1},r$2=(t=o$2,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===n&&((t=Object.create(t)).wrapped=true),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t,true,r);},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t,true,r);}}throw Error("Unsupported decorator location: "+n)};function n$1(t){return (e,o)=>"object"==typeof o?r$2(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */function r$1(r){return n$1({...r,state:true,attribute:false})}

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  const e$4=(e,t,c)=>(c.configurable=true,c.enumerable=true,Reflect.decorate&&"object"!=typeof t&&Object.defineProperty(e,t,c),c);

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */function e$3(e,r){return (n,s,i)=>{const o=t=>t.renderRoot?.querySelector(e)??null;return e$4(n,s,{get(){return o(this)}})}}

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  const t$1=globalThis,i$2=t=>t,s$1=t$1.trustedTypes,e$2=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o$1=`lit$${Math.random().toFixed(9).slice(2)}$`,n="?"+o$1,r=`<${n}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l.createTreeWalker(l,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e$2?e$2.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p):void 0!==u[3]&&(c=p):c===p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p:'"'===u[3]?$:g):c===$||c===g?c=p:c===_||c===m?c=v:(c=p,n=void 0);const x=c===p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o$1+x):s+o$1+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o$1),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t);}else t.startsWith(o$1)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o$1),i=t.length-1;if(i>0){r.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c());}}}else if(8===r.nodeType)if(r.data===n)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$1,t+1));)d.push({type:7,index:l}),t+=o$1.length-1;}l++;}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,true);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=l,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$2(t).nextSibling;i$2(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class I extends H{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t);}}const B=t$1.litHtmlPolyfillSupport;B?.(S,k),(t$1.litHtmlVersions??=[]).push("3.3.2");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{});}return h._$AI(t),h};

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */const s=globalThis;let i$1 = class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return E}};i$1._$litElement$=true,i$1["finalized"]=true,s.litElementHydrateSupport?.({LitElement:i$1});const o=s.litElementPolyfillSupport;o?.({LitElement:i$1});(s.litElementVersions??=[]).push("4.2.2");

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  const t={ATTRIBUTE:1},e$1=t=>(...e)=>({_$litDirective$:t,values:e});class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}

  /**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */const e=e$1(class extends i{constructor(t$1){if(super(t$1),t$1.type!==t.ATTRIBUTE||"class"!==t$1.name||t$1.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return " "+Object.keys(t).filter(s=>t[s]).join(" ")+" "}update(s,[i]){if(void 0===this.st){this.st=new Set,void 0!==s.strings&&(this.nt=new Set(s.strings.join(" ").split(/\s/).filter(t=>""!==t)));for(const t in i)i[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(i)}const r=s.element.classList;for(const t of this.st)t in i||(r.remove(t),this.st.delete(t));for(const t in i){const s=!!i[t];s===this.st.has(t)||this.nt?.has(t)||(s?(r.add(t),this.st.add(t)):(r.remove(t),this.st.delete(t)));}return E}});

  /**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   */
  /**
   * A key to retrieve an `Attachable` element's `AttachableController` from a
   * global `MutationObserver`.
   */
  const ATTACHABLE_CONTROLLER = Symbol('attachableController');
  let FOR_ATTRIBUTE_OBSERVER;
  {
      /**
       * A global `MutationObserver` that reacts to `for` attribute changes on
       * `Attachable` elements. If the `for` attribute changes, the controller will
       * re-attach to the new referenced element.
       */
      FOR_ATTRIBUTE_OBSERVER = new MutationObserver((records) => {
          for (const record of records) {
              // When a control's `for` attribute changes, inform its
              // `AttachableController` to update to a new control.
              record.target[ATTACHABLE_CONTROLLER]?.hostConnected();
          }
      });
  }
  /**
   * A controller that provides an implementation for `Attachable` elements.
   *
   * @example
   * ```ts
   * class MyElement extends LitElement implements Attachable {
   *   get control() { return this.attachableController.control; }
   *
   *   private readonly attachableController = new AttachableController(
   *     this,
   *     (previousControl, newControl) => {
   *       previousControl?.removeEventListener('click', this.handleClick);
   *       newControl?.addEventListener('click', this.handleClick);
   *     }
   *   );
   *
   *   // Implement remaining `Attachable` properties/methods that call the
   *   // controller's properties/methods.
   * }
   * ```
   */
  class AttachableController {
      get htmlFor() {
          return this.host.getAttribute('for');
      }
      set htmlFor(htmlFor) {
          if (htmlFor === null) {
              this.host.removeAttribute('for');
          }
          else {
              this.host.setAttribute('for', htmlFor);
          }
      }
      get control() {
          if (this.host.hasAttribute('for')) {
              if (!this.htmlFor || !this.host.isConnected) {
                  return null;
              }
              return this.host.getRootNode().querySelector(`#${this.htmlFor}`);
          }
          return this.currentControl || this.host.parentElement;
      }
      set control(control) {
          if (control) {
              this.attach(control);
          }
          else {
              this.detach();
          }
      }
      /**
       * Creates a new controller for an `Attachable` element.
       *
       * @param host The `Attachable` element.
       * @param onControlChange A callback with two parameters for the previous and
       *     next control. An `Attachable` element may perform setup or teardown
       *     logic whenever the control changes.
       */
      constructor(host, onControlChange) {
          this.host = host;
          this.onControlChange = onControlChange;
          this.currentControl = null;
          host.addController(this);
          host[ATTACHABLE_CONTROLLER] = this;
          FOR_ATTRIBUTE_OBSERVER?.observe(host, { attributeFilter: ['for'] });
      }
      attach(control) {
          if (control === this.currentControl) {
              return;
          }
          this.setCurrentControl(control);
          // When imperatively attaching, remove the `for` attribute so
          // that the attached control is used instead of a referenced one.
          this.host.removeAttribute('for');
      }
      detach() {
          this.setCurrentControl(null);
          // When imperatively detaching, add an empty `for=""` attribute. This will
          // ensure the control is `null` rather than the `parentElement`.
          this.host.setAttribute('for', '');
      }
      /** @private */
      hostConnected() {
          this.setCurrentControl(this.control);
      }
      /** @private */
      hostDisconnected() {
          this.setCurrentControl(null);
      }
      setCurrentControl(control) {
          this.onControlChange(this.currentControl, control);
          this.currentControl = control;
      }
  }

  /**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   */
  /**
   * Easing functions to use for web animations.
   *
   * **NOTE:** `EASING.EMPHASIZED` is approximated with unknown accuracy.
   *
   * TODO(b/241113345): replace with tokens
   */
  const EASING = {
      STANDARD: 'cubic-bezier(0.2, 0, 0, 1)'};

  /**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   */
  const PRESS_GROW_MS = 450;
  const MINIMUM_PRESS_MS = 225;
  const INITIAL_ORIGIN_SCALE = 0.2;
  const PADDING = 10;
  const SOFT_EDGE_MINIMUM_SIZE = 75;
  const SOFT_EDGE_CONTAINER_RATIO = 0.35;
  const PRESS_PSEUDO = '::after';
  const ANIMATION_FILL = 'forwards';
  /**
   * Interaction states for the ripple.
   *
   * On Touch:
   *  - `INACTIVE -> TOUCH_DELAY -> WAITING_FOR_CLICK -> INACTIVE`
   *  - `INACTIVE -> TOUCH_DELAY -> HOLDING -> WAITING_FOR_CLICK -> INACTIVE`
   *
   * On Mouse or Pen:
   *   - `INACTIVE -> WAITING_FOR_CLICK -> INACTIVE`
   */
  var State;
  (function (State) {
      /**
       * Initial state of the control, no touch in progress.
       *
       * Transitions:
       *   - on touch down: transition to `TOUCH_DELAY`.
       *   - on mouse down: transition to `WAITING_FOR_CLICK`.
       */
      State[State["INACTIVE"] = 0] = "INACTIVE";
      /**
       * Touch down has been received, waiting to determine if it's a swipe or
       * scroll.
       *
       * Transitions:
       *   - on touch up: begin press; transition to `WAITING_FOR_CLICK`.
       *   - on cancel: transition to `INACTIVE`.
       *   - after `TOUCH_DELAY_MS`: begin press; transition to `HOLDING`.
       */
      State[State["TOUCH_DELAY"] = 1] = "TOUCH_DELAY";
      /**
       * A touch has been deemed to be a press
       *
       * Transitions:
       *  - on up: transition to `WAITING_FOR_CLICK`.
       */
      State[State["HOLDING"] = 2] = "HOLDING";
      /**
       * The user touch has finished, transition into rest state.
       *
       * Transitions:
       *   - on click end press; transition to `INACTIVE`.
       */
      State[State["WAITING_FOR_CLICK"] = 3] = "WAITING_FOR_CLICK";
  })(State || (State = {}));
  /**
   * Events that the ripple listens to.
   */
  const EVENTS = [
      'click',
      'contextmenu',
      'pointercancel',
      'pointerdown',
      'pointerenter',
      'pointerleave',
      'pointerup',
  ];
  /**
   * Delay reacting to touch so that we do not show the ripple for a swipe or
   * scroll interaction.
   */
  const TOUCH_DELAY_MS = 150;
  /**
   * Used to detect if HCM is active. Events do not process during HCM when the
   * ripple is not displayed.
   */
  const FORCED_COLORS = window.matchMedia('(forced-colors: active)');
  /**
   * A ripple component.
   */
  class Ripple extends i$1 {
      constructor() {
          super(...arguments);
          /**
           * Disables the ripple.
           */
          this.disabled = false;
          this.hovered = false;
          this.pressed = false;
          this.rippleSize = '';
          this.rippleScale = '';
          this.initialSize = 0;
          this.state = State.INACTIVE;
          this.attachableController = new AttachableController(this, this.onControlChange.bind(this));
      }
      get htmlFor() {
          return this.attachableController.htmlFor;
      }
      set htmlFor(htmlFor) {
          this.attachableController.htmlFor = htmlFor;
      }
      get control() {
          return this.attachableController.control;
      }
      set control(control) {
          this.attachableController.control = control;
      }
      attach(control) {
          this.attachableController.attach(control);
      }
      detach() {
          this.attachableController.detach();
      }
      connectedCallback() {
          super.connectedCallback();
          // Needed for VoiceOver, which will create a "group" if the element is a
          // sibling to other content.
          this.setAttribute('aria-hidden', 'true');
      }
      render() {
          const classes = {
              'hovered': this.hovered,
              'pressed': this.pressed,
          };
          return b `<div class="surface ${e(classes)}"></div>`;
      }
      update(changedProps) {
          if (changedProps.has('disabled') && this.disabled) {
              this.hovered = false;
              this.pressed = false;
          }
          super.update(changedProps);
      }
      /**
       * TODO(b/269799771): make private
       * @private only public for slider
       */
      handlePointerenter(event) {
          if (!this.shouldReactToEvent(event)) {
              return;
          }
          this.hovered = true;
      }
      /**
       * TODO(b/269799771): make private
       * @private only public for slider
       */
      handlePointerleave(event) {
          if (!this.shouldReactToEvent(event)) {
              return;
          }
          this.hovered = false;
          // release a held mouse or pen press that moves outside the element
          if (this.state !== State.INACTIVE) {
              this.endPressAnimation();
          }
      }
      handlePointerup(event) {
          if (!this.shouldReactToEvent(event)) {
              return;
          }
          if (this.state === State.HOLDING) {
              this.state = State.WAITING_FOR_CLICK;
              return;
          }
          if (this.state === State.TOUCH_DELAY) {
              this.state = State.WAITING_FOR_CLICK;
              this.startPressAnimation(this.rippleStartEvent);
              return;
          }
      }
      async handlePointerdown(event) {
          if (!this.shouldReactToEvent(event)) {
              return;
          }
          this.rippleStartEvent = event;
          if (!this.isTouch(event)) {
              this.state = State.WAITING_FOR_CLICK;
              this.startPressAnimation(event);
              return;
          }
          // Wait for a hold after touch delay
          this.state = State.TOUCH_DELAY;
          await new Promise((resolve) => {
              setTimeout(resolve, TOUCH_DELAY_MS);
          });
          if (this.state !== State.TOUCH_DELAY) {
              return;
          }
          this.state = State.HOLDING;
          this.startPressAnimation(event);
      }
      handleClick() {
          // Click is a MouseEvent in Firefox and Safari, so we cannot use
          // `shouldReactToEvent`
          if (this.disabled) {
              return;
          }
          if (this.state === State.WAITING_FOR_CLICK) {
              this.endPressAnimation();
              return;
          }
          if (this.state === State.INACTIVE) {
              // keyboard synthesized click event
              this.startPressAnimation();
              this.endPressAnimation();
          }
      }
      handlePointercancel(event) {
          if (!this.shouldReactToEvent(event)) {
              return;
          }
          this.endPressAnimation();
      }
      handleContextmenu() {
          if (this.disabled) {
              return;
          }
          this.endPressAnimation();
      }
      determineRippleSize() {
          const { height, width } = this.getBoundingClientRect();
          const maxDim = Math.max(height, width);
          const softEdgeSize = Math.max(SOFT_EDGE_CONTAINER_RATIO * maxDim, SOFT_EDGE_MINIMUM_SIZE);
          // `?? 1` may be removed once `currentCSSZoom` is widely available.
          const zoom = this.currentCSSZoom ?? 1;
          const initialSize = Math.floor((maxDim * INITIAL_ORIGIN_SCALE) / zoom);
          const hypotenuse = Math.sqrt(width ** 2 + height ** 2);
          const maxRadius = hypotenuse + PADDING;
          this.initialSize = initialSize;
          // The dimensions may be altered by CSS `zoom`, which needs to be
          // compensated for in the final scale() value.
          const maybeZoomedScale = (maxRadius + softEdgeSize) / initialSize;
          this.rippleScale = `${maybeZoomedScale / zoom}`;
          this.rippleSize = `${initialSize}px`;
      }
      getNormalizedPointerEventCoords(pointerEvent) {
          const { scrollX, scrollY } = window;
          const { left, top } = this.getBoundingClientRect();
          const documentX = scrollX + left;
          const documentY = scrollY + top;
          const { pageX, pageY } = pointerEvent;
          // `?? 1` may be removed once `currentCSSZoom` is widely available.
          const zoom = this.currentCSSZoom ?? 1;
          return {
              x: (pageX - documentX) / zoom,
              y: (pageY - documentY) / zoom,
          };
      }
      getTranslationCoordinates(positionEvent) {
          const { height, width } = this.getBoundingClientRect();
          // `?? 1` may be removed once `currentCSSZoom` is widely available.
          const zoom = this.currentCSSZoom ?? 1;
          // end in the center
          const endPoint = {
              x: (width / zoom - this.initialSize) / 2,
              y: (height / zoom - this.initialSize) / 2,
          };
          let startPoint;
          if (positionEvent instanceof PointerEvent) {
              startPoint = this.getNormalizedPointerEventCoords(positionEvent);
          }
          else {
              startPoint = {
                  x: width / zoom / 2,
                  y: height / zoom / 2,
              };
          }
          // center around start point
          startPoint = {
              x: startPoint.x - this.initialSize / 2,
              y: startPoint.y - this.initialSize / 2,
          };
          return { startPoint, endPoint };
      }
      startPressAnimation(positionEvent) {
          if (!this.mdRoot) {
              return;
          }
          this.pressed = true;
          this.growAnimation?.cancel();
          this.determineRippleSize();
          const { startPoint, endPoint } = this.getTranslationCoordinates(positionEvent);
          const translateStart = `${startPoint.x}px, ${startPoint.y}px`;
          const translateEnd = `${endPoint.x}px, ${endPoint.y}px`;
          this.growAnimation = this.mdRoot.animate({
              top: [0, 0],
              left: [0, 0],
              height: [this.rippleSize, this.rippleSize],
              width: [this.rippleSize, this.rippleSize],
              transform: [
                  `translate(${translateStart}) scale(1)`,
                  `translate(${translateEnd}) scale(${this.rippleScale})`,
              ],
          }, {
              pseudoElement: PRESS_PSEUDO,
              duration: PRESS_GROW_MS,
              easing: EASING.STANDARD,
              fill: ANIMATION_FILL,
          });
      }
      async endPressAnimation() {
          this.rippleStartEvent = undefined;
          this.state = State.INACTIVE;
          const animation = this.growAnimation;
          let pressAnimationPlayState = Infinity;
          if (typeof animation?.currentTime === 'number') {
              pressAnimationPlayState = animation.currentTime;
          }
          else if (animation?.currentTime) {
              pressAnimationPlayState = animation.currentTime.to('ms').value;
          }
          if (pressAnimationPlayState >= MINIMUM_PRESS_MS) {
              this.pressed = false;
              return;
          }
          await new Promise((resolve) => {
              setTimeout(resolve, MINIMUM_PRESS_MS - pressAnimationPlayState);
          });
          if (this.growAnimation !== animation) {
              // A new press animation was started. The old animation was canceled and
              // should not finish the pressed state.
              return;
          }
          this.pressed = false;
      }
      /**
       * Returns `true` if
       *  - the ripple element is enabled
       *  - the pointer is primary for the input type
       *  - the pointer is the pointer that started the interaction, or will start
       * the interaction
       *  - the pointer is a touch, or the pointer state has the primary button
       * held, or the pointer is hovering
       */
      shouldReactToEvent(event) {
          if (this.disabled || !event.isPrimary) {
              return false;
          }
          if (this.rippleStartEvent &&
              this.rippleStartEvent.pointerId !== event.pointerId) {
              return false;
          }
          if (event.type === 'pointerenter' || event.type === 'pointerleave') {
              return !this.isTouch(event);
          }
          const isPrimaryButton = event.buttons === 1;
          return this.isTouch(event) || isPrimaryButton;
      }
      isTouch({ pointerType }) {
          return pointerType === 'touch';
      }
      /** @private */
      async handleEvent(event) {
          if (FORCED_COLORS?.matches) {
              // Skip event logic since the ripple is `display: none`.
              return;
          }
          switch (event.type) {
              case 'click':
                  this.handleClick();
                  break;
              case 'contextmenu':
                  this.handleContextmenu();
                  break;
              case 'pointercancel':
                  this.handlePointercancel(event);
                  break;
              case 'pointerdown':
                  await this.handlePointerdown(event);
                  break;
              case 'pointerenter':
                  this.handlePointerenter(event);
                  break;
              case 'pointerleave':
                  this.handlePointerleave(event);
                  break;
              case 'pointerup':
                  this.handlePointerup(event);
                  break;
          }
      }
      onControlChange(prev, next) {
          for (const event of EVENTS) {
              prev?.removeEventListener(event, this);
              next?.addEventListener(event, this);
          }
      }
  }
  __decorate([
      n$1({ type: Boolean, reflect: true })
  ], Ripple.prototype, "disabled", void 0);
  __decorate([
      r$1()
  ], Ripple.prototype, "hovered", void 0);
  __decorate([
      r$1()
  ], Ripple.prototype, "pressed", void 0);
  __decorate([
      e$3('.surface')
  ], Ripple.prototype, "mdRoot", void 0);

  /**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   */
  // Generated stylesheet for ./ripple/internal/ripple-styles.css.
  const styles = i$4 `:host{display:flex;margin:auto;pointer-events:none}:host([disabled]){display:none}@media(forced-colors: active){:host{display:none}}:host,.surface{border-radius:inherit;position:absolute;inset:0;overflow:hidden}.surface{-webkit-tap-highlight-color:rgba(0,0,0,0)}.surface::before,.surface::after{content:"";opacity:0;position:absolute}.surface::before{background-color:var(--md-ripple-hover-color, var(--md-sys-color-on-surface, #1d1b20));inset:0;transition:opacity 15ms linear,background-color 15ms linear}.surface::after{background:radial-gradient(closest-side, var(--md-ripple-pressed-color, var(--md-sys-color-on-surface, #1d1b20)) max(100% - 70px, 65%), transparent 100%);transform-origin:center center;transition:opacity 375ms linear}.hovered::before{background-color:var(--md-ripple-hover-color, var(--md-sys-color-on-surface, #1d1b20));opacity:var(--md-ripple-hover-opacity, 0.08)}.pressed::after{opacity:var(--md-ripple-pressed-opacity, 0.12);transition-duration:105ms}
`;

  /**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   */
  /**
   * @summary Ripples, also known as state layers, are visual indicators used to
   * communicate the status of a component or interactive element.
   *
   * @description A state layer is a semi-transparent covering on an element that
   * indicates its state. State layers provide a systematic approach to
   * visualizing states by using opacity. A layer can be applied to an entire
   * element or in a circular shape and only one state layer can be applied at a
   * given time.
   *
   * @final
   * @suppress {visibility}
   */
  let MdRipple = class MdRipple extends Ripple {
  };
  MdRipple.styles = [styles];
  MdRipple = __decorate([
      t$3('md-ripple')
  ], MdRipple);

})();
