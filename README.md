# Mi Proyecto
Una app de recetas para principiantes 🍳

## Tecnologías usadas
- React
- TailwindCSS
- Vite

## Cómo correr el proyecto
1. Clona el repo
2. Ejecuta `npm install`
3. Ejecuta `npm run dev`

## Crear otro repositorio para este proyecto
Si quieres publicar este mismo proyecto en un repositorio nuevo (con otra URL), usa el script:

```bash
./scripts/crear-otro-repo.sh <url-del-nuevo-repo> <rama-principal-opcional>
```

Ejemplo:

```bash
./scripts/crear-otro-repo.sh git@github.com:tu-usuario/proyecto-web-nutri-v2.git main
```

Esto hará lo siguiente:
- Reemplaza el `origin` actual por la nueva URL.
- Renombra tu rama local a la rama principal que indiques (por defecto `main`).
- Publica el proyecto en el nuevo repositorio con `git push -u origin`.
