import {render, screen} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {rest } from 'msw';
import {setupServer} from 'msw/node'

import { Register } from './Register';

const {REACT_APP_API_ENDPOINT:API_ENDPOINT} = process.env


const server = setupServer(
    rest.get(`${API_ENDPOINT}/auth/data`, (_, res, ctx) => {
        return res(ctx.json({
            result: {
                Rol: ['Team Member', 'Team Leader'],
                continente: ['America', 'Europa', 'Otro'],
                region: ['Otro', 'Latam', 'Brasil', 'America del Norte'],
            }
        }))
    })
)

beforeAll(() => server.listen())
afterAll(() => server.close())

it('fetch options',async () => {
    render(<Register />, {wrapper:MemoryRouter})

    expect(
        screen.getByRole("option", {name:"Seleccionar un rol..."})
        ).toBeInTheDocument()

    expect(await screen.findByRole("option", {name:"Europa"})).toBeInTheDocument()
})