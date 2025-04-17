import FormSignUpBuyer from "../../FormSignUpBuyer/FormSignUpBuyer";
import AuthLayout from "../../Common/AuthLayout/AuthLayout";

export default function SignUpBuyerPages() {
  return (
    <AuthLayout 
      title="Registro de Comprador"
      subtitle="Crea tu cuenta como comprador"
      footerText="¿Eres vendedor?"
      footerLink="/signUpSeller"
      footerLinkText="Regístrate como vendedor"
    >
      <FormSignUpBuyer />
    </AuthLayout>
  );
}