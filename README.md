
# 🏗️ GDC 



**GDC** es un sistema de gestión para controlar herramientas y materiales en proyectos de construcción. Permite:
- Registrar entradas/salidas de herramientas.
- Gestionar inventarios de materiales.
- Generar reportes de movimientos.
- Evitar pérdidas o extravíos.

---

## **🚀 Características principales**
- 📋 **Registro de herramientas**: Marca, modelo, estado, responsable.
- 📦 **Gestión de materiales**: Cantidad, ubicación, proveedor.
- 🔄 **Movimientos**: Préstamos, devoluciones, bajas.
- 📊 **Reportes**: Históricos, alertas de vencimientos o pérdidas.

---

## **🛠️ Requisitos previos**

- Base de datos MySql (ej: PostgreSQL, SQLite).
- Git (para contribuciones).

---

## **📦 Instalación**
1. Clona el repositorio:
   ```bash
   git clone https://github.com/AldanaA1996/GDC.git
   cd GDC
Instala dependencias:


Configura la base de datos:

Crea un archivo .env con tus credenciales:

env
DB_HOST=tu_host
DB_USER=usuario
DB_PASSWORD=contraseña
DB_NAME=gdc_db
🖥️ Uso
Ejecuta la aplicación:
Desde la terminal ejecuta - npm index.js

📂 Estructura del proyecto
GDC/
├── src/
│   ├── models/       # Modelos de DB (herramientas, materiales)
│   ├── controllers/  # Lógica de movimientos
│   └── views/       # Interfaz (web, móvil o CLI)
├── data/            # Scripts SQL o datos iniciales
├── docs/            # Documentación adicional
└── tests/           # Pruebas
🤝 Cómo contribuir
Haz un fork del proyecto.

Crea una rama: git checkout -b feature/nueva-funcion.

Haz commit: git commit -m "Agrego gestión de préstamos".

Haz push: git push origin feature/nueva-funcion.

Abre un Pull Request.

📄 Licencia
MIT. Ver LICENSE.


---

# Guía de Uso para GDC

## Registro de una herramienta
1. Ve a **Herramientas > Nueva**.
2. Completa:
   - Nombre.
   - Código de barras/ID.
   - Estado (disponible, en reparación, etc.).
3. Guarda.

## Control de materiales
- Usa el menú **Materiales** para actualizar stock.
- Genera reportes en **Reportes > Inventario**.

# Diagrama de flujo
```mermaid
flowchart TD
    A[Usuario solicita herramienta] --> B[Verificar disponibilidad]
    B --> C{¿Disponible?}
    C -->|Sí| D[Registrar préstamo]
    C -->|No| E[Notificar al usuario]
