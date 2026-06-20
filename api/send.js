import { Resend } from 'resend';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Resend API key is not configured in Vercel environment variables. Please add it to your project settings in the Vercel dashboard and redeploy.' });
  }

  const resend = new Resend(apiKey);

  // Parse body manually if Vercel doesn't pre-parse it
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  } else if (!body) {
    try {
      body = await new Promise((resolve, reject) => {
        let chunks = [];
        req.on('data', chunk => chunks.push(chunk));
        req.on('end', () => {
          const raw = Buffer.concat(chunks).toString();
          resolve(raw ? JSON.parse(raw) : {});
        });
        req.on('error', reject);
      });
    } catch {
      body = {};
    }
  }

  const { name, email, message } = body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields (name, email, message) are required.' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'yrohitprasad45@gmail.com',
      subject: `New Message from ${name} (${email})`,
      replyTo: email,
      html: `
        <h2>New Message from your Portfolio Contact Form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap; font-size: 15px; line-height: 1.6; color: #333;">${message}</p>
      `,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
