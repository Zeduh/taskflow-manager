'use client';

import { useState, useEffect } from 'react';
import { calculatePasswordStrength, getPasswordStrengthColor, getPasswordStrengthText } from '@/app/utils/password';

export function usePasswordStrength(password: string | undefined) {
    const [strength, setStrength] = useState(0);

    useEffect(() => {
        setStrength(calculatePasswordStrength(password || ''));
    }, [password]);

    return {
        strength,
        color: getPasswordStrengthColor(strength),
        text: getPasswordStrengthText(strength)
    };
}