# Nombre de la Aplicación

Descripción general de la aplicación.

## Gestión de Rutas

La aplicación utiliza `react-router-dom` para la gestión de rutas. Las rutas se definen en el archivo `App.tsx`.

Aquí hay un ejemplo de cómo se definen las rutas:

```typescript
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

<Router>
    <Switch>
        <Route path="/about">
            <About />
        </Route>
        <Route path="/users">
            <Users />
        </Route>
        <Route path="/">
            <Home />
        </Route>
    </Switch>
</Router>
```
Cada `Route` representa una página en la aplicación. El componente que se renderiza para esa página se especifica como hijo de `Route`.

## Gestión de Estado
La aplicación utiliza `React Context` y `useState` para la gestión de estado.

Aquí hay un ejemplo de cómo se crea un contexto y se utiliza para almacenar el estado del usuario:

```typescript
import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
const UserContext = createContext(null);

// Proveedor de contexto que almacena el estado del usuario
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook personalizado para usar el contexto del usuario
export const useUser = () => useContext(UserContext);
```

## Iniciar la Aplicación
Para iniciar la el front, ejecuta:
    
```bash
npm run dev
```
Para iniciar la el servidor la primera vez es importante descomenrat la ultima linea de `server.js` para que ejecute la funcion `initial()`. Esta inicializara la base de datos y creara un usuario admin con el que se podra iniciar sesion. Luego de esto se puede comentar la linea.

Posteriormente ejecuta:
    
```bash
node server.js
```
