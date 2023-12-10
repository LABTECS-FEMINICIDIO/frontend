import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { NotFound } from '../pages/NotFound';
import { APP_PAGES } from './pages.routes';
import { DefaultLayout } from '../DefaultLayout';

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                {APP_PAGES.map(({ route, component }) => (
                    <Route key={route} path={route} element={component} />
                ))}
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}