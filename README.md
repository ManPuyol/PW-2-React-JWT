# Gestion de roles de usuario

El sistema cuenta con 3 secciones accesibles en el sidebar:
1. Perfil
2. Usuarios
3. Manejo de roles

Los usuarios dependiendo de su rol podran:

| Accion | Administrador | Moderador | Usuario |
| ------ | :------: | :------: | :------: |
| Ver y editar perfil | ✅ | ✅ | ✅ |
| Listar usuarios | ✅ | ✅ | ❌ |
| Modificar roles | ✅ | ❌ | ❌ |

Este proyecto uso como base el siguiente repositorio:

https://github.com/vmcodes/joy-ui-template


## Gestión de Rutas

La aplicación utiliza `react-router-dom` para la gestión de rutas. Las rutas se definen en el archivo `App.tsx`.

Aquí hay un ejemplo de cómo se definen las rutas:

```typescript
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';

//...

<Routes key={location.pathname} location={location}>

    <Route path="/sign-in" element={<Login />} />

    <Route path="/sign-up" element={<Register />} />
    
    <Route path="/profile" element={<Profile />} />

    <Route path="/users" element={<Orders />} />

    <Route path="/management" element={<Settings />} />

    <Route path={`*`} element={<Navigate to="/sign-in" replace />} />
</Routes>
```
Cada `Route` representa una página en la aplicación. El componente que se renderiza para esa página se especifica como hijo de `Route`.

Al hacer login empieza en el Front un timeout que redirige a la pagina de login en cuanto expire el token.

### src\utils\auth\index.ts
```typescript

export const removeToken = (): void => {
    localStorage.removeItem('x-access-token');
    //remove cookie with the same name
    document.cookie = 'x-access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

export const handleToken = (response: AxiosResponse<any, any>) => {
        localStorage.setItem('x-access-token', response.data.accessToken);
        setTimeout(() => {
            alert("expired token");
            removeToken()
            window.location.href = "/sign-in";
        }, response.data.expiresIn * 1000);
    }
```

Este token se envia como cookie en cada peticion al servidor para autenticar al usuario. Tambien se almacena en el `localStorage` en caso que se recargue la pagina para no perder lo guardado en `React Context` y se elimina al cerrar sesion.

### App.tsx
```typescript
  const [user, setUser] = useState<{ username: string; email: string; roles: string[]; }>({ username: '', email: '', roles: [] });


  useEffect(() => {
    const token = localStorage.getItem('x-access-token');

    if (!token) {
      if (location.pathname !== "/sign-in") {
        alert("You must be logged in to view this page.");
        removeToken();
        window.location.href = "/sign-in";
      }
      return;
    }

    const [header, payload, signature] = token.split('.');
    const decodedPayload = JSON.parse(atob(payload));

    if (decodedPayload.exp < Date.now() / 1000) {
      alert("expired token, please log in again.");
      removeToken();
      window.location.href = "/sign-in";
      return;
    }
  
    setUser({
      username: decodedPayload.username,
      email: decodedPayload.email,
      roles: decodedPayload.roles
    });
  }, []);

    return (
    <UserContext.Provider value={{ user, setUser }}>
        //...
    </UserContext.Provider>
    );
```

## Gestión de Estado
La aplicación utiliza `React Context` , `useRef` y `useState` para la gestión de estado. `React Context` se utiliza para compartir la informacion del **usuario** entre componentes sin tener que pasar props manualmente a través de cada nivel de la jerarquía de componentes. Se define en  `src\hooks\userContext.ts` se cargan los datos en el login y se usa principalmente en el sidebar para mostrar o no los modulos a los que se puede acceder

### Login/index.tsx
```typescript
import { UserContext } from '../../hooks/userContext';

//...

  const { setUser } = React.useContext(UserContext) || {};

//...

    if (setUser) {
        setUser({
        username: response.data.username,
        email: response.data.email,
        roles: response.data.roles
        });
    }

// ...

```

### FirstSidebar.tsx
```typescript
import { UserContext } from '../../hooks/userContext';

//...

const { user } = useContext(UserContext);

//...

        {user?.roles?.includes("ROLE_MODERATOR") && <ListItem>
          <Link to="/users">
            <IconButton size="lg">
              <ViewListIcon />
            </IconButton>
          </Link>
        </ListItem>}

        {user?.roles?.includes("ROLE_ADMIN") && <ListItem>
          <Link to="/management">
            <IconButton size="lg">
              <SettingsRoundedIcon />
            </IconButton>
          </Link>
        </ListItem>}

// ...

```

`useRef` y `useState` se utilizan para gestionar el estado local de los componentes dentro de los formularios y tablas. Por ejemplo en la tabla de usuarios se utiliza `useState` para almacenar los usuarios.

### OrderTable.tsx
```typescript
//...

  const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        (async () => {
        try {
            const users = await getUsers();
            setUsers(users);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
        })()
    }, [])

  //...

    {
        users &&
        users.map((row) => (
            <tr key={row.id}>
                  <td style={{ textAlign: 'center', width: 120 }}>
                    {row.id}
                  </td>
                //...
    )}

```
## Iniciar la Aplicación

### Front
    
```bash
npm run dev
```
## Backend

El codigo del backend se encuentra en este repositorio

https://bitbucket.org/uneatlantico/pw1_23-24_entrega1/src/manuel.ortega/

Para iniciar la el servidor la primera vez es importante poner las credenciales de un servidor `MySQL` en `app/config/db.config.js` y descomentar la ultima linea de `server.js` para que ejecute la funcion `initial()`. Esta inicializara la base de datos y creara un usuario admin con el que se podra iniciar sesion. Luego de esto se puede comentar la linea.

Posteriormente ejecuta:
    
```bash
node server.js
```
