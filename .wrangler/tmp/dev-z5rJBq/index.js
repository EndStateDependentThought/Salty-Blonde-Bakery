var __defProp = Object.defineProperty;
var __name = (target, value2) => __defProp(target, "name", { value: value2, configurable: true });

// worker/index.js
var MAX = {
  name: 120,
  email: 180,
  phone: 40,
  pickupDate: 32,
  pickupTime: 80,
  orderType: 120,
  orderDetails: 2400,
  occasion: 180,
  allergyNotes: 1200,
  fulfillment: 80,
  notes: 1600
};
function value(formData, key) {
  const raw = formData.get(key);
  if (typeof raw !== "string") return "";
  return raw.trim().slice(0, MAX[key] || 500);
}
__name(value, "value");
function escapeHtml(input) {
  return input.replace(/[&<>'"]/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;"
  })[char]);
}
__name(escapeHtml, "escapeHtml");
function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}
__name(json, "json");
async function handlePreorder(request, env) {
  if (request.method === "GET") {
    return json({ ok: false, message: "Use the pre-order form to submit a request." }, 405);
  }
  if (request.method !== "POST") {
    return json({ ok: false, message: "Method not allowed." }, 405);
  }
  const formData = await request.formData();
  if (value(formData, "companyWebsite")) return json({ ok: true });
  const submission = {
    name: value(formData, "name"),
    email: value(formData, "email"),
    phone: value(formData, "phone"),
    pickupDate: value(formData, "pickupDate"),
    pickupTime: value(formData, "pickupTime"),
    orderType: value(formData, "orderType"),
    orderDetails: value(formData, "orderDetails"),
    occasion: value(formData, "occasion"),
    allergyNotes: value(formData, "allergyNotes"),
    fulfillment: value(formData, "fulfillment"),
    notes: value(formData, "notes"),
    confirmation: value(formData, "confirmation")
  };
  if (!submission.name || !submission.email || !submission.pickupDate || !submission.orderDetails || submission.confirmation !== "yes") {
    return json({ ok: false, message: "Please complete the required fields." }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submission.email)) {
    return json({ ok: false, message: "Please enter a valid email address." }, 400);
  }
  const { CF_ACCOUNT_ID, CF_EMAIL_API_TOKEN, PREORDER_FROM, PREORDER_TO } = env;
  if (!CF_ACCOUNT_ID || !CF_EMAIL_API_TOKEN || !PREORDER_FROM || !PREORDER_TO) {
    console.error("Preorder email environment variables are not configured.");
    return json({ ok: false, message: "The pre-order form is not configured yet." }, 503);
  }
  const subject = `Pre-order request \u2014 ${submission.name} \u2014 ${submission.pickupDate}`;
  const fields = [
    ["Name", submission.name],
    ["Customer email", submission.email],
    ["Phone", submission.phone || "Not provided"],
    ["Preferred pickup date", submission.pickupDate],
    ["Preferred pickup time", submission.pickupTime || "Not provided"],
    ["Order type", submission.orderType || "Not specified"],
    ["Fulfillment", submission.fulfillment || "Pickup"],
    ["Event / company / occasion", submission.occasion || "Not provided"],
    ["Order details", submission.orderDetails],
    ["Allergy / dietary notes", submission.allergyNotes || "None provided"],
    ["Other notes", submission.notes || "None provided"]
  ];
  const text = fields.map(([label, content]) => `${label}:
${content}`).join("\n\n");
  const html = `
    <h1>New Salty Blonde pre-order request</h1>
    ${fields.map(([label, content]) => `<p><strong>${escapeHtml(label)}</strong><br>${escapeHtml(content).replace(/\n/g, "<br>")}</p>`).join("")}
    <hr>
    <p>This submission is a request only and has not been confirmed.</p>
  `;
  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(CF_ACCOUNT_ID)}/email/sending/send`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${CF_EMAIL_API_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      to: PREORDER_TO,
      from: PREORDER_FROM,
      reply_to: submission.email,
      subject,
      text,
      html
    })
  });
  const result = await response.json().catch(() => null);
  if (!response.ok || !result?.success) {
    console.error("Cloudflare Email Service error", response.status, result);
    return json({ ok: false, message: "We could not send the request right now." }, 502);
  }
  return json({ ok: true });
}
__name(handlePreorder, "handlePreorder");
var worker_default = {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/preorder") {
      return handlePreorder(request, env);
    }
    if (url.pathname.startsWith("/api/")) {
      return json({ ok: false, message: "Not found." }, 404);
    }
    return env.ASSETS.fetch(request);
  }
};

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    const body = JSON.stringify(error);
    const headers = {
      "Content-Type": "application/json",
      "MF-Experimental-Error-Stack": "true"
    };
    const encoded = encodeURIComponent(body);
    if (encoded.length <= 8192) {
      headers["MF-Experimental-Error-Stack-Payload"] = encoded;
    }
    return new Response(body, { status: 500, headers });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-v3YwtC/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = worker_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-v3YwtC/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  scheduledTime;
  cron;
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
