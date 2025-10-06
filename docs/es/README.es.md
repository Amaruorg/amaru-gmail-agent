<p align="center">
  <img src="../../assets/amaru-logo.png" alt="Logotipo de Amaru" width="200"/>
</p>

<h1 align="center">Amaru</h1>

<p align="center">
  <a href="../../README.md">🇬🇧 English</a> | 
  <a href="./README.es.md">🇪🇸 Español</a>
</p>

**Amaru** es un asistente inteligente que te ayuda a mantener tu bandeja de Gmail bajo control. Inspirado en la deidad serpiente andina, lee tus correos, resume lo importante y sugiere acciones que puedes revisar antes de ejecutar.

---

## ¿Qué hace?

Amaru se conecta a tu cuenta de Gmail y analiza tus mensajes no leídos. Te ofrece:

- **Resúmenes rápidos** de cada correo con categorización automática
- **Sugerencias inteligentes** como crear eventos de calendario cuando detecta información de reuniones
- **Un panel simple** donde puedes revisar todo antes de actuar

<p align="center">
  <img src="../../assets/dashboard.png" alt="Panel de control" width="600"/>
</p>

## Funcionalidades

- **Gmail OAuth 2.0** – Autenticación segura con Google
- **Análisis de correos** – Resúmenes y categorización con IA (Trabajo, Personal, Eventos, Finanzas, etc.)
- **Integración con Calendar** – Detecta eventos automáticamente y ofrece agregarlos a Google Calendar
- **Registro de acciones** – Rastrea lo que Amaru sugiere y lo que apruebas
- **Prompts personalizados** – Agrega tus propias instrucciones para influir en cómo se analizan los correos
- **Colecciones y listas blancas** – Organiza correos y gestiona remitentes de confianza

## Stack Tecnológico

| Componente      | Tecnología                     |
| --------------- | ------------------------------ |
| Framework       | Next.js 15 + TypeScript        |
| UI              | Tailwind CSS + Motion          |
| Base de Datos   | PostgreSQL + Prisma ORM        |
| Autenticación   | Better Auth (OAuth 2.0)        |
| IA              | OpenRouter + AI SDK            |
| Parsing Email   | googleapis + mailparser        |
| Tablas          | @tanstack/react-table          |
