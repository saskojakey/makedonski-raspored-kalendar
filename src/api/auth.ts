// src/api/auth.ts
export async function login(phoneNumber: string): Promise<{ token: string }> {
    const res = await fetch('http://localhost:8080/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber }),
    });

    if (!res.ok) {
        throw new Error('Login failed');
    }

    return res.json();
}
