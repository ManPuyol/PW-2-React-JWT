# Gestion de roles de usuario

El sistema cuenta con 3 secciones accesibles en el sidebar:
1. Perfil
2. Usuarios
3. Manejo de roles

Los usuarios dependiendo de su rol podran:

| Accion | Administrador | Moderador | Usuario |
| ------ | ------ | ------ | ------ |
| Ver y editar perfil | ✅ | ✅ | ✅ |
| Listar usuarios | ✅ | ✅ | ❌ |
| Modificar roles | ✅ | ❌ | ❌ |


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
Para iniciar la el front, ejecuta:
    
```bash
npm run dev
```
Para iniciar la el servidor la primera vez es importante descomenrat la ultima linea de `server.js` para que ejecute la funcion `initial()`. Esta inicializara la base de datos y creara un usuario admin con el que se podra iniciar sesion. Luego de esto se puede comentar la linea.

Posteriormente ejecuta:
    
```bash
node server.js
```
