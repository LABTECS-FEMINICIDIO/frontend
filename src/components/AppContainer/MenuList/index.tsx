import * as React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import { useNavigate, useLocation } from 'react-router-dom';
import { APP_PAGES, APP_PAGES_EDITOR, APP_PAGES_EDITOR_PORTO_VELHO, APP_PAGES_PORTO_VELHO, APP_PAGES_VISUALIZADOR, APP_PAGES_VISUALIZADOR_PORTO_VELHO } from '../../../routes/pages.routes';
import { colors } from '../../../shared/theme';
import { useToken } from '../../../shared/hooks/auth';
import Cookies from 'universal-cookie';

interface MenuListProps {
  open?: boolean;
}

export function MenuList({ open }: MenuListProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (page: string) => {
    navigate(page);
  };
  const { perfil, selectedState } = useToken();
  
  const [pagesRender, setPagesRender] = React.useState(
    perfil === "visualizador"
      ? APP_PAGES_VISUALIZADOR
      : perfil === "pesquisador"
      ? APP_PAGES_EDITOR
      : APP_PAGES
  );

  React.useEffect(() => {
    const cookie = new Cookies();
    const city = cookie.get("selectedStateF");

    if (city === "Manaus") {
      setPagesRender(
        perfil === "visualizador"
        ? APP_PAGES_VISUALIZADOR
        : perfil === "pesquisador"
        ? APP_PAGES_EDITOR
        : APP_PAGES
      );
    } else {
      setPagesRender(
        perfil === "visualizador"
        ? APP_PAGES_VISUALIZADOR_PORTO_VELHO
        : perfil === "pesquisador"
        ? APP_PAGES_EDITOR_PORTO_VELHO
        : APP_PAGES_PORTO_VELHO
      );
    }
  }, [perfil, selectedState]);


  return (
    <List>
      {pagesRender.filter(e => e.showMenu === true).map((item: any, index: any) => (
        <ListItem
          key={index}
          disablePadding
          sx={{ display: 'block' }}
          onClick={() => handleNavigate(item.route)}>
          <ListItemButton
            sx={{
              minHeight: 40,
              justifyContent: open ? 'initial' : 'center',
              margin: '0.5rem',
              borderRadius: '4px',
              px: 2.5,
              ...(location.pathname === item.route &&
                !open && {
                background: colors.primary_lightest,
              }),
              ...(location.pathname === item.route &&
                open && {
                background: colors.primary_lightest,
                color: colors.primary_base,
              }),
            }}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                margin: 0,
                justifyContent: 'center',
                mr: open ? 3 : 'auto',
                ...(location.pathname === item.route &&
                  !open && {
                  color: colors.primary_base,
                }),
                ...(location.pathname === item.route &&
                  open && {
                  color: colors.primary_base,
                }),
              }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.title} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
