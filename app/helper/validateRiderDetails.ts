import { Request } from 'express';

export const validateRidersDetails = (req: Request) => {
  const {
    name,
    phoneNumber,
    ridersCard,
    passport,
    password,
    address,
    preferredRoutes,
  } = req.body;

  if (
    !(
      name &&
      phoneNumber &&
      ridersCard &&
      passport &&
      password &&
      address &&
      preferredRoutes
    )
  )
    return false;

  return true;
};
