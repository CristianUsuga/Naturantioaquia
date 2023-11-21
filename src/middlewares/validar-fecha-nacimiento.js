// validar-fecha-nacimiento.mjs
import { validationResult } from 'express-validator';

const validarFechaNacimiento = (fecha_nacimiento) => {
  // Verifica la fecha de nacimiento
  const birthDate = new Date(fecha_nacimiento);
  const currentDate = new Date();
  const minAgeDate = new Date();
  minAgeDate.setFullYear(currentDate.getFullYear() - 130);
  const maxAgeDate = new Date();
  maxAgeDate.setFullYear(currentDate.getFullYear() - 14);

  if (birthDate < minAgeDate || birthDate > maxAgeDate) {
    throw new Error('La fecha de nacimiento no es válida');
  }

  return true;
};

export { validarFechaNacimiento };
