import { login } from '../api/auth';
import { saveToken } from '../api/token';

const onSubmit = async (data: { phone: string }) => {
    try {
        const { token } = await login(data.phone);
        saveToken(token);
        // TODO: navigate to calendar
    } catch (err) {
        console.error(err);
        alert('Login failed');
    }
};
