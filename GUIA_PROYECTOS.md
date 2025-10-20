# Guía de Proyectos - MF0492_3

## 📁 Estructura de un Proyecto Web Profesional

```
mi-proyecto/
├── config/
│   ├── database.php          # Configuración de base de datos
│   └── constants.php          # Constantes globales
├── src/
│   ├── controllers/           # Controladores (lógica de negocio)
│   ├── models/                # Modelos (interacción con BD)
│   ├── views/                 # Vistas (presentación)
│   └── utils/                 # Utilidades y helpers
├── public/
│   ├── css/                   # Hojas de estilo
│   ├── js/                    # JavaScript
│   ├── images/                # Imágenes
│   └── index.php              # Punto de entrada
├── database/
│   ├── schema.sql             # Estructura de la base de datos
│   └── seeds.sql              # Datos de prueba
├── tests/                     # Tests unitarios
├── .gitignore                 # Archivos ignorados por Git
├── composer.json              # Dependencias PHP
└── README.md                  # Documentación del proyecto
```

---

## 🚀 Plantillas de Proyectos

### Proyecto 1: Sistema de Autenticación

**Duración estimada**: 2 semanas  
**Nivel**: Básico-Intermedio

#### Objetivos
- Implementar registro de usuarios
- Sistema de login/logout
- Recuperación de contraseña
- Perfiles de usuario

#### Base de Datos

```sql
CREATE DATABASE sistema_auth;

USE sistema_auth;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE password_resets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token VARCHAR(100) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

#### Funcionalidades Mínimas
- [ ] Formulario de registro con validación
- [ ] Hash de contraseñas con password_hash()
- [ ] Login con sesiones
- [ ] Logout seguro
- [ ] Página de perfil editable
- [ ] Protección de páginas privadas
- [ ] Mensajes de error y éxito

#### Tecnologías
- PHP 7.4+
- MySQL
- HTML5/CSS3
- JavaScript (validación cliente)

---

### Proyecto 2: Blog con Panel de Administración

**Duración estimada**: 3 semanas  
**Nivel**: Intermedio

#### Objetivos
- CRUD completo de artículos
- Sistema de categorías
- Comentarios de usuarios
- Panel de administración
- Editor de contenido

#### Base de Datos

```sql
CREATE DATABASE blog_cms;

USE blog_cms;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'editor', 'author', 'subscriber') DEFAULT 'subscriber',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    featured_image VARCHAR(255),
    author_id INT NOT NULL,
    category_id INT,
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    views INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    published_at TIMESTAMP NULL,
    FOREIGN KEY (author_id) REFERENCES users(id),
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT,
    author_name VARCHAR(100),
    author_email VARCHAR(100),
    content TEXT NOT NULL,
    status ENUM('pending', 'approved', 'spam') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE post_tags (
    post_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (post_id, tag_id),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);
```

#### Funcionalidades Mínimas

**Frontend**:
- [ ] Listado de artículos con paginación
- [ ] Vista individual de artículo
- [ ] Filtrado por categorías
- [ ] Sistema de búsqueda
- [ ] Comentarios (si el usuario está autenticado)
- [ ] Diseño responsive

**Panel de Administración**:
- [ ] Dashboard con estadísticas
- [ ] CRUD de artículos con editor WYSIWYG
- [ ] Gestión de categorías y etiquetas
- [ ] Moderación de comentarios
- [ ] Gestión de usuarios
- [ ] Configuración del sitio

#### Tecnologías
- PHP 7.4+ con POO
- MySQL
- JavaScript (AJAX para comentarios)
- Bootstrap o Tailwind CSS
- TinyMCE o CKEditor

---

### Proyecto 3: API RESTful de Gestión de Tareas

**Duración estimada**: 2-3 semanas  
**Nivel**: Intermedio-Avanzado

#### Objetivos
- Crear una API REST completa
- Implementar autenticación JWT
- Documentar endpoints
- Manejar errores correctamente
- Versionado de API

#### Base de Datos

```sql
CREATE DATABASE tasks_api;

USE tasks_api;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    api_token VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    owner_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    project_id INT NOT NULL,
    assigned_to INT,
    status ENUM('todo', 'in_progress', 'done') DEFAULT 'todo',
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL
);
```

#### Endpoints de la API

**Autenticación**:
```
POST   /api/v1/auth/register    - Registrar usuario
POST   /api/v1/auth/login       - Login (devuelve JWT)
POST   /api/v1/auth/logout      - Logout
GET    /api/v1/auth/me          - Información del usuario actual
```

**Proyectos**:
```
GET    /api/v1/projects         - Listar proyectos
POST   /api/v1/projects         - Crear proyecto
GET    /api/v1/projects/:id     - Ver proyecto
PUT    /api/v1/projects/:id     - Actualizar proyecto
DELETE /api/v1/projects/:id     - Eliminar proyecto
```

**Tareas**:
```
GET    /api/v1/projects/:projectId/tasks      - Listar tareas
POST   /api/v1/projects/:projectId/tasks      - Crear tarea
GET    /api/v1/tasks/:id                      - Ver tarea
PUT    /api/v1/tasks/:id                      - Actualizar tarea
DELETE /api/v1/tasks/:id                      - Eliminar tarea
PATCH  /api/v1/tasks/:id/status               - Cambiar estado
```

#### Estructura de Respuestas

**Éxito**:
```json
{
    "success": true,
    "data": {
        "id": 1,
        "title": "Mi tarea"
    },
    "message": "Tarea creada exitosamente"
}
```

**Error**:
```json
{
    "success": false,
    "error": {
        "code": "VALIDATION_ERROR",
        "message": "Los datos proporcionados no son válidos",
        "details": {
            "title": "El título es obligatorio"
        }
    }
}
```

#### Funcionalidades Mínimas
- [ ] Autenticación JWT
- [ ] CRUD completo para proyectos y tareas
- [ ] Validación de datos
- [ ] Manejo de errores consistente
- [ ] Códigos de estado HTTP apropiados
- [ ] Documentación de la API (Postman Collection o Swagger)
- [ ] Rate limiting (opcional)
- [ ] Tests de endpoints (opcional)

---

### Proyecto 4: E-commerce Básico

**Duración estimada**: 4-5 semanas  
**Nivel**: Avanzado

#### Objetivos
- Sistema completo de tienda online
- Catálogo de productos
- Carrito de compras
- Proceso de checkout
- Panel de administración
- Gestión de pedidos

#### Base de Datos

```sql
CREATE DATABASE ecommerce;

USE ecommerce;

-- Tablas de usuarios y autenticación (similares a proyecto 1)

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    parent_id INT NULL,
    image VARCHAR(255),
    FOREIGN KEY (parent_id) REFERENCES categories(id)
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    sale_price DECIMAL(10, 2),
    stock INT DEFAULT 0,
    category_id INT,
    sku VARCHAR(100) UNIQUE,
    featured BOOLEAN DEFAULT FALSE,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE product_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    subtotal DECIMAL(10, 2) NOT NULL,
    tax DECIMAL(10, 2) DEFAULT 0,
    shipping DECIMAL(10, 2) DEFAULT 0,
    total DECIMAL(10, 2) NOT NULL,
    shipping_address TEXT,
    billing_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    session_id VARCHAR(100),
    product_id INT NOT NULL,
    quantity INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
```

#### Funcionalidades Mínimas

**Frontend**:
- [ ] Página principal con productos destacados
- [ ] Catálogo con filtros y búsqueda
- [ ] Página de detalle de producto
- [ ] Carrito de compras (AJAX)
- [ ] Proceso de checkout (3 pasos)
- [ ] Registro y login de usuarios
- [ ] Historial de pedidos
- [ ] Diseño responsive

**Panel de Administración**:
- [ ] Dashboard con estadísticas de ventas
- [ ] Gestión de productos (CRUD)
- [ ] Gestión de categorías
- [ ] Gestión de pedidos
- [ ] Gestión de clientes
- [ ] Reportes básicos

#### Tecnologías
- PHP 7.4+ con arquitectura MVC
- MySQL
- JavaScript / jQuery para interactividad
- Bootstrap o framework CSS
- Sessions para carrito
- Validación de formularios

---

## 📝 Checklist para Cada Proyecto

### Antes de Empezar
- [ ] Leer y entender los requisitos
- [ ] Diseñar la base de datos (diagrama ER)
- [ ] Crear wireframes o mockups básicos
- [ ] Configurar el entorno de desarrollo
- [ ] Inicializar repositorio Git

### Durante el Desarrollo
- [ ] Crear la estructura de carpetas
- [ ] Implementar la base de datos
- [ ] Desarrollar la capa de modelo
- [ ] Desarrollar los controladores
- [ ] Crear las vistas
- [ ] Implementar validación de datos
- [ ] Añadir manejo de errores
- [ ] Implementar medidas de seguridad
- [ ] Hacer commits regulares con mensajes descriptivos

### Antes de Entregar
- [ ] Probar todas las funcionalidades
- [ ] Verificar la seguridad (SQL injection, XSS, etc.)
- [ ] Validar el código HTML/CSS
- [ ] Comprobar responsive design
- [ ] Escribir el README con instrucciones
- [ ] Limpiar código (eliminar console.log, comentarios innecesarios)
- [ ] Preparar datos de prueba
- [ ] Crear video o capturas de pantalla de demostración

---

## 🎯 Criterios de Evaluación Detallados

### Funcionalidad (25%)
- ✅ Todas las funcionalidades requeridas están implementadas
- ✅ La aplicación funciona sin errores críticos
- ✅ Los formularios procesan datos correctamente
- ✅ La navegación es intuitiva

### Código (25%)
- ✅ Código limpio y bien organizado
- ✅ Uso correcto de POO (clases, herencia, etc.)
- ✅ Nombres de variables y funciones descriptivos
- ✅ Comentarios donde sea necesario
- ✅ Sin código duplicado

### Base de Datos (15%)
- ✅ Diseño normalizado
- ✅ Uso de claves foráneas
- ✅ Tipos de datos apropiados
- ✅ Consultas optimizadas

### Seguridad (15%)
- ✅ Validación de datos de entrada
- ✅ Protección contra SQL injection
- ✅ Protección contra XSS
- ✅ Contraseñas cifradas
- ✅ Sesiones seguras

### Interfaz (10%)
- ✅ Diseño atractivo y profesional
- ✅ Responsive design
- ✅ Mensajes de error claros
- ✅ Feedback al usuario

### Documentación (10%)
- ✅ README completo
- ✅ Instrucciones de instalación
- ✅ Comentarios en el código
- ✅ Diagrama de base de datos

---

## 💻 Comandos Útiles

### Git
```bash
# Inicializar repositorio
git init
git add .
git commit -m "Initial commit"

# Crear .gitignore
echo "config/database.php" > .gitignore
echo "vendor/" >> .gitignore
echo ".DS_Store" >> .gitignore

# Crear rama para nueva feature
git checkout -b feature/login-system
```

### Composer
```bash
# Inicializar proyecto
composer init

# Instalar dependencias comunes
composer require vlucas/phpdotenv
composer require --dev phpunit/phpunit
```

### MySQL
```bash
# Importar base de datos
mysql -u root -p nombre_bd < database/schema.sql

# Exportar base de datos
mysqldump -u root -p nombre_bd > backup.sql
```

---

¡Buena suerte con tus proyectos! Recuerda que la práctica hace al maestro. 🚀
