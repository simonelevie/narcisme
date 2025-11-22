
// Dit is een simulatie van een backend database.
// In een echte app zou je hier een API call doen naar je server.

const STORAGE_KEY = 'narcisme_app_users';

export interface UserData {
  name: string;
  email: string;
  date: string;
}

export const subscribeUser = async (name: string, email: string): Promise<{ success: boolean; message: string }> => {
  // Simulatie van netwerk vertraging
  await new Promise(resolve => setTimeout(resolve, 800));

  try {
    // Haal bestaande gebruikers op
    const existingData = localStorage.getItem(STORAGE_KEY);
    const users: UserData[] = existingData ? JSON.parse(existingData) : [];

    // Check of email al bestaat
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, message: "Hé lieverd, dit e-mailadres staat al in ons gastenboek!" };
    }

    // Voeg nieuwe gebruiker toe
    const newUser: UserData = {
      name,
      email,
      date: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));

    console.log("Nieuwe inschrijving opgeslagen:", newUser); // Voor debugging
    return { success: true, message: "Gezellig! Je staat erbij, we houden contact!" };

  } catch (error) {
    console.error(error);
    return { success: false, message: "Oeps, er ging iets mis met opslaan. Probeer het later nog eens." };
  }
};

export const getUsers = (): UserData[] => {
  const existingData = localStorage.getItem(STORAGE_KEY);
  return existingData ? JSON.parse(existingData) : [];
};
