# Guia de pasos para configurar el proyecto a zoneless

## ¿Por qué usar zoneless?

- Zoneless es más rápido y eficiente en términos de rendimiento.
- Reduce la cantidad de código necesario para manejar cambios de detección de eventos.
- Es más sencillo de mantener y depurar.

1. Eliminar la importación de `provideZoneChangeDetection` en `main.ts`.
2. Añadir la importación de `provideZonelessChangeDetection` en `main.ts`.

```ts
import { provideZonelessChangeDetection } from '@angular/core'; // Zoneless. Esto en los imports

provideZonelessChangeDetection(), // Zoneless. Esto en los providers

```

3. Eliminar la importación de `Zone.js` en `polyfills.ts`.
4. En el tsconfig.json, añadir la siguiente configuración:

```json
{
  "angularCompilerOptions": {
    "zoneless": true,
  }
}
```

5. Si estamos usando standalone en nuestra app, añadir la siguiente configuración para cualquier componente standalone:

```ts
import { ChangeDetectionStrategy } from '@angular/core'; // Zoneless

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush, // Zoneless
})
export class AppComponent {
  title = 'usuarios_mecodex';
}
```

6. Ejecutar el siguiente comando para desinstalar zone.js: 

```bash
npm uninstall zone.js
```

Para más información sobre zoneless, consulta la documentación oficial de Angular: [Zoneless Change Detection](https://angular.dev/guide/zoneless).

