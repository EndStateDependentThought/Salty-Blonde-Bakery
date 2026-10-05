const MAX = {
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
  notes: 1600,
};

function value(formData, key) {
  const raw = formData.get(key);
  if (typeof raw !== 'string') return '';
  return raw.trim().slice(0, MAX[key] || 500);
}

function escapeHtml(input) {
  return input.replace(/[&<>'"]/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
  })[char]);
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

async function handlePreorder(request, env) {
  if (request.method === 'GET') {
    return json({ ok: false, message: 'Use the pre-order form to submit a request.' }, 405);
  }

  if (request.method !== 'POST') {
    return json({ ok: false, message: 'Method not allowed.' }, 405);
  }

  const formData = await request.formData();

  // Quietly accept obvious bot submissions.
  if (value(formData, 'companyWebsite')) return json({ ok: true });

  const submission = {
    name: value(formData, 'name'),
    email: value(formData, 'email'),
    phone: value(formData, 'phone'),
    pickupDate: value(formData, 'pickupDate'),
    pickupTime: value(formData, 'pickupTime'),
    orderType: value(formData, 'orderType'),
    orderDetails: value(formData, 'orderDetails'),
    occasion: value(formData, 'occasion'),
    allergyNotes: value(formData, 'allergyNotes'),
    fulfillment: value(formData, 'fulfillment'),
    notes: value(formData, 'notes'),
    confirmation: value(formData, 'confirmation'),
  };

  if (!submission.name || !submission.email || !submission.pickupDate || !submission.orderDetails || submission.confirmation !== 'yes') {
    return json({ ok: false, message: 'Please complete the required fields.' }, 400);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submission.email)) {
    return json({ ok: false, message: 'Please enter a valid email address.' }, 400);
  }

  const { CF_ACCOUNT_ID, CF_EMAIL_API_TOKEN, PREORDER_FROM, PREORDER_TO } = env;
  if (!CF_ACCOUNT_ID || !CF_EMAIL_API_TOKEN || !PREORDER_FROM || !PREORDER_TO) {
    console.error('Preorder email environment variables are not configured.');
    return json({ ok: false, message: 'The pre-order form is not configured yet.' }, 503);
  }

  const subject = `Pre-order request — ${submission.name} — ${submission.pickupDate}`;
  const fields = [
    ['Name', submission.name],
    ['Customer email', submission.email],
    ['Phone', submission.phone || 'Not provided'],
    ['Preferred pickup date', submission.pickupDate],
    ['Preferred pickup time', submission.pickupTime || 'Not provided'],
    ['Order type', submission.orderType || 'Not specified'],
    ['Fulfillment', submission.fulfillment || 'Pickup'],
    ['Event / company / occasion', submission.occasion || 'Not provided'],
    ['Order details', submission.orderDetails],
    ['Allergy / dietary notes', submission.allergyNotes || 'None provided'],
    ['Other notes', submission.notes || 'None provided'],
  ];

  const text = fields.map(([label, content]) => `${label}:\n${content}`).join('\n\n');
  const html = `
    <h1>New Salty Blonde pre-order request</h1>
    ${fields.map(([label, content]) => `<p><strong>${escapeHtml(label)}</strong><br>${escapeHtml(content).replace(/\n/g, '<br>')}</p>`).join('')}
    <hr>
    <p>This submission is a request only and has not been confirmed.</p>
  `;

  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(CF_ACCOUNT_ID)}/email/sending/send`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${CF_EMAIL_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: PREORDER_TO,
      from: PREORDER_FROM,
      reply_to: submission.email,
      subject,
      text,
      html,
    }),
  });

  const result = await response.json().catch(() => null);
  if (!response.ok || !result?.success) {
    console.error('Cloudflare Email Service error', response.status, result);
    return json({ ok: false, message: 'We could not send the request right now.' }, 502);
  }

  return json({ ok: true });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/preorder') {
      return handlePreorder(request, env);
    }

    if (url.pathname.startsWith('/api/')) {
      return json({ ok: false, message: 'Not found.' }, 404);
    }

    return env.ASSETS.fetch(request);
  },
};
