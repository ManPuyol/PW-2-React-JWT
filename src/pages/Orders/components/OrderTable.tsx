import { useEffect, useState } from 'react';
import { ColorPaletteProp } from '@mui/joy/styles';
import Chip from '@mui/joy/Chip';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
// icons
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';
import { getUsers } from '../../../utils/users';


export default function OrderTable() {
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

  return (
    <>
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: { xs: 'none', sm: 'initial' },
          width: '100%',
          borderRadius: 'sm',
          flexShrink: 1,
          overflow: 'auto',
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            '--TableCell-headBackground':
              'var(--joy-palette-background-level1)',
            '--Table-headerUnderlineThickness': '1px',
            '--TableRow-hoverBackground':
              'var(--joy-palette-background-level1)',
            '--TableCell-paddingY': '4px',
            '--TableCell-paddingX': '8px',
          }}
        >
          <thead>
            <tr>
              <th
                style={{ width: 48, textAlign: 'center', padding: '12px 6px' }}
              >
                ID
              </th>
              <th style={{ width: 120, padding: '12px 6px' }}>
                  Username
              </th>
              <th style={{ width: 140, padding: '12px 6px' }}>Email</th>
              <th style={{ width: 140, padding: '12px 6px' }}>Roles</th>
            </tr>
          </thead>
          <tbody>
            {
              users &&
              users.map((row) => (
                <tr key={row.id}>
                  <td style={{ textAlign: 'center', width: 120 }}>
                    {row.id}
                  </td>
                  <td>
                    <Typography level="body-xs">{row.username}</Typography>
                  </td>
                  <td>
                    <Typography level="body-xs">{row.email}</Typography>
                  </td>
                  <td>
                    {row.roles.map((role: string) => (

                      <Chip
                      key={role + row.id}
                        variant="soft"
                        size="sm"
                        startDecorator={
                          {
                            user: <PersonRoundedIcon />,
                            moderator: <ShieldRoundedIcon />,
                            admin: <BadgeRoundedIcon />,
                          }[role]
                        }
                        color={
                          {
                            user: 'success',
                            moderator: 'neutral',
                            admin: 'primary',
                          }[role] as ColorPaletteProp
                        }
                      >
                        {role}
                      </Chip>
                    ))
                    }

                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Sheet>
    </>
  );
}
