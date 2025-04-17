import FormSignIn from "../../FormSignIn/FormSignIn";
import AuthLayout from "../../Common/AuthLayout/AuthLayout";

export default function SignInPages() {
  return (
    <AuthLayout 
      title="Iniciar Sesión"
      subtitle="Accede a tu cuenta para continuar"
      footerText="¿No tienes una cuenta?"
      footerLink="/signUpBuyer"
      footerLinkText="Regístrate aquí"
    >
      <FormSignIn />
    </AuthLayout>
  );
}