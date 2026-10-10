"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const e=require("react"),p=require("./defaultAttributes.cjs");/**
 * @license @tabler/icons-react v3.46.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=(n,s,l,c)=>{const r=e.forwardRef(({color:u="currentColor",size:a=24,stroke:i=2,title:o,className:m,children:t,...d},f)=>e.createElement("svg",{ref:f,...p.default[n],width:a,height:a,className:["tabler-icon",`tabler-icon-${s}`,m].join(" "),strokeWidth:i,stroke:u,...d},[o&&e.createElement("title",{key:"svg-title"},o),...c.map(([b,g])=>e.createElement(b,g)),...Array.isArray(t)?t:[t]]));return r.displayName=`${l}`,r};exports.default=y;
