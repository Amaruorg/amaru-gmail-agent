<p align="center">
  <img src="./assets/amaru-logo.png" alt="Logotipo de Amaru" width="200"/>
</p>

<h1 align="center">Amaru – Agente de Correo AI</h1>
<p align="center">
  <strong>Idioma:</strong> 
  <a href="README.md">🇬🇧 English</a> | 
  <a href="./docs/es/README.es.md">🇪🇸 Español</a>
</p>

<p align="center">
  <strong>Amaru</strong> es un asistente de correo inteligente inspirado en la serpiente mitológica andina. Optimiza la gestión del correo electrónico usando IA, integrándose con Gmail y Google Calendar para automatizar tareas y mejorar la productividad.
</p>

---

## 📌 Resumen

Amaru ayuda a los usuarios a gestionar su bandeja de entrada de manera eficiente mediante:

- Leer correos electrónicos y clasificarlos en categorías  
- Sugerir acciones que los usuarios pueden confirmar, modificar o ignorar  
- Proporcionar un panel intuitivo para una revisión rápida  

<p align="center">
  <img src="./assets/dashboard.png" alt="Panel de control" width="600"/>
</p>



## 🔑 Funcionalidades

- Conexión segura a Gmail mediante **OAuth 2.0**  
- Lectura y almacenamiento de correos en **PostgreSQL**  
- Clasificación automática en categorías:
  - Reuniones
  - Boletines
  - Spam
  - General
  - Y mucho más...
- Acciones automáticas mínimas:
  - Crear eventos en el calendario
  - Archivar correos irrelevantes
- Panel para revisar y confirmar las acciones sugeridas  

## 🛠 Tecnologías

| Capa               | Tecnologías                        |
|-------------------|-----------------------------------|
| Frontend/Backend  | Next.js + TypeScript               |
| UI                | Tailwind CSS + Shadcn UI           |
| Base de Datos     | PostgreSQL (ACID + JSONB)         |
| Autenticación     | OAuth 2.0 con Better Auth         |
| Colas de Tareas   | BullMQ                             |
| Contenedores      | Docker & Docker Compose            |
| CI/CD             | GitHub Actions                     |
