import FormSignUpSeller from "../../FormSignUpSeller/FormSignUpSeller";
import AuthLayout from "../../Common/AuthLayout/AuthLayout";

export default function SignUpSellerPages() {
  return (
    <AuthLayout 
      title="Registro de Vendedor"
      subtitle="Crea tu cuenta como vendedor"
      footerText="¿Eres comprador?"
      footerLink="/signUpBuyer"
      footerLinkText="Regístrate como comprador"
    >
      <FormSignUpSeller />
    </AuthLayout>
  );
}