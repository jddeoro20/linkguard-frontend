# LinkGuard Frontend — SPA de Evaluación de Riesgo de Phishing

**LinkGuard Frontend** es una aplicación web interactiva de página única (SPA) desarrollada en **React 18**, **Vite** y **Tailwind CSS**. Sirve como la interfaz de usuario oficial del ecosistema **LinkGuard**, conectándose al microservicio REST API en FastAPI para proporcionar la evaluación en tiempo real del riesgo de phishing en enlaces mediante reglas léxicas y reputación pública en PhishTank.

---

## Características Principales

* **Validación Sintáctica en Cliente (R-EDGE)**: Bloquea entradas vacías, solo-espacios o texto plano antes de realizar la petición HTTP, optimizando el consumo de red.
* **Evaluación Visual e Interactiva**:
  * ****: Medidor visual del puntaje de riesgo de 0 a 100 con código de colores según la severidad (, , ).
  * ****: Desglose cuantitativo e identificadores del nivel de amenaza.
  * ****: Lista interactiva y estructurada de las evidencias léxicas detectadas y coincidencias en listas negras (PhishTank).
  * ****: Orientación preventiva clara y accionable para el usuario final.
* **Gestión de Cold Starts (Render)**: Notificación inteligente en UI que avisa si el microservicio en Render está en proceso de reactivación (*cold start* > 2.0 s), evitando la sensación de bloqueo.
* **Diseño Moderno & Adaptativo**: Estética orientada a ciberseguridad en modo oscuro por defecto ( con paleta ).
* **Arquitectura Desacoplada & Ligera**: Construido sin dependencias pesadas de UI (sin MUI/AntD/Bootstrap), garantizando tiempos de carga ultrarrápidos y óptima puntuación Lighthouse.

---

## Stack Tecnológico

| Tecnología | Descripción |
| :--- | :--- |
| **React 18** | Librería principal para la construcción de la interfaz por componentes |
| **Vite** | Tooling y empaquetador de código frontend de alta velocidad |
| **Tailwind CSS** | Framework CSS de clases de utilidad para diseño responsivo y custom |
| **Lucide React** | Set de iconos vectoriales optimizados para seguridad y UI |
| **Vitest & RTL** | Suite de pruebas unitarias y de componentes |
| **Vercel** | Plataforma de despliegue continuo en la red Edge Global |

---

## Estructura del Proyecto



---

## Configuración y Ejecución Local

### 1. Requisitos Previos

* **Node.js** 20.x o superior
* **pnpm** (recomendado) o **npm** / **yarn**

### 2. Clonar el Repositorio e Instalar Dependencias



### 3. Variables de Entorno

Crea un archivo  en la raíz del proyecto basándote en :



Configura la dirección base de la API backend ():



### 4. Servidor de Desarrollo

Inicia el entorno de desarrollo local con recarga rápida (HMR):



La aplicación estará disponible en puerto 5173.

---

## Pruebas y Calidad de Código

Ejecuta la suite de pruebas unitarias y de componentes con Vitest:



---

## Compilación y Empaquetado

Para generar el bundle optimizado listo para producción en el directorio :



Para previsualizar la compilación de producción de forma local:



---

## Despliegue en Vercel

La aplicación está configurada para el despliegue continuo (CD) automático a través de **Vercel Hobby Tier**:

1. **Conexión de Repositorio**: Conectado a la rama  del repositorio .
2. **Build Settings en Vercel**:
   * **Framework Preset**: Vite
   * **Build Command**:  (o )
   * **Output Directory**: 
3. **Environment Variables en Vercel**:
   * Add Environment Variable:
     * **Key**: 
     * **Value**: URL pública de Render

---

## Integración con el Ecosistema

* **Backend Repository**: 
* **Especificación de Arquitectura**: Compliant con SDD (Specification-Driven Development).

---

## Licencia

Este proyecto está bajo la Licencia **MIT**. Consulta el archivo  para más detalles.
