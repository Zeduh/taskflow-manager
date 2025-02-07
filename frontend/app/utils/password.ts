export const calculatePasswordStrength = (password: string): number => {
  // Verificação de segurança
  if (!password) return 0;
  
  let strength = 0;
  
  // Comprimento mínimo
  if (password.length >= 8) strength += 25;
  
  // Letras maiúsculas e minúsculas
  if (password.match(/[a-z]/)) strength += 15;
  if (password.match(/[A-Z]/)) strength += 15;
  
  // Números
  if (password.match(/\d/)) strength += 20;
  
  // Caracteres especiais
  if (password.match(/[^a-zA-Z\d]/)) strength += 25;
  
  return Math.min(100, strength);
};

export const getPasswordStrengthColor = (strength: number): string => {
  if (strength < 30) return '#f44336'; // Vermelho
  if (strength < 50) return '#ff9800'; // Laranja
  if (strength < 75) return '#ffd700'; // Amarelo
  return '#4caf50'; // Verde
};

export const getPasswordStrengthText = (strength: number): string => {
  if (strength < 30) return 'Fraca';
  if (strength < 50) return 'Razoável';
  if (strength < 75) return 'Boa';
  return 'Forte';
};