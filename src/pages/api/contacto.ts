import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  const { nombre, email, telefono, mensaje } = data;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: import.meta.env.EMAIL_USER,
      pass: import.meta.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Renew Beauty" <${import.meta.env.EMAIL_USER}>`,
      to: "contacto@renewbeauty.com", // correo destino
      subject: "Nuevo mensaje desde la web",
      html: `
        <h2>Nuevo contacto</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Mensaje:</strong> ${mensaje}</p>
      `,
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false }),
      { status: 500 }
    );
  }
};
