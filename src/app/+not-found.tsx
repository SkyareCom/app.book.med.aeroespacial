import { Redirect } from 'expo-router';

// Qualquer endereço desconhecido volta para a Home.
export default function NaoEncontrado() {
  return <Redirect href="/" />;
}
