import axios from 'axios';
import React from 'react';
import { render, wait, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import { mocksData } from '../../../../../mocks';
import TwitterAccountInput from '../../../../../../pages/home/components/twitter-account-input';

const getPayload = () => ({ 
    status: 'success', 
    payload: { accounts: mocksData.accounts },
});

jest.mock('axios');
jest.mock('react-redux', () => ({
    useSelector: jest.fn(fn => fn({ global: { resolution: { device: 'desktop' }, modal: null } })),
    useDispatch: () => jest.fn(),
}));

beforeAll(() => {
    axios.post.mockResolvedValue({ data: getPayload() });
});
afterAll(() => {
    jest.restoreAllMocks();
});

describe('<TwitterAccountInput /> Component', () => {
    test('loads and changes account input', async () => {
        const { getByTestId } = render(<TwitterAccountInput />);

        await wait(() => getByTestId('account-input'));
        const accountInputWrapper = getByTestId('account-input');
        const accountInput = accountInputWrapper.querySelector('input[type="text"]');
        fireEvent.keyDown(accountInput, { target: { value: 'elonmusk' } })
        expect(accountInput.value).toBe('elonmusk');
    });
});
