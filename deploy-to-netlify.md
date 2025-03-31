# Cómo desplegar tu portfolio en Netlify

## Prerrequisitos
- Una cuenta en [Netlify](https://www.netlify.com/)
- Git instalado en tu computadora

## Pasos para el despliegue

### 1. Preparar tu proyecto para el despliegue

El proyecto ya está configurado con un archivo `netlify.toml` que indica a Netlify cómo construir y publicar tu sitio.

### 2. Crear un repositorio en GitHub

1. Crea un nuevo repositorio en [GitHub](https://github.com/new)
2. Sube tu código al repositorio:

```bash
# Inicializa un repositorio Git local si aún no lo has hecho
git init

# Añade todos los archivos al repositorio
git add .

# Haz un commit con los cambios
git commit -m "Initial commit"

# Añade el repositorio remoto (reemplaza USER y REPO con tu nombre de usuario y nombre del repositorio)
git remote add origin https://github.com/USER/REPO.git

# Sube los cambios a GitHub
git push -u origin main
```

### 3. Desplegar en Netlify

1. Ve a [Netlify](https://app.netlify.com/) y accede a tu cuenta
2. Haz clic en "New site from Git"
3. Selecciona GitHub como proveedor Git
4. Autoriza a Netlify para acceder a tus repositorios si es necesario
5. Selecciona el repositorio que acabas de crear
6. En la configuración de despliegue:
   - La rama de despliegue debería ser `main` o `master` según cómo hayas nombrado tu rama principal
   - El comando de construcción es `npm run build` (ya está configurado en netlify.toml)
   - El directorio de publicación es `dist/public` (ya está configurado en netlify.toml)
7. Haz clic en "Deploy site"

### 4. Personaliza tu dominio (opcional)

1. Una vez desplegado el sitio, puedes hacer clic en "Domain settings"
2. Aquí puedes:
   - Cambiar el subdominio de Netlify por defecto
   - Configurar un dominio personalizado si lo tienes

### 5. Mantén tu sitio actualizado

Cada vez que hagas cambios en tu repositorio de GitHub, Netlify automáticamente reconstruirá y desplegará tu sitio.

## Solución de problemas comunes

### Si el despliegue falla:

1. Revisa los logs de construcción en Netlify para entender el problema
2. Asegúrate de que tu código funciona localmente con `npm run build`
3. Verifica que no haya errores en tus archivos de configuración

### Si las rutas no funcionan:

1. Asegúrate de que el archivo `netlify.toml` tenga la configuración de redirección correcta (ya está incluida en este proyecto)

### Si las imágenes o recursos no se cargan:

1. Verifica que las rutas a las imágenes sean relativas y correctas
2. Asegúrate de que los archivos estén incluidos en tu repositorio

## Recursos adicionales

- [Documentación de Netlify](https://docs.netlify.com/)
- [Guía de despliegue de aplicaciones React en Netlify](https://www.netlify.com/blog/2016/07/22/deploy-react-apps-in-less-than-30-seconds/)